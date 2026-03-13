import { BoardCardData } from "./board.data";

export interface BoardEvent {
    occurredAt: string;
    type: BoardEventType;
}

export enum BoardEventType {
    CardCreated = "CardCreated",
}

//

export interface CardCreatedEvent extends BoardEvent {
    type: BoardEventType.CardCreated;
    data: BoardCardData;
}