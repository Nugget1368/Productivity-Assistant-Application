import { getStorageAsJSON, editStorage, ACTIVITIES_KEY } from "./localstorage.js";
import { filterObjKeys } from "./filterSortHandler.js";

const updateTodoPopupInfo = (bool) => {
  let status = document.querySelector("span#status");
  status.textContent = bool ? "Slutförd" : "Ej Slutförd";
};

export const getInputValues = (destination) => {
  let inputs = document.querySelectorAll(`${destination} input, ${destination} select`);
  let values = [];
  inputs.forEach((input) => {
    values.push(input.value);
  });
  return values;
};

export const checkboxEventHandler = (storage = "", storagekey = "") => {
  //If checkbox value is changed
  let checkboxes = document.querySelectorAll("article#todos ul input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      let listItemId = event.currentTarget.parentElement.parentElement.id; //Reach grandparent (list-item) id
      let newObj = storage.find((element) => element.id == listItemId); //Find mathcing element in localstorage
      newObj.status = event.currentTarget.checked;
      editStorage(storagekey, newObj);

      let listItem = event.currentTarget.closest("li");
      if (event.currentTarget.checked) {
        listItem.classList.add("done-todo");
      } else {
        listItem.classList.remove("done-todo");
      }
      updateTodoPopupInfo(newObj.status);
    });
  });
};

const inputSetValue = (element, value = 0) => {
  element.value = value;
  //Trigger Eventlistener of type 'Input'
  element.dispatchEvent(new InputEvent("input"));
}

export const increaseDecreaseHandler = (destination = "", storage = [], storageName = "") => {
  let input = document.querySelectorAll(`${destination} input`);
  let plus = document.querySelectorAll(`${destination} span.increase`);
  let minus = document.querySelectorAll(`${destination} span.decrease`);
  for (let x = 0; x < input.length; x++) {
    plus[x].addEventListener("click", () => {
      let value = parseInt(input[x].value);
      value += 1;
      inputSetValue(input[x], value);
    });
    minus[x].addEventListener("click", () => {
      let value = parseInt(input[x].value);
      if(value > 0){
        value -= 1;
      }
      else{
        value = 0;
      }
      inputSetValue(input[x], value);
    });
    input[x].addEventListener("input", (event) => {
      //When input change - Update local-storage
      let listItemId = event.currentTarget.parentElement.parentElement.parentElement.id; //Reach grandparent (list-item) id
      let newObj = storage.find((element) => element.id == listItemId); //Find mathcing element in localstorage
      let value = parseInt(input[x].value);
      if(value < 0){
        value = 0;
      }
      newObj.repetition = value;
      editStorage(storageName, newObj);
    });
  }
}

export const listItemHandler = (destination = "", storage = [], allowedKeys = []) => {
  let list = document.querySelectorAll(`${destination} ul li`);
  list.forEach((item) => {
    item.addEventListener("click", (event) => {
      let listItemId = event.currentTarget.id;
      let newObj = storage.find((element) => element.id == listItemId);
      

      let h2 = document.querySelector("#todo-popup-h2");
      h2.textContent = newObj.title;

      let ul = document.querySelector("#todo-popup-status ul");
      ul.innerHTML = "";
      
      let div = document.querySelector("#todo-popup-info");
      div.innerHTML = "";
      let article = document.querySelector(".container-wrapper .todos-right");
      let todoId = event.target.closest("li").id;
      article.setAttribute("selected-item", todoId);

      let keys = filterObjKeys(newObj, allowedKeys);
      keys.forEach(([key, value]) => {
        if (key == "description" && value != "") {
          let p = document.createElement("p");
          p.textContent = value;
          div.append(p);
        } else {
          let li = document.createElement("li");
          ul.append(li);
          if (key === "status") {
            li.innerHTML = `<strong><span>${
              key.charAt(0).toUpperCase() + key.slice(1)
            }:</span></strong> <span id="status"></span>`;
            updateTodoPopupInfo(value);
          } else {
            li.innerHTML = `<strong><span>${
              key.charAt(0).toUpperCase() + key.slice(1)
            }:</span></strong> <span>${value}</span>`;
          }
        }
      });
    });
  });
};
