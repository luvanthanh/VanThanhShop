function userPage() {
    const page = document.getElementById("content-right-page");
    const token = localStorage.getItem("adminToken");

    page.innerHTML = "<p>Đang tải danh sách người dùng...</p>";

    fetch("http://localhost:8888/api/users", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
    })
    .then(result => {
        const users = result.data; // 🔥 QUAN TRỌNG

        let html = `
            <h2>Danh sách người dùng</h2>
            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
        `;

        users.forEach(user => {
            html += `
                <tr>
                    <td>${user.userId}</td>
                    <td>${user.userName}</td>
                    <td>${user.userEmail}</td>
                    <td>
                        <button onclick="deleteUser(${user.userId})">Xóa</button>
                    </td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        page.innerHTML = html;
    })
    .catch(err => {
        console.error(err);
        page.innerHTML = "<p>Lỗi khi lấy danh sách người dùng</p>";
    });
}

function deleteUser(userId) {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        alert("Bạn chưa đăng nhập admin!");
        window.location.href = "LoginAdmin.html";
        return;
    }

    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

    fetch(`http://localhost:8888/api/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => {
        if (res.status === 401 || res.status === 403) {
            throw new Error("UNAUTHORIZED");
        }
        if (!res.ok) throw new Error("Xóa thất bại");
        // reload danh sách sau khi xóa
        userPage();
    })
    .catch(err => {
        if (err.message === "UNAUTHORIZED") {
            alert("Phiên đăng nhập admin đã hết hạn!");
            localStorage.removeItem("adminToken");
            window.location.href = "LoginAdmin.html";
        } else {
            alert("Lỗi khi xóa người dùng");
            console.error(err);
        }
    });
}
var a = "hello";

