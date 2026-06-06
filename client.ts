export const createClientRpc = (id: string) => {
  return (...args: unknown[]) =>
    fetch(`/_serverFn/${id}`, { body: JSON.stringify(args), method: "POST" }).then((r) => r.json());
};
