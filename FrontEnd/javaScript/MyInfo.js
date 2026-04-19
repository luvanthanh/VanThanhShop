document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Vui lòng đăng nhập!");
        window.location.href = "LoginClient.html";
        return;
    }

    fetch(`http://localhost:8888/api/users/myInfo`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (!res.ok) {
            window.location.href = "LoginClient.html";
            throw new Error("Lỗi xác thực!");
        }
        return res.json();
    })
    .then(user => {

        const u = user.data;
        const userDiv = document.getElementById("user_info");

        userDiv.innerHTML = `
            <div class="profile-card">

                <h2>👤 Thông Tin Cá Nhân</h2>

                <div class="profile-grid">

                    <div class="field">
                        <label>ID</label>
                        <input type="text" value="${u.userId}" readonly>
                    </div>

                    <div class="field">
                        <label>Tên đăng nhập</label>
                        <input type="text" value="${u.userName}">
                    </div>

                    <div class="field">
                        <label>Họ</label>
                        <input type="text" value="${u.userFirstName}">
                    </div>

                    <div class="field">
                        <label>Tên</label>
                        <input type="text" value="${u.userLastName}">
                    </div>

                    <div class="field">
                        <label>Email</label>
                        <input type="text" value="${u.userEmail}">
                    </div>

                    <div class="field">
                        <label>Số điện thoại</label>
                        <input type="text" value="${u.userPhoneNumber}">
                    </div>

                    <div class="field full">
                        <label>Địa chỉ</label>
                        <input type="text" value="${u.userAddress}">
                    </div>

                </div>

                <div class="profile-actions">
                    <a href="UpdateUser.html" class="btn-update">
                        ✏️ Cập nhật thông tin
                    </a>
                </div>

            </div>
        `;
    })
    .catch(err => {
        console.error(err);
        document.getElementById("user_info").innerHTML =
            "<p class='error'>Không tải được thông tin</p>";
    });

});