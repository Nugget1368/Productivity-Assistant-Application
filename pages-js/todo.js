import { saveToStorage, deleteFromStorage, ACTIVITIES_KEY, getStorageAsJSON, editStorage } from "../services/localstorage.js";
import { createTodo } from "../helpers/todoHelper.js";
import { buildTodos, buildTodosForm } from "../builders/todoBuilder.js";
import { loadFromJSONAsync, CATEGORIES_KEY, SORT_OPTIONS_KEY } from "../services/jsonHandler.js";
import { formBuilder, buildSortDropdown, buildCategoriesDropdownAsync } from "../builders/builder.js";
import { getInputValues, listItemHandler, checkboxEventHandler } from "../services/inputHandler.js";
import { filterCategoryList, sortList } from "../services/filterSortHandler.js";
import { getUserSpecificKey } from "../services/auth.js";
import { logoutUser } from "../services/auth.js";

const userSpecificActivitiesKey = getUserSpecificKey(ACTIVITIES_KEY);

let storage = getStorageAsJSON(userSpecificActivitiesKey) || [];
const createBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");
let deleteBtn = document.querySelector("[open-modal].delete-btn");
let editBtn = document.querySelector("[open-modal].edit-btn");

const renderTodoList = (storage) => {
  let list = document.querySelector("#todos ul");
  list.innerHTML = "";
  buildTodos(storage);
  listItemHandler("article#todos", storage, ["description", "status", "time", "category", "deadline"]);

  checkboxEventHandler(storage, userSpecificActivitiesKey);
};

// Renders todos i DOM
if (storage) {
  renderTodoList(storage);
}

const submitForm = () => {
  let values = getInputValues("form#create-todo");
  let todo = createTodo(values[0], values[1], values[2], values[3], values[4]);

  saveToStorage(userSpecificActivitiesKey, todo);
};

createBtn.addEventListener("click", async () => {
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Lägg till ny Aktivitet";
  let article = document.querySelector("dialog[modal] article");
  article.innerHTML = "";

  let categories = await loadFromJSONAsync(CATEGORIES_KEY);
  formBuilder("dialog[modal] article", "create-todo");
  buildTodosForm("form#create-todo", categories);

  let submitBtn = document.querySelector("form#create-todo");
  submitBtn.addEventListener("submit", () => submitForm());
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

deleteBtn.addEventListener("click", () => {
  let modal = document.querySelector("dialog[modal]");
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Bekräfta radering";
  let article = document.querySelector("dialog[modal] article");
  article.innerHTML = "";

  // Creates "Ja, radera"-btn
  let confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Ja, radera";
  confirmBtn.classList.add("confirm-delete");
  confirmBtn.addEventListener("click", () => {
    let article = document.querySelector(".container-wrapper .todos-right");
    let todoId = article.getAttribute("selected-item");

    deleteFromStorage(userSpecificActivitiesKey, Number(todoId));

    modal.close();
    location.reload();
  });

  // Creates "Avbryt"-btn
  let cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Avbryt";
  cancelBtn.classList.add("cancel-delete");
  cancelBtn.addEventListener("click", () => {
    modal.close();
  });

  // Add btns to modal
  article.append(confirmBtn);
  article.append(cancelBtn);

  modal.showModal();
});

editBtn.addEventListener("click", async () => {
  let modal = document.querySelector("dialog[modal]");
  let modalHeader = document.querySelector("dialog[modal] h3");
  let modalArticle = document.querySelector("dialog[modal] article");

  modalHeader.textContent = "Redigera din aktivitet";
  modalArticle.innerHTML = "";

  let selectedTodoId = document.querySelector(".container-wrapper .todos-right").getAttribute("selected-item");
  let storage = getStorageAsJSON(userSpecificActivitiesKey) || [];
  let selectedTodo = storage.find((todo) => todo.id == selectedTodoId);

  let { form, submitBtn } = formBuilder("dialog[modal] article", "edit-todo", "edit");

  let categories = await loadFromJSONAsync(CATEGORIES_KEY);
  buildTodosForm("form#edit-todo", categories);

  document.querySelector("#title").value = selectedTodo.title;
  document.querySelector("#description").value = selectedTodo.description;
  document.querySelector("#time").value = selectedTodo.time;
  document.querySelector("#category").value = selectedTodo.category;
  document.querySelector("#deadline").value = selectedTodo.deadline;

  submitBtn.addEventListener("click", () => {
    let updatedTodo = createTodo(
      document.querySelector("#title").value,
      document.querySelector("#description").value,
      document.querySelector("#time").value,
      document.querySelector("#category").value,
      document.querySelector("#deadline").value
    );
    updatedTodo.id = selectedTodo.id;

    editStorage(userSpecificActivitiesKey, updatedTodo);

    modal.close();
  });

  modal.showModal();
});

// Categories dropdown
let categories = await loadFromJSONAsync(CATEGORIES_KEY);
buildCategoriesDropdownAsync("#categories-dropdown", categories);

let categoryDrop = document.querySelector("select#categories-dropdown");
categoryDrop.addEventListener("change", () => {

  storage = filterCategoryList("#categories-dropdown", userSpecificActivitiesKey, ["category"]);
  renderTodoList(storage);
});

// Sort dropdown
let options = await loadFromJSONAsync(SORT_OPTIONS_KEY);
buildSortDropdown("#sort-dropdown", options.todo);
let sortDropdown = document.querySelector("select#sort-dropdown");
sortDropdown.addEventListener("change", async () => {
  storage = sortList(sortDropdown.value, storage);
  renderTodoList(storage);
});

const logoutLink = document.querySelector("#logoutLink");
logoutLink.addEventListener("click", (event) => {
  event.preventDefault();
  logoutUser();
  window.location.href = "../html-pages/login.html";
});