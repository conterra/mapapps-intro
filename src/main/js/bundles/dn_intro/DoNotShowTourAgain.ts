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

import {DriveStepWithSideEffect} from "dn_intro/Tour";
import {driver} from "driver";

export default class DoNotShowTourAgain {
    private static readonly LOCAL_STORAGE_KEY = "ct_introState";
    private static readonly LOCAL_STORAGE_VALUE = "shown";

    static isTourHidden(): boolean {
        const item = window.localStorage.getItem(DoNotShowTourAgain.LOCAL_STORAGE_KEY);
        return item === DoNotShowTourAgain.LOCAL_STORAGE_VALUE;
    }

    static addDoNotShowAgainCheckboxToStep(step: DriveStepWithSideEffect, options?: CheckboxOptions): void {
        const popover = step?.popover;
        if (!popover) {
            return;
        }

        // Add a checkbox to the bottom of the popover
        const originalFn = popover.onPopoverRender;

        popover.onPopoverRender = (element: driver.PopoverDOM, opts) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "ct_introDontShowAgain";
            const item = window.localStorage.getItem(DoNotShowTourAgain.LOCAL_STORAGE_KEY);
            checkbox.checked = item === DoNotShowTourAgain.LOCAL_STORAGE_VALUE;

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
            };

            saveCheckboxState(checkbox);
            checkbox.addEventListener("change", () => {
                saveCheckboxState(checkbox);
            });

            if (originalFn) {
                originalFn(element, opts);
            }
        };
    }
}

interface CheckboxOptions {
    labelText?: string;
}
