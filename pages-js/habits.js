import { HABITS_KEY, saveToStorage, getStorageAsJSON, editStorage, deleteFromStorage } from "../services/localstorage.js";
import { PRIORITIES_KEY, loadFromJSONAsync } from "../services/jsonHandler.js";
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
    increaseDecreaseHandler("section.card-container", storage, HABITS_KEY);
  } 
}
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

//Categories Dropdown
let priorities = await loadFromJSONAsync(PRIORITIES_KEY);
buildCategoriesDropdownAsync("#priorities-dropdown", priorities);
//Event-handling
let categoryDrop = document.querySelector("select#priorities-dropdown");
categoryDrop.addEventListener("change", () => {
  storage = filterCategoryList("#priorities-dropdown", HABITS_KEY, ["priority"]);
  renderPage(storage);
});
let sortOptions = [
  "Senast tillagda",
  "Repetitioner (lägst)",
  "Repetitioner (högst)",
  "Prioritet (lägst)",
  "Prioritet (högst)"
  ];
buildSortDropdown("#sort-dropdown", sortOptions);
let sortDropdown = document.querySelector("select#sort-dropdown");
sortDropdown.addEventListener("change", async () => {
  storage = sortList(sortDropdown.value, storage);
  renderPage(storage);
});