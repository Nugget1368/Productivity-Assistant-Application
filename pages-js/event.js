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
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Lägg till nytt Event";
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

// work in progress

let events = document.querySelectorAll("article#event-planner-todos ul li");
events.forEach((event) => {
  event.addEventListener("click", (event) => {
    let listItemId = event.currentTarget.id;
    let storage = getStorageAsJSON(EVENT_KEY);
    let newObj = storage.find((element) => element.id == listItemId);
    let h2 = document.querySelector("#todo-popup-h2");
    h2.textContent = newObj.title;

    let allowedKeys = ["start", "end"];
    let ul = document.querySelector("#todo-popup-status ul");
    ul.innerHTML = "";
    Object.entries(newObj)
        .filter(([key, _]) => allowedKeys.includes(key))
        .forEach(([key, value]) => {
            let li = document.createElement("li");
            ul.append(li);
            li.innerHTML = `<strong><span>${key.charAt(0).toUpperCase() + key.slice(1)}:</span></strong> ${value}`
    });
  });
});