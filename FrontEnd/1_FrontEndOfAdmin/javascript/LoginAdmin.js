function LoginAdmin() {

    const userName = document.getElementById("adminName").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    if (!userName || !password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    fetch("http://localhost:8888/api/users/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.data?.token && data.data?.checkLogin) {
            localStorage.setItem("adminToken", data.data.token);
            window.location.href = "Home.html";
        } else {
            alert("Sai tài khoản admin");
        }
    })
    .catch(() => alert("Không kết nối được server"));
}
