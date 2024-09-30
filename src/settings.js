function newLectioContainer(name, defaultOpen = true, button = "") {
  const section = document.createElement('section');
  section.classList = "island";

  const containerHeader = document.createElement('div');
  containerHeader.setAttribute("role", "heading");
  containerHeader.classList = "islandHeaderContainer"
  containerHeader.style = "background-image: none; background-color: rgb(211, 229, 245);";
  containerHeader.style.justifyContent = "flex-start";

  if (button) {
    const headerCheckbox = document.createElement('input');
    headerCheckbox.type = 'checkbox';
    headerCheckbox.id = `${name}-header-checkbox`;
    headerCheckbox.checked = localStorage.getItem(button) === "true";
    
    headerCheckbox.addEventListener('change', function() {
      localStorage.setItem(button, headerCheckbox.checked);
      sessionStorage.setItem(`settings-lectio-container-${name}-opened`, headerCheckbox.checked);
      sessionStorage.setItem('reload-settings', 'true');
      location.reload();
    });

    headerCheckbox.style.margin = "auto 0px";
    headerCheckbox.style.marginLeft = "5px";

    containerHeader.appendChild(headerCheckbox);
  }

  containerHeader.style.cursor = "pointer";

  if (localStorage.getItem(button) === "true" || !button) {
    containerHeader.addEventListener('click', function() {
      const isCollapsed = contentContainer.style.display === "none";
      contentContainer.style.display = isCollapsed ? "block" : "none";

      sessionStorage.setItem(`settings-lectio-container-${name}-opened`, isCollapsed);
    });
  }

  const spanHeader = document.createElement("span");
  spanHeader.innerText = name;
  spanHeader.className = "islandHeader";

  containerHeader.appendChild(spanHeader);

  const contentContainer = document.createElement("div");
  contentContainer.id = "s_m_Content_Content_ils_pa";
  contentContainer.className = "islandContent";

  contentContainer.style.display = defaultOpen ? "block" : "none";

  const containerState = sessionStorage.getItem(`settings-lectio-container-${name}-opened`);
  if (containerState) {
    contentContainer.style.display = containerState === "true" ? "block" : "none";
  }

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

// Hide profile picture
const no_pp = newSettingsItem("settings-lectio-no-pp", "checkbox", "Hide profile picture");

no_pp.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-no-pp", no_pp.input.checked);
  sessionStorage.setItem('reload-settings', 'true');
  location.reload();
});

miscContainer.contentContainer.appendChild(no_pp.span);

// Auto redirect
// const autoRedirect = newSettingsItem("settings-lectio-auto-redirect", "checkbox", "Redirect to main page");

// autoRedirect.input.addEventListener('change', function() {
//   localStorage.setItem("settings-lectio-auto-redirect", autoRedirect.input.checked);
//   sessionStorage.setItem('reload-settings', 'true');
//   location.reload();
// });

// miscContainer.contentContainer.appendChild(autoRedirect.span);

// if (localStorage.getItem("settings-lectio-auto-redirect") === "true") {
//   const schoolid = newSettingsItem("settings-lectio-school-id", "text", "School ID");

//   schoolid.input.addEventListener('change', function() {
//     localStorage.setItem("settings-lectio-school-id", schoolid.input.value);
//   });

//   miscContainer.contentContainer.appendChild(schoolid.span);
// }

const autoRedirect = newLectioContainer("Auto redirect", false, "settings-lectio-auto-redirect");

if (localStorage.getItem("settings-lectio-auto-redirect") === "true") {
  const schoolid = newSettingsItem("settings-lectio-school-id", "text", "School ID");

  schoolid.input.addEventListener('change', function() {
    localStorage.setItem("settings-lectio-school-id", schoolid.input.value);
  });

  autoRedirect.contentContainer.appendChild(schoolid.span);
}

miscContainer.contentContainer.appendChild(autoRedirect.section);

// Custom names
const lectureNameContainer = newLectioContainer("Custom names", false, "settings-lectio-custom-names");

