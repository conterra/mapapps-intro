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
import StepFactory, {ToolDriveStep} from "./StepFactory";
import {InjectedReference} from "apprt-core/InjectedReference";
import {Config} from "driver.js";

export default class Tour {
    private tourConfig: TourConfig;
    private stepFactory: InjectedReference<StepFactory>;

    constructor(properties: TourConfig) {
        this.tourConfig = properties;
    }

    startTour(): void {
        const driverObj= driver.driver(this.tourConfig);
        const stepDefinitions = this.tourConfig.steps;
        const steps: driver.DriveStep[] = stepDefinitions.map(stepDefinition =>
            this.stepFactory!.createStep(driverObj, stepDefinition));
        driverObj.setSteps(steps);
        driverObj.drive();
    }
}

interface TourConfig extends Config {
    steps: ToolDriveStep[];
};
