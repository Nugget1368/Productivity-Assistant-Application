export const buildEvent = (events) => {
  let ul = document.querySelector("article#event-planner-todos ul");

  events.forEach((event) => {
    let li = document.createElement("li");
    li.setAttribute("id", event.id);
    let card = document.createElement("article");
    card.classList.add("card");
    let title = document.createElement("h3");
    title.textContent = event.title;
    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-calendar-days");
    title.textContent = event.title;
    title.prepend(icon);
    let div = document.createElement("div");

    let startDate = document.createElement("label");
    startDate.textContent = "Startdatum: " + event.start;

    let endDate = document.createElement("label");
    endDate.textContent = "Slutdatum: " + event.end;
    
    if (event.start < new Date().toLocaleDateString() && event.end < new Date().toLocaleDateString()) {
      li.classList.add("done-todo");
    }
    if (event.start <= new Date().toLocaleDateString() && event.end >= new Date().toLocaleDateString()) {
      li.classList.add("active")
    }

    div.append(startDate, endDate);
    card.append(title, div);
    li.append(card);

    li.addEventListener("click", function () {
      let selected = document.querySelector("#event-planner-todos ul li.selected");
      if (selected && selected !== li) {
        selected.classList.remove("selected");
      }
      li.classList.toggle("selected");
    });
    ul.append(li);
  });
};

export const buildEventForm = (destination = "") => {
  let titleDiv = document.createElement("div");
  let titleLabel = document.createElement("label");
  titleLabel.textContent = "Titel";
  let title = document.createElement("input");
  title.setAttribute("id", "title");
  title.required = true;
  titleDiv.append(titleLabel, title);

  let startDiv = document.createElement("div");
  let startLabel = document.createElement("label");
  startLabel.textContent = "Startdatum";
  let start = document.createElement("input");
  start.setAttribute("type", "date");
  start.setAttribute("value", new Date().toLocaleDateString());
  start.setAttribute("min", new Date().toLocaleDateString());
  start.setAttribute("id", "start");
  startDiv.append(startLabel, start);

  let endDiv = document.createElement("div");
  let endLabel = document.createElement("label");
  endLabel.textContent = "Slutdatum";
  let end = document.createElement("input");
  end.setAttribute("type", "date");
  end.setAttribute("value", new Date().toLocaleDateString());
  end.setAttribute("min", new Date().toLocaleDateString());
  end.setAttribute("id", "end");
  endDiv.append(endLabel, end);

  let form = document.querySelector(destination);
  form.prepend(titleDiv, startDiv, endDiv);
};
