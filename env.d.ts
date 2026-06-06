declare module "tanstack:server-fn-manifest" {
  export function getServerFnById(id: string): Promise<Function>;
}
