export const formBuilder = (destination = "", formId = "") => {
    let dest = document.querySelector(destination); //dialog[modal] article
    let form = document.createElement("form");
    form.setAttribute("id", formId)
    dest.append(form);
    let submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.classList.add("add-button");
    submitBtn.textContent = "Lägg till";
    let cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("id", "cancel-btn");
    cancelBtn.customAttribute = "close-modal"
    cancelBtn.classList.add("delete-btn");
    cancelBtn.textContent = "Avbryt";
    let footer = document.createElement("footer");
    footer.append(submitBtn, cancelBtn);
    form.append(footer);
    //Cancel submit
    cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        let modal = document.querySelector("dialog[modal]");
        modal.close();
    });
}