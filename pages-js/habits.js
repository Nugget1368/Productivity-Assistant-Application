import { HABITS_KEY, saveToStorage, getStorageAsJSON, editStorage, deleteFromStorage } from "../services/localstorage.js";
import { PRIORITIES_KEY, loadFromJSONAsync } from "../services/jsonHandler.js";
import { createHabit } from "../services/habitsHandler.js";
import { buildHabit, buildHabitForm } from "../builders/habitBuilder.js";
import {formBuilder} from "../builders/builder.js";


let habitFormIsBuilt = false;

//Create Habits in DOM
let storage = getStorageAsJSON(HABITS_KEY);
if (storage) {
  buildHabit(storage);
}


const submitForm = () => {
  let inputs = document.querySelectorAll("form#create-habit input, form#create-habit select");
  let values = [];
  inputs.forEach((input) => {
    values.push(input.value);
  });
  let habit = createHabit(values[0], values[1]);
  saveToStorage(HABITS_KEY, habit);
};

const createBtn = document.querySelector("[open-modal]");
const closeModalBtn = document.querySelector("[close-modal]");
const modal = document.querySelector("[modal]");

createBtn.addEventListener("click", async() => {
  if(!habitFormIsBuilt){
    let priorities = await loadFromJSONAsync(PRIORITIES_KEY);
    formBuilder("dialog[modal] article", "create-habit");
    buildHabitForm("form#create-habit", priorities);
    let submitBtn = document.querySelector("form#create-habit");
    submitBtn.addEventListener("submit", () => submitForm());
    let cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      modal.close();
    });
    habitFormIsBuilt = true;
  }
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});