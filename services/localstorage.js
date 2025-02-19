const ACTIVITIES_KEY = "activities";
const HABITS_KEY = "habits";
const EVENT_KEY = "events";


const getStorageAsJSON = (storageName) =>
  JSON.parse(localStorage.getItem(storageName));

const saveToStorage = (storageName, obj) => {
  if (localStorage.getItem(storageName)) { // If there is localstorage with key-string 'storageName'
    let storage = getStorageAsJSON(storageName); // Get value from localstorage and convert from JSON to array-object
    storage.push(obj);
    localStorage.setItem(storageName, JSON.stringify(storage));
  }
// If there is no localstorage with the key-string
  else {
    let arr = [];
    arr.push(obj);
    localStorage.setItem(storageName, JSON.stringify(arr)); //Convert object to JSON and save in localstorage
  }
};

const editStorage = (storageName, obj) => {
    if(localStorage.getItem(ACTIVITIES_KEY)){
        let storage = getStorageAsJSON(ACTIVITIES_KEY);
        storage = storage.map((element) => (element.id === obj.id ? obj : element));     // Search for similiar id, in that case EDIT that object
        localStorage.setItem(storageName, JSON.stringify(storage));
    }
}

const deleteFromStorage = (storageName, id) => {
  //Get from localstorage
  let storage = getStorageAsJSON(storageName);
  //Filter out the values that don't have the id we'd like to delete
  storage = storage.filter((element) => element.id !== id);
  //save the new storage-array
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(storage));
};

export { saveToStorage, deleteFromStorage, getStorageAsJSON, editStorage, ACTIVITIES_KEY, HABITS_KEY, EVENT_KEY };
