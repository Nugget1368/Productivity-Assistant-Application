import {saveToStorage, deleteFromStorage, ACTIVITIES_KEY, getStorageAsJSON, editStorage} from "../services/localstorage.js"
import {createTodo} from "../services/todoActivities.js"
import {buildTodos} from '../builders/todoBuilder.js';

let storage = getStorageAsJSON(ACTIVITIES_KEY);
console.log(storage);
buildTodos(storage);