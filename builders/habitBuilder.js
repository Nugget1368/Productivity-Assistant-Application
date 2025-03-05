export const buildHabit = (habits) => {
  let section = document.querySelector("section.card-container");
  section.innerHTML = "";

  habits.forEach((habit) => {
    let card = document.createElement("article");
    card.classList.add("card");
    card.id = habit.id;

    let title = document.createElement("h3");
    title.textContent = habit.title;

    let priority = document.createElement("label");
    priority.textContent = `Prioritet: ${habit.priority}`;

    let div = document.createElement("div");

    let repetitionTitle = document.createElement("label");
    repetitionTitle.textContent = "Repitition:";

    let repetition = document.createElement("input");
    repetition.type = "number";
    repetition.min = 0;
    repetition.value = habit.repetition;

    let plus = document.createElement("span");
    plus.textContent = "+";
    plus.classList.add("increase");

    let minus = document.createElement("span");
    minus.textContent = "-";
    minus.classList.add("decrease");

    let repetitionContainer = document.createElement("section");
    repetitionContainer.classList.add("repetitions");
    repetitionContainer.append(minus, repetition, plus);
    div.classList.add("repetitions");
    div.append(repetitionTitle, repetitionContainer);
    card.append(title, priority, div);

    card.addEventListener("click", () => {
      document.querySelector(".container-wrapper .todos-right").setAttribute("selected-item", habit.id);

      let selected = document.querySelector(".card-container .card.selected");
      if (selected && selected !== card) {
        selected.classList.remove("selected");
      }

      card.classList.toggle("selected");

      let panelHeader = document.querySelector(".todos-right h2");
      panelHeader.textContent = habit.title;

      // Uppdatera todo-right info med prioritet och repitition
      let infoDiv = document.querySelector(".todos-right #todo-popup-info");
      if (infoDiv) {
        infoDiv.innerHTML = ""; // Rensar tidigare innehåll
        let priorityP = document.createElement("p");
        priorityP.textContent = `Prioritet: ${habit.priority}`;
        let repetitionP = document.createElement("p");
        repetitionP.textContent = `Repitition: ${habit.repetition}`;
        infoDiv.append(priorityP, repetitionP);
      }
    });

    section.append(card);
  });
};

export const buildHabitForm = (destination = "", priorities = []) => {
  let titleDiv = document.createElement("div");
  let titleLabel = document.createElement("label");
  titleLabel.textContent = "Titel";
  let title = document.createElement("input");
  title.setAttribute("id", "title");
  title.required = true;
  titleDiv.append(titleLabel, title);

  let priorityDiv = document.createElement("div");
  let priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Prioritet";
  let select = document.createElement("select");
  priorities.forEach((priority) => {
    let option = document.createElement("option");
    option.textContent = priority.title;
    option.setAttribute("id", `priority-${priority.id}`);
    select.append(option);
  });
  select.setAttribute("id", "priority");
  priorityDiv.append(priorityLabel, select);

  let form = document.querySelector(destination);
  form.prepend(titleDiv, priorityDiv);
};
