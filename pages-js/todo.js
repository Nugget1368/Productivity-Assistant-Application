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

const createBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

createBtn.addEventListener("click", async() => {
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Lägg till ny Aktivitet";
  if(!todoFormIsBuilt){
    //Get categories
    let categories = await loadFromJSONAsync(CATEGORIES_KEY);
    //Build Form in popup
    formBuilder("dialog[modal] article", "create-todo");
    //Build Todo-form inputfields
    buildTodosForm("form#create-todo",categories);
    //On submit in form
    let submitBtn = document.querySelector("form#create-todo");
    submitBtn.addEventListener("submit", () => submitForm());
    //Cancel submit
    let cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.addEventListener("click", (event) =>{
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

//If checkbox valuse is changed
let checkboxes = document.querySelectorAll("article#todos ul input[type=checkbox]");
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', (event) => {
    let listItemId = event.currentTarget.parentElement.parentElement.id;  //Reach grandparent (llist-item) id
    let storage = getStorageAsJSON(ACTIVITIES_KEY);
    let newObj = storage.find((element) => element.id == listItemId);
    newObj.status = event.currentTarget.checked;
    editStorage(ACTIVITIES_KEY, newObj);
  })
});
