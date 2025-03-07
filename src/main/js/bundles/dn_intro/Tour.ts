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

import {driver} from "driver";
import {TourEvents} from "./TourEvents";
import {Evented, EventHandle} from "apprt-core/Events";
import {ActionConfig} from "./Action";
import ActionFactory from "./ActionFactory";
import {InjectedReference} from "apprt-core/InjectedReference";
import {LocalVariableNavIndexStorage, NavIndexStorage} from "./NavIndexStorage";
import DoNotShowTourAgain from "./DoNotShowTourAgain";

import type {MapWidgetModel} from "map-widget/api";

export default class Tour {
    private readonly tourConfig: TourConfig;
    private tour: driver.Driver | undefined;
    #actionFactory: InjectedReference<ActionFactory>;
    private readonly eventChannel = new TourEventChannel();
    private readonly navIndexStorage: NavIndexStorage = new LocalVariableNavIndexStorage();
    private readonly eventHandles: EventHandle[] = [];
    private _mapWidgetModel: InjectedReference<MapWidgetModel>;
    private _properties!: Record<string, any>;
    _i18n: {get: () => {doNotShowIntroAgain: string}} = {
        get() {
            return {doNotShowIntroAgain: "Do not show this introduction again"};
        }
    };

    constructor(properties: TourConfig) {
        this.tourConfig = properties;
        this.registerNavigationEventHooks();
    }

    activate(): void {
        const props = this._properties;
        if (DoNotShowTourAgain.isTourHidden()) {
            return;
        }

        if (props.startIntroOnStartup) {
            this.getView().then(() => {
                this.startTour();
            });
        }
    }

    startTour(): void {
        this.stopTour();
        const tour = this.tour = driver.driver(this.tourConfig);
        const steps = this.tourConfig.steps;
        this.watchOnNextEvent();
        this.watchOnPrevEvent();
        DoNotShowTourAgain.addDoNotShowAgainCheckboxToStep(steps[0], {
            labelText: this._i18n.get().doNotShowIntroAgain
        });
        tour.setSteps(steps);
        tour.drive();
        this.restoreSavedStepPosition(tour);
        this.enablePersistingTourPosition();
    }

    stopTour(): void {
        this.eventHandles.forEach(handle => handle.remove());
        this.tour?.destroy();
    }

    set actionFactory(actionFactory: ActionFactory) {
        this.#actionFactory = actionFactory;
    }

    private registerNavigationEventHooks(): void {
        // A hook for an event can only be set once. Therefore, we emit a custom event to be able to register to this
        // event multiple times.
        this.tourConfig.onNextClick = (element, step, options) => {
            this.eventChannel.emit("nextClick", {element, step, options});

            // Wait for the tool actions on the next step to complete before moving to the next step
            setTimeout(() => {
                this.tour?.moveNext();
            }, getDelayFromStep(step));

            function getDelayFromStep(step: DriveStepWithSideEffect): number {
                if (Object.hasOwn(step, "onNext")) {
                    const customDelay = step.onNext?.delay;
                    if (customDelay === undefined || customDelay <= 0) {
                        return 100;
                    } else {
                        return customDelay;
                    }
                }
                return 100;
            }
        };

        this.tourConfig.onPrevClick = (element, step, options) => {
            this.eventChannel.emit("prevClick", {element, step, options});

            // Wait for the tool actions on the previous step to complete before moving to the previous step
            setTimeout(() => {
                this.tour?.movePrevious();
            }, getDelayFromStep(step));

            function getDelayFromStep(step: DriveStepWithSideEffect): number {
                if (Object.hasOwn(step, "onPrev")) {
                    const customDelay = step.onPrev?.delay;
                    if (customDelay === undefined || customDelay <= 0) {
                        return 100;
                    } else {
                        return customDelay;
                    }
                }
                return 100;
            }
        };
    }

    private watchOnNextEvent(): void {
        const handle = this.eventChannel.on("nextClick", (event) => {
            const activeIndex = event.options.state.activeIndex === undefined ? 0 : event.options.state.activeIndex;
            const step = this.getStep(this.tourConfig.steps, activeIndex);
            if (step && step.onNext) {
                if (!this.#actionFactory) {
                    throw new Error("ActionFactory is not set.");
                }
                this.#actionFactory.createAction(step.onNext, step.element as string).execute();
            }
        });
        this.eventHandles.push(handle);
    }

    private watchOnPrevEvent(): void {
        const handle = this.eventChannel.on("prevClick", (event) => {
            const activeIndex = event.options.state.activeIndex === undefined ? 0 : event.options.state.activeIndex;
            const step = this.getStep(this.tourConfig.steps, activeIndex);
            if (step && step.onPrev) {
                if (!this.#actionFactory) {
                    throw new Error("ActionFactory is not set.");
                }
                this.#actionFactory.createAction(step.onPrev, step.element as string).execute();
            }
        });
        this.eventHandles.push(handle);
    }

    private getStep(
        steps: DriveStepWithSideEffect[],
        stepIndex: number | undefined
    ): DriveStepWithSideEffect | undefined {
        if (steps && stepIndex !== undefined && stepIndex >= 0) {
            return steps[stepIndex];
        }
    }

    private enablePersistingTourPosition(): void {
        const indexStorage = this.navIndexStorage;
        const nextClickHandle = this.eventChannel.on("nextClick", (event) => {
            if (this.tour?.hasNextStep() && event.options.state.activeIndex !== undefined) {
                indexStorage.save(event.options.state.activeIndex + 1);
            } else {
                indexStorage.clear();
            }
        });
        this.eventHandles.push(nextClickHandle);

        const prevClickHandle = this.eventChannel.on("prevClick", (event) => {
            const activeIndex = event.options.state.activeIndex;
            if (activeIndex !== undefined && activeIndex > 0) {
                indexStorage.save(activeIndex);
            } else {
                indexStorage.clear();
            }
        });
        this.eventHandles.push(prevClickHandle);
    }

    private restoreSavedStepPosition(tour: driver.Driver): void {
        const currentStep = this.navIndexStorage.get();
        if (currentStep > -1) {
            tour.drive(currentStep);
        }
    }

    private getView(): Promise<__esri.MapView | __esri.SceneView | undefined> {
        const mapWidgetModel = this._mapWidgetModel;
        if (!mapWidgetModel) {
            return Promise.reject("MapWidgetModel is not set.");
        }
        return new Promise((resolve) => {
            if (mapWidgetModel.view) {
                resolve(mapWidgetModel.view);
            } else {
                const watcher = mapWidgetModel.watch("view", ({value: view}) => {
                    watcher.remove();
                    resolve(view);
                });
            }
        });
    }
}

interface TourConfig extends driver.Config {
    steps: DriveStepWithSideEffect[];
}

class TourEventChannel extends Evented<TourEvents> {
}

export interface DriveStepWithSideEffect extends driver.DriveStep {
    onNext?: ActionConfig<any>;
    onPrev?: ActionConfig<any>;
}
