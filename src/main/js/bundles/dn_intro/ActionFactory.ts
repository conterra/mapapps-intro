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

import {Action, ActionConfig, NoOpAction} from "./Action";
import {Tool, ToolActionConfig} from "./Tool";
import ElementAction from "./ElementAction";
import {ToolAction} from "./ToolAction";

export default class ActionFactory {
    private tools: Tool[] = [];

    createAction(config: ActionConfig<any>, elementSelector?: string): Action {
        if (config.action === "toolActivate" || config.action === "toolDeactivate") {
            if (!Object.hasOwn(config,"toolId")) {
                console.error("ToolActionConfig must have a 'toolId' property");
                return new NoOpAction();
            }

            const toolConfig = config as ToolActionConfig;
            const tool = this.getTool(toolConfig.toolId);
            if (tool) {
                return new ToolAction(tool, toolConfig);
            } else {
                console.error(`Tool with id '${toolConfig.toolId}' not found`);
                return new NoOpAction();
            }
        } else if (config.action === "elementClick") {
            if (!elementSelector) {
                console.error("When using ElementActionConfig the 'element' property must be defined on the step configuration.");
                return new NoOpAction();
            }
            return new ElementAction(elementSelector);
        }
        return new NoOpAction();
    }

    addTool(tool: Tool): void {
        this.tools.push(tool);
    }

    private getTool(toolId: string): Tool | undefined {
        return this.tools?.find(tool => tool.id == toolId);
    }
}
