/* -------------------------------------------------------------------------- */
/*                                   modals                                   */
/* -------------------------------------------------------------------------- */

// Modal initializer
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems, { opacity: 0.5 });
});

// Modal

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
 
