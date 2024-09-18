if (localStorage.getItem('settings-lectio-hide-title') === 'true') {
  var title = document.getElementById("s_m_HeaderContent_MainTitle")
  title.style.display = "none"
}

if (localStorage.getItem('settings-lectio-single-bar') === 'true') {
  var topbar = document.getElementById("s_m_mastermenu")
  document.body.insertBefore(topbar.childNodes[1].childNodes[3], document.body.firstChild);
  topbar.style.display = "none"

  var subnav = document.getElementById("s_m_HeaderContent_subnavigator_generic_tr")
  var div = document.createElement("div")
  div.classList = "buttonlink"

  const school_id = localStorage.getItem("settings-school-id")

  var a = document.createElement("a")
  a.href = `https://www.lectio.dk/lectio/${school_id}/default.aspx`
  a.setAttribute("data-role", "button")
  a.setAttribute("tab-index", "0")
  a.id = "s_m_HeaderContent_subnavigator_ctl00"
  a.textContent = "Hovedmenu"

  div.appendChild(a)

  subnav.insertBefore(div, subnav.children[0])
}

if (localStorage.getItem('settings-lectio-hide-topbar') === 'true') {
  var yearfield = document.getElementsByName("s$m$ChooseTerm$term")[0]
  yearfield.style.margin = "15px";

  document.body.insertBefore(yearfield, document.body.firstChild);

  var topfield = document.getElementById("s_m_masterHeaderDiv")
  topfield.style.display = "none"

  var helpfield = document.getElementById("s_m_HelpTip_helptipwrap")
  if (helpfield) {
    helpfield.style.display = "none"
  }

  var hf = document.getElementById("s_m_helptipDiv")
  if (hf) {
    hf.style.display = "none"
  }
}

if (localStorage.getItem('settings-lectio-center-topbar') === 'true') {
  topbardiv = document.getElementById("s_m_HeaderContent_subnav_div")
  if (topbardiv) {
    topbardiv.style.margin = "auto"
  }
}