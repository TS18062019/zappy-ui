import { v4 as uuidv4 } from "uuid";

export const getCredentials = async () => {
    const url = new URL("/zappy", window.location.href);
    url.port = '8080';
    url.searchParams.set('deviceId', uuidv4());
    const resp = await fetch(url, {
        method: "GET",
    }).then(resp => resp.json());
    return JSON.parse(resp);
}