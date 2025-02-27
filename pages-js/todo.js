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
import { getInputValues, filterCategoryList, sortList, listItemHandler, checkboxEventHandler } from "../services/inputHandler.js";

let todoFormIsBuilt = false;

const renderTodoList = (storage) =>{
  let list = document.querySelector("#todos ul");
  list.innerHTML = "";
  buildTodos(storage);
  checkboxEventHandler(storage, ACTIVITIES_KEY);
  listItemHandler("article#todos", storage, ["description","status","time", "category","deadline"]);
}

//Create Todos in DOM
let storage = getStorageAsJSON(ACTIVITIES_KEY);
if (storage) {
  renderTodoList(storage);
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

//Categories Dropdown
let categories = await loadFromJSONAsync(CATEGORIES_KEY);
buildCategoriesDropdownAsync("#categories-dropdown", categories);
//Event-handling
let categoryDrop = document.querySelector("select#categories-dropdown");
categoryDrop.addEventListener("change", () => {  //When category is changed
  storage = filterCategoryList("#categories-dropdown", ACTIVITIES_KEY);
  renderTodoList(storage);
})

//Sort Dropdown
buildSortDropdown("#sort-dropdown");
let sortDropdown = document.querySelector("select#sort-dropdown");
sortDropdown.addEventListener("change", async () => {
  storage = sortList(sortDropdown.value, storage)
  renderTodoList(storage);
})

