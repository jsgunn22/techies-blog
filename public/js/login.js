const loginFormHandler = async (event) => {
  event.preventDefault();

  console.log("test");
  const email = "jgunn@home.com"; // document.querySelector("#email-login").value.trim();
  const password = "ZYXW"; // document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to Log In");
    }
  }
};

document
  .querySelector("#navbar-login")
  .addEventListener("click", loginFormHandler);
