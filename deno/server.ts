import {exists, parse, serve, serveFile} from './deps.ts';
import { handleWebsocketConnection } from "./session/session-handler.ts";

async function reqHandler(req: Request) {
  const appDistDir = parse(Deno.args).dist || "solid";
  const url = new URL(req.url);
  if (url.pathname.startsWith("/ws")) {
    const { socket, response } = Deno.upgradeWebSocket(req);
    try {
      handleWebsocketConnection(
        socket,
        url.searchParams.has("quickmatch"),
        url.searchParams.get("sessionId"),
      );
    } catch (error: any) {
      return new Response(error?.message, { status: 400 });
    }

    return response;
  }
  if (url.pathname !== '/' && await exists(`${Deno.cwd()}/${appDistDir}/${url.pathname}`)) {
    return serveFile(req, `${Deno.cwd()}/${appDistDir}/${url.pathname}`);
  }
  return serveFile(req, `${Deno.cwd()}/${appDistDir}/index.html`);
}

serve(reqHandler, { port: 42069 });
