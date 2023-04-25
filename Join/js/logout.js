/**
 * @fileoverview logout.js is a file to handle the logout functionality.
 */
function openLogout() {
    let logoutContainer = document.getElementById("logoutContainer");
    logoutContainer.style.display = "block";
}


/**
 * Closes the logout container and redirects to index.html
 * @param {string} id
 */
async function logout() {
    currentUser = [];
    await backend.setItem('currentUser', currentUser);
    window.location.href = './index.html';
}
