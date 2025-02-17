// Shortcut for generating todo-object with all needed parameters
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