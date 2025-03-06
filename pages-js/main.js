import { getStorageAsJSON, ACTIVITIES_KEY, HABITS_KEY, EVENT_KEY } from "../services/localstorage.js";
import { buildTodos } from "../builders/todoBuilder.js";
import { checkboxEventHandler } from "../services/inputHandler.js";
import { buildHabit } from "../builders/habitBuilder.js";
import { buildEvent } from "../builders/eventBuilder.js";
import { filterDateList } from "../services/filterSortHandler.js";
import { loadFromJSONAsync } from "../services/jsonHandler.js";

const weekday = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
const monthNames = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
];

// DATUM
const d = new Date();
let day = weekday[d.getDay()];
let date = d.getDate();
let month = monthNames[d.getMonth()];

let fullDate = `${day} ${date} ${month}`;

document.querySelector(".h2-startpage").textContent = fullDate;

//API
let quoteData = await loadFromJSONAsync("https://dummyjson.com/quotes/random");
let quoteElement = document.querySelector("#quote");
if (quoteElement && quoteData && quoteData.quote) {
  quoteElement.textContent = quoteData.quote;
}

let todoStorage = getStorageAsJSON(ACTIVITIES_KEY);
if (todoStorage) {
  todoStorage = todoStorage.filter((element) => element.status === false);
  todoStorage = todoStorage.slice(-3);
  buildTodos(todoStorage);
  checkboxEventHandler(todoStorage, ACTIVITIES_KEY);
}

let habitStorage = getStorageAsJSON(HABITS_KEY);
if (habitStorage) {
  habitStorage = habitStorage.sort((a, b) => b.repetition - a.repetition);
  habitStorage = habitStorage.slice(0, 3);
  let cards = buildHabit(habitStorage);
  let section = document.querySelector("#habit ul");
  cards.forEach((element) => section.append(element));
}

let eventStorage = getStorageAsJSON(EVENT_KEY);
if (eventStorage) {
  eventStorage = filterDateList(EVENT_KEY, "show-upcoming");
  eventStorage = eventStorage.sort((a, b) => a.start.localeCompare(b.start));
  eventStorage = eventStorage.slice(0, 3);
  let eventCards = buildEvent(eventStorage);
  let eventSection = document.querySelector("#event ul");
  eventCards.forEach((element) => eventSection.append(element));
}
