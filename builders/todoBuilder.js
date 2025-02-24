const buildTodos = (todos) => {
  let ul = document.querySelector("#todos ul");
  todos.forEach((todo) => {
    let wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("todo-wrapper");

    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    let title = document.createElement("label");
    let deadline = document.createElement("label");
    checkbox.type = "checkbox";
    checkbox.setAttribute("id", todo.id);
    checkbox.value = todo.status;
    checkbox.checked = todo.status;
    title.textContent = todo.title;
    title.setAttribute("for", todo.id);
    deadline.textContent = "Deadline: " + todo.deadline;
    li.append(wrapperDiv, deadline);
    wrapperDiv.append(checkbox, title);
    ul.append(li);
    li.addEventListener("click", function () {
      let selected = document.querySelector("#todos ul li.selected");
      if (selected && selected !== li) {
        selected.classList.remove("selected");
      }
      li.classList.toggle("selected");
    });
  });
};
const buildTodosForm = () => {
  let modal = document.querySelector("dialog[modal] article");
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Lägg Till Aktivitet";
  let titleDiv = document.createElement("div");
  let titleLabel = document.createElement("label");
  titleLabel.textContent = "Titel";
  let title = document.createElement("input");
  titleDiv.append(titleLabel, title);

  let descriptionDiv = document.createElement("div");
  let descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Beskrivning";
  let description = document.createElement("input");
  descriptionDiv.append(descriptionLabel, description);

  let timeDiv = document.createElement("div");
  let timeLabel = document.createElement("label");
  timeLabel.textContent = "Tidsestimering";
  let time = document.createElement("input");
  timeDiv.append(timeLabel, time);

  let categoryDiv = document.createElement("div");
  let categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Kategori";
  let category = document.createElement("input");
  categoryDiv.append(categoryLabel, category);

  let deadlineDiv = document.createElement("div");
  let deadlineLabel = document.createElement("label");
  deadlineLabel.textContent = "Deadline";
  let deadline = document.createElement("input");
  deadlineDiv.append(deadlineLabel, deadline);

  modal.append(titleDiv, descriptionDiv, timeDiv, categoryDiv, deadlineDiv);
};

export { buildTodos, buildTodosForm };
