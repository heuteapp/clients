export interface DailyboardCommand {
    occurredAt: string;
    type: DailyboardCommandType;
    payload: object;
}

export enum DailyboardCommandType {
    CreateCard = "CreateCard",
    DeleteCard = "DeleteCard",
}

//

export interface CreateCardCommand extends DailyboardCommand {
    occurredAt: string;
    type: DailyboardCommandType.CreateCard;
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

export interface DeleteCardCommand extends DailyboardCommand {
    occurredAt: string;
    type: DailyboardCommandType.DeleteCard;
    payload: DeleteCardPayload;
}

export interface DeleteCardPayload {
    key: { name: string };
}