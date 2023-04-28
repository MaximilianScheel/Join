
/**
 * Closes the logout container and redirects to index.html
 * @param {string} id
 */
async function logout() {
    currentUser = [];
    await backend.setItem('currentUser', currentUser);
    window.location.href = './index.html';
}


/**
 * Shows the logout container
 */
function showLogOut() {
    document.getElementById('logoutContainer').classList.add('logoutDisplayed');
}


/**
 * Hides the logout container
 */
function hideLogOut() {
    document.getElementById('logoutContainer').classList.remove('logoutDisplayed');
}


/**
 * Shows the popup "Task added to board" with animation
 */
function activateLink(element) {
    document.querySelectorAll('sideMenu-link-container-desktop').classList.remove('menuLinkActive');
    element.classList.add('menuLinkActive');
}