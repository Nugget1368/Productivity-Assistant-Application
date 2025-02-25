import {
  saveToStorage,
  deleteFromStorage,
  ACTIVITIES_KEY,
  getStorageAsJSON,
  editStorage,
} from "../services/localstorage.js";
import { createTodo } from "../services/todoHandler.js";
import { buildTodos, buildTodosForm } from "../builders/todoBuilder.js";
import { loadFromJSONAsync, CATEGORIES_KEY } from "../services/jsonHandler.js";
import { formBuilder } from "../builders/builder.js";
import { getInputValues } from "../services/inputHandler.js";

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

const createBtn = document.querySelector("[open-modal].create-btn");
const editBtn = document.querySelector("[open-modal].edit-btn");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

createBtn.addEventListener("click", async () => {
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Lägg till ny Aktivitet";
  if (!todoFormIsBuilt) {
    let categories = await loadFromJSONAsync(CATEGORIES_KEY);
    formBuilder("dialog[modal] article", "create-todo");
    buildTodosForm("form#create-todo", categories);
    let submitBtn = document.querySelector("form#create-todo");
    submitBtn.addEventListener("submit", () => submitForm());
    let cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      modal.close();
    });
    todoFormIsBuilt = true;
  }
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});
