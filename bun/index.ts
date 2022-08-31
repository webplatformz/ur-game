import { Bot } from "./bot";

const bots = [];

export default {
    port: 9001,
    fetch(req: Request) {
        const params = new URL(req.url).searchParams;
        const sessionId = params.get('sessionId');
        const wsUrl = params.get('wsUrl');
        if (req.method === 'GET' && sessionId && wsUrl) {
            const webSocketURL = new URL(wsUrl);
            webSocketURL.searchParams.append('sessionId', sessionId);
            const socket = new WebSocket(webSocketURL);
            bots.push(new Bot(socket));
            return new Response('Hello, this is URving Finkelbot. I am a bun bot for the game of Ur. Pass me the url to the websocket server as "wsUrl" and the session id as "sessionId" as search params.');
        }
    }
}
