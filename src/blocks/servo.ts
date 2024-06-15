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
const rotateServo = {
  type: 'rotate_servo',
  message0: 'Rotate servo %1',
  args0: [
    {
      type: 'input_value',
      name: 'MOTOR',
      check: 'Number',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 300,
  tooltip: '',
  helpUrl: '',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const servoBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  rotateServo,
]);
