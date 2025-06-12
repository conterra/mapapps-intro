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
import {Config, Driver, State} from "driver.js";

export default class PopoverModification {
    /**
     * Surrounds each title in a popover with a h1 element to improve accessibility
     * @param steps
     */
    static enclosePopoverTitleInHtmlElement(steps: DriveStepWithSideEffect[], htmlElementName = "h3"): void {
        iterateSteps(steps, (element) => {
            const headingElem = document.createElement(htmlElementName);
            Array.from(element.title.childNodes).forEach(childNode => {
                childNode.remove();
                headingElem.appendChild(childNode);
            });
            element.title.appendChild(headingElem);
        });
    }

    static replaceAriaLabelOnCloseButton(steps: DriveStepWithSideEffect[], newAriaLabel = "Close"): void {
        iterateSteps(steps, (element) => {
            element.closeButton.ariaLabel = newAriaLabel;
        });
    }
}

/**
 * Iterates over the specified steps, and calls the specified callback function, when onPopoverRender is called
 * on a step.
 * @param steps
 * @param callback
 * @private
 */
function iterateSteps(
    steps: DriveStepWithSideEffect[],
    callback: (element: driver.PopoverDOM, options?: { config: Config; state: State, driver: Driver }) => void
) {
    steps.forEach(step => {
        const popover = step?.popover;
        if (!popover) {
            return;
        }

        const originalFn = popover.onPopoverRender;

        popover.onPopoverRender = (element: driver.PopoverDOM, opts) => {
            callback(element, opts);

            if (originalFn) {
                originalFn(element, opts);
            }
        };
    });
}
