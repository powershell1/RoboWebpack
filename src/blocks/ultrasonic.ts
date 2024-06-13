/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const ultrasonicGet = {
    type: 'ultrasonic_get',
    message0: 'Ultrasonic receive distance in %1',
    args0: [
        {
            type: 'field_dropdown',
            name: 'PORT',
            options: [
                ['millimeters', '1'],
                ['centimeters', '2'],
                ['inches', '3'],
            ],
        },
    ],
    output: 'Number',
    colour: 200,
    tooltip: '',
    helpUrl: '',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const ultrasonicBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
    ultrasonicGet,
]);
