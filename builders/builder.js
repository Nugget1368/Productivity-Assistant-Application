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


export const buildSortDropdown = (destination = "") => {
    let sortOptions = [
      "Senast tillagda",
      "Datum",
      "Tidsestimat (lägst)",
      "Tidsestimat (högst)",
      "Slutförda",
      "Ej Slutförda",
    ];
    let dropdown = document.querySelector(`select${destination}`);
    let index = 0;
    sortOptions.forEach((sortOption) => {
      let option = document.createElement("option");
      option.textContent = sortOption;
      option.setAttribute("id", `sort-option-${index}`);
      dropdown.append(option);
      index++;
    });
  };
  
  export const buildCategoriesDropdownAsync = async (destination = "", categories = []) => {
    let categoriesDropdown = document.querySelector(`select${destination}`);
    categories.forEach((category) => {
      let option = document.createElement("option");
      option.textContent = category.title;
      option.setAttribute("id", `category-${category.id}`);
      categoriesDropdown.append(option);
    });
  };
