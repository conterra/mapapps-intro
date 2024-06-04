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
import {InjectedReference} from "apprt-core/InjectedReference";

export default class StepFactory {
    tools: InjectedReference<Tool[]>;

    createStep(driverInstance: driver.Driver, step: MapappsToolDriveStep): driver.DriveStep {
        const tool: Tool | undefined = step.toolId ? this.#getTool(step.toolId) : undefined;

        if (tool != undefined && step.onNext == "activate" && step.popover) {
            step.popover.onNextClick = () => {
                tool.set("active", true);
                driverInstance.moveNext();
            };
        }
        if (tool != undefined && step.onNext == "deactivate" && step.popover) {
            step.popover.onNextClick = () => {
                tool.set("active", false);
                driverInstance.moveNext();
            };
        }
        if (tool != undefined && step.onPrev == "activate" && step.popover) {
            step.popover.onPrevClick = () => {
                tool.set("active", true);
                driverInstance.movePrevious();
            };
        }
        if (tool != undefined && step.onPrev == "deactivate" && step.popover) {
            step.popover.onPrevClick = () => {
                tool.set("active", false);
                driverInstance.movePrevious();
            };
        }

        if (step.onNext == "click" && step.popover) {
            step.popover.onNextClick = (element: Element | undefined) => {
                if (element instanceof HTMLElement) {
                    element.click();
                }
                driverInstance.moveNext();
            };
        }
        if (step.onPrev == "click" && step.popover) {
            step.popover.onPrevClick = (element: Element | undefined) => {
                if (element instanceof HTMLElement) {
                    element.click();
                }
                driverInstance.movePrevious();
            };
        }
        return step;
    }

    #getTool(toolId: string): Tool | undefined {
        return this.tools?.find(tool => tool.id == toolId);
    }
}

interface Tool {
    id: string;
    set(key: "active", enable: boolean): void;
}

export interface MapappsToolDriveStep extends driver.DriveStep {
    toolId: string,
    onNext: "activate" | "deactivate" | "click";
    onPrev: "activate" | "deactivate" | "click";
}

interface DriverOptions {
    config: driver.Config;
    state: driver.State;
}
