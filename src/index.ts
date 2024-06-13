/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {textBlocks} from './blocks/text';
import {motorBlocks} from './blocks/motor';
import {forBlock} from './generators/javascript';
import {javascriptGenerator} from 'blockly/javascript';
import {save, load, loadJSON} from './serialization';
import {toolbox} from './toolbox';
import {v4, v5} from 'uuid';
/*
import {
  ContinuousToolbox,
  ContinuousFlyout,
  ContinuousMetrics,
} from './molded_module/m2/index';
*/
import {FieldColourHsvSliders} from '@blockly/field-colour-hsv-sliders';
// import {ZoomToFitControl} from '@blockly/zoom-to-fit';
import './index.css';
import { ultrasonicBlocks } from './blocks/ultrasonic';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(textBlocks);
Blockly.common.defineBlocks(motorBlocks);
Blockly.common.defineBlocks(ultrasonicBlocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');

Blockly.Scrollbar.scrollbarThickness = 15;

const ws = blocklyDiv && Blockly.inject(blocklyDiv, {
  toolbox,
  sounds: false,
  trashcan: true,
  scrollbars: true,
  horizontalLayout: true,
  renderer: 'thrasos',
  /*
  plugins: {
    toolbox: ContinuousToolbox,
    flyoutsVerticalToolbox: ContinuousFlyout,
    metricsManager: ContinuousMetrics,
  },
  */  
  plugins: {
  },
  toolboxPosition: "end",
  zoom: {
    controls: true,
    maxScale: 1.8,
    minScale: 0.6,
    scaleSpeed: 1.2,
    pinch: true,
  },
  theme: Blockly.Theme.defineTheme('modest', {
    name: 'modest',
    fontStyle: {
      family: 'Google Sans',
      weight: 'bold',
      size: 16,
    },
    blockStyles: {
      logic_blocks: {
        colourPrimary: '#D1C4E9',
        colourSecondary: '#EDE7F6',
        colourTertiary: '#B39DDB',
      },
      loop_blocks: {
        colourPrimary: '#A5D6A7',
        colourSecondary: '#E8F5E9',
        colourTertiary: '#66BB6A',
      },
      math_blocks: {
        colourPrimary: '#2196F3',
        colourSecondary: '#1E88E5',
        colourTertiary: '#0D47A1',
      },
      text_blocks: {
        colourPrimary: '#FFCA28',
        colourSecondary: '#FFF8E1',
        colourTertiary: '#FF8F00',
      },
      list_blocks: {
        colourPrimary: '#4DB6AC',
        colourSecondary: '#B2DFDB',
        colourTertiary: '#009688',
      },
      variable_blocks: {
        colourPrimary: '#EF9A9A',
        colourSecondary: '#FFEBEE',
        colourTertiary: '#EF5350',
      },
      variable_dynamic_blocks: {
        colourPrimary: '#EF9A9A',
        colourSecondary: '#FFEBEE',
        colourTertiary: '#EF5350',
      },
      procedure_blocks: {
        colourPrimary: '#D7CCC8',
        colourSecondary: '#EFEBE9',
        colourTertiary: '#BCAAA4',
      },
    },
  }),
});

function ResizedWindow() {
  Blockly.svgResize(ws!);
}

/*
(async () => {
  const response = await (await fetch('https://pastebin.com/raw/mwm3L0yq')).text();
  console.log(response);
})();
*/

const savedLoad = loadJSON;
eval(`window.loadJSON = (json) => {
  savedLoad(ws, json);
};`);
eval("window.blockJSON = '{}';");
ResizedWindow();
window.addEventListener('resize', ResizedWindow);

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.  

if (ws) {
  // Load the initial state from storage and run the code.
  // load(ws);
  // loadJSON(ws, '{"blocks":{"languageVersion":0,"blocks":[{"type":"controls_repeat_ext","id":"=[hRQ0CXRjKZ3?6c_XzR","x":1030,"y":742,"inputs":{"TIMES":{"shadow":{"type":"math_number","id":"=Ay0zIwfYvzBpM`99-aJ","fields":{"NUM":10}},"block":{"type":"math_number","id":"9(.i:n16FPMp%jzFJt31","fields":{"NUM":123}}},"DO":{"block":{"type":"rotate_motor","id":"DV0~fA12u3iag3IbB7W{","inputs":{"MOTOR":{"block":{"type":"math_number","id":"]%R_82Sx5$(odgKoAwZ3","fields":{"NUM":123}}}}}}}}]},"variables":[{"name":"ee","id":"qvchO{f{,6vS^IakQJO("},{"name":"hello","id":"ce:dB8,tO|n/JS!pk.u-"}]}');

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
    const uuid = v4();
    eval('try {BlockChanged.postMessage(uuid);} catch {}');
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // Don't run the code when the workspace finishes loading; we're
    // already running it once when the application starts.
    // Don't run the code during drags; we might have invalid state.
    if (
      e.isUiEvent ||
      e.type == Blockly.Events.FINISHED_LOADING ||
      ws.isDragging()
    ) {
      return;
    }
  });
}
