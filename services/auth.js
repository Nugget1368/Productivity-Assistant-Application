import { getStorageAsJSON, saveToStorage } from "./localstorage.js"
import { setSessionStorage, getSessionStorage } from "./sessionStorage.js";

export const USERS_KEY = "users";
export const CURRENT_USER_KEY = "currentUser";

export const registerUser = (firstName, username, password) => {
  const users = getStorageAsJSON(USERS_KEY) || [];
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return false;
  }
  const newUser = { firstName, username, password };
  saveToStorage(USERS_KEY, newUser);
  return true;
};

export const loginUser = (username, password) => {
  const users = getStorageAsJSON(USERS_KEY) || [];
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    setSessionStorage(CURRENT_USER_KEY, user);
    return true;
  }
  return false;
};

export const logoutUser = () => {
  setSessionStorage(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  return getSessionStorage(CURRENT_USER_KEY);
};

export const getUserSpecificKey = (baseKey) => {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.username) {
    return `${currentUser.username}_${baseKey}`;
  }
  return baseKey;
};
