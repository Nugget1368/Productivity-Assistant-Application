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


const checkboxEventHandler = (storage = "", storagekey = "") => {
  //If checkbox value is changed
  let checkboxes = document.querySelectorAll("article#todos ul input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      let listItemId = event.currentTarget.parentElement.parentElement.id; //Reach grandparent (llist-item) id
      let newObj = storage.find((element) => element.id == listItemId);
      newObj.status = event.currentTarget.checked;
      editStorage(storagekey, newObj);

      let listItem = event.currentTarget.closest("li");
      if (event.currentTarget.checked) {
        listItem.classList.add("done-todo");
      } else {
        listItem.classList.remove("done-todo");
      }
    });
  });
}

const listItemHandler = (destination = "", storage = [], allowedKeys = []) => {
  let list = document.querySelectorAll(`${destination} ul li`);
  list.forEach((item) => {
    item.addEventListener("click", (event) => {
      let listItemId = event.currentTarget.id;
      let newObj = storage.find((element) => element.id == listItemId);

      let h2 = document.querySelector("#todo-popup-h2");
      h2.textContent = newObj.title;

      let ul = document.querySelector("#todo-popup-status ul");
      ul.innerHTML = "";
      Object.entries(newObj)
        .filter(([key, _]) => allowedKeys.includes(key))
        .forEach(([key, value]) => {
          if (key == "description" && value != "") {
            let div = document.querySelector("#todo-popup-info")
            div.innerHTML = "";
            let p = document.createElement("p");
            p.textContent = value;
            div.append(p);
          }
          else {
            let li = document.createElement("li");
            ul.append(li);
            li.innerHTML = `<strong><span>${key.charAt(0).toUpperCase() + key.slice(1)}:</span></strong> ${value}`
          }
        });
    });
  });
}

export { getInputValues, filterCategoryList, sortList, checkboxEventHandler, listItemHandler }
