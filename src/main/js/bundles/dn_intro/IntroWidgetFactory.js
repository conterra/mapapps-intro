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
import d_cookie from "dojo/cookie";
import VueDijit from "apprt-vue/VueDijit";
import Vue from "apprt-vue/Vue";
import IntroWidget from "./IntroWidget.vue";

export default class IntroWidgetFactory {

    activate() {
        this._initComponent();
    }

    createInstance() {
        return VueDijit(this.vm);
    }

    _initComponent() {
        const userIntro = this._userIntro;
        const properties = userIntro._properties;
        const startIntroOnStartup = properties.startIntroOnStartup;

        const vm = this.vm = new Vue(IntroWidget);

        vm.i18n = this._i18n.get().ui;
        vm.startIntroOnStartup = startIntroOnStartup;

        if (this.isEnabled() === "false") {
            vm.checkBox = true;
        } else {
            vm.checkBox = false;
        }

        vm.$on("start-intro", () => {
            this.start();
        });
        vm.$on('checkbox-changed', (value) => {
            if (value) {
                this.disableIntro();
            } else {
                this.enableIntro();
            }
        });
    }

    start() {
        this._introImmediateTool.set("active", true);
        this._introTool.set("active", false);
    }

    disableIntro() {
        const cookieKey = "ShowIntroduction";
        d_cookie(cookieKey, false, {expires: 365});
    }

    enableIntro() {
        const cookieKey = "ShowIntroduction";
        d_cookie(cookieKey, null, {expires: -1});
    }

    isEnabled() {
        const cookieKey = "ShowIntroduction";
        return d_cookie(cookieKey);
    }

}
