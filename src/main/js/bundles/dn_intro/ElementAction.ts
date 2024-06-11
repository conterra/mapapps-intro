export default class ElementAction {
    constructor(private elementSelector: string) {
    }

    execute(): void {
        const element = document.querySelector(this.elementSelector);
        element instanceof HTMLElement && element.click();
    }
}
