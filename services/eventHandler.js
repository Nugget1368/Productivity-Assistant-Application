// Shortcut for generating Event-object with all needed parameters
// Dummy Data: "Concert", "2025-02-10", "2025-02-11"
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