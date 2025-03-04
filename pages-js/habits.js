import { HABITS_KEY, saveToStorage, getStorageAsJSON, editStorage, deleteFromStorage } from "../services/localstorage.js";
import { PRIORITIES_KEY, loadFromJSONAsync } from "../services/jsonHandler.js";
import { createHabit } from "../helpers/habitsHelper.js";
import { buildHabit, buildHabitForm } from "../builders/habitBuilder.js";
import { formBuilder } from "../builders/builder.js";
import { getInputValues } from "../services/inputHandler.js";
import { buildCategoriesDropdownAsync } from "../builders/builder.js";
import { filterCategoryList } from "../services/filterSortHandler.js";

const createBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

const renderHabitList = (storage) => {
  buildHabit(storage);
  // listItemHandler("article#todos", storage, ["description", "status", "time", "category", "deadline"]);
};

//Create Habits in DOM
let storage = getStorageAsJSON(HABITS_KEY);
if (storage) {
  renderHabitList(storage);
}

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
  renderHabitList(storage);
});