if (localStorage.getItem("settings-lectio-auto-redirect") === "true") {
  schoolid = localStorage.getItem("settings-lectio-school-id");
  if (schoolid != "null") {
    location.replace(`https://www.lectio.dk/lectio/${schoolid}/SkemaNy.aspx`);
  }
}