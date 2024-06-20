import * as Blockly from 'blockly/core';

const rotateServo = {
  type: 'rotate_servo',
  message0: 'Rotate %1 servo %2',
  args0: [
    {
      type: 'field_dropdown',
      name: 'SERVO',
      options: [
        ['Left ear', '0'],
        ['Right ear', '1'],
        ['Tail', '2'],
      ],
    },
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

const ultrasonicGet = {
    type: 'ultrasonic_get',
    message0: 'Distance in %1',
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

const buzzerSet = {
    type: 'buzzer_set',
    message0: 'Set buzzer tone %1',
    args0: [
      {
        type: 'input_value',
        name: 'TONE',
        check: 'Number',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 75,
    tooltip: '',
    helpUrl: '',
};

const motorSet = {
  type: 'motor_set',
  message0: 'Set motor %1 speed %2',
  args0: [
    {
      type: 'field_dropdown',
      name: 'MOTOR',
      options: [
        ['Left', '5'],
        ['Right', '6'],
      ],
    },
    {
      type: 'input_value',
      name: 'SPEED',
      check: 'Number',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 300,
  tooltip: '',
  helpUrl: '',
};

const ledSet = {
  type: 'led_set',
  message0: 'Set LED %1',
  args0: [
    {
      type: 'field_dropdown',
      name: 'LED',
      options: [
        ['On', '0'],
        ['Off', '1'],
      ],
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 325,
  tooltip: '',
  helpUrl: '',
};

export const sensorsBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  rotateServo,
  ultrasonicGet,
  buzzerSet,
  motorSet,
  ledSet,
]);
