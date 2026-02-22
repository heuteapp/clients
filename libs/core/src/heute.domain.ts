import { HeuteBoard } from "./heute.board";

export class HeuteDomain {
    #dayboard : HeuteBoard;

    constructor() {
        this.#dayboard = new HeuteBoard();
    }

    public get dayboard(): HeuteBoard {
        return this.#dayboard;
    }
}

export default HeuteDomain;