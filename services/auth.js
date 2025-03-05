// auth.js
export const USERS_KEY = "users";
export const CURRENT_USER_KEY = "currentUser";

/**
 * Registrerar en ny användare.
 * Nu tar vi även in förnamn.
 * Returnerar false om användarnamnet redan finns.
 */
export const registerUser = (firstName, username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return false; // Användaren finns redan
  }
  const newUser = { firstName, username, password };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
};

/**
 * Loggar in en användare.
 * Om inloggningen lyckas sparas användardata under CURRENT_USER_KEY.
 */
export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return true;
  }
  return false;
};

/**
 * Loggar ut den aktuella användaren.
 */
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

/**
 * Hämtar den aktuella inloggade användaren.
 */
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
};

/**
 * Returnerar en nyckel anpassad för den inloggade användaren.
 * Om ingen är inloggad returneras basnyckeln.
 *
 * Exempel: Om ACTIVITIES_KEY är "activities" och användaren "anna" är inloggad
 * returneras "anna_activities".
 */
export const getUserSpecificKey = (baseKey) => {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.username) {
    return `${currentUser.username}_${baseKey}`;
  }
  return baseKey;
};
