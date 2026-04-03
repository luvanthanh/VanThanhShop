function login(event) {
  event.preventDefault(); // Ngăn form reload lại trang

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const errorMsg = document.getElementById("error-msg");

  errorMsg.textContent = ""; // chỗ này cần tìm hiểu

  if (username == "" || password=="") {
    errorMsg.textContent = "Vui lòng nhập đầy đủ thông tin!";
  }

  fetch(`http://localhost:8888/api/users/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "userName": username,
      "password": password
    })
  })

    .then(response => {
      if (!response.ok) {
        console.log("Đăng nhập thất bại ở bước xác thực userName và password");
      }
      return response.json();
    })

    .then(data => {
      console.log("Login success:", data);

      if (data.data.token && data.data.checkLogin) {
        localStorage.setItem("token",data.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", data.data.userId);

        console.log("Token lưu trong localStorage:", data.data.token , username);
        
        alert("Chào Mừng tới với Văn Thành Shop");

        window.location.href = "Home.html";
      } else {
        errorMsg.textContent = "Đăng nhập thất bại! Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.";
      }
    })
    .catch(error => {
      // console.error("Lỗi khi đăng nhập:", error);
      errorMsg.textContent =  "Đăng nhập thất bại! Vui lòng kiểm tra lại tên đăng nhập và mật khẩu! =)))";
    });
}
