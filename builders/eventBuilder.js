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

export {buildEvent}