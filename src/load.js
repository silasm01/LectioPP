function fix_null(name, value) {
    var item = localStorage.getItem(name);
    if (item === null) {
        localStorage.setItem(name, value);
    }
}

fix_null("settings-lectio-assignment-timer", "false");
fix_null("settings-lectio-no-pp", "false");
fix_null("settings-lectio-wide", "false");
fix_null("settings-reverse-assignments", "false");
fix_null("settings-assignment-timer-colors-red", "#ff0000");
fix_null("settings-assignment-timer-colors-yellow", "#ffff00");
fix_null("settings-assignment-timer-colors-green", "#00ff00");
fix_null("settings-assignment-names", "false");
fix_null("settings-auto-redirect", "false");

fix_null("settings-lectio-hide-title", "false");
fix_null("settings-lectio-single-bar", "false");
fix_null("settings-lectio-hide-topbar", "false");
fix_null("settings-lectio-center-topbar", "false");

if (location.href.match(/\/lectio\/(\d+)\/*/) && localStorage.getItem("settings-school-id") === "null") {
  const schoolid = location.href.match(/\/(\d+)\//);
  localStorage.setItem("settings-school-id", schoolid[1]);
} else {
  fix_null("settings-school-id", null);
}

fix_null("assignment-filters", JSON.stringify(
  ["hideDelivered", "showAnswered"]
))
for (let filter of JSON.parse(localStorage.getItem("assignment-filters"))) {
  fix_null(`settings-assignment-filter-${filter}`, "false");
}

if (sessionStorage.getItem('reload') === 'false') {
  for (let filter of JSON.parse(localStorage.getItem("assignment-filters"))) {
    sessionStorage.removeItem(`settings-assignment-filter-${filter}`);
  }
}

sessionStorage.setItem('reload', 'false');

var fagList = document.getElementById("s_m_Content_Content_holdElementLinkList")

if (!fagList && localStorage.getItem("settings-lectio-faglist") === null) {
  localStorage.setItem("settings-lectio-faglist", JSON.stringify([]))
} else if (localStorage.getItem("settings-lectio-faglist") === JSON.stringify([]) && fagList) {
  fagList = fagList.childNodes[1].childNodes[1].childNodes[0].childNodes[2].childNodes[0]
  let fagl = []
  for (fag of fagList.childNodes) {
    for (t of fag.childNodes) {
      if (t.href != null) {
        fagl.push(t.innerText)
      }
    }
  }
  localStorage.setItem("settings-lectio-faglist", JSON.stringify(fagl))
}

fagList = JSON.parse(localStorage.getItem("settings-lectio-faglist"))

if (fagList) {
  for (fag of fagList) {
    if (localStorage.getItem(`settings-lectio-schedule-color-${fag}`) === null) {
      localStorage.setItem(`settings-lectio-schedule-color-${fag}`, `#` + Math.floor(Math.random()*16777215/3).toString(16).padEnd(6,0));
    }
  }
}