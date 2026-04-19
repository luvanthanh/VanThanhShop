function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  errorMsg.textContent = "";

  // validate
  if (!username || !password) {
    errorMsg.textContent = "⚠️ Vui lòng nhập đầy đủ thông tin!";
    return;
  }

  fetch(`http://localhost:8888/api/users/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName: username,
      password: password
    })
  })
    .then(res => res.json())
    .then(data => {

      if (data?.data?.token && data?.data?.checkLogin) {

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", data.data.userId);

        // loading nhẹ
        errorMsg.style.color = "green";
        errorMsg.textContent = "✔️ Đăng nhập thành công...";

        setTimeout(() => {
          window.location.href = "Home.html";
        }, 800);

      } else {
        errorMsg.textContent = "❌ Sai tài khoản hoặc mật khẩu!";
      }
    })
    .catch(() => {
      errorMsg.textContent = "⚠️ Lỗi server, thử lại sau!";
    });
}