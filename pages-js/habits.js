import { HABITS_KEY, saveToStorage, getStorageAsJSON, editStorage, deleteFromStorage } from "../services/localstorage.js";
import { PRIORITIES_KEY, loadFromJSONAsync } from "../services/jsonHandler.js";
import { createHabit } from "../helpers/habitsHelper.js";
import { buildHabit, buildHabitForm } from "../builders/habitBuilder.js";
import { formBuilder } from "../builders/builder.js";
import { getInputValues, increaseDecreaseHandler } from "../services/inputHandler.js";

const createBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

const renderPage = () => {
  let list = document.querySelector("section.card-container");
  list.innerHTML = "";
  let storage = getStorageAsJSON(HABITS_KEY);
  if (storage) {
    buildHabit(storage);
    // listItemHandler("article#todos", storage, ["description", "status", "time", "category", "deadline"]);
    increaseDecreaseHandler("section.card-container", storage, HABITS_KEY);
  }

}

renderPage();
//Create Habits in DOM

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