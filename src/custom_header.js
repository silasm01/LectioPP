var tab = document.getElementById("s_m_HeaderContent_subnavigator_generic_tr")
if (tab != null) {

  var settingstab = document.createElement("div")
  settingstab.classList = "buttonlink"

  const schoolid = localStorage.getItem("settings-school-id")

  var settingstablink = document.createElement("a")
  settingstablink.href = `https://www.lectio.dk/lectio/${schoolid}/indstillinger/AdgangIndstillinger.aspx?lectiopp`
  settingstablink.setAttribute("data-role", "button")
  settingstablink.setAttribute("tabindex", "0")
  settingstablink.id = "s_m_HeaderContent_subnavigator_ctl13"
  settingstablink.innerText = "Lectio++"

  settingstab.appendChild(settingstablink)

  tab.appendChild(settingstab)
}