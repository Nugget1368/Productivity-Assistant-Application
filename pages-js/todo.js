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
import {formBuilder} from "../builders/builder.js";

let todoFormIsBuilt = false;

//Create Todos in DOM
let storage = getStorageAsJSON(ACTIVITIES_KEY);
if (storage) {
  buildTodos(storage);
}

const submitForm = () => {
  let inputs = document.querySelectorAll("form#create-todo input, form#create-todo select");
  let values = [];
  inputs.forEach((input) => {
    values.push(input.value);
  });
  let todo = createTodo(values[0], values[1], values[2], values[3], values[4]);
  saveToStorage(ACTIVITIES_KEY, todo);
};

const openModalBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

openModalBtn.addEventListener("click", async() => {
  if(!todoFormIsBuilt){
    let categories = await loadFromJSONAsync(CATEGORIES_KEY);
    formBuilder("dialog[modal] article", "create-todo");
    buildTodosForm("form#create-todo",categories);
    let submitBtn = document.querySelector("form#create-todo");
    submitBtn.addEventListener("submit", () => submitForm());
    let cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.addEventListener("click", (event) =>{
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
