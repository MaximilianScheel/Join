let allContacts =[];
let selectedContactNames = [];
let short_name = [];
let firstLetters = [];
let selectedLetters = [];

async function loadContacts() {
  allContacts = JSON.parse(backend.getItem("contacts")) || [];
  sortAllContacts();
  getContactInfo();
}

function sortAllContacts() {
  allContacts = allContacts.sort((a,b) => {
    if (a.name < b.name) {
      return -1;
    }
  });
}

function getContactInfo() {
  for (let i = 0; i < allContacts.length; i++) {
    let contact = allContacts[i]['prename']+ ' ' + allContacts[i]['name'];
    let color = allContacts[i]['favouriteColor'];
    let short_name = allContacts[i]['short_name'];
    let bothLetters = short_name;
    firstLetters.push({bothLetters, color});
  }
}

function renderAllContacts() {
  for (let i = 0; i < allContacts.length; i++) {
    const prename = allContacts[i]['prename'];
    const contact = prename + ' ' + allContacts[i]['name'];
    document.getElementById('openedContacts').innerHTML += `
    <div class="oneContact" onclick="addContact(${i})">
      <div id="contact${i}">${contact}</div>
      <div class="contactButton" id="contactButton${i}"><img src="assets/img/button_rectangle.png"></div>
    </div>
    `;
  }
}

function addContact(i) {
  let contactID = document.getElementById('contact' + i);
  let index = selectedContactNames.indexOf(contactID.innerHTML);
  let index2 = selectedLetters.findIndex(obj => obj.bothLetters==firstLetters[i]['bothLetters']);
  if (index > -1) {
    resetSelect(index, index2,i);
  } else {
    select(contactID, i);
  };
  if (!(selectedContactNames == '')) {
    document.getElementById('contact').value = 'Contacts selected';
  } else {
    document.getElementById('contact').value = '';
  }
}

function resetSelect(index, index2, i) {
  document.getElementById('contactButton' + i).innerHTML = '<img src="assets/img/button_rectangle.png">'; // reset button
  selectedContactNames.splice(index, 1);
  selectedLetters.splice(index2,1); 
  document.getElementById('addedContacts').innerHTML = '';
  for (let x = 0; x < selectedLetters.length; x++) {
    const selectedLetter = selectedLetters[x]['bothLetters'];
    document.getElementById('addedContacts').innerHTML += `<div class="firstLetters" style="background-color: ${selectedLetters[x]['color']};">${selectedLetter}</div>`;
  }
}


function select(contactID, i) {
  document.getElementById('contactButton' + i).innerHTML = `<img src="assets/img/button_rectangle_checked.png">`; //insert checked rectangle
  selectedContactNames.push(contactID.innerHTML);
  selectedLetters.push(firstLetters[i]);
  document.getElementById('addedContacts').innerHTML = '';
  for (let x = 0; x < selectedLetters.length; x++) {
    const selectedLetter = selectedLetters[x]['bothLetters'];
    document.getElementById('addedContacts').innerHTML += `<div class="firstLetters" style="background-color: ${selectedLetters[x]['color']};">${selectedLetter}</div>`;
  }
}


function openCloseContacts() {
  if (document.getElementById('selectFieldContact').style.height == '147px') {
    if ($(window).width() > 720) {
      document.getElementById('selectFieldContact').style.height = '50px';
    } else {
      document.getElementById('selectFieldContact').style.height = '43px';
    }
    document.getElementById('openedContacts').classList.add('d-none');
  } else {
    document.getElementById('selectFieldContact').setAttribute('style', 'height: 147px !important;')
    setTimeout(function () {
      document.getElementById('openedContacts').classList.remove('d-none');
    }, 150)
  }
  disableInputContact()
}

function disableInputContact () {
  if (document.getElementById('contact').disabled = true) {
    document.getElementById('contact').disabled = false;
  } else {
    document.getElementById('contact').disabled = true;
  }
}

/**
 * function to prevent to open or close the category-field
 */
function notOpenCloseContacts(event) {
  event.stopPropagation();
}
