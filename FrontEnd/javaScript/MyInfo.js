document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userDiv = document.getElementById("user_info");

    if (!token || !userId) {
        alert("Vui lòng đăng nhập!");
        window.location.href = "LoginClient.html";
        return;
    }

    const setFieldsEditable = editable => {
        ["userName", "firstName", "lastName", "email", "phone", "address"].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                if (editable) {
                    input.removeAttribute("readonly");
                } else {
                    input.setAttribute("readonly", "readonly");
                }
            }
        });
    };

    const renderProfile = u => {
        userDiv.innerHTML = `
            <div class="profile-card">
                <h2>👤 Thông Tin Cá Nhân</h2>
                <div class="profile-grid">
                    <div class="field">
                        <label>ID</label>
                        <input type="text" value="${u.userId || ''}" readonly>
                    </div>
                    <div class="field">
                        <label>Tên đăng nhập</label>
                        <input id="userName" type="text" value="${u.userName || ''}" readonly>
                    </div>
                    <div class="field">
                        <label>Họ</label>
                        <input id="firstName" type="text" value="${u.userFirstName || ''}" readonly>
                    </div>
                    <div class="field">
                        <label>Tên</label>
                        <input id="lastName" type="text" value="${u.userLastName || ''}" readonly>
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input id="email" type="text" value="${u.userEmail || ''}" readonly>
                    </div>
                    <div class="field">
                        <label>Số điện thoại</label>
                        <input id="phone" type="text" value="${u.userPhoneNumber || ''}" readonly>
                    </div>
                    <div class="field full">
                        <label>Địa chỉ</label>
                        <input id="address" type="text" value="${u.userAddress || ''}" readonly>
                    </div>
                </div>
                <div class="profile-actions">
                    <button class="btn-update" id="editBtn">✏️ Cập nhật thông tin</button>
                    <button class="btn-update" id="saveBtn" style="display:none;">💾 Lưu thông tin</button>
                </div>
            </div>
        `;

        document.getElementById("editBtn").addEventListener("click", () => {
            setFieldsEditable(true);
            document.getElementById("saveBtn").style.display = "inline-block";
        });

        document.getElementById("saveBtn").addEventListener("click", () => {
            const updateData = {
                userName: document.getElementById("userName").value,
                userFirstName: document.getElementById("firstName").value,
                userLastName: document.getElementById("lastName").value,
                userEmail: document.getElementById("email").value,
                userPhoneNumber: document.getElementById("phone").value,
                userAddress: document.getElementById("address").value
            };

            fetch(`http://localhost:8888/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Cập nhật thất bại");
                    }
                    return res.json();
                })
                .then(() => {
                    alert("Cập nhật thành công!");
                    location.reload();
                })
                .catch(err => {
                    console.error(err);
                    alert("Có lỗi xảy ra!");
                });
        });
    };

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
            renderProfile(user.data || {});
        })
        .catch(err => {
            console.error(err);
            if (userDiv) {
                userDiv.innerHTML = "<p class='error'>Không tải được thông tin</p>";
            }
        });
});