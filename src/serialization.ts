/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

const storageKey = 'mainWorkspace';

/**
 * Saves the state of the workspace to browser's local storage.
 * @param {Blockly.Workspace} workspace Blockly workspace to save.
 */
export const save = function (workspace: Blockly.Workspace) {
  const data = Blockly.serialization.workspaces.save(workspace);
  const json = JSON.stringify(data);
  eval("window.blockJSON = json;");
  // window.localStorage?.setItem(storageKey, JSON.stringify(data));
};

/**
 * Loads saved state from local storage into the given workspace.
 * @param {Blockly.Workspace} workspace Blockly workspace to load into.
 */
export const load = function (workspace: Blockly.Workspace) {
  const data = window.localStorage?.getItem(storageKey);
  if (!data) return;

  loadJSON(workspace, data);
};

/**
 * Loads state from JSON into the given workspace.
 * @param {Blockly.Workspace} workspace Blockly workspace to load into.
 * @param {string} json JSON string to load.
 */
export const loadJSON = function (workspace: Blockly.Workspace, json: string) {
  // Don't emit events during loading.
  Blockly.Events.disable();
  eval("window.blockJSON = json;");
  Blockly.serialization.workspaces.load(JSON.parse(json), workspace, undefined);
  Blockly.Events.enable();
};