function openLogout() {
    let logoutContainer = document.getElementById("logoutContainer");
    logoutContainer.style.display = "block";
}

async function logout() {
    currentUser = [];
    await backend.setItem('currentUser', currentUser);
    window.location.href = './index.html';
}
