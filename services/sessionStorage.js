export const setSessionStorage = (storageName = "", obj = {}) => sessionStorage.setItem(storageName, JSON.stringify(obj));
export const getSessionStorage = (storageName = "", obj = {}) => JSON.parse(sessionStorage.getItem(storageName));
