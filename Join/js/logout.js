
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
    document.getElementById('logoutContainer').classList.add('logoutDisplayed');
}

function hideLogOut() {
    document.getElementById('logoutContainer').classList.remove('logoutDisplayed');
}
