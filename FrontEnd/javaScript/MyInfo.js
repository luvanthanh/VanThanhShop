document.addEventListener("DOMContentLoaded", () => {// token lưu sau khi đăng nhập
    const token = localStorage.getItem("token");

    if (!token) {
    alert("Vui lòng đăng nhập để xem thông tin!");
    window.location.href = "LoginClient.html";
    return;
    }

    fetch(`http://localhost:8888/api/users/myInfo`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`, // Gửi token xác thực
        "Content-Type": "application/json"
    }
    })
    .then(res => {
        if (!res.ok){
            window.location.href = "LoginClient.html";
            throw new Error("Không tìm thấy thông tin người dùng hoặc lỗi xác thực.vui lòng đăng nhập lại.");
        }
        
        return res.json();
    })
    .then(user => {
        console.log("Dữ liệu trả về từ API:", user);
        const userDiv = document.getElementById("user_info");
        userDiv.innerHTML = `
            <div class="user-detail">
                <h2>Thông Tin Người Dùng</h2>
                <table>
                    <tr>
                        <td>ID Người Dùng</td>
                        <td> <input type="text" id="userId" value="${user.data.userId}" readonly ></td>
                    </tr>
                    <tr>
                        <td>Tên Đăng Nhập</td>
                        <td> <input type="text" id="userName" value="${user.data.userName}"> </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td> <input type="text" id="userPassword" value="*********"></td>
                    </tr>
                    
                    <tr>
                        <td>Họ</td>
                        <td> <input type="text" id="userFirstName" value="${user.data.userFirstName}"></td>
                    </tr>
                    <tr>
                        <td>Tên</td>
                        <td> <input type="text" id="userLastName" value="${user.data.userLastName}"</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="text" id="userEmail" value="${user.data.userEmail}"</td>
                    </tr>
                    <tr>
                        <td>Số Điện Thoại</td>
                        <td><input type="text" id="userPhoneNumber" value="${user.data.userPhoneNumber}"</td>
                    </tr>
                    <tr>
                        <td>Địa Chỉ</td>
                        <td><input type="text" id="userAddess" value="${user.data.userAddress}"</td>
                    </tr>
                </table>
            </div>

            <div>
                <div class="button-update"> <a href="UpdateUser.html"> Cập Nhật Thông Tin Cá Nhân</a></div>
            </div>
        `;
    })
    .catch(error => {
        alert("Lỗi khi tải thông tin người dùng: " + error.message);
        console.error("Lỗi khi load dữ liệu từ API:", error);
    });
});
