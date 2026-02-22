export abstract class BaseSession {
    #isActive = false;

    public get isActive(): boolean {
        return this.#isActive;
    }

    start() {
        if (this.#isActive) {
            throw new Error('Session is already active')
        }

        this.#isActive = true
        this.onStart()
    }

    dispose() {
        if (!this.#isActive) {
            throw new Error('Session is not active')
        }

        this.onDispose()
        this.#isActive = false
    }

    protected abstract onStart(): void
    protected abstract onDispose(): void
}

export default BaseSession;