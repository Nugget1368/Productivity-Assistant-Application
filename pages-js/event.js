import {EVENT_KEY, saveToStorage, getStorageAsJSON, editStorage, deleteFromStorage} from "../services/localstorage.js";
import { buildEvent } from "../builders/eventBuilder.js";
import { createEvent } from "../services/eventHandler.js";

//Create Habits in DOM
let storage = getStorageAsJSON(EVENT_KEY);
buildEvent(storage);