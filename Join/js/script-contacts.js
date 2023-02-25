setURL('http://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let contacts = [];

async function init() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('users')) || [];

    backend.setItem('test', 'hallo');
    let a = backend.getItem('test');

    console.log(a);
}



