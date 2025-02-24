import {DriveStepWithSideEffect} from "dn_intro/Tour";
import {driver} from "driver";

export default class DoNotShowTourAgain {
    private static readonly LOCAL_STORAGE_KEY = "ct_introState";
    private static readonly LOCAL_STORAGE_VALUE = "shown";

    static isTourHidden(): boolean {
        return window.localStorage.getItem(DoNotShowTourAgain.LOCAL_STORAGE_KEY) === DoNotShowTourAgain.LOCAL_STORAGE_VALUE;
    }

    static addDoNotShowAgainCheckboxToStep(step: DriveStepWithSideEffect, options?: CheckboxOptions): void {
        const popover = step?.popover;
        if (!popover) {
            return;
        }

        popover.onPopoverRender = (element: driver.PopoverDOM) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "ct_introDontShowAgain";
            checkbox.checked = window.localStorage.getItem(DoNotShowTourAgain.LOCAL_STORAGE_KEY) === DoNotShowTourAgain.LOCAL_STORAGE_VALUE;

            const label = document.createElement("label");
            label.htmlFor = "ct_introDontShowAgain";
            label.textContent = options?.labelText || "Do not show this introduction again";

            const wrapper = document.createElement("div");
            wrapper.style.marginTop = "20px";
            wrapper.classList.add("driver-popover-description");
            element.wrapper.appendChild(wrapper);
            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);

            const saveCheckboxState = (checkbox: HTMLInputElement) => {
                if (checkbox.checked) {
                    window.localStorage.setItem(DoNotShowTourAgain.LOCAL_STORAGE_KEY, DoNotShowTourAgain.LOCAL_STORAGE_VALUE);
                } else {
                    window.localStorage.removeItem(DoNotShowTourAgain.LOCAL_STORAGE_KEY);
                }
            }

            saveCheckboxState(checkbox);
            checkbox.addEventListener("change", () => {
                saveCheckboxState(checkbox);
            });
        }
    }
}

interface CheckboxOptions {
    labelText?: string;
}
