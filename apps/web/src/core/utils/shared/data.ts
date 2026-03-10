import { Identifier, ClientId, ServerId, DataIdentifier } from "@/src/core/types/shared/data";

export function createIdentifier(serverId: ServerId | null = null): Identifier {
    return {
        client: createClientId(),
    };
}

export function createDataIdentifier(serverId: ServerId | null = null): DataIdentifier {
    return {
        client: createClientId(),
        server: serverId
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