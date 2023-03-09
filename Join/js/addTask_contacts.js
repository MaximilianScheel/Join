
/**
 * function to open or close the contacts-field by clicking on it
 */
function openCloseContacts() {
  if (document.getElementById('selectFieldContact').style.height == '147px') {
    if ($(window).width() > 720) {
      document.getElementById('selectFieldContact').style.height = '53px';
    } else {
      document.getElementById('selectFieldContact').style.height = '43px';
    }
    document.getElementById('openedContacts').classList.add('d-none');
  } else {
    document.getElementById('selectFieldContact').setAttribute('style', 'height: 147px !important;')
    setTimeout(function () {
      document.getElementById('openedContacts').classList.remove('d-none');
    }, 150)
  }
  disableInputContact()
}


function disableInputContact () {
  if (document.getElementById('contact').disabled = true) {
    document.getElementById('contact').disabled = false;
  } else {
    document.getElementById('contact').disabled = true;
  }
}

/**
 * function to prevent to open or close the category-field
 */
function notOpenCloseContacts(event) {
  event.stopPropagation();
}
