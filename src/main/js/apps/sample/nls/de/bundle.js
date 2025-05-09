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
    apptitle: "DN_Intro Demo",
    tour: {
        steps: {
            step1: {
                title: "Karteninhalt Tool",
                content: "Klicken Sie hier, um den Karteninhalt zu öffnen"
            },
            step2: {
                title: "Karteninhalt",
                content: "Dieses Fenster ist der Karteninhalt. Er stellt dar, welche Daten auf der Karte angezeigt werden können."
            },
            step3: {
                title: "Layer ausklappen",
                content: "Klicken Sie hier um den Layer auszuklappen. Dadurch werden die untergeordneten Layer angezeigt."
            },
            step4: {
                title: "Toc Actions",
                content: "In diesem Menü befinden sich die Toc Actions. Hier können Sie Aktionen für den Layer ausführen wie 'Zoomen auf' und 'Weitere Infos anzeigen'."
            }
        },
        buttons: {
            next: "Nächster Schritt",
            prev: "Vorheriger Schritt",
            done: "Fertig"
        },
        progressText: "{{current}} von {{total}}"
    }
};
