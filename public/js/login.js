const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#login-email").value.trim();
  const password = document.querySelector("#login-password").value.trim();

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

const signUpFormHandler = async (event) => {
  event.preventDefault();

  const user_name = document.querySelector("#sign-up-name").value.trim();
  const email = document.querySelector("#sign-up-email").value.trim();
  const password = document.querySelector("#sign-up-password").value.trim();

  if (user_name && email && password) {
    const newUser = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ user_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (newUser.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to Create User");
    }
  }
};

document
  .querySelector("#login-button")
  .addEventListener("click", loginFormHandler);

document
  .querySelector("#signup-button")
  .addEventListener("click", signUpFormHandler);
