function update_time(assignmentDate, row, dateStr) {
  const now = new Date();
  const timeDiff = assignmentDate - now;
  row.cells[3].style.color = localStorage.getItem('settings-lectio-assignment-timer-textColor')
  if (timeDiff > 0 && row.cells[5].innerText === "Afleveret") {
    row.cells[3].innerText = `${dateStr}\n(Completed)`;
  } else if (timeDiff > 0) {
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    row.cells[3].innerText = `${dateStr}\n(${days}d ${hours}h ${minutes}m)`;
    
    if (localStorage.getItem('settings-lectio-assignment-timer-colors-enable') === "true") {
      if (days < 1) {
        row.cells[3].style.backgroundColor = localStorage.getItem('settings-lectio-assignment-timer-colors-red');
      } else if (days < 7) {
        row.cells[3].style.backgroundColor = localStorage.getItem('settings-lectio-assignment-timer-colors-yellow');
      } else {
        row.cells[3].style.backgroundColor = localStorage.getItem('settings-lectio-assignment-timer-colors-green');
      }
    }
  } else {
    row.cells[3].innerText = `${dateStr}\n(Expired)`;
  }
}

if (localStorage.getItem('settings-lectio-assignment-timer') === 'true') {
  getRows().forEach(row => {
    const dateStr = row.cells[3].innerText;
    const [dayMonth, yearTime] = dateStr.split('-');
    const [day, month] = dayMonth.split('/');
    const [year, time] = yearTime.split(' ');
    const [hours, minutes] = time.split(':');

    const assignmentDate = new Date(year, month - 1, day, hours, minutes);

    update_time(assignmentDate, row, dateStr);
    setInterval(() => {
      update_time(assignmentDate, row, dateStr);
    }, 1000*60);
  });
}