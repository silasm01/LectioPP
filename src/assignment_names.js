const map = {
  "cbht3c-stu-sop": "SOP",
  "cbht3vudvpro-bcde": "Elektronik A",
  "cbht3v-fysa": "Fysik A",
  "cbht3c-mata": "Matematik A",
  "cbht3c-dana": "Dansk A",
  "cbht3c-prob": "Programmering B",
  "cbft3c-idehisb": "Idehistorie B",
}

if (localStorage.getItem("settings-assignment-names") === "true") {
  getRows().forEach(row => {
    const course = row.cells[1].innerText;
    if (map[course]) {
      row.cells[1].innerText = map[course];
    }
  });
}