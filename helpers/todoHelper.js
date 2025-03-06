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