import {saveToStorage, deleteFromStorage, ACTIVITIES_KEY, getStorageAsJSON, editStorage} from "../services/localstorage.js"
import {createTodo} from "../services/todoActivities.js"
import {buildTodos} from '../builders/todoBuilder.js';

let storage = getStorageAsJSON(ACTIVITIES_KEY);
buildTodos(storage);

const openModalBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

openModalBtn.addEventListener("click", () => {
  // *Build content for modal
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});