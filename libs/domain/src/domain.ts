import { HeuteBoard } from "./board";

export class HeuteDomain {
    #dayboard : HeuteBoard | null;

    constructor() {
        this.#dayboard = null;
    }

    public get dayboard(): HeuteBoard | null {
        return this.#dayboard;
    }
}

export default HeuteDomain;