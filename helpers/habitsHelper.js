const createHabit = (title = "Title", priority = "Låg") => {
    const habit = {
        id: Date.now(),
        title,
        repetition: 0,
        priority
    };
    return habit;
}

export {createHabit}