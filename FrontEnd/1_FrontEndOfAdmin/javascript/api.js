const BASE = "http://localhost:8888/api";

export const api = {
    get: (url, token) =>
        fetch(BASE + url, {
            headers: token ? { Authorization: "Bearer " + token } : {}
        }).then(r => r.json()),

    delete: (url, token) =>
        fetch(BASE + url, {
            method: "DELETE",
            headers: token ? { Authorization: "Bearer " + token } : {}
        })
};