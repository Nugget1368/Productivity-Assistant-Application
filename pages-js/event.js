import {
  EVENT_KEY,
  saveToStorage,
  getStorageAsJSON,
  editStorage,
  deleteFromStorage,
} from "../services/localstorage.js";
import { buildEvent, buildEventForm } from "../builders/eventBuilder.js";
import { createEvent } from "../helpers/eventHelper.js";
import { formBuilder } from "../builders/builder.js";
import { getInputValues, listItemHandler } from "../services/inputHandler.js";

const renderEventList = (storage) => {
  let list = document.querySelector("#event-planner-todos ul");
  list.innerHTML = "";
  buildEvent(storage);
  listItemHandler("article#event-planner-todos", storage, ["start", "end"]);
}

//Create Habits in DOM
let storage = getStorageAsJSON(EVENT_KEY);
if (storage) {
  renderEventList(storage);
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
  let article = document.querySelector("dialog[modal] article");
  article.innerHTML = "";
  formBuilder("dialog[modal] article", "create-event");
  buildEventForm("form#create-event");
  let submitBtn = document.querySelector("form#create-event");
  submitBtn.addEventListener("submit", () => submitForm());
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});