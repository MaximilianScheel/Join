setURL('https://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let users = [];
let contacts = {
    contacts:
        [
            {
                "name": "Anton Mayer",
                "email": "anton@gmail.com",
                "phone": "+49 1111 111 131 1",
                "favouriteColor": "rgba(255, 122, 0, 1)"
            },
            {
                "name": "Anja Schulz",
                "email": "schulz@hotmail.com",
                "phone": "+49 11122 111 11 1",
                "favouriteColor": "rgba(147, 39, 255, 1)"
            },
            {
                "name": "Benedikt Ziegler",
                "email": "benedikt@gmail.com",
                "phone": "+49 1111 111 11 1",
                "favouriteColor": "rgba(41, 171, 226, 1)"
            },
            {
                "name": "David Eisenberg",
                "email": "davidberg@gmail.com",
                "phone": "+49 1112 311 11 1",
                "favouriteColor": "rgba(252, 113, 255, 1)"
            },
            {
                "name": "Eva Fischer",
                "email": "eva@gmail.com",
                "phone": "+49 1199 1021 11 1",
                "favouriteColor": "rgba(2, 207, 47, 1)"
            },
            {
                "name": "Emmanuel Mauer",
                "email": "emmanuelMa@gmail.com",
                "phone": "+49 116311 11 2",
                "favouriteColor": "rgba(175, 22, 22, 1)"
            },
            {
                "name": "Marcel Bauer",
                "email": "bauer@gmail.com",
                "phone": "+49 1611 156 11 1",
                "favouriteColor": "rgba(70, 47, 138, 1)"
            }
        ]
};
let startingLetters = [];
let existingLetterIndex = 0;

async function init() {
    await downloadFromServer();
    let tempContacts = contacts;
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    if (contacts.length <= 0) {
        contacts = tempContacts;
    }
    console.log(contacts);
    includeHTML();
    buildContactList();
    console.log(startingLetters);
}

function displayContact(index) {
    document.getElementById('overview_contact_name').innerHTML = contacts.contacts[index].name;
    document.getElementById('overview_contact_email').innerHTML = contacts.contacts[index].email;
    document.getElementById('overview_contact_phone').innerHTML = contacts.contacts[index].phone;
    document.getElementById('contacts_overview_container').classList.remove('d-none');
    document.getElementById('contacts_overview_contact_pictureContainer').style.backgroundColor = contacts.contacts[index].favouriteColor;
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
    let allContactlistEntries = document.querySelectorAll('.contacts-list-contact');
    allContactlistEntries.forEach(contactEntry => {
        contactEntry.classList.remove('contactActive');
    });
    document.getElementById('contacts_list_contact_' + contactIndex).classList.add('contactActive');
}

function findStartingLetters() {
    contacts.contacts.forEach(contact => {
        startingLetters.push(contact.name.charAt(0));
    });

    startingLetters = startingLetters.filter((element, index) => {
        return startingLetters.indexOf(element) === index;
    });

    console.log(startingLetters);
}

function buildContactList() {
    findStartingLetters();
    for (let i = 0; i < contacts.contacts.length; i++) {
        document.getElementById('contacts_list').innerHTML += generateContactListEntry(i);
        startingLetters.splice(existingLetterIndex, 1, 0);
        setFavouriteBackgroundColor(i);
    }
}

function isNameStartingWithExistingLetter(contactIndex) {
    for (let i = 0; i < startingLetters.length; i++) {
        if (contacts.contacts[contactIndex].name.charAt(0).includes(startingLetters[i])) {
            existingLetterIndex = i;
            return true;
        }
    }
    return false;
}

function setFavouriteBackgroundColor(contactIndex) {
    document.getElementById('contacts_list_contact_pictureContainer_' + contactIndex).style.backgroundColor = contacts.contacts[contactIndex].favouriteColor;
}

function getNamePrefix(contactIndex) {
    let contactName = contacts.contacts[contactIndex].name;
    contactName = contactName.split(" ");
    let contactNamePrefix = "";
    for (let i = 0; i < contactName.length; i++) {
        contactNamePrefix += contactName[i].charAt(0);
    }
    return contactNamePrefix;
}

function generateContactListEntry(index) {
    if (isNameStartingWithExistingLetter(index)) {
        return `
            <div class="contact-list-letterSeperator-section">
                <span class="contacts-list-letter">${startingLetters[existingLetterIndex]}</span>
                <hr class="contacts-list-headrow">
            </div>
            <div id="contacts_list_contact_${index}" class="contacts-list-contact" onclick="displayContact(${index})">
                <div id="contacts_list_contact_pictureContainer_${index}" class="contacts-list-contact-pictureContainer">
                    <span id="contacts_list_contact_picture_${index}" class="contacts-list-contact-picture">
                        ${getNamePrefix(index)}
                    </span>
                </div>
                <div class="contacts-list-contact-keys">
                    <h3 id="contacts-list-contact-keys-name-${index}" class="contacts-list-contact-keys-name">${contacts.contacts[index].name}</h3>
                    <a id="contacts-list-contact-keys-email-${index}" class="contacts-list-contact-keys-email" href="#">${contacts.contacts[index].email}</a>
                </div>
            </div>
    `;
    }
    return `
    <div id="contacts_list_contact_${index}" class="contacts-list-contact" onclick="displayContact(${index})">
        <div id="contacts_list_contact_pictureContainer_${index}" class="contacts-list-contact-pictureContainer">
            <span id="contacts_list_contact_picture_${index}" class="contacts-list-contact-picture">
                ${getNamePrefix(index)}
            </span>
        </div>
        <div class="contacts-list-contact-keys">
            <h3 id="contacts-list-contact-keys-name-${index}" class="contacts-list-contact-keys-name">${contacts.contacts[index].name}</h3>
            <a id="contacts-list-contact-keys-email-${index}" class="contacts-list-contact-keys-email" href="#">${contacts.contacts[index].email}</a>
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
}

function hideEditContact() {
    document.getElementById('contactEditPopUp-container').classList.add('hideEditContact');
}


function addContact() {
    console.log('Es funktioniert!');
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

