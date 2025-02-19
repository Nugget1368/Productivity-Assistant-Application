// Shortcut for generating Event-object with all needed parameters
// Dummy Data: "Go to the gym", 0, "Mellan"
const createEvent = (title ="Title", start = new Date().toLocaleDateString(), end = new Date().toLocaleDateString()) => {
    const event = {
        id: Date.now(),
        title,
        start,
        end
    };
    return event;
}

export {createEvent}