import HeuteBoard from "./board";

export default class {
    #dayboard : HeuteBoard;

    constructor() {
        this.#dayboard = new HeuteBoard();
    }

    public get dayboard(): HeuteBoard {
        return this.#dayboard;
    }
}