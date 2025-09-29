import type { IPluginContext } from "@tarojs/service";
import LaunchIDE, { Editor } from "launch-ide";
export interface IOptions {
    components?: Record<string, Record<string, string>>;
    editor?: Editor;
    openIn?: LaunchIDE.IDEOpenMethod;
    pathFormat?: string | string[];
    port?: number;
}
/**
 * 编译过程扩展
 */
declare const _default: (ctx: IPluginContext, options: IOptions) => void;
export default _default;