if (localStorage.getItem("settings-lectio-custom-names") === "true") {
  const lectureNames = JSON.parse(localStorage.getItem("settings-lectio-faglist")) || [];

  for (let lecture of lectureNames) {
    const lectureName = newSettingsItem(`settings-lectio-fagname-${lecture}`, "text-button", lecture, "Delete");

    lectureName.input.children[1].addEventListener('click', function() {
      const newLectureNames = lectureNames.filter((name) => name !== lecture);
      localStorage.setItem(`settings-lectio-faglist`, JSON.stringify(newLectureNames));
      localStorage.removeItem(`settings-lectio-fagname-${lecture}`);

      sessionStorage.setItem('reload-settings', 'true');
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

    sessionStorage.setItem('reload-settings', 'true');
    location.reload();
  });

  lectureNameContainer.contentContainer.appendChild(addLecture.span);
}

miscContainer.contentContainer.appendChild(lectureNameContainer.section);

lsContentContainer.appendChild(miscContainer.section);

// ASSIGNMENT SETTINGS
const assignmentsContainer = newLectioContainer("Assignments");

// Assignment timer
const assignmentTimer = newSettingsItem("settings-lectio-assignment-timer", "checkbox", "Assignment timer");

assignmentTimer.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-assignment-timer", assignmentTimer.input.checked);
});

assignmentsContainer.contentContainer.appendChild(assignmentTimer.span);

// Assignment timer colors
const assignmentTimerColors = newLectioContainer("Assignment timer colors", false, "settings-lectio-assignment-timer-colors-enable");

if (localStorage.getItem("settings-lectio-assignment-timer-colors-enable") === "true") {
  const textColor = newSettingsItem("settings-lectio-assignment-timer-textColor", "color", "Text color");
  const red = newSettingsItem("settings-lectio-assignment-timer-colors-red", "color", "Red");
  const yellow = newSettingsItem("settings-lectio-assignment-timer-colors-yellow", "color", "Yellow");
  const green = newSettingsItem("settings-lectio-assignment-timer-colors-green", "color", "Green");
  
  textColor.input.addEventListener('change', function() {
    localStorage.setItem("settings-lectio-assignment-timer-textColor", textColor.input.value);
  });
  
  red.input.addEventListener('change', function() {
    localStorage.setItem("settings-lectio-assignment-timer-colors-red", red.input.value);
  });
  
  yellow.input.addEventListener('change', function() {
    localStorage.setItem("settings-lectio-assignment-timer-colors-yellow", yellow.input.value);
  });
  
  green.input.addEventListener('change', function() {
    localStorage.setItem("settings-lectio-assignment-timer-colors-green", green.input.value);
  });
  
  assignmentTimerColors.contentContainer.appendChild(textColor.span);
  assignmentTimerColors.contentContainer.appendChild(red.span);
  assignmentTimerColors.contentContainer.appendChild(yellow.span);
  assignmentTimerColors.contentContainer.appendChild(green.span);
}  

assignmentsContainer.contentContainer.appendChild(assignmentTimerColors.section);

// Reverse assignments order
const reverseAssignments = newSettingsItem("settings-lectio-reverse-assignments", "checkbox", "Reverse assignments order");

reverseAssignments.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-reverse-assignments", reverseAssignments.input.checked);
});

assignmentsContainer.contentContainer.appendChild(reverseAssignments.span);

// Default filters
const defaultFiltersContainer = newLectioContainer("Default filters", true);

// Assignment filters
for (let filter of JSON.parse(localStorage.getItem("settings-lectio-assignment-filters"))) {
  const filterItem = newSettingsItem(`settings-lectio-assignment-filter-${filter}`, "checkbox", filter);
  filterItem.input.addEventListener('change', function() {
    localStorage.setItem(`settings-lectio-assignment-filter-${filter}`, filterItem.input.checked);
  });

  defaultFiltersContainer.contentContainer.appendChild(filterItem.span);
}

assignmentsContainer.contentContainer.appendChild(defaultFiltersContainer.section);

lsContentContainer.appendChild(assignmentsContainer.section);

// UI SETTINGS
const uiContainer = newLectioContainer("UI");

