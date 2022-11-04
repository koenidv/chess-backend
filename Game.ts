import { Board } from "./Board.ts";
import { BoardPosition } from "./BoardPosition.ts";
import { ExtendedWs } from "./ExtendedWs.ts";

export class Game {
  hostId: string;
  hostWs: ExtendedWs;
  attendeeId: string | undefined;
  attendeeWs: ExtendedWs | undefined;
  board: Board = new Board();

  constructor(hostId: string, hostWs: ExtendedWs) {
    this.hostId = hostId;
    this.hostWs = hostWs;
  }

  sendMatchedInfo() {
    const msg = JSON.stringify({
      "type": "matched",
      "fen": this.board.toFEN() + " w",
    });
    this.hostWs.send(msg);
    this.attendeeWs!.send(msg);
  }

  validateCorrectPlayerMoved(from: BoardPosition, id: string): boolean {
    // Host is always black
    const shouldBeWhite = id === this.attendeeId;
    const pieceIsWhite = this.board.get(from)?.isWhite;
    return shouldBeWhite === pieceIsWhite;
  }

  validateMove(from: BoardPosition, to: BoardPosition) {
    return this.board.validateMove(from, to);
  }

  makeMove(playerId: string, from: BoardPosition, to: BoardPosition) {
    // Apply change locally
    this.board.move(from, to);
    // Relay move to other player
    const otherPlayerWs = this.hostId === playerId
      ? this.attendeeWs
      : this.hostWs;
    otherPlayerWs!.send(JSON.stringify({
      "type": "receive-move",
      "from": from.toString(),
      "to": to.toString(),
    }));
  }
}
