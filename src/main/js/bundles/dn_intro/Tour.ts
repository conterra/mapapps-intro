///
/// Copyright (C) 2023 con terra GmbH (info@conterra.de)
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///         http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import {driver} from "driver";
import {TourEvents} from "./TourEvents";
import {Evented} from "apprt-core/Events";

export default class Tour {
    private tourConfig: TourConfig;
    private tour: driver.Driver;
    private eventChannel = new TourEventChannel();
    private tools: Tool[] = [];
    private persistingStrategy: PersistingStrategy = new LocalVariablePersistingStrategy();

    constructor(properties: TourConfig) {
        this.tourConfig = properties;
        this.registerNavigationEventHooks();
        this.tour = driver.driver(this.tourConfig);
    }

    startTour(): void {
        const tour = this.tour;
        const steps = this.tourConfig.steps;
        this.enableToolActions();
        tour.setSteps(steps);
        tour.drive();
        this.restoreSavedStepPosition(tour);
        this.enablePersistingTourPosition();
    }

    addTool(tool: Tool): void {
        this.tools.push(tool);
    }

    private registerNavigationEventHooks(): void {
        // A hook for an event can only be set once. Therefore, we emit a custom event to be able to register to this
        // event multiple times.
        this.tourConfig.onNextClick = (element, step, options) => {
            this.eventChannel.emit("nextClick", {element, step, options});
            // Wait for the tool actions on the next step to complete before moving to the next step
            setTimeout(() => {
                this.tour.moveNext();
            }, 100);
        };

        this.tourConfig.onPrevClick = (element, step, options) => {
            this.eventChannel.emit("prevClick", {element, step, options});
            this.tour.movePrevious();
        };
    }

    private enableToolActions(): void {
        this.eventChannel.on("nextClick", (event) => {
            const activeIndex = event.options.state.activeIndex === undefined ? 0 : event.options.state.activeIndex
            const toolAction = this.getToolActionFromStep(this.tourConfig.steps, activeIndex + 1);

            if (toolAction) {
                this.performActionOnTool(toolAction.toolId, toolAction.actionName);
            }
        });
    }

    private getToolActionFromStep(steps: ToolDriveStep[], stepIndex: number | undefined): ToolAction | undefined {
        if (steps && stepIndex !== undefined && stepIndex >= 0) {
            const activeStep = <ToolDriveStep>steps[stepIndex];
            return activeStep?.toolAction;
        }
    }

    private performActionOnTool(toolId: string, toolActionMethod: ToolMethod | undefined): void {
        const tool = this.getTool(toolId);
        if (!tool) {
            return;
        }
        switch (toolActionMethod) {
            case "activate":
                tool.set("active", true);
                break;
            case "deactivate":
                tool.set("active", false);
                break;
            case "click":
                tool.click();
        }
    }

    private getTool(toolId: string): Tool | undefined {
        return this.tools?.find(tool => tool.id == toolId);
    }

    private enablePersistingTourPosition(): void {
        this.eventChannel.on("nextClick", (event) => {
            if (this.tour.hasNextStep() && event.options.state.activeIndex !== undefined) {
                this.persistingStrategy.save(event.options.state.activeIndex + 1);
            } else {
                this.persistingStrategy.clear();
            }
        });
        this.eventChannel.on("prevClick", (event) => {
            const activeIndex = event.options.state.activeIndex;
            if (activeIndex !== undefined && activeIndex > 0) {
                this.persistingStrategy.save(activeIndex);
            } else {
                this.persistingStrategy.clear();
            }
        });
    }

    private restoreSavedStepPosition(tour: driver.Driver): void {
        const currentStep = this.persistingStrategy.restore();
        if (currentStep > -1) {
            tour.drive(currentStep);
        }
    }
}

interface TourConfig extends driver.Config {
    steps: ToolDriveStep[];
}

class TourEventChannel extends Evented<TourEvents> {
}

interface Tool {
    id: string;
    click(): void;
    set(key: "active", enable: boolean): void;
}

export interface ToolDriveStep extends driver.DriveStep {
    toolAction?: ToolAction;
}

interface ToolAction {
    /**
     * The id of the tool to be activated/deactivated or clicked.
     */
    toolId: string,
    /**
     * The action to be performed on the tool when the next button is clicked.
     */
    actionName?: ToolMethod;
}

type ToolMethod = "activate" | "deactivate" | "click";

/**
 * This interface abstracts the strategy for persisting the current step of the tour.
 * This might be saving to a local variable, a cookie, session storage, or local storage.
 */
interface PersistingStrategy {
    save(index: number): void;
    restore(): number;
    clear(): void;
}

class LocalVariablePersistingStrategy implements PersistingStrategy {
    private value: number = -1;

    save(index: number): void {
        this.value = index;
    }

    restore(): number {
        return this.value;
    }

    clear(): void {
        this.value = -1;
    }
}
