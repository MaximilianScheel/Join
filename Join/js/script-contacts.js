setURL('https://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let contacts = [];
console.log(contacts);

/*let contacts = [
    {
        "prename": "Anton",
        "name": "Mayer",
        "short_name": "AM",
        "email": "anton@gmail.com",
        "password": "test123",
        "phone": "+49 1111 111 131 1",
        "favouriteColor": "rgba(255, 122, 0, 1)"
    },
    {
        "prename": "Anja",
        "name": "Schulz",
        "short_name": "AS",
        "email": "schulz@hotmail.com",
        "password": "test123",
        "phone": "+49 11122 111 11 1",
        "favouriteColor": "rgba(147, 39, 255, 1)"
    },
    {
        "prename": "Benedikt",
        "name": "Ziegler",
        "short_name": "BZ",
        "email": "benedikt@gmail.com",
        "password": "test123",
        "phone": "+49 1111 111 11 1",
        "favouriteColor": "rgba(41, 171, 226, 1)"
    },
    {
        "prename": "David",
        "name": "Eisenberg",
        "short_name": "DE",
        "email": "davidberg@gmail.com",
        "password": "test123",
        "phone": "+49 1112 311 11 1",
        "favouriteColor": "rgba(252, 113, 255, 1)"
    },
    {
        "prename": "Eva",
        "name": "Fischer",
        "short_name": "EF",
        "email": "eva@gmail.com",
        "password": "test123",
        "phone": "+49 1199 1021 11 1",
        "favouriteColor": "rgba(2, 207, 47, 1)"
    },
    {
        "prename": "Emmanuel",
        "name": "Mauer",
        "short_name": "EM",
        "email": "emmanuelMa@gmail.com",
        "password": "test123",
        "phone": "+49 116311 11 2",
        "favouriteColor": "rgba(175, 22, 22, 1)"
    },
    {
        "prename": "Marcel",
        "name": "Bauer",
        "short_name": "MB",
        "email": "bauer@gmail.com",
        "password": "test123",
        "phone": "+49 1611 156 11 1",
        "favouriteColor": "rgba(70, 47, 138, 1)"
    }
];*/
let startingLetters = [];
let existingLetterIndex = 0;
let currentContactIndex = 0;

async function init() {
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    //backend.setItem('contacts', JSON.stringify(contacts));
    startingLetters = []
    existingLetterIndex = 0;
    sortAllContacts();
    loadNameStartingLetters();
    includeHTML();
    buildContactList();
    console.log(contacts);
}



function displayContact(index) {
    document.getElementById('overview_contact_name').innerHTML = contacts[index].prename + " " + contacts[index].name;
    document.getElementById('overview_contact_email').innerHTML = contacts[index].email;
    document.getElementById('overview_contact_phone').innerHTML = contacts[index].phone;
    document.getElementById('contacts_overview_container').classList.remove('d-none');
    document.getElementById('contacts_overview_contact_pictureContainer').style.backgroundColor = contacts[index].favouriteColor;
    document.getElementById('contacts_overview_contact_picture').innerText = getNamePrefix(index);
    activateContactEntry(index);
    if (isMobile()) {
        document.getElementById('contacts_overview').classList.add('d-show');
        document.getElementById('contacts_list').classList.add('d-none');
        document.getElementById('showMobileContactListArrow').classList.remove('d-none');
        document.getElementById('addContact_button').classList.add('d-none');
        document.getElementById('overview_body_editContact_container').classList.add('overview-body-editContact-container-mobile');
        document.getElementById('overview_body_editContact_container_img').src = "./assets/img/pencil_white.png";
    }
}

function isMobile() {
    let viewportWidth = 0;
    viewportWidth = window.innerWidth;
    if (viewportWidth <= 700) {
        return true;
    }
    return false;
}



function showContactListMobile() {
    document.getElementById('contacts_overview').classList.remove('d-show');
    document.getElementById('contacts_list').classList.remove('d-none');
    document.getElementById('addContact_button').classList.remove('d-none');
}

function activateContactEntry(contactIndex) {
    currentContactIndex = contactIndex;
    let allContactlistEntries = document.querySelectorAll('.contacts-list-contact');
    allContactlistEntries.forEach(contactEntry => {
        contactEntry.classList.remove('contactActive');
    });
    document.getElementById('contacts_list_contact_' + contactIndex).classList.add('contactActive');
}

function findStartingLetters() {
    contacts.forEach(contact => {
        startingLetters.push(contact.name.charAt(0));
    });

    startingLetters = startingLetters.filter((element, index) => {
        return startingLetters.indexOf(element) === index;
    });
}

function sortAllContacts() {
    contacts.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
}



function buildContactList() {
    document.getElementById('contacts_list').innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('contacts_list').innerHTML += generateContactListEntry(i);
        setFavouriteBackgroundColor(i);
    }
}

function loadNameStartingLetters() {
    for (let i = 0; i < contacts.length; i++) {
        startingLetters.push(contacts[i].name.charAt(0));
        startingLetters = [...new Set(startingLetters)];
    }
}

