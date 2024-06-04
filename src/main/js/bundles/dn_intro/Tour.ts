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
import {Config, DriveStep, State} from "driver.js";

export default class Tour {
    private tourConfig: TourConfig;
    private stepFactory: InjectedReference<StepFactory>;
    private tour: driver.Driver;
    private localStorageKeyName = "dn_intro_currentStep";

    constructor(properties: TourConfig) {
        this.tourConfig = properties;

        this.tourConfig.onNextClick = (element: Element | undefined, step: DriveStep, options: {
            config: Config;
            state: State
        }) => {
            if (this.tour.hasNextStep() && options.state.activeIndex !== undefined) {
                this.savePosition(options.state.activeIndex + 1);
            } else {
                this.clearSavedStepPosition();
            }
            this.tour.moveNext();
        }

        this.tour = driver.driver(this.tourConfig);
    }

    startTour(): void {
        const tour = this.tour;
        const stepDefinitions = this.tourConfig.steps;
        const steps: driver.DriveStep[] = stepDefinitions.map(stepDefinition =>
            this.stepFactory!.createStep(tour, stepDefinition));
        tour.setSteps(steps);
        tour.drive();

        this.restoreSavedStepPosition(tour);
    }

    private savePosition(index: number): void {
        localStorage.setItem(this.localStorageKeyName, index.toString());
    }

    private restoreSavedStepPosition(tour: driver.Driver): void {
        const currentStep = localStorage.getItem(this.localStorageKeyName);
        if (currentStep) {
            tour.drive(parseInt(currentStep));
        }
    }

    private clearSavedStepPosition(): void {
        localStorage.removeItem(this.localStorageKeyName);
    }
}

interface TourConfig extends Config {
    steps: ToolDriveStep[];
};
