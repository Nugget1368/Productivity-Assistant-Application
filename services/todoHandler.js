// Shortcut for generating todo-object with all needed parameters
// Dummy Data: "Do This!", "Doing it!", false, 2, "Category", "2025-01-01"
const createTodo = (title, description, status, time, category, deadline) => {
    const todo = {
        id: Date.now(),
        title,
        description,
        status,
        time,
        category,
        deadline,
    };
    return todo;
}

export {createTodo}