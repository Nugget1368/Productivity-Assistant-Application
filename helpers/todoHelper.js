// Shortcut for generating todo-object with all needed parameters
// Dummy Data: "Do This!", "Doing it!", false, 2, "Category", "2025-01-01"
const createTodo = (title = "Title", description = "Saknar beskrivning", time = 0, category = "Ingen vald...", deadline = "") => {
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