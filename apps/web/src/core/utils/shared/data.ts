import { Identifier, ClientId, ServerId, DataIdentifier } from "@/src/core/types/shared/data";

export function createIdentifier(id?: Partial<Identifier>): Identifier {
    return {
        client: id?.client ?? createClientId(),
    };
}

export function createDataIdentifier(id?: Partial<DataIdentifier>): DataIdentifier {
    return {
        client: id?.client ?? createClientId(),
        server: id?.server ?? null
    };
}

export function createClientId(): ClientId {
    return crypto.randomUUID() as ClientId;
}

export function ensureClientId(id: string): ClientId {
    return id as ClientId;
}

export function ensureServerId(id: string): ServerId {
    return id as ServerId;
}