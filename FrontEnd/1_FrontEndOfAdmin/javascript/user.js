import { api } from "./api.js";

export async function loadUsers(token) {
    const content = document.getElementById("content");
    const data = await api.get("/users", token);

    content.innerHTML = data.data.map(u => `
        <div>
            ${u.userName}
            <button onclick="deleteUser(${u.userId})">Xóa</button>
        </div>
    `).join("");

    window.deleteUser = async (id) => {
        await api.delete(`/users/${id}`, token);
        loadUsers(token);
    };
}