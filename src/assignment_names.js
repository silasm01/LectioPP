if (localStorage.getItem("settings-lectio-custom-names") === "true") {
  getRows().forEach(row => {
    let course = row.cells[1].innerText;
    const faglist = JSON.parse(localStorage.getItem("settings-lectio-faglist"));
    for (fag of faglist) {
      if (fag === course) {
        var fagname = localStorage.getItem(`settings-lectio-fagname-${fag}`);
        if (fagname) {
          row.cells[1].innerText = fagname
        }
      }
    }
  });
}