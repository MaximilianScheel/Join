setURL('http://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

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

async function init() {
    await downloadFromServer();
    let tempContacts = contacts;
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    if (contacts.length <= 0) {
        contacts = tempContacts;
    }
    console.log(contacts);
    buildContactList();
}

function displayContact(index) {
    document.getElementById('overview_contact_name').innerHTML = contacts.contacts[index].name;
    document.getElementById('overview_contact_email').innerHTML = contacts.contacts[index].email;
    document.getElementById('overview_contact_phone').innerHTML = contacts.contacts[index].phone;
    document.getElementById('contacts_overview_container').classList.remove('d-none');

}

function buildContactList() {
    let startingChars = [];
    contacts.contacts.forEach(contact => {
        let startLetter = contact.name.charAt(0).toUpperCase();
        if (!isStartLetterInStartingChars(startLetter, startingChars)) {
            startingChars.push(startLetter);
        }
    });

    for (let i = 0; i < contacts.contacts.length; i++) {
        document.getElementById('contacts_list').innerHTML += generateContactListEntry(i);
    }

    console.log(startingChars);
}

function isStartLetterInStartingChars(letter, startingChars) {
    for (let i = 0; i < startingChars.length; i++) {
        if (startingChars[i].includes(letter)) {
            return true;
        }
    }
    return false;
}

function generateContactListEntry(index) {
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






