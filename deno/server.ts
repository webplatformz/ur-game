import { serve } from "https://deno.land/std/http/mod.ts";
import { serveFile } from "https://deno.land/std@0.153.0/http/file_server.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

async function reqHandler(req) {
	const appDistDir = parse(Deno.args).dist || 'solid';
	const url = new URL(req.url);
	if (url.pathname.startsWith('/ws')) {
		const { socket: ws, response } = Deno.upgradeWebSocket(req);
		ws.onmessage = e => ws.send(`Deno says: «${e.data}»`);
		return response;
	}
	if (url.pathname.startsWith('/assets')) {
		return serveFile(req, `${Deno.cwd()}/${appDistDir}/${url.pathname}`);
	}
	return serveFile(req, `${Deno.cwd()}/${appDistDir}/index.html`);
}

serve(reqHandler, { port: 42069 });
