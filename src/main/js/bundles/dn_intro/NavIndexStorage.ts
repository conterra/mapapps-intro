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

/**
 * This interface abstracts the strategy for persisting the current step of the tour.
 * This might be saving to a local variable, a cookie, session storage, or local storage.
 */
export interface NavIndexStorage {
    save(index: number): void;
    get(): number;
    clear(): void;
}

export class LocalVariableNavIndexStorage implements NavIndexStorage {
    private value = -1;

    save(index: number): void {
        this.value = index;
    }

    get(): number {
        return this.value;
    }

    clear(): void {
        this.value = -1;
    }
}