// Hide title
const hideTitle = newSettingsItem("settings-lectio-hide-title", "checkbox", "Hide title");

hideTitle.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-hide-title", hideTitle.input.checked);
  sessionStorage.setItem('reload-settings', 'true');
  location.reload();
});

uiContainer.contentContainer.appendChild(hideTitle.span);

const singleBar = newSettingsItem("settings-lectio-single-bar", "checkbox", "Single bar");

singleBar.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-single-bar", singleBar.input.checked);
  sessionStorage.setItem('reload-settings', 'true');
  location.reload();
});

uiContainer.contentContainer.appendChild(singleBar.span);

const hideTopbar = newSettingsItem("settings-lectio-hide-topbar", "checkbox", "Hide topbar");

hideTopbar.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-hide-topbar", hideTopbar.input.checked);
  sessionStorage.setItem('reload-settings', 'true');
  location.reload();
});

uiContainer.contentContainer.appendChild(hideTopbar.span);

const centerTopbar = newSettingsItem("settings-lectio-center-topbar", "checkbox", "Center Lectio");

centerTopbar.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-center-topbar", centerTopbar.input.checked);
  sessionStorage.setItem('reload-settings', 'true');
  location.reload();
});

uiContainer.contentContainer.appendChild(centerTopbar.span);

// Remove footer
const removeFooter = newSettingsItem("settings-lectio-remove-footer", "checkbox", "Remove footer");

removeFooter.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-remove-footer", removeFooter.input.checked);
  sessionStorage.setItem('reload-settings', 'true');
  location.reload();
});

uiContainer.contentContainer.appendChild(removeFooter.span);

lsContentContainer.appendChild(uiContainer.section);

// Schedule container
const scheduleContainer = newLectioContainer("Schedule container", true);

// Wide schedule
const wide = newSettingsItem("settings-lectio-wide", "checkbox", "Wide schedule");

wide.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-wide", wide.input.checked);
});

scheduleContainer.contentContainer.appendChild(wide.span);

// Border cancel schedule
const canceledBorder = newSettingsItem("settings-lectio-schedule-canceled-borders", "checkbox", "Canceled borders");

canceledBorder.input.addEventListener('change', function() {
  localStorage.setItem("settings-lectio-schedule-canceled-borders", canceledBorder.input.checked);
  sessionStorage.setItem('reload-settings', 'true');
  location.reload();
});

scheduleContainer.contentContainer.appendChild(canceledBorder.span);

// Custom schedule colors
const colorContainer = newLectioContainer("Custom schedule colors", false, "settings-lectio-schedule-colors-enable");

if (localStorage.getItem("settings-lectio-schedule-colors-enable") === "true") {
  const fillRest = newSettingsItem("settings-lectio-schedule-colors-fill", "checkbox", "Fill rest with random colors");

  fillRest.input.addEventListener('change', function() {
    localStorage.setItem("settings-lectio-schedule-colors-fill", fillRest.input.checked);
  });

  colorContainer.contentContainer.appendChild(fillRest.span);

  const fagList = JSON.parse(localStorage.getItem("settings-lectio-faglist"));
  
  for (let fag of fagList) {
    const colorPicker = newSettingsItem(`settings-lectio-schedule-color-${fag}`, "color", fag)

    colorPicker.input.addEventListener('change', function() {
      localStorage.setItem(`settings-lectio-schedule-color-${fag}`, colorPicker.input.value);
    });

    colorContainer.contentContainer.appendChild(colorPicker.span)

  }

  const resetColors = newSettingsItem("settings-lectio-reset-colors", "button", "Reset colors");

  resetColors.input.addEventListener('click', function() {
    for (let fag of fagList) {
      console.log(fag)
      localStorage.removeItem(`settings-lectio-schedule-color-${fag}`);
    }

    sessionStorage.setItem('reload-settings', "true")
  });

  colorContainer.contentContainer.appendChild(resetColors.span)
}

scheduleContainer.contentContainer.appendChild(colorContainer.section)

lsContentContainer.appendChild(scheduleContainer.section);