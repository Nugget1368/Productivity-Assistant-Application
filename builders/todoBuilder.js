const buildTodos = (todos) => {
  let ul = document.querySelector("#todos ul");
  todos.forEach((todo) => {
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
    deadline = todo.deadline;
    li.append(checkbox, title, deadline);
    ul.append(li);
  });
};

const buildTodosForm = (categories = []) => {
  let modal = document.querySelector("dialog[modal] article");
  let form = document.createElement("form");
  form.setAttribute("id", "create-todo")
  modal.append(form);
  let h3 = document.querySelector("dialog[modal] h3");
  h3.textContent = "Lägg Till Aktivitet";
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
  categories.forEach((c) =>{
    let option = document.createElement("option");
    option.setAttribute("id", `category-${c.id}`);
    option.textContent = c.title;
    category.append(option);
  })
  category.setAttribute("id", "category");
  categoryDiv.append(categoryLabel, category);

  let deadlineDiv = document.createElement("div");
  let deadlineLabel = document.createElement("label");
  deadlineLabel.textContent = "Deadline";
  let deadline = document.createElement("input");
  deadline.setAttribute("id", "deadline");
  deadlineDiv.append(deadlineLabel, deadline);

  let submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Lägg till";
  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("id", "cancel-btn");
  cancelBtn.customAttribute = "close-modal"
  cancelBtn.textContent = "Avbryt";
  let footer = document.createElement("footer");
  footer.append(submitBtn, cancelBtn);

  form.append(titleDiv, descriptionDiv, timeDiv, categoryDiv, deadlineDiv, footer);
};

export { buildTodos, buildTodosForm };