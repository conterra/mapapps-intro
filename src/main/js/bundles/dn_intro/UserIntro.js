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
import d_lang from "dojo/_base/lang";
import async from "apprt-core/async";
import hopscotch from "hopscotch";

export default class UserIntro {

    startIntro() {
        this._getView().then((view) => {
            if (view.ready) {
                this._startTour();
            } else {
                const watcher = view.watch("ready", (ready) => {
                    ready && this._startTour();
                    watcher.remove();
                });
            }
        });
    }

    _startTour() {
        const properties = this._properties;
        const tour = {
            id: properties.id || "mapapps_intro",
            bubbleWidth: properties.bubbleWidth,
            bubblePadding: properties.bubblePadding,
            smoothScroll: properties.smoothScroll,
            scrollDuration: properties.scrollDuration,
            scrollTopMargin: properties.scrollTopMargin,
            showCloseButton: properties.showCloseButton,
            showPrevButton: properties.showPrevButton,
            showNextButton: properties.showNextButton,
            arrowWidth: properties.arrowWidth,
            skipIfNoElement: properties.skipIfNoElement,
            nextOnTargetClick: properties.nextOnTargetClick,
            i18n: {
                nextBtn: properties.i18n.nextBtn,
                prevBtn: properties.i18n.prevBtn,
                doneBtn: properties.i18n.doneBtn,
                skipBtn: properties.i18n.skipBtn,
                closeTooltip: properties.i18n.closeTooltip,
                stepNums: properties.i18n.stepNums
            }
        };
        tour.steps = this._steps = properties.steps;

        const hasTools = properties.steps.some((step) => step.toolId);

        if (hasTools) {
            const appCtx = this._appCtx;
            if (appCtx._applicationRootNode.addClassName !== undefined) {
                appCtx._applicationRootNode.addClassName("dn_intro_initializing");
            } else {
                appCtx._applicationRootNode.className = appCtx._applicationRootNode.className + " dn_intro_initializing";
            }
            properties.steps.forEach((step) => {
                if (step.toolId) {
                    const tool = this.getTool(step.toolId);
                    if (tool) {
                        tool.set("active", true);
                        async(() => {
                            tool.set("active", false);
                        }, 500);
                    }
                }
            });
            async(() => {
                if (appCtx._applicationRootNode.removeClassName !== undefined) {
                    appCtx._applicationRootNode.removeClassName("dn_intro_initializing");
                } else {
                    appCtx._applicationRootNode.className = appCtx._applicationRootNode.className.replace("dn_intro_initializing", "");
                }
            }, 1000);
        }

        hopscotch.startTour(tour, 0);
        hopscotch.listen("next", d_lang.hitch(this, this.onStep));
        hopscotch.listen("prev", d_lang.hitch(this, this.onStep));
        hopscotch.listen("end", d_lang.hitch(this, this.onEnd));
        hopscotch.listen("close", d_lang.hitch(this, this.onEnd));

        window.addEventListener("keydown", d_lang.hitch(hopscotch, this.onKeyDown), false);
    }

    stopIntro() {
        hopscotch.endTour();
    }

    onKeyDown(event) {
        const key = event.which || event.keyCode;
        switch (key) {
            case 32:
                // space key pressed
                this.nextStep();
                break;
            case 37:
                // left key pressed
                break;
            case 39:
                // right key pressed
                break;
        }
    }

    onStep() {
        const activeTool = this._activeTool;
        if (activeTool) {
            activeTool.set("active", false);
        }
        const steps = this._steps;
        const currStepNum = hopscotch.getCurrStepNum();
        const currStep = steps[currStepNum];
        if (currStep.toolId) {
            const tool = this._activeTool = this.getTool(currStep.toolId);
            tool && tool.set("active", true);
        }
    }

    onEnd() {
        this._introImmediateTool.set("active", false);
    }

    getTool(toolId) {
        const tools = this._tools;
        return tools.find(e => e.id === toolId);
    }

    _getView() {
        const mapWidgetModel = this._mapWidgetModel;
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            if (mapWidgetModel.view) {
                resolve(mapWidgetModel.view);
            } else {
                mapWidgetModel.watch("view", ({value: view}) => {
                    resolve(view);
                });
            }
        });
    }
}
