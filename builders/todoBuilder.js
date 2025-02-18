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

export { buildTodos };
