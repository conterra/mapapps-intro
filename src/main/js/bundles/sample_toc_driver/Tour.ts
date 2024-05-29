/*
 * Copyright (C) 2023 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
import {driver} from "driver";
import StepFactory, {ExtendedDriveStep} from "./StepFactory";
import {InjectedReference} from "apprt-core/InjectedReference";

export default class Tour {
    private stepDefinitions: ExtendedDriveStep[] = [];
    private stepFactory: InjectedReference<StepFactory>;

    constructor(properties: ConstructorParameters) {
        this.stepDefinitions = properties.steps;
    }

    startTour(): void {
        const driverObj= driver.driver({
            showProgress: true
        });
        const stepDefinitions = this.stepDefinitions;
        const steps = stepDefinitions.map(stepDefinition => this.stepFactory!.createStep(driverObj, stepDefinition));
        driverObj.setSteps(steps);
        driverObj.drive();
    }
}

interface ConstructorParameters {
    steps: ExtendedDriveStep[]
}
