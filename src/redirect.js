if (localStorage.getItem("settings-auto-redirect") === "true") {
  schoolid = localStorage.getItem("settings-school-id");
  if (schoolid != "null") {
    location.replace(`https://www.lectio.dk/lectio/${schoolid}/SkemaNy.aspx`);
  }
}