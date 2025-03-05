import {
  HABITS_KEY,
  saveToStorage,
  getStorageAsJSON,
  editStorage,
  deleteFromStorage,
} from "../services/localstorage.js";
import { PRIORITIES_KEY, SORT_OPTIONS_KEY, loadFromJSONAsync } from "../services/jsonHandler.js";
import { createHabit } from "../helpers/habitsHelper.js";
import { buildHabit, buildHabitForm } from "../builders/habitBuilder.js";
import { formBuilder } from "../builders/builder.js";
import { buildCategoriesDropdownAsync, buildSortDropdown } from "../builders/builder.js";
import { filterCategoryList, sortList } from "../services/filterSortHandler.js";
import { getInputValues, increaseDecreaseHandler } from "../services/inputHandler.js";

let storage = getStorageAsJSON(HABITS_KEY);
const createBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

const renderPage = () => {
  if (storage) {
    buildHabit(storage);
    // listItemHandler("article#todos", storage, ["description", "status", "time", "category", "deadline"]);
    increaseDecreaseHandler("article.card-container", storage, HABITS_KEY);
  }
};
//Create Habits in DOM
renderPage();

const submitForm = () => {
  let values = getInputValues("form#create-habit");
  let habit = createHabit(values[0], values[1]);
  saveToStorage(HABITS_KEY, habit);
};

createBtn.addEventListener("click", async () => {
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Lägg till ny Rutin";
  let article = document.querySelector("dialog[modal] article");
  article.innerHTML = "";
  let priorities = await loadFromJSONAsync(PRIORITIES_KEY);
  formBuilder("dialog[modal] article", "create-habit");
  buildHabitForm("form#create-habit", priorities);
  let submitBtn = document.querySelector("form#create-habit");
  submitBtn.addEventListener("submit", () => submitForm());
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

const deleteBtn = document.querySelector("[open-modal].delete-btn");

deleteBtn.addEventListener("click", (event) => {
  let modal = document.querySelector("dialog[modal]");
  let modalHeader = document.querySelector("dialog[modal] h3");
  let modalArticle = document.querySelector("dialog[modal] article");

  modalHeader.textContent = "Bekräfta radering";
  modalArticle.innerHTML = ""; // Rensa tidigare innehåll

  // Använd formBuilder för att skapa raderingsformuläret (med "delete"-läge)
  let { submitBtn } = formBuilder("dialog[modal] article", "delete-habit-form", "delete");

  let selectedHabitId = document.querySelector(".container-wrapper .todos-right").getAttribute("selected-item");

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    deleteFromStorage(HABITS_KEY, Number(selectedHabitId));
    modal.close();
    location.reload();
  });

  modal.showModal();
});

const editBtn = document.querySelector("[open-modal].edit-btn");

editBtn.addEventListener("click", async () => {
  let modal = document.querySelector("dialog[modal]");
  let modalHeader = document.querySelector("dialog[modal] h3");
  let modalArticle = document.querySelector("dialog[modal] article");

  modalHeader.textContent = "Redigera Rutin";
  modalArticle.innerHTML = "";

  let selectedHabitId = document.querySelector(".container-wrapper .todos-right").getAttribute("selected-item");

  let storage = getStorageAsJSON(HABITS_KEY);
  let selectedHabit = storage.find((habit) => habit.id == selectedHabitId);

  let priorities = await loadFromJSONAsync(PRIORITIES_KEY);

  let { submitBtn } = formBuilder("dialog[modal] article", "edit-habit-form", "edit");

  buildHabitForm("form#edit-habit-form", priorities);

  document.querySelector("#title").value = selectedHabit.title;
  document.querySelector("#priority").value = selectedHabit.priority;

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let updatedHabit = createHabit(document.querySelector("#title").value, document.querySelector("#priority").value);
    updatedHabit.id = selectedHabit.id;
    updatedHabit.repetition = selectedHabit.repetition;

    editStorage(HABITS_KEY, updatedHabit);
    modal.close();
    location.reload();
  });

  modal.showModal();
});

//Categories Dropdown
let priorities = await loadFromJSONAsync(PRIORITIES_KEY);
buildCategoriesDropdownAsync("#priorities-dropdown", priorities);
//Event-handling
let categoryDrop = document.querySelector("select#priorities-dropdown");
categoryDrop.addEventListener("change", () => {
  storage = filterCategoryList("#priorities-dropdown", HABITS_KEY, ["priority"]);
  renderPage(storage);
});

let options = await loadFromJSONAsync(SORT_OPTIONS_KEY);
buildSortDropdown("#sort-dropdown", options.habit);
let sortDropdown = document.querySelector("select#sort-dropdown");
sortDropdown.addEventListener("change", async () => {
  storage = sortList(sortDropdown.value, storage);
  renderPage(storage);
});
