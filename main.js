import { loadFromJSONAsync, CATEGORIES_KEY } from "./services/jsonHandler.js"
import {saveToStorage, deleteFromStorage, ACTIVITIES_KEY, getStorageAsJSON, editStorage} from "./services/localstorage.js"
import {createTodo} from "./services/todoActivities.js"

let test = await loadFromJSONAsync(CATEGORIES_KEY);
console.log(test);