import {
  saveToStorage,
  deleteFromStorage,
  ACTIVITIES_KEY,
  getStorageAsJSON,
  editStorage,
} from "../services/localstorage.js";
import { createTodo } from "../services/todoHandler.js";
import { buildTodos, buildTodosForm } from "../builders/todoBuilder.js";

//Create Todos in DOM
let storage = getStorageAsJSON(ACTIVITIES_KEY);
buildTodos(storage);

const submitForm = () => {
  let inputs = document.querySelectorAll("form#create-todo input");
  let values = [];
  inputs.forEach((input) => {
    values.push(input.value);
  });
  let todo = createTodo(values[0], values[1], values[2], values[3], values[4]);
  saveToStorage(ACTIVITIES_KEY, todo);
};

let form = document.querySelector("form#create-todo");
form.addEventListener("submit", () => submitForm());

const openModalBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

openModalBtn.addEventListener("click", () => {
  // buildTodosForm();
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});
