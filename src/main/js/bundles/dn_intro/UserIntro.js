/*
 * Copyright (C) 2015 con terra GmbH (info@conterra.de)
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
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-construct",
    "dojo/query",
    "dojo/_base/window",
    "ct/_Connect",
    "ct/async",
    "ct/array",
    "hopscotch"
], function (declare, d_lang, d_array, domConstruct, query, win, _Connect, ct_async, ct_array, hopscotch) {
    return declare([_Connect], {
        activate: function () {
            this.inherited(arguments);
        },
        startIntro: function () {
            var properties = this._properties;
            var tour = {
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
            var appCtx = this._appCtx;
            if (appCtx._applicationRootNode.addClassName !== undefined) {
                appCtx._applicationRootNode.addClassName("dn_intro_initializing");
            } else {
                appCtx._applicationRootNode.className = appCtx._applicationRootNode.className + " dn_intro_initializing";
            }
            d_array.forEach(properties.steps, function (step) {
                if (step.toolId) {
                    var tool = this.getTool(step.toolId);
                    if (tool) {
                        tool.set("active", true);
                        ct_async(function () {
                            tool.set("active", false);
                        }, this, 500);
                    }
                }
            }, this);
            ct_async(function () {
                if (appCtx._applicationRootNode.removeClassName !== undefined) {
                    appCtx._applicationRootNode.removeClassName("dn_intro_initializing");
                } else {
                    appCtx._applicationRootNode.className = appCtx._applicationRootNode.className.replace("dn_intro_initializing", "");
                }
            }, this, 1000);
            hopscotch.startTour(tour, 0);
            hopscotch.listen("next", d_lang.hitch(this, this.onStep));
            hopscotch.listen("prev", d_lang.hitch(this, this.onStep));

            window.addEventListener("keydown", d_lang.hitch(hopscotch, this.onKeyDown), false);
        },
        onKeyDown: function (event) {
            var key = event.which || event.keyCode;
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
        },
        onStep: function () {
            var activeTool = this._activeTool;
            if (activeTool) {
                activeTool.set("active", false);
            }
            var steps = this._steps;
            var currStepNum = hopscotch.getCurrStepNum();
            var currStep = steps[currStepNum];
            if (currStep.toolId) {
                var tool = this._activeTool = this.getTool(currStep.toolId);
                tool.set("active", true);
            }
        },
        getTool: function (toolId) {
            var tools = this._tools;
            return ct_array.arraySearchFirst(tools, {
                id: toolId
            });
        }
    });
});
