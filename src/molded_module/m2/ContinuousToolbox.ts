/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Toolbox that uses a continuous scrolling flyout.
 */

import * as Blockly from 'blockly/core';
import {ContinuousFlyout} from './ContinuousFlyout';

/**
 * Class for continuous toolbox.
 */
export class ContinuousToolbox extends Blockly.Toolbox {
  /** @override */
  constructor(workspace: Blockly.WorkspaceSvg) {
    super(workspace);
  }

  /** @override */
  init() {
    super.init();

    // Populate the flyout with all blocks and show it immediately.
    const flyout: ContinuousFlyout = this.getFlyout();
    if (flyout === null) {
      throw new Error('Flyout was not created.');
    }
    flyout.show(this.getInitialFlyoutContents_());
    (flyout as ContinuousFlyout).recordScrollPositions();

    this.workspace_.addChangeListener((e) => {
      if (
        e.type === Blockly.Events.BLOCK_CREATE ||
        e.type === Blockly.Events.BLOCK_DELETE
      ) {
        this.refreshSelection();
      }
    });
  }

  /** @override */
  getFlyout(): ContinuousFlyout {
    return /** @type {ContinuousFlyout} */ (super.getFlyout()) as ContinuousFlyout;
  }

  /**
   * Gets the contents that should be shown in the flyout immediately.
   * This includes all blocks and labels for each category of block.
   * @returns {!Blockly.utils.toolbox.FlyoutItemInfoArray} Flyout contents.
   * @private
   */
  getInitialFlyoutContents_(): Blockly.utils.toolbox.FlyoutItemInfoArray {
    /** @type {!Blockly.utils.toolbox.FlyoutItemInfoArray} */
    let contents: Blockly.utils.toolbox.FlyoutItemInfoArray = [];
    for (const toolboxItem of this.contents_) {
      if (toolboxItem instanceof Blockly.ToolboxCategory) {
        // Create a label node to go at the top of the category
        contents.push({kind: 'LABEL', text: toolboxItem.getName()});
        /**
         * @type {string|Blockly.utils.toolbox.FlyoutItemInfoArray|
         *    Blockly.utils.toolbox.FlyoutItemInfo}
         */
        let itemContents: string|Blockly.utils.toolbox.FlyoutItemInfoArray|
        Blockly.utils.toolbox.FlyoutItemInfo = toolboxItem.getContents();

        // Handle custom categories (e.g. variables and functions)
        if (typeof itemContents === 'string') {
          itemContents =
            /** @type {!Blockly.utils.toolbox.DynamicCategoryInfo} */ ({
              custom: itemContents,
              kind: 'CATEGORY',
            });
        }

        if (Array.isArray(itemContents)) {
          contents = contents.concat(itemContents);
        }
      }
    }
    return contents;
  }

  /** @override */
  refreshSelection() {
    this.getFlyout()!.show(this.getInitialFlyoutContents_());
  }

  /** @override */
  updateFlyout_(_oldItem: Blockly.ISelectableToolboxItem, newItem: Blockly.ISelectableToolboxItem) {
    if (newItem) {
      const target = this.getFlyout()!.getCategoryScrollPosition(
        newItem.getName(),
      ).y;
      this.getFlyout()!.scrollTo(target);
    }
  }

  /** @override */
  shouldDeselectItem_(oldItem: Blockly.ISelectableToolboxItem, newItem: Blockly.ISelectableToolboxItem) {
    // Should not deselect if the same category is clicked again.
    return oldItem && oldItem !== newItem;
  }

  /**
   * Gets a category by name.
   * @param {string} name Name of category to get.
   * @returns {?Blockly.ToolboxCategory} Category, or null if not
   *    found.
   * @package
   */
  getCategoryByName(name: string): Blockly.ToolboxCategory | null {
    const category = this.contents_.find(
      (item) =>
        item instanceof Blockly.ToolboxCategory &&
        item.isSelectable() &&
        name === item.getName(),
    );
    if (category) {
      return /** @type {!Blockly.ToolboxCategory} */ (category as Blockly.ToolboxCategory);
    }
    return null;
  }

  /**
   * Selects the category with the given name.
   * Similar to setSelectedItem, but importantly, does not call updateFlyout
   * because this is called while the flyout is being scrolled.
   * @param {string} name Name of category to select.
   * @package
   */
  selectCategoryByName(name: string) {
    const newItem = this.getCategoryByName(name) as Blockly.ISelectableToolboxItem;
    if (!newItem) {
      return;
    }
    const oldItem = this.selectedItem_;

    if (this.shouldDeselectItem_(oldItem!, newItem)) {
      this.deselectItem_(oldItem!);
    }

    if (this.shouldSelectItem_(oldItem, newItem)) {
      this.selectItem_(oldItem, newItem);
    }
  }

  /** @override */
  getClientRect() {
    // If the flyout never closes, it should be the deletable area.
    const flyout = this.getFlyout();
    if (flyout && !flyout.autoClose) {
      return flyout.getClientRect();
    }
    return super.getClientRect();
  }
}

Blockly.Css.register(`
.categoryBubble {
  margin: 0 auto 0.125rem;
  border-radius: 100%;
  border: 1px solid;
  width: 1.25rem;
  height: 1.25rem;
}
.blocklyTreeRow {
  height: initial;
  padding: 3px 0;
}
.blocklyTreeRowContentContainer {
  display: flex;
  flex-direction: column;
}
.blocklyTreeLabel {
  margin: auto;
}
`);
