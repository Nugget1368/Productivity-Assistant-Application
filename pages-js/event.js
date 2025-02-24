import {
  EVENT_KEY,
  saveToStorage,
  getStorageAsJSON,
  editStorage,
  deleteFromStorage,
} from "../services/localstorage.js";
import { buildEvent, buildEventForm } from "../builders/eventBuilder.js";
import { createEvent } from "../services/eventHandler.js";
import { formBuilder } from "../builders/builder.js";

let eventFormIsBuilt = false;

//Create Habits in DOM
let storage = getStorageAsJSON(EVENT_KEY);
if (storage) {
  buildEvent(storage);
}

const submitForm = () => {
  let inputs = document.querySelectorAll("form#create-event input");
  let values = [];
  inputs.forEach((input) => {
    values.push(input.value);
  });
  let event = createEvent(values[0], values[1], values[2]);
  saveToStorage(EVENT_KEY, event);
};

const openModalBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

openModalBtn.addEventListener("click", async () => {
  if (!eventFormIsBuilt) {
    formBuilder("dialog[modal] article", "create-event");
    buildEventForm("form#create-event");
    let submitBtn = document.querySelector("form#create-event");
    submitBtn.addEventListener("submit", () => submitForm());
    let cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      modal.close();
    });
    eventFormIsBuilt = true;
  }
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});
