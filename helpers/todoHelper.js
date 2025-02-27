// Shortcut for generating todo-object with all needed parameters
// Dummy Data: "Do This!", "Doing it!", false, 2, "Category", "2025-01-01"
// const createTodo = (title = "Title", description = "No description added", status = false, time = 0, category = "No Category", deadline = new Date().toLocaleDateString()) => {
const createTodo = (title = "Title", description = "No description added", time = 0, category = "No Category", deadline = new Date().toLocaleDateString()) => {
    const todo = {
        id: Date.now(),
        title,
        description,
        status : false,
        time,
        category,
        deadline,
    };
    return todo;
}

export {createTodo}