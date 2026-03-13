export interface BoardEvent {
    occurredAt: string;
    type: BoardEventType;
    payload: object;
}

export enum BoardEventType {
    CardCreated = "CardCreated",
}

//

export interface CardCreatedEvent extends BoardEvent {
    occurredAt: string;
    type: BoardEventType.CardCreated;
    payload: CardCreatedPayload;
}

export interface CardCreatedPayload {
    name: string;
    title?: string;
    sectionName?: string;
    colIndex?: number;
    rowIndex?: number;
    colSpan?: number;
    rowSpan?: number;
}