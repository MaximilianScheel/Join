setURL('https://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let users = [];
let contacts = {
    contacts:
        [
            {
                "name": "Anton Mayer",
                "email": "anton@gmail.com",
                "phone": "+49 1111 111 131 1"
            },
            {
                "name": "Anja Schulz",
                "email": "schulz@hotmail.com",
                "phone": "+49 11122 111 11 1"
            },
            {
                "name": "Benedikt Ziegler",
                "email": "benedikt@gmail.com",
                "phone": "+49 1111 111 11 1"
            },
            {
                "name": "David Eisenberg",
                "email": "davidberg@gmail.com",
                "phone": "+49 1112 311 11 1"
            },
            {
                "name": "Eva Fischer",
                "email": "eva@gmail.com",
                "phone": "+49 1199 1021 11 1"
            },
            {
                "name": "Emmanuel Mauer",
                "email": "emmanuelMa@gmail.com",
                "phone": "+49 116311 11 2"
            },
            {
                "name": "Marcel Bauer",
                "email": "bauer@gmail.com",
                "phone": "+49 1611 156 11 1"
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

function generateContactListEntry(index) {
    if (isNameStartingWithExistingLetter(index)) {
        return `
            <div class="contact-list-letterSeperator-section">
                <span class="contacts-list-letter">${startingLetters[existingLetterIndex]}</span>
                <hr class="contacts-list-headrow">
            </div>
            <div id="contacts_list_contact_${index}" class="contacts-list-contact" onclick="displayContact(${index})">
                <img id="contacts_list_contact_picture_${index}" class="contacts-list-contact-picture" src="" alt="AM">
                <div class="contacts-list-contact-keys">
                    <h3 id="contacts-list-contact-keys-name-${index}" class="contacts-list-contact-keys-name">${contacts.contacts[index].name}</h3>
                    <a id="contacts-list-contact-keys-email-${index}" class="contacts-list-contact-keys-email" href="#">${contacts.contacts[index].email}</a>
                </div>
            </div>
    `;
    }
    return `
    <div id="contacts_list_contact_${index}" class="contacts-list-contact" onclick="displayContact(${index})">
        <img id="contacts_list_contact_picture_${index}" class="contacts-list-contact-picture" src="" alt="AM">
            <div class="contacts-list-contact-keys">
                <h3 id="contacts-list-contact-keys-name-${index}" class="contacts-list-contact-keys-name">${contacts.contacts[index].name}</h3>
                <a id="contacts-list-contact-keys-email-${index}" class="contacts-list-contact-keys-email" href="#">${contacts.contacts[index].email}</a>
            </div>
    </div>
    `;
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

