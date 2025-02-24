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
import { getInputValues } from "../services/inputHandler.js";

let eventFormIsBuilt = false;

//Create Habits in DOM
let storage = getStorageAsJSON(EVENT_KEY);
if (storage) {
  buildEvent(storage);
}

const submitForm = () => {
  let values = getInputValues("form#create-event");
  let event = createEvent(values[0], values[1], values[2]);
  saveToStorage(EVENT_KEY, event);
};

const createBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

createBtn.addEventListener("click", async () => {
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
