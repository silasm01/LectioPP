function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fix_null(name, value) {
    var item = localStorage.getItem(name);
    if (item === null) {
        localStorage.setItem(name, value);
    }
}

fix_null("settings-lectio-assignment-timer", "false");
fix_null("settings-lectio-no-pp", "false");
fix_null("settings-lectio-wide", "false");
fix_null("settings-lectio-reverse-assignments", "false");
fix_null("settings-lectio-assignment-timer-colors-red", "#ff0000");
fix_null("settings-lectio-assignment-timer-colors-yellow", "#ffff00");
fix_null("settings-lectio-assignment-timer-colors-green", "#00ff00");
fix_null("settings-lectio-assignment-timer-textColor", "#000000");
fix_null("settings-lectio-custom-names", "false");
fix_null("settings-lectio-auto-redirect", "false");

fix_null("settings-lectio-hide-title", "false");
fix_null("settings-lectio-single-bar", "false");
fix_null("settings-lectio-hide-topbar", "false");
fix_null("settings-lectio-center-topbar", "false");
fix_null("settings-lectio-schedule-canceled-borders", "false");

if (location.href.match(/\/lectio\/(\d+)\/*/)) {
  const schoolid = location.href.match(/\/(\d+)\//);
  localStorage.setItem("settings-lectio-school-id", schoolid[1]);
} else {
  fix_null("settings-lectio-school-id", null);
}

fix_null("settings-lectio-assignment-filters", JSON.stringify(
  ["hideDelivered", "showAnswered"]
))
for (let filter of JSON.parse(localStorage.getItem("settings-lectio-assignment-filters"))) {
  fix_null(`settings-lectio-assignment-filter-${filter}`, "false");
}

if (sessionStorage.getItem('reload-assignments') === 'false') {
  for (let filter of JSON.parse(localStorage.getItem("settings-lectio-assignment-filters"))) {
    sessionStorage.removeItem(`settings-lectio-assignment-filter-${filter}`);
  }
}

sessionStorage.setItem('reload-assignments', 'false');

if (sessionStorage.getItem('reload-settings') === 'false') {
  sessionStorage.clear();
}

sessionStorage.setItem('reload-settings', 'false');

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
      localStorage.setItem(`settings-lectio-schedule-color-${fag}`, "#00" + getRandomInt(50, 128).toString(16).padEnd(2, 0) + getRandomInt(50,200).toString(16).padEnd(2, 0));
    }
  }
}