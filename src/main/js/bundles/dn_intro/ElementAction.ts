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

import {ActionConfig} from "./Action";

export type ElementActionConfig = ActionConfig<"elementClick">;

export default class ElementAction {
    constructor(private elementSelector: string, private parentNode?: HTMLElement) {
    }

    execute(): void {
        const baseElem = this.parentNode || document;
        const element = baseElem.querySelector(this.elementSelector);
        if (element === null) {
            console.error(`Element with selector '${this.elementSelector}' not found`);
            return;
        }
        element instanceof HTMLElement && element.click();
    }
}
