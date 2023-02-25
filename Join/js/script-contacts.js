fetchContacts();

async function fetchContacts() {
    let contacts = await fetch('./json/contacts.json');
    let contactsJson = await contacts.json();
    console.log(contactsJson);
    displayContact(contactsJson)
}

function displayContact(contactsJson) {
    document.getElementById('contacts_overview_container-1').classList.remove('d-none');
    document.getElementById('overview_contact_name-1').innerHTML = contactsJson.contacts[0].name;
}
