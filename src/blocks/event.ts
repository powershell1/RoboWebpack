import * as Blockly from 'blockly/core';

const startEvent = {
    type: 'start_event',
    message0: 'when started',
    message1: "do %1",
    args1: [
      {type: "input_statement", name: "DO"}
    ],
    colour: 150,
    tooltip: '',
    helpUrl: '',
};

const loopEvent = {
    type: 'loop_event',
    message0: 'run forever',
    message1: "do %1",
    args1: [
      {type: "input_statement", name: "DO"}
    ],
    colour: 150,
    tooltip: '',
    helpUrl: '',
};

const waitFor = {
    type: 'wait_for',
    message0: 'wait %1 seconds',
    args0: [
        {
            type: 'input_value',
            name: 'SECONDS',
            check: 'Number',
        },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 150,
    tooltip: '',
    helpUrl: '',
};

export const eventBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
    startEvent,
    loopEvent,
    waitFor,
]);