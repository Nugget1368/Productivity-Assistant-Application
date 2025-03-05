import { getStorageAsJSON, ACTIVITIES_KEY, HABITS_KEY, EVENT_KEY } from "../services/localstorage.js";
import { buildTodos } from "../builders/todoBuilder.js";
import { checkboxEventHandler } from "../services/inputHandler.js";
import { buildHabit } from "../builders/habitBuilder.js";
import { buildEvent } from "../builders/eventBuilder.js";
import { filterDateList } from "../services/filterSortHandler.js";

let todoStorage = getStorageAsJSON(ACTIVITIES_KEY);
todoStorage = todoStorage.filter((element) => element.status === false);
todoStorage = todoStorage.slice(-3);
buildTodos(todoStorage);
checkboxEventHandler(todoStorage, ACTIVITIES_KEY);

let habitStorage = getStorageAsJSON(HABITS_KEY);
habitStorage = habitStorage.sort((a, b) => b.repetition - a.repetition);
habitStorage = habitStorage.slice(0, 3);
let cards = buildHabit(habitStorage);
let section = document.querySelector("#habit ul");
cards.forEach(element => section.append(element));

let eventStorage = getStorageAsJSON(EVENT_KEY);
eventStorage = filterDateList(EVENT_KEY, "show-upcoming");
eventStorage = eventStorage.sort((a, b) => a.start.localeCompare(b.start));
console.log(eventStorage);
eventStorage = eventStorage.slice(0, 3);
let eventCards = buildEvent(eventStorage);
let eventSection = document.querySelector("#event ul");
eventCards.forEach(element => eventSection.append(element));
