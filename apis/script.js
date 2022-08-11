var button = document.querySelector(".submit");
var input = document.querySelector(".input_text");
var listings = document.querySelector(".list-group");

button.addEventListener("click", function (event) {
  event.preventDefault();
  search(event);
});

// function addCode() {
// 	document.getElementById("#listings").insertAdjacentHTML("afterend",
// "<h3>This is the text which has been inserted by JS</h3>");

// }

function search(event) {
  var term = input.value;

  fetch(
    "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=" +
      term,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0170700766mshcf69fb08a467c9bp100823jsn51c168ac4b25",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      const items = [];

      for (let i = 0; i < 20; i++) {
        items.push(data.results[i].name % 6);
        console.log(data.results);
        var newInsArray = data.results.map(function (inst) {
          for (let e = 0; e < 20; e++) {
            return (
              "<li class='inst-point'>" +
              inst.instructions[e].display_text +
              "</li>"
            );
          }
        });
        console.log(newInsArray.join());
        console.log(data.results[i].newInsArray);
        // console.log(instructions[e]);
        // console.log(data.results[i].instructions[e].display_text);
        console.log(newInsArray.display_text);
        var mealName = data.results[i].name;
        const listNo = data.results[i].canonical_id;
        $(".card").append(
          $(
            "<div 'class='card-image waves-effect waves-block waves-light'><div class='result_body'><img class='activator' src='" +
              data.results[i].thumbnail_url +
              "'/><div class='description'>" +
              data.results[i].description +
              "</div></div></div>"
          )
        );
        $(".card").append(
          $("<div class='card-content'>").append(
            "<span class='card-title activator grey-text text-darken-4'>" +
              data.results[i].name +
              "<i class='material-icons right'>more</i></span><p><a href='#'>This is a link</a></p>"
          )
        );
        $(".card").append(
          $("<div class='card-reveal'>").append(
            "<span class='card-title grey-text text-darken-4'>" +
              data.results[i].name +
              "<ol>" +
              newInsArray.join("") +
              "</ol>" +
              "<i class='material-icons right'>close</i></span><p>" +
              data.results[i].canonical_id +
              "</p>"
          )
        );
        // $(".card").append(
        //   $("<div class='card-content grey lighten-4'>").append(
        //     "<div id='test4'>," +
        //       listNo +
        //       "<div id='test5'>" +
        //       listNo +
        //       "<div id='test6'>" +
        //       listNo
        // "<a href='#test4'>" + listNo + "</a>" + "</li>"
      }
      // <img src='" +
      //   data.results[i].thumbnail_url +
      //   "'>"

      //     .find("div:last")
      //     .addClass("card-content");

      //   // .find("img:last")
      //   // .addClass("thumbnail") + "</div>";

      //   $(".card-content").append("<div>") + "</div>";
      //   $(".card-tabs")
      //     .append("<div>")
      //     .addClass("card-tabs")
      //     .append("<ul>")
      //     .find("ul.last")
      //     .addClass("tabs tabs-fixed-width") + "</ul>";

      //   $(".tabs")
      //     .append("<li>" + data.results[i].canonical_id)
      //     .find("li:last")
      //     .addClass("tab") + "</li>";
      //   console.log(listNo);
      // }

      //   $(".list-group-item").attr("onclick", "handler");

      function addBook(user_id, name) {
        console.log(name);
        console.log(user_id);
      }
      // addCode()
      // console.log(addCode())

      // listings.append(
      // 	'<p>hello</p>'
      // 	'<div class="d-flex gap-2 w-100 justify-content-between"> <div> <h6 class="mb-0">' + mealName +
      // 	'</h6> <p class="mb-0 opacity-75">'
      // 		+  '</p></div>'+
      // 	'<small class="opacity-50 text-nowrap">now</small> </div>'
      // +
      //   '<img src="https://github.com/twbs.png" alt="twbs" width="32"	height="32" class="rounded-circle flex-shrink-0"/>'
      // );
      input.value = "";
    });
}

// var e = $(".list-group-item");
// for (var i = 0; i < e.length; i++) {
//   // older browser don't have element.classList -> even more complex
//   e[i].children.classList.contains("list-group-item");
//   // do some more magic stuff here
//   var element = document.querySelector(".list-group-item");

//   element.addEventListener("click", () => {
//     console.log("clicked element");
//   });
// }

///LIST///

// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=chicken",
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Key": "0170700766mshcf69fb08a467c9bp100823jsn51c168ac4b25",
// 		"X-RapidAPI-Host": "tasty.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

// /MORE INFO///

// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://tasty.p.rapidapi.com/recipes/get-more-info?id=8354",
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Key": "0170700766mshcf69fb08a467c9bp100823jsn51c168ac4b25",
// 		"X-RapidAPI-Host": "tasty.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

///Edamam////

// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=bucketwheat%20flour",
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Key": "0170700766mshcf69fb08a467c9bp100823jsn51c168ac4b25",
// 		"X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
