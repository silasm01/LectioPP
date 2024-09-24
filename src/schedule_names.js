if (localStorage.getItem("settings-lectio-assignment-names") === 'true') {
  var lectures = document.getElementsByClassName("s2skemabrik s2bgbox  s2brik lec-context-menu-instance")
  for (var lecture of lectures) {
    lecture = lecture.childNodes[1].childNodes
    lecture = lecture[lecture.length -1]
    const fagList = JSON.parse(localStorage.getItem("settings-lectio-faglist"))

    for (fag of fagList) {
      var fagname = localStorage.getItem(`settings-lectio-fagname-${fag}`);
      if (fagname) {
        const replace_text = fagname
        lecture.innerText = lecture.innerText.replace(fag, replace_text)
      }
    }
  }
}