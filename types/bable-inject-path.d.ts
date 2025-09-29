import type { PluginObj } from "@babel/core";
interface BabelAPI {
    types: typeof import("@babel/types");
}
export default function ({ types: t }: BabelAPI): PluginObj;
export {};
