setURL('http://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let summary = [];

async function init() {
    await downloadFromServer();
    summary = JSON.parse(backend.getItem('users')) || [];

    backend.setItem('test', 'hallo');
    let a = backend.getItem('test');

    console.log(a);
}