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
module.exports = {
    root: {
        bundleName: "Intro Config",
        bundleDescription: "Configuration Bundle for the Intro Bundle",
        windowTitle: "Intro Config",
        description: "Settings for the Intro Bundle",
        startIntroOnStartup: {
            title: "Start intro on startup",
            description: "Start intro on startup"
        },
        bubbleWidth: {
            title: "Bubble width",
            description: "Bubble width"
        },
        bubblePadding: {
            title: "Bubble Padding",
            description: "Bubble Padding"
        },
        smoothScroll: {
            title: "Scroll smoothly to the next step",
            description: "Scroll smoothly to the next step"
        },
        scrollDuration: {
            title: "Scroll duration",
            description: "Scroll duration"
        },
        scrollTopMargin: {
            title: "Space between bubble and the top of the viewport when the page scrolls",
            description: "Space between bubble and the top of the viewport when the page scrolls"
        },
        showCloseButton: {
            title: "Show close button",
            description: "Show close button"
        },
        showPrevButton: {
            title: "Show previous button",
            description: "Show previous button"
        },
        showNextButton: {
            title: "Show next button",
            description: "Show next button"
        },
        arrowWidth: {
            title: "Arrow width",
            description: "Arrow width"
        },
        skipIfNoElement: {
            title: "If a specified target element is not found, skip to the next step",
            description: "If a specified target element is not found, skip to the next step"
        },
        nextOnTargetClick: {
            title: "Go to next step if the user clicks on the target",
            description: "Go to next step if the user clicks on the target"
        },
        steps: {
            title: "Steps definition",
            description: "For defining steps using JSON configuration"
        }
    },
    de: true
};
