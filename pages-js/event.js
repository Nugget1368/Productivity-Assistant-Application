import {
  EVENT_KEY,
  saveToStorage,
  getStorageAsJSON,
  editStorage,
  deleteFromStorage,
} from "../services/localstorage.js";
import { buildEvent } from "../builders/eventBuilder.js";
import { createEvent } from "../services/eventHandler.js";

//Create Habits in DOM
let storage = getStorageAsJSON(EVENT_KEY);
if(storage){
  buildEvent(storage);
}

const submitForm = () => {
  let inputs = document.querySelectorAll("form#create-event input");
  console.log(inputs);
  let values = [];
  inputs.forEach((input) => {
    values.push(input.value);
  });
  console.log(values);
  let event = createEvent(values[0], values[1], values[2]);
  saveToStorage(EVENT_KEY, event);
};

let form = document.querySelector("form#create-event");
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
