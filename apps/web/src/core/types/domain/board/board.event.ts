export type BoardEvent = {
    occurredAt: string;
    type: BoardEventType;
}

export enum BoardEventType {
    CardCreated = "CardCreated",
}