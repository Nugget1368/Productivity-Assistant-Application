const getInputValues = (destination) =>{
    let inputs = document.querySelectorAll(`${destination} input, ${destination} select`);
    let values = [];
    inputs.forEach((input) => {
      values.push(input.value);
    });
    return values;
}

export {getInputValues}