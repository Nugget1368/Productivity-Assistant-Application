const buildEvent = (events) => {
    let section = document.querySelector("section.card-container");
    events.forEach(event => {
        let card = document.createElement("article");
        card.classList.add("card");
        let title = document.createElement("h3");
        title.textContent = event.title;
        let div = document.createElement("div");
        let startDate = document.createElement("label");
        startDate.textContent = "Startdatum: " + event.start;
        let endDate = document.createElement("label");
        endDate.textContent = "Slutdatum: " + event.end;
        div.append(startDate, endDate);
        card.append(title, div);
        section.append(card);
    });
}


const buildEventForm = (destionation ="") => {
    let titleDiv = document.createElement("div");
    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Titel";
    let title = document.createElement("input");
    title.setAttribute("id", "title");
    title.required = true;
    titleDiv.append(titleLabel, title);
    
    let startDiv = document.createElement("div");
    let startLabel = document.createElement("label");
    startLabel.textContent = "Startdatum";
    let start = document.createElement("input");
    start.setAttribute("type", "date");
    start.setAttribute("value", new Date().toLocaleDateString());
    start.setAttribute("min", new Date().toLocaleDateString());
    start.setAttribute("id", "start");
    startDiv.append(startLabel, start);
  
    let endDiv = document.createElement("div");
    let endLabel = document.createElement("label");
    endLabel.textContent = "Slutdatum";
    let end = document.createElement("input");
    end.setAttribute("type", "date");
    end.setAttribute("value", new Date().toLocaleDateString());
    end.setAttribute("min", new Date().toLocaleDateString());
    end.setAttribute("id", "end");
    endDiv.append(endLabel, end);
  
    let form = document.querySelector(destionation);
    form.prepend(titleDiv, startDiv, endDiv);
  };

export {buildEvent, buildEventForm}