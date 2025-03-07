import {
  getStorageAsJSON,
  ACTIVITIES_KEY,
  HABITS_KEY,
  EVENT_KEY,
} from "../services/localstorage.js";
import { buildTodos } from "../builders/todoBuilder.js";
import { checkboxEventHandler } from "../services/inputHandler.js";
import { buildHabit } from "../builders/habitBuilder.js";
import { buildEvent } from "../builders/eventBuilder.js";
import { filterDateList } from "../services/filterSortHandler.js";
import {
  getUserSpecificKey,
  logoutUser,
  getCurrentUser,
} from "../services/auth.js";
import { loadFromJSONAsync } from "../services/jsonHandler.js";


// If user is logged in, the user specific key will be used. If not, the global key will be used
const currentUser = getCurrentUser();
const activitiesKeyToUse = currentUser
  ? getUserSpecificKey(ACTIVITIES_KEY)
  : ACTIVITIES_KEY;
const habitsKeyToUse = currentUser
  ? getUserSpecificKey(HABITS_KEY)
  : HABITS_KEY;
const eventKeyToUse = currentUser ? getUserSpecificKey(EVENT_KEY) : EVENT_KEY;

// --------- Activities (todos) ---------
let todoStorage = getStorageAsJSON(activitiesKeyToUse);
if (todoStorage) {
  todoStorage = todoStorage.filter((element) => element.status === false);
  todoStorage = todoStorage.slice(-3);
  buildTodos(todoStorage);
  checkboxEventHandler(todoStorage, activitiesKeyToUse);
}

// --------- Habits ---------
let habitStorage = getStorageAsJSON(habitsKeyToUse);
if (habitStorage) {
  habitStorage = habitStorage.sort((a, b) => b.repetition - a.repetition);
  habitStorage = habitStorage.slice(0, 3);
  let habitCards = buildHabit(habitStorage);
  let habitSection = document.querySelector("#habit ul");
  habitCards.forEach((element) => habitSection.append(element));
}

// --------- Event-planner ---------
let eventStorage = getStorageAsJSON(eventKeyToUse);
if (eventStorage) {
  eventStorage = filterDateList(eventKeyToUse, "show-upcoming");
  eventStorage = eventStorage.sort((a, b) => a.start.localeCompare(b.start));
  eventStorage = eventStorage.slice(0, 3);
  let eventCards = buildEvent(eventStorage);
  let eventSection = document.querySelector("#event ul");
  eventCards.forEach((element) => eventSection.append(element));
}
// --------- Greets the user/guest ---------
if (currentUser && currentUser.firstName) {
  document.querySelector("#user-name").textContent = currentUser.firstName;
} else {
  document.querySelector("#user-name").textContent = "gäst";
}

// --------- Logs out the user, redirecting to login-page ---------
const logoutLink = document.querySelector("#logoutLink");
logoutLink.addEventListener("click", (event) => {
  event.preventDefault();
  logoutUser();
  window.location.href = "../html-pages/login.html";
});

const weekday = [
  "Söndag",
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
];
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