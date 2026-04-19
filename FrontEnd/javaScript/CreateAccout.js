document.getElementById("register_button").addEventListener("click", register);

async function register() {
    const btn = document.getElementById("register_button");
    btn.classList.add("loading");
    btn.innerText = "Đang xử lý...";

    const data = {
        userName: document.getElementById("userName").value.trim(),
        userPassword: document.getElementById("userPassword").value,
        userLastName: document.getElementById("userLastName").value.trim(),
        userFirstName: document.getElementById("userFirstName").value.trim(),
        userAddress: document.getElementById("userAddress").value.trim(),
        userEmail: document.getElementById("userEmail").value.trim(),
        userPhoneNumber: document.getElementById("userPhoneNumber").value.trim()
    };

    // validate
    if (!data.userName || !data.userPassword || !data.userLastName || !data.userFirstName || !data.userAddress || !data.userEmail) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        resetBtn(btn);
        return;
    }

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.userEmail)) {
        alert("Email không hợp lệ!");
        resetBtn(btn);
        return;
    }

    try {
        const response = await fetch("http://localhost:8888/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || "Đăng ký thất bại");
        }

        alert("Đăng ký thành công!");
        window.location.href = "LoginClient.html";

    } catch (err) {
        alert("Lỗi: " + err.message);
    }

    resetBtn(btn);
}

function resetBtn(btn) {
    btn.classList.remove("loading");
    btn.innerText = "Đăng ký";
}