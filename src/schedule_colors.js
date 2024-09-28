function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (localStorage.getItem("settings-lectio-schedule-colors-enable") === 'true') {
  var lectures = document.getElementsByClassName("s2skemabrik s2bgbox  s2brik lec-context-menu-instance")
  for (var lecture of lectures) {
    lecture = lecture.childNodes[1].childNodes
    lecture = lecture[lecture.length -1]
    const fagList = JSON.parse(localStorage.getItem("settings-lectio-faglist"))

    var found = false

    for (fag of fagList) {
      if (lecture.children[0].innerText == fag) {
        lecture.parentNode.parentNode.style.backgroundColor = localStorage.getItem(`settings-lectio-schedule-color-${fag}`)
        lecture.style.color = "#e1e1e1"
        found = true
      }
    }
    if (!found && localStorage.getItem("settings-lectio-schedule-colors-fill") === "true") {
      lecture.parentNode.parentNode.style.backgroundColor = "#00" + getRandomInt(50, 128).toString(16).padEnd(2, 0) + getRandomInt(50,200).toString(16).padEnd(2, 0)
      Array.from(lecture.parentNode.children).forEach(child => {
        child.style.color = "#e1e1e1"
      })
    }
  }
}