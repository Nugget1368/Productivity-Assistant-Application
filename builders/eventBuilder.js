const buildEvent = (events) => {
    let section = document.querySelector("section.card-container");
    events.forEach(event => {
        let card = document.createElement("article");
        card.classList.add("card");
        let title = document.createElement("h3");
        title.textContent = event.title;
        let priority = document.createElement("label");
        priority.textContent = `Prioritet: ${event.priority}`;
        let div = document.createElement("div");
        let repetitionTitle = document.createElement("label");
        repetitionTitle.textContent = "Repitition:";
        let repetition = document.createElement("label");
        repetition.textContent = event.repetition;
        div.append(repetitionTitle, repetition);
        card.append(title, priority, div);
        section.append(card);
    });
}

export {buildEvent}