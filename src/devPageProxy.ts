import { port } from "./port";
import * as taroRuntime from "@tarojs/runtime";

declare let wx: any;

export default () => {
  const originCall = taroRuntime?.hooks?.call;
  Object.defineProperty(taroRuntime?.hooks, "call", {
    writable: true,
    enumerable: true,
    configurable: true,
    value: function (...args: any[]) {
      const argsArray = Array.from(args);
      const result = originCall.apply(this, argsArray);
      // 仅处理被没有被冒泡拦截的事件
      if (
        args[0] === "modifyDispatchEvent" &&
        args[1].mpEvent.type === "longpress"
      ) {
        const taroEvent = args[1];
        const { mpEvent } = taroEvent;
        const { opencode } = mpEvent?.currentTarget?.dataset || {};
        if (opencode) {
          const path = opencode;
          const [file, line, column] = path.split("_");
          wx.request({
            url: `http://localhost:${port}`,
            data: {
              file,
              line,
              column,
            },
            header: {
              "content-type": "application/json", // 默认值
            },
            success(_res: any) {
              // IDE opened successfully
            },
          });
        }
      }
      return result;
    },
  });
};
