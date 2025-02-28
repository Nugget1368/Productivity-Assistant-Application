// When todo-list should build this is needed to get eventhandlers for each list-item
const renderTodoList = (storage = []) => {};

export const buildTodos = (todos) => {
  let ul = document.querySelector("#todos ul");

  todos.forEach((todo) => {
    let wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("todo-wrapper");

    let li = document.createElement("li");
    li.setAttribute("id", todo.id);
    let checkbox = document.createElement("input");
    let title = document.createElement("label");
    let deadline = document.createElement("label");
    checkbox.type = "checkbox";
    checkbox.value = todo.status;
    if (todo.status) {
      li.classList.add("done-todo");
    }
    checkbox.checked = todo.status;
    title.textContent = todo.title;
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

export const buildTodosForm = (destination = "", categories = []) => {
  let titleDiv = document.createElement("div");
  let titleLabel = document.createElement("label");
  titleLabel.textContent = "Titel";
  let title = document.createElement("input");
  title.setAttribute("id", "title");
  title.required = true;
  titleDiv.append(titleLabel, title);

  let descriptionDiv = document.createElement("div");
  let descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Beskrivning";

  let description = document.createElement("input");
  description.setAttribute("id", "description");
  descriptionDiv.append(descriptionLabel, description);

  let timeDiv = document.createElement("div");
  let timeLabel = document.createElement("label");
  timeLabel.textContent = "Tidsestimering (h)";

  let time = document.createElement("input");
  time.setAttribute("type", "number");
  time.setAttribute("id", "time");
  timeDiv.append(timeLabel, time);

  let categoryDiv = document.createElement("div");
  let categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Kategori";

  let category = document.createElement("select");
  categories.forEach((c) => {
    let option = document.createElement("option");
    option.setAttribute("id", `category-${c.id}`);
    option.textContent = c.title;
    category.append(option);
  });
  category.setAttribute("id", "category");
  categoryDiv.append(categoryLabel, category);

  let deadlineDiv = document.createElement("div");
  let deadlineLabel = document.createElement("label");
  deadlineLabel.textContent = "Deadline";
  let deadline = document.createElement("input");
  deadline.setAttribute("type", "date");
  deadline.setAttribute("value", new Date().toLocaleDateString());
  deadline.setAttribute("min", new Date().toLocaleDateString());
  deadline.setAttribute("id", "deadline");
  deadlineDiv.append(deadlineLabel, deadline);

  let form = document.querySelector(destination);
  form.prepend(titleDiv, descriptionDiv, timeDiv, categoryDiv, deadlineDiv);
};

export const buildSortDropdown = (destination = "") => {
  let sortOptions = [
    "Senast tillagda",
    "Datum",
    "Tidsestimat (lägst)",
    "Tidsestimat (högst)",
    "Slutförda",
    "Ej Slutförda",
  ];
  let dropdown = document.querySelector(`select${destination}`);
  let index = 0;
  sortOptions.forEach((sortOption) => {
    let option = document.createElement("option");
    option.textContent = sortOption;
    option.setAttribute("id", `sort-option-${index}`);
    dropdown.append(option);
    index++;
  });
};

export const buildCategoriesDropdownAsync = async (destination = "", categories = []) => {
  let categoriesDropdown = document.querySelector(`select${destination}`);
  categories.forEach((category) => {
    let option = document.createElement("option");
    option.textContent = category.title;
    option.setAttribute("id", `category-${category.id}`);
    categoriesDropdown.append(option);
  });
};