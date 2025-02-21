import {HABITS_KEY, saveToStorage, getStorageAsJSON, editStorage, deleteFromStorage} from "../services/localstorage.js";
import {PRIORITIES_KEY, loadFromJSONAsync} from "../services/jsonHandler.js";
import {createHabit} from "../services/habitsHandler.js";
import { buildHabit } from "../builders/habitBuilder.js";

//Create Habits in DOM
let storage = getStorageAsJSON(HABITS_KEY);
if(storage){
  buildHabit(storage);
}


const submitForm = () => {
    let inputs = document.querySelectorAll("form#create-habit input");
    let values = [];
    inputs.forEach((input) => {
      values.push(input.value);
    });
    let habit = createHabit(values[0], values[1]);
    saveToStorage(HABITS_KEY, habit);
  };
  
  let form = document.querySelector("form#create-habit");
  form.addEventListener("submit", () => submitForm());
  
  const openModalBtn = document.querySelector("[open-modal]");
  const closeModalBtn = document.querySelector("[close-modal]");
  const modal = document.querySelector("[modal]");
  
  openModalBtn.addEventListener("click", () => {
    // buildTodosForm();
    modal.showModal();
  });
  
  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });