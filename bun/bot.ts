import { GameContext, PlayerColor } from "../shared/models/game-context.model";
import { ClientWebsocketMessages, ServerWebsocketMessages } from "../shared/models/message-types.model";

export class Bot {
    private ws: WebSocket;
    private ctx: GameContext;
    private sessionId: string;
    private color: PlayerColor;

    constructor(socket: WebSocket) {
        this.ws = socket;
        this.ws.onopen = () => this.setupListeners();
    }

    private setupListeners() {
        this.ws.onerror = e => console.log('err', e);
        this.ws.onmessage = event => this.handleMessage(JSON.parse(event.data));
    }

    private handleMessage(message: ServerWebsocketMessages) {
        switch (message.type) {
            case "gamesession":
                this.sessionId = message.sessionId
                this.color = message.playerColor;
                break;
            case "gamecontext":
                this.ctx = message;
                this.act();
                break;
        }
    }

    private act() {
        if (this.ctx.currentPlayer !== this.color) {
            return;
        }
        if (this.ctx.state === 'roll') {
            this.send({ type: 'roll' });
        }
        if (this.ctx.state === 'move') {
            if (this.ctx.currentValidTargets.length > 0) {
                this.send({ type: 'move', targetIdx: this.ctx.currentValidTargets[0] });
            }
        }
    }

    private send(msg: ClientWebsocketMessages) {
        console.log('Irving sends his regards:', msg.type);
        this.ws.send(JSON.stringify(msg));
    }
}