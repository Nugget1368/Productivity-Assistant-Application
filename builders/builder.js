export const formBuilder = (destination = "", formId = "") => {
    let dest = document.querySelector(destination); //dialog[modal] article
    let form = document.createElement("form");
    form.setAttribute("id", formId)
    dest.append(form);
    let submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Lägg till";
    let cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("id", "cancel-btn");
    cancelBtn.customAttribute = "close-modal"
    cancelBtn.textContent = "Avbryt";
    form.append(cancelBtn, submitBtn);
}