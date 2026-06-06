import { H3, H3Event } from "nitro/h3";
import { provideRequestEvent } from "solid-js/web/storage";

import { getServerFnById } from "tanstack:server-fn-manifest";

export default new H3().post("/_serverFn/:id", (e) => {
  return provideRequestEvent({ request: e.req, response: e.res, nativeEvent: e }, async () => {
    const id = e.context.params!.id;

    try {
      const fn = await getServerFnById(id);

      const body = await e.req.clone().json();
      if (!Array.isArray(body)) return new Response("Invalid body", { status: 400 });

      return Response.json(await fn(...body));
    } catch (e) {
      return e.message;
    }
  });
});

declare module "solid-js/web" {
  interface RequestEvent {
    nativeEvent: H3Event;
  }
}
