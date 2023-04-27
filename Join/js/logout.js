
/**
 * Closes the logout container and redirects to index.html
 * @param {string} id
 */
async function logout() {
    currentUser = [];
    await backend.setItem('currentUser', currentUser);
    window.location.href = './index.html';
}

function showLogOut() {
    console.log('got here.')
    document.getElementById('logoutContainer').classList.add('logoutDisplayed');
}

function hideLogOut() {
    document.getElementById('logoutContainer').classList.remove('logoutDisplayed');
}

function activateLink(element) {
    document.querySelectorAll('sideMenu-link-container-desktop').classList.remove('menuLinkActive');
    element.classList.add('menuLinkActive');
}