if (localStorage.getItem('settings-lectio-hide-title') === 'true') {
  var title = document.getElementById("s_m_HeaderContent_MainTitle")
  if (title) {
    title.style.display = "none"
  }
}

if (localStorage.getItem('settings-lectio-single-bar') === 'true') {
  var topbar = document.getElementById("s_m_mastermenu")
  if (topbar) {
    document.body.insertBefore(topbar.childNodes[1].childNodes[3], document.body.firstChild);
    topbar.style.display = "none"

    var subnav = document.getElementById("s_m_HeaderContent_subnavigator_generic_tr")
    var div = document.createElement("div")
    div.classList = "buttonlink"

    const school_id = localStorage.getItem("settings-lectio-school-id")

    var a = document.createElement("a")
    a.href = `https://www.lectio.dk/lectio/${school_id}/default.aspx`
    a.setAttribute("data-role", "button")
    a.setAttribute("tab-index", "0")
    a.id = "s_m_HeaderContent_subnavigator_ctl00"
    a.textContent = "Hovedmenu"

    div.appendChild(a)

    subnav.insertBefore(div, subnav.children[0])
  }
}

if (localStorage.getItem('settings-lectio-hide-topbar') === 'true') {
  var yearfield = document.getElementsByName("s$m$ChooseTerm$term")[0]
  if (yearfield) {
    yearfield.style.margin = "15px";

    document.body.insertBefore(yearfield, document.body.firstChild);
  }

  var topfield = document.getElementById("s_m_masterHeaderDiv")
  if (topfield) {
    topfield.style.display = "none"
  }

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
  var topbardiv = document.getElementById("s_m_HeaderContent_subnav_div")
  if (topbardiv) {
    topbardiv.style.margin = "auto"
  }

  var content = document.getElementById("contenttable")
  if (content) {
    content.style.display = "block"
    
    var sets = document.getElementsByClassName("ls-std-island-layout-ltr");
    for (set of sets) {
      var childs = set.children
      childs[0].style.marginLeft = "auto"
      if (childs.length > 1) {
        childs[childs.length - 1].style.marginRight = "auto"
      } else {
        childs[0].style.marginRight = "auto"
      }
    }

    var islands = document.querySelectorAll(".island");
    for (var island of islands) {
      if (!island.parentNode.classList.contains("ls-std-island-layout-ltr")) {
        island.style.margin = "10px auto"
        island.style.width = "100%"
      }
    }

    var studieRetningTable = document.getElementById("s_m_Content_Content_spUge_theTable")
    if (studieRetningTable) {
      studieRetningTable.style.width = "-webkit-fill-available"
    }
  }
}

if (localStorage.getItem("settings-lectio-remove-footer") === 'true') {
  var footer = document.getElementById("s_m_masterFooter")
  if (footer) {
    footer.style.display = "none"
    var spacer = document.createElement("div");
    spacer.style.height = "50px";
    document.body.appendChild(spacer);
  }
}