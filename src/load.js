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