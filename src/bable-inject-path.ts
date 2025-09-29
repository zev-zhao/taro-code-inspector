// babel-plugins/inject-filename.ts
import type { PluginObj } from "@babel/core";
import type { NodePath } from "@babel/traverse";
import type { JSXOpeningElement } from "@babel/types";
import { openCodeComponentsMap } from "./config";

interface BabelAPI {
  types: typeof import("@babel/types");
}

export default function ({ types: t }: BabelAPI): PluginObj {
  return {
    visitor: {
      JSXOpeningElement(path: NodePath<JSXOpeningElement>) {
        try {
          // 处理可能为 undefined 的文件路径
          const filename = path.hub?.file?.opts?.filename;
          if (!filename) return;

          // 路径处理逻辑
          let filePath = filename;
          const srcIndex = filename.indexOf("/src/");
          if (srcIndex > -1) {
            filePath = filename.substring(srcIndex + 1);
          }

          // 类型断言确保 JSXIdentifier 类型
          const componentName =
            (path.node.name.type === "JSXIdentifier" && path.node.name.name) ||
            "";
          if (!openCodeComponentsMap.includes(componentName)) return;

          // 检查现有属性
          const hoverClass = path.node.attributes.some(
            (attr) =>
              attr.type === "JSXAttribute" && attr.name.name === "hover-class",
          );

          // 检查现有属性
          const hasOnLongClick = path.node.attributes.some(
            (attr) =>
              attr.type === "JSXAttribute" && attr.name.name === "onLongPress",
          );

          const hasDataContent = path.node.attributes.some(
            (attr) =>
              attr.type === "JSXAttribute" && attr.name.name === "dataOpenCode",
          );

          // 添加缺失属性
          if (!hasOnLongClick) {
            // 注入阻止冒泡的 onLongPress 处理函数
            const newAttribute = t.jsxAttribute(
              t.jsxIdentifier("onLongPress"),
              t.jsxExpressionContainer(
                t.arrowFunctionExpression(
                  [t.identifier("e")],
                  t.blockStatement([
                    t.expressionStatement(
                      t.callExpression(
                        t.memberExpression(
                          t.identifier("e"),
                          t.identifier("stopPropagation"),
                        ),
                        [],
                      ),
                    ),
                  ]),
                ),
              ),
            );
            path.node.attributes.push(newAttribute);
          }
          if (!hoverClass) {
            const classAttribute = t.jsxAttribute(
              t.jsxIdentifier("hover-class"),
              t.stringLiteral("global_open_code_hover"),
            );
            const classStopAttribute = t.jsxAttribute(
              t.jsxIdentifier("hover-stop-propagation"),
              t.stringLiteral("true"),
            );
            path.node.attributes.push(classAttribute);
            path.node.attributes.push(classStopAttribute);
          }

          if (!hasDataContent) {
            const loc = path.node.loc;
            let pos = "";
            if (loc?.start) {
              pos = `${loc.start.line}_${loc.start.column}`;
            }

            const nameAttribute = t.jsxAttribute(
              t.jsxIdentifier("dataOpenCode"),
              t.stringLiteral(`${filePath}_${pos}`),
            );
            path.node.attributes.push(nameAttribute);
          }
        } catch (e) {
          console.error(
            "[Babel Plugin Error]",
            e instanceof Error ? e.message : String(e),
          );
        }
      },
    },
  };
}
