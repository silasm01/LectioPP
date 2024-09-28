var spans = document.querySelectorAll("#s_m_Content_Content_ExerciseDI_pa .ls-std-rowblock div span :not(label)");
spans.forEach(span => {
  span.addEventListener('change', function() {  
    sessionStorage.setItem('reload-assignments', 'true');
  });
});

function get_ses_or_loc(key) {
  return sessionStorage.getItem(key) === null ? localStorage.getItem(key) : sessionStorage.getItem(key);
}

function add_toggle(id, text) {
  var header = document.querySelector("#s_m_Content_Content_ExerciseDI_pa .ls-std-rowblock div");

  var span = document.createElement("span");
  var input = document.createElement("input");
  input.type = "checkbox";
  input.id = `s_m_Content_Content_${id}CB`;
  input.checked = get_ses_or_loc(`settings-lectio-assignment-filter-${id}`) === "true";

  input.addEventListener('change', function() {
    sessionStorage.setItem('reload-assignments', 'true');
    sessionStorage.setItem(`settings-lectio-assignment-filter-${id}`, input.checked);
    location.reload();
  });

  var label = document.createElement("label");
  label.innerText = text;
  label.setAttribute("for", `s_m_Content_Content_${id}CB`);

  span.append(input);
  span.append(label);

  header.appendChild(span);
}

// hideDelivered
add_toggle("hideDelivered", "Hide delivered");
if (get_ses_or_loc("settings-lectio-assignment-filter-hideDelivered") === "true") {
  for (let row of check_assignment_filter([[5, "Venter"]])) {
    row.style.display = "none";
  }
}

// showAnswered
add_toggle("showAnswered", "Show answered");
if (get_ses_or_loc("settings-lectio-assignment-filter-showAnswered") === "true") {
  for (let row of check_assignment_filter([[7, "Elev"],[5, "Afleveret"]])) {
    row.style.display = "none";
  }
}