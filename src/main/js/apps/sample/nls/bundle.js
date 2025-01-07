/*
 * Copyright (C) 2025 con terra GmbH (info@conterra.de)
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
export default {
    root: {
        apptitle: "DN_Intro Demo",
        tour: {
            steps: {
                step1: {
                    title: "Map Content Tool",
                    content: "Click here to open the table of contents"
                },
                step2: {
                    title: "Table of Contents",
                    content: "This is the table of contents. It displays which layers are visible on the map."
                },
                step3: {
                    title: "Expand Layer",
                    content: "Click here to expand the layer. This makes the sublayers visible in the toc."
                },
                step4: {
                    title: "Toc Actions",
                    content: "In this menu the toc actions are bundled. Here you can trigger actions for the specific layer such as 'Zoom to' or 'Show description' where applicable."
                }
            },
            buttons: {
                next: "Next",
                prev: "Previous",
                done: "Done"
            }
        }
    },
    de: true
};
