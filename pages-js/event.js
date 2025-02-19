import {EVENT_KEY, saveToStorage, getStorageAsJSON, editStorage, deleteFromStorage} from "../services/localstorage.js";
import {PRIORITIES_KEY, loadFromJSONAsync} from "../services/jsonHandler.js";
import {createHabit} from "../services/habitsHandler.js";
import { buildEvent } from "../builders/eventBuilder.js";

//Create Habits in DOM
let storage = getStorageAsJSON(EVENT_KEY);
buildEvent(storage);