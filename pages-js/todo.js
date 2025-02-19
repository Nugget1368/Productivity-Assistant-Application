import {saveToStorage, deleteFromStorage, ACTIVITIES_KEY, getStorageAsJSON, editStorage} from "../services/localstorage.js"
import {createTodo} from "../services/todoActivities.js"
import {buildTodos} from '../builders/todoBuilder.js';

//Create Todos in DOM
let storage = getStorageAsJSON(ACTIVITIES_KEY);
buildTodos(storage);