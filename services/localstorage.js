const saveToStorage = (storageName, obj) =>{
    // If there is localstorage with key-string 'storageName'
    if(localStorage.getItem(storageName)){
        // Get value from localstorage and convert from JSON to array-object
        let storage = JSON.parse(localStorage.getItem(storageName));
        storage.push(obj);
        localStorage.setItem(storageName, JSON.stringify(storage));
    }
    // If there is no localstorage with the key-string
    else{
        let arr = [];
        arr.push(obj);
        //Convert object to JSON and save in localstorage
        localStorage.setItem(storageName, JSON.stringify(arr));
    }   
}

export {saveToStorage}