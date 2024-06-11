import {Action} from "./Action";
import {Tool, ToolActionConfig} from "./Tool";

export class ToolAction implements Action {
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
