///
/// Copyright (C) 2024 con terra GmbH (info@conterra.de)
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
