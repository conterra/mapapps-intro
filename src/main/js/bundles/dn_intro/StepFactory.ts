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

    createStep(tour: driver.Driver, step: ToolDriveStep): driver.DriveStep {
        const toolAction = step.toolAction;
        if (!toolAction || !step.popover) {
            return step;
        }

        const tool = toolAction.toolId ? this.#getTool(toolAction?.toolId) : undefined;
        if (!tool) {
            return step;
        }

        if (toolAction.onNext) {
            step.popover.onNextClick = () => {
                this.#applyToolAction(toolAction.onNext, tool);
                tour.moveNext();
            };
        }

        if (toolAction.onPrev) {
            step.popover.onPrevClick = () => {
                this.#applyToolAction(toolAction.onPrev, tool);
                tour.movePrevious();
            };
        }

        return step;
    }

    #getTool(toolId: string): Tool | undefined {
        return this.tools?.find(tool => tool.id == toolId);
    }

    #applyToolAction(toolActionMethod: ToolMethod | undefined, tool: Tool): void {
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
    onNext?: ToolMethod;
    /**
     * The action to be performed on the tool when the previous button is clicked.
     */
    onPrev?: ToolMethod;
}

type ToolMethod = "activate" | "deactivate" | "click";
