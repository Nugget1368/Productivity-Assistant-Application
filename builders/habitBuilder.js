const buildHabit = (habits) => {
    let section = document.querySelector("section.card-container");
    habits.forEach(habit => {
        let card = document.createElement("article");
        card.classList.add("card");
        let title = document.createElement("h3");
        title.textContent = habit.title;
        let priority = document.createElement("label");
        priority.textContent = `Prioritet: ${habit.priority}`;
        let div = document.createElement("div");
        let repetitionTitle = document.createElement("label");
        repetitionTitle.textContent = "Repitition:";
        let repetition = document.createElement("label");
        repetition.textContent = habit.repetition;
        div.append(repetitionTitle, repetition);
        card.append(title, priority, div);
        section.append(card);
    });
}