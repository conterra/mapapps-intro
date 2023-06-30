<!--

    Copyright (C) 2023 con terra GmbH (info@conterra.de)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
    <v-container
        grid-list-md
        text-xs-center
        class="pa-1"
    >
        <v-btn
            ripple
            color="primary"
            @click="$emit('start-intro')"
        >
            {{ i18n.start }}
        </v-btn>
        <v-checkbox
            v-if="startIntroOnStartup"
            v-model="checkBox"
            class="pa-2"
            color="primary"
            :label="i18n.hint"
            hide-details
            @change="$emit('checkbox-changed', checkBox)"
        />
    </v-container>
</template>
<script>
    export default {
        props: {
            i18n: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            startIntroOnStartup: {
                type: Boolean,
                default: function () {
                    return true;
                }
            }
        },
        data() {
            return {
                checkBox: false
            };
        }
    };
</script>
