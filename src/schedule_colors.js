if (localStorage.getItem("settings-lectio-schedule-colors-enable") === 'true') {
  var lectures = document.getElementsByClassName("s2skemabrik s2bgbox  s2brik lec-context-menu-instance")
  for (var lecture of lectures) {
    lecture = lecture.childNodes[1].childNodes
    lecture = lecture[lecture.length -1]
    const fagList = JSON.parse(localStorage.getItem("settings-lectio-faglist"))

    for (fag of fagList) {
      if (lecture.children[0].innerText == fag) {
        lecture.parentNode.parentNode.style.backgroundColor = localStorage.getItem(`settings-lectio-schedule-color-${fag}`)
        lecture.style.color = "#e1e1e1"
      }
    }
  }
}