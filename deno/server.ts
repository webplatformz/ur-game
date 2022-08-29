import { parse, serve, serveFile } from "./deps.ts";

function reqHandler(req: Request) {
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
