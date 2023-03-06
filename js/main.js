const sourseApi = JSON.parse(data).data;
console.log(sourseApi);

// Load all Mileston data
function loadMilestons() {
  const milestonesElement = document.querySelector(".milestones");
  milestonesElement.innerHTML = sourseApi
    .map((milestone) => {
      return `<div class="milestone border-b" id="${milestone._id}">
            <div class="flex">
              <div class="checkbox"><input type="checkbox" onClick="doneList(this, ${
                milestone._id
              })"/></div>
              <div onClick='openMileston(this, ${milestone._id})'>
                <p>
                  ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">

            ${milestone.modules
              .map((modules) => {
                return `<div class="module border-b">
                <p>${modules.name}</p>
              </div>`;
              })
              .join("")}
              
            </div>
          </div>`;
    })
    .join("");
}
// mileston click event
function openMileston(currentElement, id) {
  const parentElement = currentElement.parentNode.nextElementSibling;
  const hasShow = document.querySelector(".show");
  const active = document.querySelector(".active");
  // remove previous active class
  if (active && !currentElement.classList.contains("active")) {
    active.classList.remove("active");
  }
  parentElement.classList.toggle("show");
  // remove previous show class
  if (!currentElement.classList.contains("show") && hasShow) {
    hasShow.classList.remove("show");
  }
  currentElement.classList.toggle("active");
  // add co-responding images
  milestonImagePreview(id);
  rotateIcon(currentElement);
}
// icon rotate

function rotateIcon(currentElement) {
  const icon = currentElement.childNodes[1].childNodes[1].childNodes[0];
  console.dir(icon);
  // icon rotetor
  if (!icon.classList.contains("rotate") && icon) {
    icon.classList.remove("rotate");
  }
  icon.classList.toggle("rotate");
}

// mileston image function defin
function milestonImagePreview(id) {
  const title = document.querySelector(".title");
  const details = document.querySelector(".details");
  const milestoneImage = document.querySelector(".milestoneImage");
  // milestoneImage.style.opacity = "0";
  milestoneImage.src = sourseApi[id].image;
  title.innerHTML = sourseApi[id].name;
  details.innerHTML = sourseApi[id].description;
}
// done list
function doneList(checkbox, id) {
  const doneElement = document.querySelector(".doneList");
  const milestonesElement = document.querySelector(".milestones");
  const seletedElement = document.getElementById(id);

  if (checkbox.checked) {
    milestonesElement.removeChild(seletedElement);
    doneElement.appendChild(seletedElement);
  } else {
    doneElement.removeChild(seletedElement);
    milestonesElement.appendChild(seletedElement);
  }
}
loadMilestons();
