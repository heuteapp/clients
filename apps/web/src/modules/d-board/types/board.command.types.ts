export interface BoardCommand {
    occurredAt: string;
    type: BoardCommandType;
    payload: object;
}

export enum BoardCommandType {
    CreateCard = "CreateCard",
    DeleteCard = "DeleteCard",
}

//

export interface CreateCardCommand extends BoardCommand {
    occurredAt: string;
    type: BoardCommandType.CreateCard;
    payload: CreateCardPayload;
}

export interface CreateCardPayload {
    definition: {
        name: string;
        title?: string;
        gridName?: string;
        colIndex?: number;
        rowIndex?: number;
        colSpan?: number;
        rowSpan?: number;
    }
}

export interface DeleteCardCommand extends BoardCommand {
    occurredAt: string;
    type: BoardCommandType.DeleteCard;
    payload: DeleteCardPayload;
}

export interface DeleteCardPayload {
    key: { name: string };
}