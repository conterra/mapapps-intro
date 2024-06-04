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

    createStep(driverInstance: driver.Driver, step: ToolDriveStep): driver.DriveStep {
        const tool: Tool | undefined = step.toolAction?.toolId ? this.#getTool(step.toolAction?.toolId) : undefined;

        if (tool && step.toolAction?.onNext == "activate" && step.popover) {
            step.popover.onNextClick = () => {
                tool.set("active", true);
                driverInstance.moveNext();
            };
        }
        if (tool && step.toolAction?.onNext == "deactivate" && step.popover) {
            step.popover.onNextClick = () => {
                tool.set("active", false);
                driverInstance.moveNext();
            };
        }
        if (tool && step.toolAction?.onPrev == "activate" && step.popover) {
            step.popover.onPrevClick = () => {
                tool.set("active", true);
                driverInstance.movePrevious();
            };
        }
        if (tool && step.toolAction?.onPrev == "deactivate" && step.popover) {
            step.popover.onPrevClick = () => {
                tool.set("active", false);
                driverInstance.movePrevious();
            };
        }

        if (step.toolAction?.onNext == "click" && step.popover) {
            step.popover.onNextClick = (element: Element | undefined) => {
                if (element instanceof HTMLElement) {
                    element.click();
                }
                driverInstance.moveNext();
            };
        }
        if (step.toolAction?.onPrev == "click" && step.popover) {
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
    onNext: "activate" | "deactivate" | "click";
    /**
     * The action to be performed on the tool when the previous button is clicked.
     */
    onPrev: "activate" | "deactivate" | "click";

}
