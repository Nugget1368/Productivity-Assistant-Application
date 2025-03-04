import { getStorageAsJSON } from "./localstorage.js";

export const sortList = (option = "", arr = []) => {
    if (option === "Datum")
        return arr.sort((a, b) => a.deadline.localeCompare(b.deadline));

    else if (option === "Tidsestimat (lägst)")
        return arr.sort((a, b) => parseInt(a.time) - parseInt(b.time));

    else if (option === "Tidsestimat (högst)")
        return arr.sort((a, b) => parseInt(b.time) - parseInt(a.time));

    else if (option === "Slutförda")
        return arr.sort((a, b) => b.status - a.status);

    else if (option === "Ej Slutförda")
        return arr.sort((a, b) => a.status - b.status);

    else
        return arr.sort((a, b) => a.toString().localeCompare(b.toString()));
}

export const filterCategoryList = (destination = "", storageName = "", allowedKeys = []) => {
    let categoryDrop = document.querySelector(`select${destination}`);  //Get selected value
    let storage = [];
    if (categoryDrop.value === "Ingen vald...") { //If no chosen
        storage = getStorageAsJSON(storageName);
    }
    else { //Filter
        let value = categoryDrop.value;
        storage = getStorageAsJSON(storageName);
        storage = storage.filter((element) => filterObjKeys(element, allowedKeys)[0][1] === value);
    }
    return storage;
}

export const filterObjKeys = (obj = {}, allowedKeys = []) => Object.entries(obj).filter(([key, _]) => allowedKeys.includes(key));