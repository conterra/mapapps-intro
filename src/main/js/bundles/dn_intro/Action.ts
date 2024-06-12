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

export interface ActionConfig<ActionName> {
    action: ActionName;
    /**
     * The delay in milliseconds before moving to the next step. This is useful when it takes some time until the step's element becomes visible after executing the tool action. The default value is 100 milliseconds.
     */
    delay?: number;
}

export interface Action {
    execute(): void;
}

export class NoOpAction implements Action {
    execute(): void {
        // Do nothing
    }
}
