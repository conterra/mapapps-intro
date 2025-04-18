///
/// Copyright (C) 2025 con terra GmbH (info@conterra.de)
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

import {Action, ActionConfig} from "./Action";
import {Tool} from "./Tool";

export interface ToolActionConfig extends ActionConfig<"toolActivate" | "toolDeactivate"> {
    /**
     * The id of the tool to be activated/deactivated or clicked.
     */
    toolId: string;
}


export default class ToolAction implements Action {
    constructor(private tool: Tool, private actionConfig: ToolActionConfig) {
    }

    execute(): void {
        const { action, toolId} = this.actionConfig;
        if (toolId !== this.tool.id) {
            return;
        }
        if (action === "toolActivate") {
            if (this.tool.togglable) {
                this.tool.set("active", true);
            } else {
                this.tool.click();
            }
        } else if (action === "toolDeactivate" && this.tool.togglable) {
            this.tool.set("active", false);
        } else {
            console.error(`Invalid action '${action}' for tool '${this.tool.id}'. Tool is not togglable.`);
        }
    }
}
