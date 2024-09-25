if (localStorage.getItem('settings-lectio-schedule-canceled-borders') === 'true') {
  canceled = document.getElementsByClassName('s2cancelled')
  Array.from(canceled).forEach(element => {
    element.style.borderColor = 'red';
  });
}