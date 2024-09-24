function newLectioContainer(name, defaultOpen = true) {
  const section = document.createElement('section');
  section.classList = "island";

  const containerHeader = document.createElement('div');
  containerHeader.setAttribute("role", "heading");
  containerHeader.classList = "islandHeaderContainer"
  containerHeader.style = "background-image: none; background-color: rgb(211, 229, 245);";

  containerHeader.style.cursor = "pointer";
  containerHeader.addEventListener('click', function() {
    const isCollapsed = contentContainer.style.display === "none";
    contentContainer.style.display = isCollapsed ? "block" : "none";
  });

  const spanHeader = document.createElement("span");
  spanHeader.innerText = name;
  spanHeader.className = "islandHeader";

  containerHeader.appendChild(spanHeader);

  const contentContainer = document.createElement("div");
  contentContainer.id = "s_m_Content_Content_ils_pa";
  contentContainer.className = "islandContent";

  contentContainer.style.display = defaultOpen ? "block" : "none";

  section.appendChild(containerHeader);
  section.appendChild(contentContainer);

  section.style.marginRight = "10px";

  return {section: section, contentContainer: contentContainer};
}

function newSettingsItem(id, type, text, b_text = "") {
  const span = document.createElement("span");
  span.id = `${id}-span`;

  var label = document.createElement("label");
  label.innerText = " " + text;

  var input;

  switch (type) {
    case "checkbox":
      input = document.createElement("input");
      input.type = "checkbox";
      input.id = `${id}-input`;
      input.classList.add = "settings-checkbox";
      input.checked = localStorage.getItem(id) === "true";

      span.append(input);
      span.append(label);
      break;
    case "select":
      input = document.createElement("select");
      input.id = `${id}-input`;
      input.classList.add = "settings-select";
      
      span.append(input);
      span.append(label);
      break;
    case "color":
      input = document.createElement("input");
      input.type = "color";
      input.id = `${id}-input`;
      input.classList.add = "settings-color";
      input.value = localStorage.getItem(id);

      span.append(input);
      span.append(label);
      break;
    case "text":
      input = document.createElement("input");
      input.type = "text";
      input.id = `${id}-input`;
      input.classList.add = "settings-text";
      input.value = localStorage.getItem(id);

      span.append(label.innerText += ": ");
      span.append(document.createElement("br"));
      span.append(input);
      break;
    case "button":
      input = document.createElement("button");
      input.textContent = text;
      input.id = `${id}-input`;
      input.classList.add = "settings-button";

      span.append(input);
      break;
    case "text-button":
      input = document.createElement("div");

      const textInput = document.createElement("input");
      textInput.type = "text";
      textInput.id = `${id}-text-input`;
      textInput.classList.add = "settings-text";
      textInput.style.width = "130px";
      textInput.value = localStorage.getItem(id);

      const button = document.createElement("button");
      button.textContent = b_text;
      button.id = `${id}-button`;
      button.classList.add = "settings-button";

      input.appendChild(textInput);
      input.appendChild(button);

      span.append(label.innerText += ": ");
      span.append(document.createElement("br"));
      span.append(input);
      break;
  }

  span.append(document.createElement("br"));

  return {span: span, input: input};
}

var lsContentContainer = document.querySelector("#contenttable.ls-content");

var contentable = document.getElementById("contenttable");

contentable.style.display = "flex";
contentable.style.justifyContent = "center";
contentable.style.alignItems = "flex-start";

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
  location.reload();
});

miscContainer.contentContainer.appendChild(autoRedirect.span);

if (localStorage.getItem("settings-auto-redirect") === "true") {
  const schoolid = newSettingsItem("settings-school-id", "text", "School ID");

  schoolid.input.addEventListener('change', function() {
    localStorage.setItem("settings-school-id", schoolid.input.value);
  });

  miscContainer.contentContainer.appendChild(schoolid.span);
}

// Assignment names
const assignmentNames = newSettingsItem("settings-assignment-names", "checkbox", "Use custom assignment names");

assignmentNames.input.addEventListener('change', function() {
  localStorage.setItem("settings-assignment-names", assignmentNames.input.checked);
  location.reload();
});

