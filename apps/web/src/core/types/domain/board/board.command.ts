export interface BoardCommand {
    occurredAt: string;
    type: BoardCommandType;
    payload: object;
}

export enum BoardCommandType {
    CardCreated = "CardCreated",
}

//

export interface CreateCardCommand extends BoardCommand {
    occurredAt: string;
    type: BoardCommandType.CardCreated;
    payload: CardCreatedPayload;
}

export interface CardCreatedPayload {
    definition: {
        name: string;
        title?: string;
        sectionName?: string;
        colIndex?: number;
        rowIndex?: number;
        colSpan?: number;
        rowSpan?: number;
    }
}