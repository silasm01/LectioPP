function newLectioContainer(name) {
  const section = document.createElement('section');
  section.classList = "island";

  const containerHeader = document.createElement('div');
  containerHeader.setAttribute("role", "heading");
  containerHeader.classList = "islandHeaderContainer"
  containerHeader.style = "background-image: none; background-color: rgb(211, 229, 245);";
  const spanHeader = document.createElement("span");
  spanHeader.innerText = name;
  spanHeader.className = "islandHeader";

  containerHeader.appendChild(spanHeader);

  const contentContainer = document.createElement("div");
  contentContainer.id = "s_m_Content_Content_ils_pa";
  contentContainer.className = "islandContent";

  section.appendChild(containerHeader);
  section.appendChild(contentContainer);

  return {section: section, contentContainer: contentContainer};
}

function newSettingsItem(id, type, text) {
  const span = document.createElement("span");
  span.id = `${id}-span`;

  var input;

  switch (type) {
    case "checkbox":
      input = document.createElement("input");
      input.type = "checkbox";
      input.id = `${id}-input`;
      input.classList.add = "settings-checkbox";
      input.checked = localStorage.getItem(id) === "true";
      break;
    case "select":
      input = document.createElement("select");
      input.id = `${id}-input`;
      input.classList.add = "settings-select";
      break;
    case "color":
      input = document.createElement("input");
      input.type = "color";
      input.id = `${id}-input`;
      input.classList.add = "settings-color";
      input.value = localStorage.getItem(id);
      break;
    case "text":
      input = document.createElement("input");
      input.type = "text";
      input.id = `${id}-input`;
      input.classList.add = "settings-text";
      input.value = localStorage.getItem(id);
      break;
  }

  var label = document.createElement("label");
  label.innerText = " " + text;

  span.append(input);
  span.append(label);
  span.append(document.createElement("br"));

  return {span: span, input: input};
}

var lsContentContainer = document.querySelector("#contenttable.ls-content");

// MISC SETTINGS
const miscContainer = newLectioContainer("Miscellaneous");

// Wide schedule
const wide = newSettingsItem("settings-lectio-wide", "checkbox", "Wide schedule");

wide.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-wide", wide.input.checked);
});

// Hide profile picture
const no_pp = newSettingsItem("settings-lectio-no-pp", "checkbox", "Hide profile picture");

no_pp.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-no-pp", no_pp.input.checked);
  location.reload();
});

miscContainer.contentContainer.appendChild(no_pp.span);
miscContainer.contentContainer.appendChild(wide.span);

// Auto redirect
const autoRedirect = newSettingsItem("settings-auto-redirect", "checkbox", "Redirect to main page");

autoRedirect.input.addEventListener('change', function() {
  localStorage.setItem("settings-auto-redirect", autoRedirect.input.checked);
});

miscContainer.contentContainer.appendChild(autoRedirect.span);

if (localStorage.getItem("settings-auto-redirect") === "true") {
  const schoolid = newSettingsItem("settings-school-id", "text", "School ID");

  schoolid.input.addEventListener('change', function() {
    localStorage.setItem("settings-school-id", schoolid.input.value);
  });

  miscContainer.contentContainer.appendChild(schoolid.span);
}

lsContentContainer.appendChild(miscContainer.section);

lsContentContainer.appendChild(document.createElement("br"));

// ASSIGNMENT SETTINGS
const assignmentsContainer = newLectioContainer("Assignments");

// Assignment timer
const assignmentTimer = newSettingsItem("settings-lectio-assignment-timer", "checkbox", "Assignment timer");

assignmentTimer.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-assignment-timer", assignmentTimer.input.checked);
});

assignmentsContainer.contentContainer.appendChild(assignmentTimer.span);

// Assignment timer colors
const assignmentTimerColors = newLectioContainer("Assignment timer colors");

const enable_colors = newSettingsItem("settings-assignment-timer-colors-enable", "checkbox", "Enable colors");

