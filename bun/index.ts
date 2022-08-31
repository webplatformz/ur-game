import { Bot } from "./bot";

let bots: Bot[] = [];

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
            const bot = new Bot(socket);
            bots.push(bot);
            socket.onclose = () => bots = bots.filter(b => b.sessionId !== bot.sessionId);
            return new Response('Hello, this is URving Finkelbot.\nI am a bun bot for the game of Ur. Pass me the url to the websocket server as "wsUrl" and the session id as "sessionId" as search params.');
        }
    }
}
