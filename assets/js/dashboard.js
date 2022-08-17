/* -------------------------------------------------------------------------- */
/*                             materialize plugins                            */
/* -------------------------------------------------------------------------- */

// Modal initializer
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems, { opacity: 0.5 });
});

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

// Mobile side nav
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, {});
});

const eventInfoHomepageModal = document.querySelector('#event-info-home-modal');

/* -------------------------------------------------------------------------- */
/*                                progress bar                                */
/* -------------------------------------------------------------------------- */

function frame(elem, width, id) {
    if (width >= 100) {
        clearInterval(id);
        i = 0;
    } else {
        width++;
        elem.style.width = `${width}%`;
        elem.innerHTML = `${width}%`;
    }
}

let i = 0;
function move() {
    if (i == 0) {
        i = 1;
        const elem = document.getElementById('myBar');
        const width = 10;
        const id = setInterval(frame, 10);
        frame(elem, width, id);
    }
}
