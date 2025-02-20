// Shortcut for generating habit-object with all needed parameters
// Dummy Data: "Go to the gym", 0, "Mellan"
const createHabit = (title = "Title", repetition = 0, priority = "Låg") => {
    const habit = {
        id: Date.now(),
        title,
        repetition,
        priority
    };
    return habit;
}

export {createHabit}