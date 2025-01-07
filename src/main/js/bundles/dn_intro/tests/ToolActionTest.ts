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
import ToolAction from "../ToolAction";
import TestTool from "./TestTool";


describe(module.id, function () {

    it("Togglable tool should get activated when toolActivate action is executed", function () {
        const tool = new TestTool();
        const action = new ToolAction(tool, {action: "toolActivate", toolId: "testTool"});

        action.execute();

        assert.isTrue(tool.active);
    });

    it("Togglable tool should get deactivated when toolDeactivate action is executed", function () {
        const tool = new TestTool();
        const action = new ToolAction(tool, {action: "toolDeactivate", toolId: "testTool"});

        action.execute();

        assert.isFalse(tool.active);
    });

    it("Togglable tool should get clicked when toolActivate action is executed on non-togglable tool", function () {
        const tool = new TestTool();
        tool.togglable = false;
        const action = new ToolAction(tool, {action: "toolActivate", toolId: "testTool"});

        action.execute();

        assert.isTrue(tool.clicked);
    });

    it("Executing toolDeactivate action on non-togglable tool should have no effect (just log an error)", function () {
        const tool = new TestTool();
        tool.togglable = false;
        const action = new ToolAction(tool, {action: "toolDeactivate", toolId: "testTool"});

        action.execute();

        assert.isFalse(tool.clicked);
    });
});
