import {Tool} from "../Tool";

export default class TestTool implements Tool {
    active = false;
    id = "testTool";
    togglable = true;
    clicked = false;

    click(): void {
        if (!this.togglable) {
            this.clicked = true;
        }
    }

    set(key: keyof Pick<TestTool, "active" | "togglable">, value: boolean): void {
        this[key] = value;
    }
}
