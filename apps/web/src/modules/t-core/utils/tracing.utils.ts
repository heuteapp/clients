import { TracingDomainData, TracingItemFilter } from "../types/tracing.types";

export const createSelector = (data: TracingDomainData) => {
    const uniqueItem = (type: string) => {
        const items = Array.from(data.items.values()).filter(item => item.type === type);
        return items.length > 0 ? items[0] : null;
    }

    const itemById = (type: string, id: string) => {
        const key = `${type}-${id}`;
        return data.items.get(key) || null;
    }

    const items = (filter?: TracingItemFilter) => {
        const items = Array.from(data.items.values());
        return filter ? items.filter(filter) : items;
    }

    const itemsByType = (type: string, filter?: TracingItemFilter) => {
        const items = Array.from(data.items.values()).filter(item => item.type === type);
        return filter ? items.filter(filter) : items;
    }

    const uniqueRef = (type: string) => {
        const item = uniqueItem(type);
        return item ? item.ref : null;
    }

    const refById = (type: string, id: string) => {
        const item = itemById(type, id);
        return item ? item.ref : null;
    }

    const refs = (filter?: TracingItemFilter) => {
        const items = Array.from(data.items.values());
        return filter ? items.filter(filter).map(item => item.ref) : items.map(item => item.ref);
    }

    const refsByType = (type: string, filter?: TracingItemFilter) => {
        const items = Array.from(data.items.values()).filter(item => item.type === type);
        return filter ? items.filter(filter).map(item => item.ref) : items.map(item => item.ref);
    }

    const uniqueData = (type: string) => {
        const item = uniqueItem(type);
        return item ? item.data : null;
    }

    const dataById = (type: string, id: string) => {
        const item = itemById(type, id);
        return item ? item.data : null;
    }

    const datas = (filter?: TracingItemFilter) => {
        const items = Array.from(data.items.values());
        return filter ? items.filter(filter).map(item => item.data) : items.map(item => item.data);
    }

    const datasByType = (type: string, filter?: TracingItemFilter) => {
        const items = Array.from(data.items.values()).filter(item => item.type === type);
        return filter ? items.filter(filter).map(item => item.data) : items.map(item => item.data);
    }

    return { 
        uniqueItem, 
        itemById, 
        items, 
        itemsByType,

        uniqueRef,
        refById,
        refs,
        refsByType,

        uniqueData,
        dataById,
        datas,
        datasByType
    };
}