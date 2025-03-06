import { loginUser, registerUser, logoutUser } from "../services/auth.js";

const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const guestLoginButton = document.getElementById("guestLoginButton");
const firstNameInput = document.getElementById("firstName");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

loginButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (loginUser(username, password)) {
        alert("Inloggning lyckades!");
        window.location.href = "../html-pages/index.html";
    } else {
        alert("Felaktigt användarnamn eller lösenord!");
    }
});

registerButton.addEventListener("click", () => {
    const firstName = firstNameInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (!firstName) {
        alert("Ange ditt förnamn vid registrering!");
        return;
    }
    if (registerUser(firstName, username, password))
        alert("Användare registrerad! Du kan nu logga in.");
    else
        alert("Användarnamnet finns redan. Försök logga in istället.");
});

guestLoginButton.addEventListener("click", () => {
    logoutUser();
    window.location.href = "../html-pages/index.html";
});