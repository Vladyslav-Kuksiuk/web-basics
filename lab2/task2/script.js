
function rgb(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}

function renderColorTable() {
  let table = document.getElementById("table");
  let colorPicker = document.getElementById("color-picker");
  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    let row = table.insertRow();
    for (let colIndex = 1; colIndex < 7; colIndex++) {
      let cell = row.insertCell();
      cell.textContent = rowIndex * 6 + colIndex;
      cell.addEventListener("mouseover", () => {
        cell.style.backgroundColor = rgb(
          Math.random() * 255,
          Math.random() * 255,
          Math.random() * 255
        );
      });
      cell.addEventListener("mouseout", () => {
        cell.style.backgroundColor = rgb(255, 255, 255);
      });
      cell.addEventListener("click", () => {
        cell.style.backgroundColor = colorPicker.value;
      });
    }
  }

  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    let row = table.rows[rowIndex];
    for (let colIndex = 0; colIndex < 6; colIndex++) {
      let cell = row.cells[colIndex];

      cell.addEventListener("dblclick", () => {
        for (let currRow = 0; currRow < 6; currRow++) {
          for (let currCol = 0; currCol < 6; currCol++) {
            if (currRow === rowIndex) {
              table.rows[currRow].cells[currCol].style.backgroundColor =
                  colorPicker.value;
            }
          }
        }
      });
    }
  }
}

renderColorTable();
