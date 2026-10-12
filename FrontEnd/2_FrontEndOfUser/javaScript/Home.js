
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const usernameStored = localStorage.getItem("username");

  if (token && usernameStored) {
    const loginButton = document.getElementById("login_button");

    if (loginButton) {
      loginButton.classList.add("is-authenticated");

      const accountLabel = loginButton.querySelector(".account-label");
      if (accountLabel) {
        accountLabel.textContent = usernameStored;
      }

      const loginLink = loginButton.querySelector('.accout-menu-two a[href="LoginClient.html"]');
      const loginMenuItem = loginLink?.closest("li");
      if (loginMenuItem) {
        loginMenuItem.hidden = true;
      }
    }
  }
});



function logout(){
  const token = localStorage.getItem("token"); // lấy token đã lưu sau khi đăng nhập

  if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
  }

  fetch(`http://localhost:8888/api/users/auth/logout`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      "token":token })
  })
  .then(response => {
    if(!response.ok)
      throw new Error("Đăng xuất không thành công")
    return response.json();
  })
  .then(data => {
        console.log("Phản hồi từ server:", data);
        alert("Đăng xuất thành công!");
        // Xoá token khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        // Chuyển hướng về trang đăng nhập
        window.location.href = "LoginClient.html";
    })
    .catch(error => {
        console.error("Lỗi:", error);
        alert("Có lỗi khi đăng xuất!");
    });

}
