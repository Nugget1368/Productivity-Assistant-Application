import { getStorageAsJSON } from "./localstorage.js";

const getInputValues = (destination) => {
  let inputs = document.querySelectorAll(`${destination} input, ${destination} select`);
  let values = [];
  inputs.forEach((input) => {
    values.push(input.value);
  });
  return values;
}

const sortList = (destination = "", arr = []) =>{
  let list = document.querySelector(destination);
  list.innerHTML = "";
  return arr.sort((a, b) => a.deadline.localeCompare(b.deadline));
}

const filterCategoryList = (destination, storageName) => {
  let categoryDrop = document.querySelector(`select${destination}`);  //Get selected value
  let storage = [];
  if (categoryDrop.value === "Ingen vald...") { //If no chosen
    storage = getStorageAsJSON(storageName);
  }
  else { //Filter
    let value = categoryDrop.value;
    storage = getStorageAsJSON(storageName);
    storage = storage.filter((element) => element.category === value);
  }
  return storage;
}

export { getInputValues, filterCategoryList, sortList }
