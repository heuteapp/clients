import { Identifier, ClientId, ServerId } from "@/src/core/types/shared/data";

export function createIdentifier(serverId: ServerId | null = null): Identifier {
    return {
        client: createClientId(),
        server: serverId
    };
}

export function createClientId(): ClientId {
    return (`temp-${crypto.randomUUID()}`) as ClientId;
}

export function isClientId(id: string): id is ClientId {
    return id.startsWith("temp-");
}

export function isServerId(id: string): id is ServerId {
    return !isClientId(id);
}