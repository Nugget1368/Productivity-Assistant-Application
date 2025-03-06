import { getStorageAsJSON, ACTIVITIES_KEY, HABITS_KEY, EVENT_KEY } from "../services/localstorage.js";
import { buildTodos } from "../builders/todoBuilder.js";
import { checkboxEventHandler } from "../services/inputHandler.js";
import { buildHabit } from "../builders/habitBuilder.js";
import { buildEvent } from "../builders/eventBuilder.js";
import { filterDateList } from "../services/filterSortHandler.js";
import { getUserSpecificKey, logoutUser, getCurrentUser } from "../services/auth.js";

// Bestäm vilken nyckel som ska användas:
// Om någon är inloggad används den användarspecifika nyckeln, annars används den globala nyckeln.
const currentUser = getCurrentUser();
const activitiesKeyToUse = currentUser ? getUserSpecificKey(ACTIVITIES_KEY) : ACTIVITIES_KEY;
const habitsKeyToUse = currentUser ? getUserSpecificKey(HABITS_KEY) : HABITS_KEY;
const eventKeyToUse = currentUser ? getUserSpecificKey(EVENT_KEY) : EVENT_KEY;

// --------- Aktiviteter (Todos) ---------
let todoStorage = getStorageAsJSON(activitiesKeyToUse) || [];
todoStorage = todoStorage.filter((element) => element.status === false);
todoStorage = todoStorage.slice(-3);
buildTodos(todoStorage);
checkboxEventHandler(todoStorage, activitiesKeyToUse);

// --------- Rutiner (Habits) ---------
let habitStorage = getStorageAsJSON(habitsKeyToUse) || [];
habitStorage = habitStorage.sort((a, b) => b.repetition - a.repetition);
habitStorage = habitStorage.slice(0, 3);
let habitCards = buildHabit(habitStorage);
let habitSection = document.querySelector("#habit ul");
habitCards.forEach(element => habitSection.append(element));

// --------- Event ---------
let eventStorage = getStorageAsJSON(eventKeyToUse) || [];
eventStorage = filterDateList(eventKeyToUse, "show-upcoming");
eventStorage = eventStorage.sort((a, b) => a.start.localeCompare(b.start));
eventStorage = eventStorage.slice(0, 3);
let eventCards = buildEvent(eventStorage);
let eventSection = document.querySelector("#event ul");
eventCards.forEach(element => eventSection.append(element));

// --------- Greets the user/guest ---------
if (currentUser && currentUser.firstName) {
  document.getElementById("user-name").textContent = currentUser.firstName;
} else {
  document.getElementById("user-name").textContent = "gäst";
}

// --------- Logs out the user, redirecting to login-page ---------
const logoutLink = document.getElementById("logoutLink");
logoutLink.addEventListener("click", (event) => {
  event.preventDefault();
  logoutUser();
  window.location.href = "../html-pages/login.html";
});