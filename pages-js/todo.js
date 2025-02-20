import {saveToStorage, deleteFromStorage, ACTIVITIES_KEY, getStorageAsJSON, editStorage} from "../services/localstorage.js"
import {createTodo} from "../services/todoHandler.js"
import {buildTodos, buildTodosForm} from '../builders/todoBuilder.js';

//Create Todos in DOM
let storage = getStorageAsJSON(ACTIVITIES_KEY);
buildTodos(storage);

const openModalBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

openModalBtn.addEventListener("click", () => {
  buildTodosForm();
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});
