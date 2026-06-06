// vite.config.ts
import { TanStackServerFnPlugin } from "@tanstack/server-functions-plugin";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    ...TanStackServerFnPlugin({
      manifestVirtualImportId: "tanstack:server-fn-manifest",
      directive: "use server",
      callers: [
        {
          envConsumer: "client",
          envName: "client",
          getRuntimeCode: () => `import { createClientRpc } from './client'`,
          replacer: (d) => `createClientRpc('${d.functionId}')`,
        },
      ],
      provider: {
        envName: "nitro",
        getRuntimeCode: () => `import { createServerRpc } from './server-rpc'`,
        replacer: (d) => `createServerRpc('${d.functionId}', ${d.fn})`,
      },
    }),
    solidPlugin(),

    nitro(),
  ],
});