enable_colors.input.addEventListener('change', function() {
  localStorage.setItem("settings-assignment-timer-colors-enable", enable_colors.input.checked);
  location.reload();
});

assignmentsContainer.contentContainer.appendChild(enable_colors.span);

const red = newSettingsItem("settings-assignment-timer-colors-red", "color", "Red");
const yellow = newSettingsItem("settings-assignment-timer-colors-yellow", "color", "Yellow");
const green = newSettingsItem("settings-assignment-timer-colors-green", "color", "Green");

red.input.addEventListener('change', function() {
  localStorage.setItem("settings-assignment-timer-colors-red", red.input.value);
});

yellow.input.addEventListener('change', function() {
  localStorage.setItem("settings-assignment-timer-colors-yellow", yellow.input.value);
});

green.input.addEventListener('change', function() {
  localStorage.setItem("settings-assignment-timer-colors-green", green.input.value);
});

assignmentTimerColors.contentContainer.appendChild(red.span);
assignmentTimerColors.contentContainer.appendChild(yellow.span);
assignmentTimerColors.contentContainer.appendChild(green.span);

if (localStorage.getItem("settings-assignment-timer-colors-enable") === "true") {
  assignmentsContainer.contentContainer.appendChild(document.createElement("br"));
  assignmentsContainer.contentContainer.appendChild(assignmentTimerColors.section);
  assignmentsContainer.contentContainer.appendChild(document.createElement("br"));
}  

// Reverse assignments order
const reverseAssignments = newSettingsItem("settings-reverse-assignments", "checkbox", "Reverse assignments order");

reverseAssignments.input.addEventListener('change', function() {
  localStorage.setItem("settings-reverse-assignments", reverseAssignments.input.checked);
});

assignmentsContainer.contentContainer.appendChild(reverseAssignments.span);

// Assignment names
const assignmentNames = newSettingsItem("settings-assignment-names", "checkbox", "Use custom assignment names");

assignmentNames.input.addEventListener('change', function() {
  localStorage.setItem("settings-assignment-names", assignmentNames.input.checked);
});

assignmentsContainer.contentContainer.appendChild(assignmentNames.span);

// Assignment filters
for (let filter of JSON.parse(localStorage.getItem("assignment-filters"))) {
  const filterItem = newSettingsItem(`settings-assignment-filter-${filter}`, "checkbox", filter);
  filterItem.input.addEventListener('change', function() {
    localStorage.setItem(`settings-assignment-filter-${filter}`, filterItem.input.checked);
  });

  assignmentsContainer.contentContainer.appendChild(filterItem.span);
}

lsContentContainer.appendChild(assignmentsContainer.section);

// UI SETTINGS
const uiContainer = newLectioContainer("UI");

// Hide title
const hideTitle = newSettingsItem("settings-lectio-hide-title", "checkbox", "Hide title");

hideTitle.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-hide-title", hideTitle.input.checked);
  location.reload();
});

uiContainer.contentContainer.appendChild(hideTitle.span);

const singleBar = newSettingsItem("settings-lectio-single-bar", "checkbox", "Single bar");

singleBar.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-single-bar", singleBar.input.checked);
  location.reload();
});

uiContainer.contentContainer.appendChild(singleBar.span);

const hideTopbar = newSettingsItem("settings-lectio-hide-topbar", "checkbox", "Hide topbar");

hideTopbar.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-hide-topbar", hideTopbar.input.checked);
  location.reload();
});

uiContainer.contentContainer.appendChild(hideTopbar.span);

const centerTopbar = newSettingsItem("settings-lectio-center-topbar", "checkbox", "Center topbar");

centerTopbar.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-center-topbar", centerTopbar.input.checked);
  location.reload();
});

uiContainer.contentContainer.appendChild(centerTopbar.span);

lsContentContainer.appendChild(uiContainer.section);