const createEvent = (title = "Title", start = new Date().toLocaleDateString(), end = new Date().toLocaleDateString()) => {
  const event = {
    id: Date.now(),
    title,
    start,
    end
  };
  return event;
};

export { createEvent };