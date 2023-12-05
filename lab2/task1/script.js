const fullnameRegex = /^\p{Lu}{1}\p{L}{1,} \p{Lu}{1}[.]{1}\p{Lu}{1}[.]{1}$/gmu;
const variantRegex = /^\d{2}$/gmu;
const groupRegex = /^\p{Lu}{2}-\d{2}$/gmu;
const idCardRegex = /^\p{Lu}{2} №[0-9]{5,}$/gmu;
const phoneNumberRegex =
  /^[(]?[0-9]{3}[)]?\-?\ ?[0-9]{3}\-?\ ?[0-9]{2}\-?\ ?[0-9]{2}$/;

function submitForm() {
  let fullname = document.getElementById("fullname");
  let variant = document.getElementById("variant");
  let group = document.getElementById("group")
  let phone = document.getElementById("phone-number");
  let idCard = document.getElementById("id-card");

  let correct = true;

  correct = validateRow(fullname, fullnameRegex) && correct
  correct = validateRow(variant, variantRegex) && correct
  correct = validateRow(group, groupRegex) && correct
  correct = validateRow(phone, phoneNumberRegex) && correct
  correct = validateRow(idCard, idCardRegex) && correct

  if (correct) {
    let showData = document.getElementById("show-data-div");

    if (showData) {
      let filledFullname = document.getElementById("filled-fullname");
      let filledVariant = document.getElementById("filled-variant");
      let filledGroup = document.getElementById("filled-group");
      let filledPhoneNumber = document.getElementById("filled-phone-number");
      let filledIdCard = document.getElementById("filled-id-card");

      filledFullname.textContent = fullname.value;
      filledVariant.textContent = variant.value;
      filledGroup.textContent = group.value;
      filledPhoneNumber.textContent = phone.value;
      filledIdCard.textContent = idCard.value;
    } else {
      renderFilledForm({
        fullname: fullname.value,
        variant: variant.value,
        group: group.value,
        phone: phone.value,
        idCard: idCard.value
      })
    }
  }
}

function validateRow(row, rule) {
  if (row.value.match(rule)) {
    row.style.border = "2px solid green";
    return true;
  } else {
    row.style.border = "2px solid red";
    return false;
  }
}

function renderFilledForm(data){
  let validationForm = document.getElementById("form-validation-div");
      validationForm.style.width = "65%";

      let formDiv = document.getElementById("form-div");
      formDiv.style.width = "65%";

      showData = document.createElement("div");
      showData.id = "show-data-div";
      showData.style.width = "35%";

      let caption = document.createElement("h2");
      caption.textContent = "Введені дані:";

      showData.appendChild(caption);
      showData.appendChild(filledFormRow("ПІБ: ", "filled-fullname", data.fullname));
      showData.appendChild(filledFormRow("Варіант: ", "filled-variant", data.variant));
      showData.appendChild(filledFormRow("Група: ", "filled-group", data.group));
      showData.appendChild(filledFormRow("Номер телефону: ", "filled-phone-number", data.phone));
      showData.appendChild(filledFormRow("ID картка: ", "filled-id-card", data.idCard));

      validationForm.appendChild(showData);
}

function filledFormRow(label, id, value) {
  let paragraph = document.createElement("p");
  paragraph.textContent = label;
  paragraph.style.fontWeight = "bold";

  let filledRow = document.createElement("span");
  filledRow.style.fontWeight = "normal";
  filledRow.id = id;
  filledRow.textContent = value;

  paragraph.appendChild(filledRow);
  return paragraph;
}

let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", submitForm);
