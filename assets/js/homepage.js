document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".modal");
  const instances = M.Modal.init(elems, { opacity: 1 });
});

     
document.addEventListener("DOMContentLoaded", function () {

  const select = document.querySelector('select');
  M.FormSelect.init(select)

})


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

// Saves to local storage
var save_button = document.getElementById('Save')
save_button.onclick = saveData;

function saveData(){
  var input = document.getElementById("saveServer");
  localStorage.setItem("server", input.value);
  var storedValue = localStorage.getItem("server");
}


 