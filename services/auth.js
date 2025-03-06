import { getStorageAsJSON, saveToStorage } from "./localstorage.js"
import { setSessionStorage, getSessionStorage } from "./sessionStorage.js";

export const USERS_KEY = "users";
export const CURRENT_USER_KEY = "currentUser";

/**
 * Registrerar en ny användare.
 * Nu tar vi även in förnamn.
 * Returnerar false om användarnamnet redan finns.
 */
export const registerUser = (firstName, username, password) => {
  const users = getStorageAsJSON(USERS_KEY) || [];
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return false; // Användaren finns redan
  }
  const newUser = { firstName, username, password };
  saveToStorage(USERS_KEY, newUser);
  return true;
};

/**
 * Loggar in en användare.
 * Om inloggningen lyckas sparas användardata under CURRENT_USER_KEY.
 */
export const loginUser = (username, password) => {
  const users = getStorageAsJSON(USERS_KEY) || [];
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    //Session storage
    setSessionStorage(CURRENT_USER_KEY, user);
    return true;
  }
  return false;
};

/**
 * Loggar ut den aktuella användaren.
*/
export const logoutUser = () => {
  setSessionStorage(CURRENT_USER_KEY);
};

/**
 * Hämtar den aktuella inloggade användaren.
 */
export const getCurrentUser = () => {
  return getSessionStorage(CURRENT_USER_KEY);
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
