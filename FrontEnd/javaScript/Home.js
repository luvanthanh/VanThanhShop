
document.addEventListener("DOMContentLoaded", () => {
  const usernameStored = localStorage.getItem("username");

  if (usernameStored) {
    const loginButton = document.getElementById("login_button");

    if (loginButton) {
      const icon = loginButton.querySelector(".fa-user");
      const textNode = icon.nextSibling; // lấy phần chữ sau icon

      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        textNode.textContent = " " + usernameStored; // thay "Tài khoản" bằng tên
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
        // Chuyển hướng về trang đăng nhập
        window.location.href = "LoginClient.html";
    })
    .catch(error => {
        console.error("Lỗi:", error);
        alert("Có lỗi khi đăng xuất!");
    });

}
