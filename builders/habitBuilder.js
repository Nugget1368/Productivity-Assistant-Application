export const buildHabit = (habits) => {
  let section = document.querySelector("section.card-container");
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