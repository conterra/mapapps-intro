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

import module from "module";
import {assert} from "chai";
import ActionFactory from "../ActionFactory";
import {NoOpAction} from "../Action";
import TestTool from "./TestTool";
import ToolAction, {ToolActionConfig} from "../ToolAction";
import ElementAction, {ElementActionConfig} from "../ElementAction";

describe(module.id, function () {
    it("Create a ToolAction when action is 'toolActivate' and no tool available", function () {
        const factory = new ActionFactory();
        const config = {action: "toolActivate", toolId: "testTool"} as ToolActionConfig;
        const action = factory.createAction(config);

        assert.isTrue(action instanceof NoOpAction);
    });

    it("Create a ToolAction when action is 'toolActivate' and toolId not specified", function () {
        const factory = new ActionFactory();
        factory.addTool(new TestTool());
        const action = factory.createAction({action: "toolActivate"});

        assert.isTrue(action instanceof NoOpAction);
    });

    it("Create a ToolAction when action is 'toolActivate'", function () {
        const factory = new ActionFactory();
        factory.addTool(new TestTool());
        const config = {action: "toolActivate", toolId: "testTool"} as ToolActionConfig;
        const action = factory.createAction(config);

        assert.isTrue(action instanceof ToolAction);
    });

    it("Create a ToolAction when action is 'toolDeactivate'", function () {
        const factory = new ActionFactory();
        factory.addTool(new TestTool());
        const config = {action: "toolDeactivate", toolId: "testTool"} as ToolActionConfig;
        const action = factory.createAction(config);

        assert.isTrue(action instanceof ToolAction);
    });

    it("Create a NoOpAction when action is 'elementClick' and no elementSelector defined", function () {
        const factory = new ActionFactory();
        const config = {action: "elementClick"} as ElementActionConfig;
        const action = factory.createAction(config);

        assert.isTrue(action instanceof NoOpAction);
    });

    it("Create an ElementAction when action is 'elementClick' and elementSelector defined", function () {
        const factory = new ActionFactory();
        const config = {action: "elementClick"} as ElementActionConfig;
        const action = factory.createAction(config, "#testElement");

        assert.isTrue(action instanceof ElementAction);
    });
});

