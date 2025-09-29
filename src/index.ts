import type { IPluginContext, TaroPlatformBase } from "@tarojs/service";
import { isArray, isString } from "@tarojs/shared";
import * as path from "node:path";
import * as http from "node:http";
import { getPort } from "portfinder";
import childProcess from "child_process";
import LaunchIDE, { Editor, launchIDE } from "launch-ide";
import { defaultComponents } from "./config";

const DefaultPort = 5678;

function injectRuntimePath(platform: TaroPlatformBase) {
  const injectedPath = `taro-code-inspector/dist/runtime`;
  if (isArray(platform.runtimePath)) {
    platform.runtimePath.push(injectedPath);
  } else if (isString(platform.runtimePath)) {
    platform.runtimePath = [platform.runtimePath, injectedPath];
  }
}

function injectComponents(fs: any, components: any) {
  fs.writeFileSync(
    path.resolve(__dirname, "../dist/components.js"),
    `
export const components = ${
      components ? JSON.stringify(components) : JSON.stringify({})
    };
`,
  );
}

function injectPort(fs: any, port: number) {
  fs.writeFileSync(
    path.resolve(__dirname, "../dist/port.js"),
    `
export const port = ${port};
`,
  );
}

// 获取项目 git 根目录
function getProjectRoot() {
  try {
    const command = "git rev-parse --show-toplevel";
    const gitRoot = childProcess
      .execSync(command, {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      })
      .trim();
    return gitRoot;
  } catch (error) {
    return "";
  }
}
// 项目根目录
const ProjectRootPath = getProjectRoot();

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
export default (ctx: IPluginContext, options: IOptions) => {
  const { components = defaultComponents } = options;
  const fs = ctx.helper.fs;

  ctx.onBuildStart(() => {
    const server = http.createServer((req, res) => {
      // 收到请求唤醒vscode
      const params = new URLSearchParams(req?.url?.slice(1));

      let file = decodeURIComponent(params.get("file") || "");
      if (ProjectRootPath && !path.isAbsolute(file)) {
        file = `${ProjectRootPath}/${file}`;
      }
      const line = Number(params.get("line"));
      const column = Number(params.get("column"));
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Private-Network": "true",
      });
      res.end("ok");
      // 打开 IDE
      launchIDE({
        file,
        line,
        column,
        editor: options?.editor,
        method: options?.openIn,
        format: options?.pathFormat,
      });
    });
    // 寻找可用接口
    getPort({ port: options?.port ?? DefaultPort }, (err, port) => {
      if (err) {
        throw err;
      }
      server.listen(port, () => {
        injectPort(fs, port);
      });
    });
  });

  ctx.registerMethod({
    name: "onSetupClose",
    fn(platform: TaroPlatformBase) {
      const template = platform.template;
      if (!template) return;

      injectRuntimePath(platform);
      template.mergeComponents(ctx, components);
      injectComponents(fs, components);
    },
  });
};
