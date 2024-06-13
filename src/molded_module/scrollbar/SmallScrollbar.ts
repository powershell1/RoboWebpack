import { Scrollbar, WorkspaceSvg } from "blockly";

class SmallScrollBar extends Scrollbar {
    constructor(workspace: WorkspaceSvg, horizontal: boolean, opt_pair?: boolean, opt_class?: string, opt_margin?: number) {
        super(workspace, horizontal, opt_pair, opt_class, opt_margin);
    }


}