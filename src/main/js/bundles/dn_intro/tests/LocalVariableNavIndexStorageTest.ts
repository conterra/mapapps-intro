///
/// Copyright (C) 2024 con terra GmbH (info@conterra.de)
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
import {LocalVariableNavIndexStorage} from "../NavIndexStorage";

describe(module.id, function () {

    it("Saved value should be retrieved after saving", function () {
        const strategy = new LocalVariableNavIndexStorage();

        strategy.save(5);
        const index = strategy.get();

        assert.equal(index, 5);
    });

    it("Index value should be -1 after clearing", function () {
        const strategy = new LocalVariableNavIndexStorage();

        strategy.save(5);
        strategy.clear();
        const index = strategy.get();

        assert.equal(index, -1);
    });

    it("Index value should be -1 after after initialization", function () {
        const strategy = new LocalVariableNavIndexStorage();

        const index = strategy.get();

        assert.equal(index, -1);
    });
});
