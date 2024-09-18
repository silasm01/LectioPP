function getRows() {
  table = document.querySelector("#s_m_Content_Content_ExerciseGV tbody");
  const rows = Array.from(table.rows);
  rows.shift();
  return rows;
}

function check_assignment_filter(filters) {
  var rows = [];
  getRows().forEach(row => {
    var status = false;
    filters.forEach(filter => {
      if (row.cells[filter[0]].innerText != filter[1]) {
        status = true;
        return;
      }
    })
    if (status) {
      rows.push(row);
    }
  })
  return rows;
}