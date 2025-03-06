import {
  saveToStorage,
  deleteFromStorage,
  ACTIVITIES_KEY,
  getStorageAsJSON,
  editStorage,
} from "../services/localstorage.js";
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
