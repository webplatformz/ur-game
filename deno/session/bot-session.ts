import { GameContext } from "../shared/models/game-context.model.ts";
import {
  ClientWebsocketMessages,
  ServerWebsocketMessages,
} from "../shared/models/message-types.model.ts";
import { PlayerSession } from "./player-session.ts";

export class BotPlayerSession implements PlayerSession {
  public connected = true;

  private ctx: GameContext | undefined;

  private readonly THINKING_TIME = 3000;

  async on(
    type: ClientWebsocketMessages["type"],
  ): Promise<ClientWebsocketMessages> {
    if (type === "roll") {
      return new Promise((r) => r({ type: "roll" }));
    }
    if (type === "move") {
      if (this.ctx!.currentValidTargets.length > 0) {
        await this.think();
        return new Promise((r) =>
          r({
            type: "move",
            targetIdx: this.ctx!
              .currentValidTargets[this.ctx!.currentValidTargets.length - 1],
          })
        );
      }
    }
    return new Promise(() => {});
  }

  send(message: ServerWebsocketMessages): void {
    if (message.type === "gamecontext") {
      this.ctx = { ...message };
    }
  }

  close(): void {
    this.ctx = undefined;
  }

  set onClose(fn: (closeEvent: CloseEvent) => void) {
    return;
  }

  set onOpen(fn: () => void) {
    fn();
  }
  private think(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.THINKING_TIME));
  }
}
