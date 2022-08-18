/* -------------------------------------------------------------------------- */
/*                                    forms                                   */
/* -------------------------------------------------------------------------- */

// Dropdown initializer
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.dropdown-trigger');
    const instances = M.Dropdown.init(elems, {});
});

// Select initializer
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems, {
        dropdownOptions: {},
    });
});

/* -------------------------------------------------------------------------- */
/*    !!!!!!!!!!disengaged this as was unsure what it was doing!!!!!!!!       */
/* -------------------------------------------------------------------------- */

// Saves to local storage
// const save_button = document.getElementById('Save');
// save_button.onclick = saveData;

function saveData() {
    const input = document.getElementById('saveServer');
    localStorage.setItem('server', input.value);
    const storedValue = localStorage.getItem('server');
}
 

/* ------------------------------- Splash Images in About section - Animation -------------------------- */


$(document).ready(function(){
    $('.materialboxed').materialbox();
  });
       

  // Mobile side nav
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, {});
});


/* ------------------------------- Meals/Groceries carousel images -------------------------- */

$(document).ready(function(){
    $('.slider').slider();
  });
       