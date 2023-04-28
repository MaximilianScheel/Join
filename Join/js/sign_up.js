
/**
 * Register a new user by submitting the Sign up form
 * @param {Object} e
 */
async function registerUser(e) {
    e.preventDefault();

    let username = document.getElementById("username");
    let prename_name = username.value.split(' '); //is an ['Max', 'Scheel']
    let userPrename = prename_name[0]; // is 'Max'
    let userName = prename_name[1]; // 'Scheel'
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let isNameValid = nameValidation(username, 'name-validation', 'hidden');
    if (!isNameValid) return;
    let initials = getInitials(username.value);
    let color = generateColors();
    let user = contacts.find(c => c.email == email.value);

    if (user) {
        showSignupPopup('popup-failed-signup');
    } else {
        contacts.push(
            {   prename: userPrename,
                name: userName,
                short_name: initials,
                email: email.value,
                password: password.value,
                phone: "",
                favouriteColor: color
            }); 
        await backend.setItem('contacts', JSON.stringify(contacts));
        showSignupPopup('popup-success-signup');
        setTimeout(function () {window.location.href = './index.html?msg=success';}, 3000);
    }
    return false;
}


/**
 * Shows a popup with animation
 * @param {string} id
 */
function showSignupPopup(id) {
    let popup = document.getElementById(id);
    popup.classList.add('login_animation');
    setTimeout(function () {
        removeAnimationSignup(popup);
    }, 3000);
}

/**
 * Removes the animation class from popup
 * @param {string} popup 
 */
function removeAnimationSignup(popup) {
    popup.classList.remove('login_animation');
}