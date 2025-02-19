import {EVENT_KEY, saveToStorage, getStorageAsJSON, editStorage, deleteFromStorage} from "../services/localstorage.js";
import {PRIORITIES_KEY, loadFromJSONAsync} from "../services/jsonHandler.js";
import { buildEvent } from "../builders/eventBuilder.js";
import { createEvent } from "../services/eventHandler.js";

let event = createEvent();
let event2 = createEvent("Concert", "2025-02-10", "2025-02-11");
console.log(event);
console.log(event2);
let date = new Date().toLocaleDateString();
// let today = date.getDate()
console.log(date);

//Create Habits in DOM
// let storage = getStorageAsJSON(EVENT_KEY);
// buildEvent(storage);