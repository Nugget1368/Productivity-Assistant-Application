export const ACTIVITIES_KEY = "activities";
export const HABITS_KEY = "habits";
export const EVENT_KEY = "events";


export const getStorageAsJSON = (storageName) =>
  JSON.parse(localStorage.getItem(storageName));

export const saveToStorage = (storageName, obj) => {
  if (localStorage.getItem(storageName)) {
    let storage = getStorageAsJSON(storageName);
    storage.push(obj);
    localStorage.setItem(storageName, JSON.stringify(storage));
  }
  else {
    let arr = [];
    arr.push(obj);
    localStorage.setItem(storageName, JSON.stringify(arr));
  }
};

export const editStorage = (storageName, obj) => {
    if(localStorage.getItem(storageName)){
        let storage = getStorageAsJSON(storageName);
        storage = storage.map((element) => (element.id === obj.id ? obj : element));
        localStorage.setItem(storageName, JSON.stringify(storage));
    }
}

export const deleteFromStorage = (storageName, id) => {
  let storage = getStorageAsJSON(storageName);
  storage = storage.filter((element) => element.id !== id);
  localStorage.setItem(storageName, JSON.stringify(storage));
};