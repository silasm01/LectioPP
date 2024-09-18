if (location.href.includes("?lectiopp")) {
  var content = document.getElementById("contenttable")
  content.childNodes.forEach(child => {
    if (child.nodeType == 1) {
      child.style.display = "none"
    }
  })

  var subheader = document.getElementById("s_m_HeaderContent_subnavigator_genericSecondRow_tr")
  subheader.style.display = "none"

  var profilbutton = document.getElementById("s_m_HeaderContent_subnavigator_ctl12")
  profilbutton.parentElement.classList = "buttonlink"

  var lectioppbutton = document.getElementById("s_m_HeaderContent_subnavigator_ctl13")
  lectioppbutton.parentElement.classList = "buttonlink ls-subnav-active"
}