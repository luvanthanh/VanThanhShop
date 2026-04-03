function register() {
    // Lấy dữ liệu từ input
    const userName = document.getElementById("userName").value.trim();
    const userPassword = document.getElementById("userPassword").value;
    const userLastName = document.getElementById("userLastName").value.trim();
    const userFirstName = document.getElementById("userFirstName").value.trim();
    const userAddress = document.getElementById("userAddress").value.trim();
    const userEmail = document.getElementById("userEmail").value.trim();
    const userPhoneNumber = document.getElementById("userPhoneNumber").value.trim();

    // Kiểm tra các trường bắt buộc
    if (!userName || !userPassword || !userLastName || !userFirstName || !userAddress || !userEmail) {
        alert("Vui lòng điền đầy đủ các trường bắt buộc!");
        return;
    }

    // Tạo object gửi lên server
    const data = {
        userName,
        userPassword,
        userLastName,
        userFirstName,
        userAddress,
        userEmail,
        userPhoneNumber
    };

    // Gửi POST request
    fetch("http://localhost:8888/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text || "Đăng ký thất bại"); });
        }
        return response.json();
    })
    .then(result => {
        console.log("Phản hồi từ server:", result);
        alert("Đăng ký thành công!");
        // Xóa dữ liệu form sau khi đăng ký
        document.getElementById("userName").value = "";
        document.getElementById("userPassword").value = "";
        document.getElementById("userLastName").value = "";
        document.getElementById("userFirstName").value = "";
        document.getElementById("userAddress").value = "";
        document.getElementById("userEmail").value = "";
        document.getElementById("userPhoneNumber").value = "";
        window.location.href="LoginClient.html";
    })
    .catch(err => {
        console.error(err);
        alert("Lỗi: " + err.message);
    });
}
