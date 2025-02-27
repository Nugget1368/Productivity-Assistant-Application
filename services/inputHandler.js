import { getStorageAsJSON, editStorage, ACTIVITIES_KEY } from "./localstorage.js";

const getInputValues = (destination) => {
  let inputs = document.querySelectorAll(`${destination} input, ${destination} select`);
  let values = [];
  inputs.forEach((input) => {
    values.push(input.value);
  });
  return values;
}

const sortList = (option = "", arr = []) => {
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


const checkboxEventHandler = (storage) => {
  //If checkbox value is changed
  let checkboxes = document.querySelectorAll("article#todos ul input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      let listItemId = event.currentTarget.parentElement.parentElement.id; //Reach grandparent (llist-item) id
      let newObj = storage.find((element) => element.id == listItemId);
      newObj.status = event.currentTarget.checked;
      editStorage(ACTIVITIES_KEY, newObj);

      let listItem = event.currentTarget.closest("li");
      if (event.currentTarget.checked) {
        listItem.classList.add("done-todo");
      } else {
        listItem.classList.remove("done-todo");
      }
    });
  });
}


const listItemHandler = (storage) =>{
  // Info popup for each todo
  let todos = document.querySelectorAll("article#todos ul li");
  todos.forEach((todo) => {
    todo.addEventListener("click", (event) => {
      let listItemId = event.currentTarget.id;
      let newObj = storage.find((element) => element.id == listItemId);

      let h2 = document.querySelector("#todo-popup-h2");
      h2.textContent = newObj.title;

      let p = document.querySelector("#todo-popup-info p");
      p.textContent = "Beskrivning: " + newObj.description;

      let ul = document.querySelector("#todo-popup-status ul");
      ul.innerHTML = "";

      let status = document.createElement("li");
      status.classList.add("status")
      status.textContent = newObj.status ? "Status: Slutförd" : "Status: Ej slutförd";

      let deadline = document.createElement("li");
      deadline.textContent = "Deadline: " + newObj.deadline;

      let time = document.createElement("li");
      time.textContent = "Tidsestimering: " + newObj.time + " timmar";

      let category = document.createElement("li");
      category.textContent = "Kategori: " + newObj.category;
      ul.append(status, deadline, time, category);
    });
    todo.addEventListener("change", (event) => {
      let checkbox = event.target;
      let status = document.querySelector("li.status")
      status.textContent = checkbox.checked ? "Status: Slutförd" : "Status: Ej slutförd";
    });
  });
}


export { getInputValues, filterCategoryList, sortList, checkboxEventHandler, listItemHandler }
