if (localStorage.getItem("settings-reverse-assignments") === "true") {
  let tbody = document.querySelector("tbody");

  let rows = Array.from(tbody.querySelectorAll('tr')).slice(1);

  // Reverse the rows
  rows.reverse();

  // Append the rows back into the tbody in reverse order
  rows.forEach(row => tbody.appendChild(row));
}