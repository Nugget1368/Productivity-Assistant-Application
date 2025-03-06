import { loginUser, registerUser, logoutUser } from "../services/auth.js";

const loginButton = document.querySelector("#loginButton");
const registerButton = document.querySelector("#registerButton");
const guestLoginButton = document.querySelector("#guestLoginButton");
const firstNameInput = document.querySelector("#firstName");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

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