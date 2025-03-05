export const formBuilder = (destination = "", formId = "", buttonType = "add") => {
  let dest = document.querySelector(destination);
  let form = document.createElement("form");
  form.setAttribute("id", formId);
  dest.append(form);

  let submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.classList.add("add-button");

  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("id", "cancel-btn");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.classList.add("delete-btn");
  cancelBtn.textContent = "Avbryt";

  let footer = document.createElement("footer");

  if (buttonType === "delete") {
    submitBtn.textContent = "Ja, radera";
    submitBtn.classList.add("confirm-delete");
  } else if (buttonType === "edit") {
    submitBtn.textContent = "Spara ändringar";
    submitBtn.classList.add("edit-save-btn");
  } else {
    submitBtn.textContent = "Lägg till";
  }

  footer.append(submitBtn, cancelBtn);
  form.append(footer);

  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let modal = document.querySelector("dialog[modal]");
    modal.close();
  });

  return { form, submitBtn, cancelBtn };
};

export const buildSortDropdown = (destination = "", sortOptions = []) => {
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
