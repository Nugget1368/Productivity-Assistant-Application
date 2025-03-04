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

const createBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

const renderEventList = (storage) => {
  let list = document.querySelector("#event-planner-todos ul");
  list.innerHTML = "";
  buildEvent(storage);
  listItemHandler("article#event-planner-todos", storage, ["start", "end"]);
};

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

let deleteBtn = document.querySelector("[open-modal].delete-btn");
deleteBtn.addEventListener("click", (event) => {
  let modal = document.querySelector("dialog[modal]");
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Bekräfta radering";
  let article = document.querySelector("dialog[modal] article");
  article.innerHTML = ""; // Rensa tidigare innehåll

  // Skapar "Ja, radera"-knappen
  let confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Ja, radera";
  confirmBtn.classList.add("confirm-delete");
  confirmBtn.addEventListener("click", (event) => {
    let article = document.querySelector(".container-wrapper .todos-right");
    let todoId = article.getAttribute("selected-item");
    deleteFromStorage(EVENT_KEY, Number(todoId));
    modal.close();
    location.reload();
  });

  // Skapar "Avbryt"-knappen
  let cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Avbryt";
  cancelBtn.classList.add("cancel-delete");
  cancelBtn.addEventListener("click", () => {
    modal.close(); // Stäng modalen utan att radera
  });

  // Lägger till knapparna i modalen
  article.appendChild(confirmBtn);
  article.appendChild(cancelBtn);

  modal.showModal();
});

let editBtn = document.querySelector("[open-modal].edit-btn");
editBtn.addEventListener("click", () => {
  let modal = document.querySelector("dialog[modal]");
  let modalHeader = document.querySelector("dialog[modal] h3");
  let modalArticle = document.querySelector("dialog[modal] article");

  modalHeader.textContent = "Redigera ditt event";
  modalArticle.innerHTML = "";

  let selectedEventId = document.querySelector(".container-wrapper .todos-right").getAttribute("selected-item");

  let storage = getStorageAsJSON(EVENT_KEY);
  let selectedEvent = storage.find((event) => event.id == selectedEventId);

  let { submitBtn } = formBuilder("dialog[modal] article", "edit-event", "edit");
  buildEventForm("form#edit-event");

  document.querySelector("#title").value = selectedEvent.title;
  document.querySelector("#start").value = selectedEvent.start;
  document.querySelector("#end").value = selectedEvent.end;

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    let updatedEvent = {
      id: selectedEvent.id,
      title: document.querySelector("#title").value,
      start: document.querySelector("#start").value,
      end: document.querySelector("#end").value,
    };

    editStorage(EVENT_KEY, updatedEvent);
    modal.close();
    location.reload();
  });

  modal.showModal();
});
