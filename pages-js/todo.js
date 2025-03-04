import {
  saveToStorage,
  deleteFromStorage,
  ACTIVITIES_KEY,
  getStorageAsJSON,
  editStorage,
} from "../services/localstorage.js";
import { createTodo } from "../helpers/todoHelper.js";
import {
  buildCategoriesDropdownAsync,
  buildTodos,
  buildTodosForm,
  buildSortDropdown,
} from "../builders/todoBuilder.js";
import { loadFromJSONAsync, CATEGORIES_KEY } from "../services/jsonHandler.js";
import { formBuilder } from "../builders/builder.js";
import {
  getInputValues,
  listItemHandler,
  checkboxEventHandler,
} from "../services/inputHandler.js";
import {
  filterCategoryList,
  sortList
} from "../services/filterSortHandler.js";

const createBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

const renderTodoList = (storage) => {
  let list = document.querySelector("#todos ul");
  list.innerHTML = "";
  buildTodos(storage);
  listItemHandler("article#todos", storage, ["description", "status", "time", "category", "deadline"]);
  checkboxEventHandler(storage, ACTIVITIES_KEY);
};

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

createBtn.addEventListener("click", async () => {
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Lägg till ny Aktivitet";
  let article = document.querySelector("dialog[modal] article");
  article.innerHTML = "";
  let categories = await loadFromJSONAsync(CATEGORIES_KEY);     //Get categories
  formBuilder("dialog[modal] article", "create-todo");    //Build Form in popup
  buildTodosForm("form#create-todo", categories);    //Build Todo-form inputfields
  let submitBtn = document.querySelector("form#create-todo");    //On submit in form
  submitBtn.addEventListener("submit", () => submitForm());
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
categoryDrop.addEventListener("change", () => {
  //When category is changed
  storage = filterCategoryList("#categories-dropdown", ACTIVITIES_KEY, ["category"]);
  renderTodoList(storage);
});

//Sort Dropdown
buildSortDropdown("#sort-dropdown");
let sortDropdown = document.querySelector("select#sort-dropdown");
sortDropdown.addEventListener("change", async () => {
  storage = sortList(sortDropdown.value, storage);
  renderTodoList(storage);
});