miscContainer.contentContainer.appendChild(assignmentNames.span);

if (localStorage.getItem("settings-assignment-names") === "true") {
  const lectureNameContainer = newLectioContainer("Custom assignment names", false);

  const lectureNames = JSON.parse(localStorage.getItem("settings-lectio-faglist"));

  for (let lecture of lectureNames) {
    const lectureName = newSettingsItem(`settings-lectio-fagname-${lecture}`, "text-button", lecture, "Delete");

    lectureName.input.children[1].addEventListener('click', function() {
      const newLectureNames = lectureNames.filter((name) => name !== lecture);
      localStorage.setItem(`settings-lectio-faglist`, JSON.stringify(newLectureNames));
      localStorage.removeItem(`settings-lectio-fagname-${lecture}`);

      location.reload();
    });

    lectureName.input.children[0].addEventListener('change', function() {
      localStorage.setItem(`settings-lectio-fagname-${lecture}`, lectureName.input.children[0].value);
    });

    lectureNameContainer.contentContainer.appendChild(lectureName.span);
  }

  lectureNameContainer.contentContainer.appendChild(document.createElement("br"));

  const addLecture = newSettingsItem("settings-lectio-fagname-add", "text-button", "Add lecture", "Add");

  addLecture.input.children[1].addEventListener('click', function() {
    const lectureName = addLecture.input.children[0].value;
    localStorage.setItem(`settings-lectio-faglist`, JSON.stringify([...lectureNames, lectureName]));

    location.reload();
  });

  lectureNameContainer.contentContainer.appendChild(addLecture.span);

  miscContainer.contentContainer.appendChild(document.createElement("br"));
  miscContainer.contentContainer.appendChild(lectureNameContainer.section);
  miscContainer.contentContainer.appendChild(document.createElement("br"));

}

// Custom schedule colors

const enable_colors_schedule = newSettingsItem("settings-lectio-schedule-colors-enable", "checkbox", "Enable colors");

enable_colors_schedule.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-schedule-colors-enable", enable_colors_schedule.input.checked);
  location.reload();
});

miscContainer.contentContainer.appendChild(enable_colors_schedule.span);

if (localStorage.getItem("settings-lectio-schedule-colors-enable") === "true") {
  const colorContainer = newLectioContainer("Custom schedule colors", false);

  const fagList = JSON.parse(localStorage.getItem("settings-lectio-faglist"));
  
  for (let fag of fagList) {
    const colorPicker = newSettingsItem(`settings-lectio-schedule-color-${fag}`, "color", fag)

    colorPicker.input.addEventListener('change', function() {
      localStorage.setItem(`settings-lectio-schedule-color-${fag}`, colorPicker.input.value);
    });

    colorContainer.contentContainer.appendChild(colorPicker.span)
  }

  miscContainer.contentContainer.appendChild(colorContainer.section)
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
const assignmentTimerColors = newLectioContainer("Assignment timer colors", false);

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

// Default filters
const defaultFiltersContainer = newLectioContainer("Default filters", true);

// Assignment filters
for (let filter of JSON.parse(localStorage.getItem("assignment-filters"))) {
  const filterItem = newSettingsItem(`settings-assignment-filter-${filter}`, "checkbox", filter);
  filterItem.input.addEventListener('change', function() {
    localStorage.setItem(`settings-assignment-filter-${filter}`, filterItem.input.checked);
  });

  defaultFiltersContainer.contentContainer.appendChild(filterItem.span);
}

assignmentsContainer.contentContainer.appendChild(defaultFiltersContainer.section);

lsContentContainer.appendChild(assignmentsContainer.section);

lsContentContainer.appendChild(document.createElement("br"));

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

// Remove footer
const removeFooter = newSettingsItem("settings-lectio-remove-footer", "checkbox", "Remove footer");

removeFooter.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-remove-footer", removeFooter.input.checked);
  location.reload();
});

uiContainer.contentContainer.appendChild(removeFooter.span);

lsContentContainer.appendChild(uiContainer.section);