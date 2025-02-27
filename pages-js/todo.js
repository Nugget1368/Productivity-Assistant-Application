import {
  saveToStorage,
  deleteFromStorage,
  ACTIVITIES_KEY,
  getStorageAsJSON,
  editStorage,
} from "../services/localstorage.js";
import { createTodo } from "../services/todoHandler.js";
import { buildCategoriesDropdownAsync, buildTodos, buildTodosForm, buildSortDropdown } from "../builders/todoBuilder.js";
import { loadFromJSONAsync, CATEGORIES_KEY } from "../services/jsonHandler.js";
import { formBuilder } from "../builders/builder.js";
import { getInputValues, filterCategoryList, sortTodosDropdown } from "../services/inputHandler.js";

let todoFormIsBuilt = false;

//Create Todos in DOM
let storage = getStorageAsJSON(ACTIVITIES_KEY);
if (storage) {
  buildTodos(storage);
}

const submitForm = () => {
  let values = getInputValues("form#create-todo");
  let todo = createTodo(values[0], values[1], values[2], values[3], values[4]);
  saveToStorage(ACTIVITIES_KEY, todo);
};

const createBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

createBtn.addEventListener("click", async () => {
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Lägg till ny Aktivitet";
  if (!todoFormIsBuilt) {
    //Get categories
    let categories = await loadFromJSONAsync(CATEGORIES_KEY);
    //Build Form in popup
    formBuilder("dialog[modal] article", "create-todo");
    //Build Todo-form inputfields
    buildTodosForm("form#create-todo", categories);
    //On submit in form
    let submitBtn = document.querySelector("form#create-todo");
    submitBtn.addEventListener("submit", () => submitForm());
    //Cancel submit
    let cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      modal.close();
    });
    //Is form built, don't rebuild it!
    todoFormIsBuilt = true;
  }
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

//If checkbox value is changed
let checkboxes = document.querySelectorAll("article#todos ul input[type=checkbox]");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    let listItemId = event.currentTarget.parentElement.parentElement.id; //Reach grandparent (llist-item) id
    let storage = getStorageAsJSON(ACTIVITIES_KEY);
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

let todos = document.querySelectorAll("article#todos ul li");
todos.forEach((todo) => {
  todo.addEventListener("click", (event) => {
    let listItemId = event.currentTarget.id;
    let storage = getStorageAsJSON(ACTIVITIES_KEY);
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

//Categories Dropdown
let categories = await loadFromJSONAsync(CATEGORIES_KEY);
buildCategoriesDropdownAsync("#categories-dropdown", categories);
//Event-handling
let categoryDrop = document.querySelector("select#categories-dropdown");
categoryDrop.addEventListener("change", () => {  //When category is changed
  let ul = document.querySelector("#todos ul");
  ul.innerHTML = "";
  storage = filterCategoryList("#categories-dropdown", ACTIVITIES_KEY);
  buildTodos(storage);
})

//Sort Dropdown
buildSortDropdown("#sort-dropdown");
let sortDropdown = document.querySelector("select#sort-dropdown");
sortDropdown.addEventListener("change", async () => {
  storage = sortTodosDropdown("#todos ul", storage)
  buildTodos(storage);
})