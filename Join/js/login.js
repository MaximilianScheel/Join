setURL('http://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let users = [
    {
        'email': 'maxscheel69@gmail.com', 
        'password': '123456'
    },

    {
        'email': 'hanswurst@gmail.com',
        'password': '123456'
    }
];

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];

    backend.setItem('test', 'hallo');
    let a = backend.getItem('test');

    console.log(a);
}


function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(user => user.email == email.value && user.password == password.value);
    console.log(user);
    if (user) {
        window.location.href = 'summary.html?msg=Login successful';
    } else {
        window.location.href = 'login.html?msg=Login failed';
    }
}


const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

if (msg) {
    msgBox.innerHTML = msg;
} else {
    msgBox.innerHTML = 'Bitte melde dich an';
    // msgBox.style.display = 'none';
}


//  if(msg) {
//      document.getElementById('msg').innerHTML = msg;
//  }


function adduser(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({'email': email.value, 'password': password.value});
    window.location.href = 'login.html?msg=Registration successful';

}