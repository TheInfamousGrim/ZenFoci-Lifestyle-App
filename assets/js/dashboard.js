// Select initializer
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll("select");
  const instances = M.FormSelect.init(elems, {
    dropdownOptions: {},
  });
});
let count = 0;
increment = document.getElementById("btn_increment");
decrement = document.getElementById("btn_decrement");
counter = document.getElementById("js-counter");

increment.addEventListener("click", function () {
  count++;
  counter.textContent = count;
});

decrement.addEventListener("click", function () {
  count--;
  counter.textContent = count;
});
//this for the 2nd buttons
let count1 = 0;
increment1 = document.getElementById("btn_increment1");
decrement1 = document.getElementById("btn_decrement1");
counter1 = document.getElementById("items");

increment1.addEventListener("click", function () {
  count1++;
  counter1.textContent = count1;
});

decrement1.addEventListener("click", function () {
  count1--;
  counter1.textContent = count1;
});

////this for the 3rd buttons
let count2 = 0;
increment2 = document.getElementById("btn_increment2");
decrement2 = document.getElementById("btn_decrement2");
counter2 = document.getElementById("collection");

increment2.addEventListener("click", function () {
  count2++;
  counter2.textContent = count2;
});

decrement2.addEventListener("click", function () {
  count2--;
  counter2.textContent = count2;
});
