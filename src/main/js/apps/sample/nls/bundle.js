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
        apptitle: "map.apps 4 Demo",
        custominfo: {
            imprint: {
                title: "Imprint",
                tooltip: "Show imprint",
                content: "<p>Responsible for this website is:<br/><b>con terra</b> - Gesellschaft f\u00FCr Angewandte Informationstechnologie mbH<br /><br />Martin-Luther-King-Weg 24<br />48155 Muenster<br />Germany<br /><br />Contact person: Reinhard Abke<br /><br />fon +49 89 207 005 2200<br />fax +49 89 207 005 2111<br />info@conterra.de<br /><a href='http://www.conterra.de' target='_blank'>http://www.conterra.de</a><br /><br />Managing directors of the con terra GmbH are:<br />Karl Wiesmann, Uwe K\u00F6nig<br />Value added tax identification number: DE 162264061<br />Commercial register: HRB 4149, country court Muenster</p>"
            }
        },
        map: {
            koeln1: {
                title: "Basic Data",
                districts: {
                    title: "City Districts",
                    text: "Cologne's city district <b>{STV_NAME}</b>."
                },
                boroughs: {
                    title: "Boroughs",
                    text: "Boroughs <b>{NAME}</b> is located in Cologne's precints {STADTBEZIR}."
                },
                precints: {
                    title: "Precints",
                    text: "Cologne's precint {NAME}."
                }
            },
            koeln2: {
                title: "Education and Culture",
                libraries: {
                    title: "Libraries"
                },
                museums: {
                    title: "Museums",
                    text: "Museum <b>{NAME_LANG}</b> is located in Cologne's boroughs {STADTTEIL}."
                },
                schools: {
                    title: "Schools"
                }
            },
            koeln3: {
                title: "Recreation",
                sights: {
                    title: "Tourist Attractions",
                    titleSingle: "Tourist Attraction",
                    text: "Tourist attraction <b>{NAME_LANG}</b> is located in Cologne's borough {STADTTEIL}."
                },
                playgrounds: {
                    title: "Playgrounds- and Sports Areas",
                    text: "<b>{Spielplatzname}</b> is located in Cologne's borough {Stadtteil}. The following facilities are available:",
                    baskets: "Basketball Baskets",
                    goals: "Soccer Goals",
                    tables: "Ping-Pong Tables",
                    walls: "Goal Wall",
                    skate: "Skating",
                    misc: "Miscellaneous"
                },
                places: {
                    title: "Places of Event",
                    titleSingle: "Place of Event",
                    text: "<b>{NAME_LANG}</b> is a {expression/carrier} place of event."
                }
            },
            basemaps: {
                street: "Street Map",
                topo: "Topographical Map",
                hybrid: "Aerial (hybrid)"
            }
        },
        search: {
            title: "Addresses"
        },
        common: {
            number: "Number",
            area: "Area [ha]",
            totalArea: "Percentage of the total area [%]",
            name: "Name",
            provider: "Provider",
            address: "Adress",
            furtherinfo: "Further Information",
            precint: "Precint",
            district: "District",
            private: "privater",
            municipal: "municipal"
        },
        intro: {
            familiarise: {
                title: "Welcome",
                content: "This introduction has the aim to familiarise you with the elements and functionality of map.apps."
            },
            mapviewTools: {
                title: "Mapview Tools",
                content: "These buttons allow you to call up further functions."
            },
            theme: {
                title: "Theme",
                content: "Change the map.apps theme."
            },
            language: {
                title: "Language",
                content: "Choose another language."
            },
            toc: {
                title: "Map content",
                content: "This button opens the TOC. It allows you to change the map content."
            },
            tocTool: {
                title: "Map content",
                content: "Simply select any map content."
            },
            legend: {
                title: "Legend",
                content: "The legend shows the layer symbology."
            },
            search: {
                title: "Search",
                content: "Search here and configure the search message."
            },
            featureinfo: {
                title: "Featureinfo",
                content: "Click on the map to query additional information."
            },
            next: "next",
            back: "back",
            done: "done",
            skip: "skip",
            closeTooltip: "close intro"
        }
    },
    de: true
}
