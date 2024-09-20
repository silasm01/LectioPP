if (localStorage.getItem("settings-assignment-names") === 'true') {
  var lectures = document.getElementsByClassName("s2skemabrik s2bgbox  s2brik lec-context-menu-instance")
  for (var lecture of lectures) {
    lecture = lecture.childNodes[1].childNodes
    lecture = lecture[lecture.length -1]
    const fagList = JSON.parse(localStorage.getItem("settings-lectio-faglist"))

    for (fag of fagList) {
      const replace_text = localStorage.getItem(`settings-lectio-fagname-${fag}`)
      lecture.innerText = lecture.innerText.replace(fag, replace_text)
    }
  }
}