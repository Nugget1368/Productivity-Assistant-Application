import {HABITS_KEY, saveToStorage, getStorageAsJSON, editStorage, deleteFromStorage} from "../services/localstorage.js";
import {PRIORITIES_KEY, loadFromJSONAsync} from "../services/jsonHandler.js";
import {createHabit} from "../services/habitsHandler.js";
import { buildHabit } from "../builders/habitBuilder.js";

//Create Habits in DOM
let storage = getStorageAsJSON(HABITS_KEY);
buildHabit(storage);