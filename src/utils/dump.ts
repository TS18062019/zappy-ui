const map = new Map();

export const dumpThis = (key: string, value: any) => {
    map.set(key, value);
}

export const getFromDump = (key: string) => {
    return map.get(key);
}