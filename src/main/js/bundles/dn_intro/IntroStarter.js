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

export default class IntroStarter {

    activate() {
        const userIntro = this._userIntro;
        const properties = userIntro._properties;
        const startIntroOnStartup = properties.startIntroOnStartup;
        const enableCookie = properties.enableCookie;
        if (startIntroOnStartup) {
            if (enableCookie) {
                const cookieKey = "ShowIntroduction";
                const value = d_cookie(cookieKey);
                if (value === "false") {
                    // do nothing
                } else {
                    this._tool.set("active", true);
                }
            } else {
                const startIntro = this._startIntroOnStartupChecker && this._startIntroOnStartupChecker.getStartIntroOnStartupValue();
                if (startIntro) {
                    this._tool.set("active", true);
                }
            }
        }
    }

}
