const ACTIVITIES_KEY = "activities";

const getStorageAsJSON = (storageName) =>
  JSON.parse(localStorage.getItem(storageName));

const saveToStorage = (storageName, obj) => {
  // If there is localstorage with key-string 'storageName'
  if (localStorage.getItem(storageName)) {
    // Get value from localstorage and convert from JSON to array-object
    let storage = getStorageAsJSON(storageName);
    storage.push(obj);
    localStorage.setItem(storageName, JSON.stringify(storage));
  }
  // If there is no localstorage with the key-string
  else {
    let arr = [];
    arr.push(obj);
    //Convert object to JSON and save in localstorage
    localStorage.setItem(storageName, JSON.stringify(arr));
  }
};

const deleteFromStorage = (storageName, id) => {
  //Get from localstorage
  let storage = getStorageAsJSON(storageName);
  //Filter out the values that don't have the id we'd like to delete
  storage = storage.filter((element) => element.id !== id);
  //save the new storage-array
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(storage));
};

export { saveToStorage, deleteFromStorage, getStorageAsJSON, ACTIVITIES_KEY };
