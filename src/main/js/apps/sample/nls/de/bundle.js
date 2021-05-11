/*
 * Copyright (C) 2021 con terra GmbH (info@conterra.de)
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
    apptitle: "map.apps 4 Demo",
    custominfo: {
        imprint: {
            title: "Impressum",
            tooltip: "Zeige Impressum",
            content: "<p>Verantwortlich f\u00fcr diese Seite ist:<br/><b>con terra</b> - Gesellschaft f\u00FCr Angewandte Informationstechnologie mbH<br /><br />Martin-Luther-King-Weg 24<br />48155 M\u00FCnster<br />Deutschland<br /><br />Ansprechpartner: Reinhard Abke<br /><br />Telefon +49 89 207 005 2200<br />Telefax +49 89 207 005 2111<br />info@conterra.de<br /><a href='http://www.conterra.de' target='_blank'>http://www.conterra.de</a><br /><br />Vertretungsberechtigte Gesch\u00e4ftsf\u00fchrer der con terra:<br />Karl Wiesmann, Uwe K\u00F6nig<br /><br />UstId-Nr.: DE 162264061<br />Handelsregister: HRB 4149, Amtsgericht M\u00FCnster</p>"
        }
    },
    map: {
        koeln1: {
            title: "Basisdaten",
            districts: {
                title: "Stadtviertel",
                text: "Das k\u00F6lner Stadtviertel <b>{STV_NAME}</b>."
            },
            boroughs: {
                title: "Stadtteile",
                text: "Der Stadtteil <b>{NAME}</b> liegt im k\u00F6lner Stadtbezirk {STADTBEZIR}."
            },
            precints: {
                title: "Stadtbezirke",
                text: "Der k\u00F6lner Stadtbezirk <b>{NAME}</b>."
            }
        },
        koeln2: {
            title: "Bildung und Kultur",
            libraries: {
                title: "Bibliotheken"
            },
            museums: {
                title: "Museen",
                text: "Das Museum <b>{NAME_LANG}</b> liegt im k\u00F6lner Stadtteil {STADTTEIL}."
            },
            schools: {
                title: "Schulen",
                text: ""
            }
        },
        koeln3: {
            title: "Freizeit",
            sights: {
                title: "Sehensw\u00FCrdigkeiten",
                titleSingle: "Sehensw\u00FCrdigkeit",
                text: "Die Sehensw\u00FCrdigkeit <b>{NAME_LANG}</b> liegt im k\u00F6lner Stadtteil {STADTTEIL}."
            },
            playgrounds: {
                title: "Spiel- und Sportpl\u00E4tze",
                text: "<b>{Spielplatzname}</b> liegt im k\u00F6lner Stadtteil {Stadtteil}. Die folgende Ausstattung steht zur Verf\u00FCgung:",
                baskets: "Basketballk\u00F6rbe",
                goals: "Fussballtore",
                tables: "Tischtennis Tische",
                walls: "Torwand",
                skate: "Skaten",
                misc: "Sonstiges"
            },
            places: {
                title: "Veranstaltungsorte",
                titleSingle: "Veranstaltungsort",
                text: "<b>{NAME_LANG}</b> ist ein {expression/carrier} Veranstaltungsort."
            }
        },
        basemaps: {
            street: "Stra\u00DFenkarte",
            topo: "Topographische Karte",
            hybrid: "Luftbild (hybrid)"
        }
    },
    search: {
        title: "Adressen"
    },
    common: {
        number: "Nummer",
        area: "Fl\u00E4che [ha]",
        totalArea: "Anteil an Gesamtfl\u00E4che [%]",
        name: "Name",
        provider: "Tr\u00E4ger",
        address: "Adresse",
        furtherinfo: "Weitere Informationen",
        precint: "Stadtbezirk",
        district: "Stadtviertel",
        private: "private",
        municipal: "st\u00E4dtischer"
    },
    intro: {
        familiarise: {
            title: "Willkommen",
            content: "Diese Einf\u00fchrung dient dazu Sie mit den Elementen und Funktionalit\u00e4ten von map.apps vertraut zu machen."
        },
        mapviewTools: {
            title: "Karten-Tools",
            content: "Mit diesen Tasten k\u00f6nnen sie weitere Funktionen aufrufen."
        },
        theme: {
            title: "Farbschema",
            content: "Hier k\u00f6nnen Sie das aktuelle Farbschema wechseln."
        },
        language: {
            title: "Sprache",
            content: "Eine andere Sprache k\u00f6nnen Sie hier ausw\u00e4hlen."
        },
        toc: {
            title: "Karteninhalt",
            content: "W\u00e4hlen Sie hier Ihre Karteninhalte."
        },
        tocTool: {
            title: "Karteninhalt",
            content: "Aktivieren Sie dazu einfach den gewünschten Karteninhalt."
        },
        legend: {
            title: "Legende",
            content: "Die Legende zeigt Ihnen die Symbolisierung der dargestellten Karteninhalte."
        },
        omnisearch: {
            title: "Omnisearch",
            content: "Geben Sie hier Ihren Suchbegriff ein und passen Sie die Suchmethode an."
        },
        featureinfo: {
            title: "Featureinfo",
            content: "Durch Klick in die Karte k\u00f6nnen Sie weitere Informationen abfragen."
        },
        next: "Weiter",
        back: "Zur\u00fcck",
        done: "Beenden",
        skip: "\u00dcberspringen",
        closeTooltip: "Intro beenden"
    }
}
