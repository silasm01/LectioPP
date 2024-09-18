if (localStorage.getItem('settings-lectio-no-pp') === 'true') {
  picture = document.getElementById('s_m_HeaderContent_picctrlthumbimage');
  if (picture){
    picture.style.display = 'none';
  }
}