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
import {Evented, EventHandle} from "apprt-core/Events";
import {ActionConfig} from "./Action";
import ActionFactory from "./ActionFactory";
import {InjectedReference} from "apprt-core/InjectedReference";
import {LocalVariablePersistingStrategy, PersistingStrategy} from "./PersistingStrategy";

export default class Tour {
    private tourConfig: TourConfig;
    private tour: driver.Driver | undefined;
    #actionFactory: InjectedReference<ActionFactory>;
    private eventChannel = new TourEventChannel();
    private persistingStrategy: PersistingStrategy = new LocalVariablePersistingStrategy();
    private eventHandles: EventHandle[] = [];

    constructor(properties: TourConfig) {
        this.tourConfig = properties;
        this.registerNavigationEventHooks();
    }

    startTour(): void {
        const tour = this.tour = driver.driver(this.tourConfig);
        const steps = this.tourConfig.steps;
        this.watchOnNextEvent();
        tour.setSteps(steps);
        tour.drive();
        this.restoreSavedStepPosition(tour);
        this.enablePersistingTourPosition();
    }

    set actionFactory(actionFactory: ActionFactory) {
        this.#actionFactory = actionFactory;
    }

    private registerNavigationEventHooks(): void {
        // A hook for an event can only be set once. Therefore, we emit a custom event to be able to register to this
        // event multiple times.
        this.tourConfig.onNextClick = (element, step, options) => {
            this.eventChannel.emit("nextClick", {element, step, options});

            // Wait for the tool actions on the next step to complete before moving to the next step
            setTimeout(() => {
                this.tour?.moveNext();
            }, getDelayFromStep(step));
        };

        function getDelayFromStep(step: DriveStepWithSideEffect): number {
            if (Object.hasOwn(step, "onNext")) {
                const customDelay = step.onNext?.delay;
                if (customDelay === undefined || customDelay <= 0) {
                    return 100;
                } else {
                    return customDelay;
                }
            }
            return 100;
        }

        this.tourConfig.onPrevClick = (element, step, options) => {
            this.eventChannel.emit("prevClick", {element, step, options});
            this.tour?.movePrevious();
        };
    }

    private watchOnNextEvent(): void {
        const handle = this.eventChannel.on("nextClick", (event) => {
            const activeIndex = event.options.state.activeIndex === undefined ? 0 : event.options.state.activeIndex;
            const actionConfig = this.getActionFromStep(this.tourConfig.steps, activeIndex, "onNext");
            if (actionConfig) {
                if (!this.#actionFactory) {
                    throw new Error("ActionFactory is not set.");
                }
                const action = this.#actionFactory.createAction(actionConfig);
                console.debug("Executing onNext action", actionConfig, action);
                action.execute();
            }
        });
        this.eventHandles.push(handle);
    }

    private getActionFromStep(steps: DriveStepWithSideEffect[], stepIndex: number | undefined, stepEvent: StepEvent): ActionConfig<any> | undefined {
        if (steps && stepIndex !== undefined && stepIndex >= 0) {
            return steps[stepIndex][stepEvent];
        }
    }

    private enablePersistingTourPosition(): void {
        const persistingStrategy = this.persistingStrategy;
        const nextClickHandle = this.eventChannel.on("nextClick", (event) => {
            if (this.tour?.hasNextStep() && event.options.state.activeIndex !== undefined) {
                persistingStrategy.save(event.options.state.activeIndex + 1);
            } else {
                persistingStrategy.clear();
            }
        });
        this.eventHandles.push(nextClickHandle);

        const prevClickHandle = this.eventChannel.on("prevClick", (event) => {
            const activeIndex = event.options.state.activeIndex;
            if (activeIndex !== undefined && activeIndex > 0) {
                persistingStrategy.save(activeIndex);
            } else {
                persistingStrategy.clear();
            }
        });
        this.eventHandles.push(prevClickHandle);
    }

    private restoreSavedStepPosition(tour: driver.Driver): void {
        const currentStep = this.persistingStrategy.restore();
        if (currentStep > -1) {
            tour.drive(currentStep);
        }
    }
}

interface TourConfig extends driver.Config {
    steps: DriveStepWithSideEffect[];
}

class TourEventChannel extends Evented<TourEvents> {
}


export interface DriveStepWithSideEffect extends driver.DriveStep {
    onNext?: ActionConfig<any>;
    onPrev?: ActionConfig<any>;
}

type StepEvent = "onNext" | "onPrev";