function isNameStartingWithExistingLetter(contactIndex) {
    if (existingLetterIndex <= 0) {
        existingLetterIndex++;
        return false;
    }
    for (let i = 0; i < existingLetterIndex; i++) {
        if (contacts[contactIndex].name.charAt(0).includes(startingLetters[i])) {
            return true;
        }
    }
    existingLetterIndex++;
    return false;
}

function setFavouriteBackgroundColor(contactIndex) {
    document.getElementById('contacts_list_contact_pictureContainer_' + contactIndex).style.backgroundColor = contacts[contactIndex].favouriteColor;
}

function getNamePrefix(contactIndex) {
    return contacts[contactIndex].short_name;
}

function generateContactListEntry(index) {
    if (!isNameStartingWithExistingLetter(index)) {
        return `
            <div class="contact-list-letterSeperator-section">
                <span class="contacts-list-letter">${startingLetters[existingLetterIndex - 1]}</span>
                <hr class="contacts-list-headrow">
            </div>
            <div id="contacts_list_contact_${index}" class="contacts-list-contact" onclick="displayContact(${index})">
                <div id="contacts_list_contact_pictureContainer_${index}" class="contacts-list-contact-pictureContainer">
                    <span id="contacts_list_contact_picture_${index}" class="contacts-list-contact-picture">
                        ${contacts[index].short_name}
                    </span>
                </div>
                <div class="contacts-list-contact-keys">
                    <h3 id="contacts-list-contact-keys-name-${index}" class="contacts-list-contact-keys-name">${contacts[index].prename + " " + contacts[index].name}</h3>
                    <a id="contacts-list-contact-keys-email-${index}" class="contacts-list-contact-keys-email" href="#">${contacts[index].email}</a>
                </div>
            </div>
    `;
    }
    return `
    <div id="contacts_list_contact_${index}" class="contacts-list-contact" onclick="displayContact(${index})">
        <div id="contacts_list_contact_pictureContainer_${index}" class="contacts-list-contact-pictureContainer">
            <span id="contacts_list_contact_picture_${index}" class="contacts-list-contact-picture">
                ${contacts[index].short_name}
            </span>
        </div>
        <div class="contacts-list-contact-keys">
            <h3 id="contacts-list-contact-keys-name-${index}" class="contacts-list-contact-keys-name">${contacts[index].prename + " " + contacts[index].name}</h3>
            <a id="contacts-list-contact-keys-email-${index}" class="contacts-list-contact-keys-email" href="#">${contacts[index].email}</a>
        </div>
    </div>
    `;
}


function displayAddContact() {
    document.getElementById('contactAddPopUp-container').classList.remove('hideAddContact');
}

function hideAddContact() {
    document.getElementById('contactAddPopUp-container').classList.add('hideAddContact');
}

function displayEditContact() {
    document.getElementById('contactEditPopUp-container').classList.remove('hideEditContact');
    document.getElementById('edit-name-input').value = contacts[currentContactIndex].name;
    document.getElementById('edit-email-input').value = contacts[currentContactIndex].email;
    document.getElementById('edit-phone-input').value = contacts[currentContactIndex].phone;
}

function hideEditContact() {
    document.getElementById('contactEditPopUp-container').classList.add('hideEditContact');
}

function updateShortname(name) {
    contacts[currentContactIndex].short_name = contacts[currentContactIndex].prename.charAt(0).toUpperCase() + name.charAt(0).toUpperCase();
}

function createShortname(prename, name) {
    return prename.charAt(0) + name.charAt(0);
}

function addContact() {
    const contactPreName = document.getElementById('add_prename_input').value
    const contactName = document.getElementById('add_name_input').value
    const contactEmail = document.getElementById('add_email_input').value
    const contactPhone = document.getElementById('add_phone_input').value
    const newContact = {
        "prename": contactPreName,
        "name": contactName,
        "short_name": createShortname(contactPreName, contactName),
        "email": contactEmail,
        "password": 'test123',
        "phone": contactPhone,
        "favouriteColor": "rgba(255, 122, 0, 1)"
    };
    contacts.push(newContact);
    hideAddContact();
    backend.setItem("contacts", JSON.stringify(contacts));
    init();
}

function editContact() {
    const contactName = document.getElementById('edit-name-input').value
    const contactEmail = document.getElementById('edit-email-input').value
    const contactPhone = document.getElementById('edit-phone-input').value

    updateShortname(contactName);
    const newContact = {
        "prename": contacts[currentContactIndex].prename,
        "name": contactName,
        "short_name": contacts[currentContactIndex].short_name,
        "email": contactEmail,
        "password": contacts[currentContactIndex].password,
        "phone": contactPhone,
        "favouriteColor": contacts[currentContactIndex].favouriteColor
    };
    contacts[currentContactIndex] = newContact;
    backend.setItem("contacts", JSON.stringify(contacts));
    hideEditContact();
    init();
}


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

