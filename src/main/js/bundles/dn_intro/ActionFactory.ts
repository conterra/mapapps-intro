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
        if (Object.hasOwn(config,"toolId")) {
            const toolConfig = config as ToolActionConfig;
            const tool = this.getTool(toolConfig.toolId);
            if (tool) {
                return new ToolAction(tool, toolConfig);
            } else {
                console.error(`Tool with id '${toolConfig.toolId}' not found`);
            }
        } else if (config.action === "elementClick" && elementSelector) {
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
