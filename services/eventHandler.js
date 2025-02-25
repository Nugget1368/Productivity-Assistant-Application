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


const buildEventForm = (destionation ="", categories = []) => {
    let titleDiv = document.createElement("div");
    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Titel";
    let title = document.createElement("input");
    title.setAttribute("id", "title");
    title.required = true;
    titleDiv.append(titleLabel, title);

    let startDiv = document.createElement("div");
    let startLabel = document.createElement("label");
    startLabel.textContent = "start";
    let start = document.createElement("input");
    start.setAttribute("type", "date");
    start.setAttribute("value", new Date().toLocaleDateString());
    start.setAttribute("min", new Date().toLocaleDateString());
    start.setAttribute("id", "start");
    startDiv.append(startLabel, start);

    let endDiv = document.createElement("div");
    let endLabel = document.createElement("label");
    endLabel.textContent = "end";
    let end = document.createElement("input");
    end.setAttribute("type", "date");
    end.setAttribute("value", new Date().toLocaleDateString());
    end.setAttribute("min", new Date().toLocaleDateString());
    end.setAttribute("id", "end");
    endDiv.append(endLabel, end);
  
    let form = document.querySelector(destionation);
    form.prepend(titleDiv, startDiv, endDiv);
  };

export {createEvent, buildEventForm}