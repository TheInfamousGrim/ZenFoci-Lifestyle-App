var button = document.querySelector(".submit");
var input = document.querySelector(".input_text");
var listings = document.querySelector(".list-group");
var names = [" "];
var preExistingData = localStorage.getItem("shopping-list");
var recipe = [" "];
var recipeID = [" "];
names.push(preExistingData);
console.log(preExistingData);

if (preExistingData === null) {
  var names = [" "];
}

console.log(recipeID);
console.log(names);
function openTab(evt, id) {
  alert(id);
  alert(evt);
}

button.addEventListener("click" || "keypress", function (event) {
  event.preventDefault();
  $(".title")
    .empty()
    .append("<h2>Search results for : " + input.value + "</h2>");
  search(event);
});

function search(event) {
  var term = input.value;

  fetch(
    "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=" +
      term,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "d1b6b0fd0emsh148b53da77ee623p1c1b9ajsn30bddddf5591",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const items = [];

      for (let i = 0; i < data.results.length; i++) {
        var html = "";

        console.log(data.results[i]);

        var did = data.results[i].id;
        var mealName = data.results[i].name;
        var description = data.results[i].description;

        var instructionsHtml = "";
        var ingredientsHtml = "";
        var componentsHtml = "";
        var nutritionHTML =
          "<li>Calories: " +
          data.results[i].nutrition.calories +
          "<li><li>Carbohydrates: " +
          data.results[i].nutrition.carbohydrates +
          "<li>";

        if (data.results[i].instructions.length > 0) {
          instructionsHtml += "<ul>";

          for (let j = 1; j < data.results[i].instructions.length; j++) {
            instructionsHtml +=
              "<li>" + data.results[i].instructions[j].display_text + "</li>";
          }
          instructionsHtml += "</ul>";

          for (let k = 0; k < data.results[i].sections.length; k++) {
            componentsHtml += "<li>" + data.results[i].sections[k] + "</li>";
          }
          componentsHtml += "</ul>";

          for (
            let l = 0;
            l < data.results[i].sections["0"].components.length;
            l++
          ) {
            ingredientsHtml +=
              "<li a href='#' class='listitem'>" +
              data.results[i].sections["0"].components[l].raw_text +
              "</li>";
            console.log("#tabcon-" + did + " a");
          }

          ingredientsHtml += "</ul>";
        }

        //create a new array
        $(".listitem").on("click", function (event) {
          event.preventDefault();
          $(this).attr("id", "done");

          names.push(
            "<li id='item'>" +
              $(this)
                .html()
                .replace(/\d+/g, "")
                .replace(
                  /tablespoons|tablespoon|cups|pints|teaspoons|to taste|slices|of|ounces|sliced|teaspoon|cup|sharp|¼|¾|½|⅓|room temperature|-ounce|-ounces|plus more|-whole|cans|can/g,
                  ""
                ) +
              "</li>"
          );

          let filteredNames = [...new Set(names)];

          console.log(filteredNames);

          localStorage.setItem("shopping-list", JSON.stringify(filteredNames));
        });

        $(".tab").on("click", "#savebutton", function (event) {
          // for (i = 0; i<recipeID.length; i++){
          event.preventDefault();

          // console.log(event.currentTarget.value)

          recipe = event.currentTarget.value;
          unqref = event.currentTarget.className;
          console.log(unqref);
          console.log(event.currentTarget);
          recipeID.push(
            "<li id='" + unqref + "' class='item'>" + recipe + "</li>"
          );
          // console.log(datArray)
          //  let filteredRecipe = [...new Set(recipe)];

          let filteredMealID = [...new Set(recipeID)];
          localStorage.setItem("meal-list", JSON.stringify(filteredMealID));
          // push all the data in the array
          //push all the filtered meal
          // localStorage.setItem("meal-list",  JSON.stringify(datArray[i]));
          // }
          // recipeID.push("<li>" + did +"</li>")

          // localStorage.setItem("meal-id",  JSON.stringify(filteredMealID));
          // recipeID.push(datArray)

          //  console.log(filteredRecipe)
          //  console.log(filteredMealID)
          console.log(filteredMealID);
        });
        // let ratingDec = data.results[i].user_ratings;
        // ratingDec = ratingDec * 100;
        var rating = Math.round(data.results[i].user_ratings.score * 10);
        var votes =
          data.results[i].user_ratings.count_positive +
          data.results[i].user_ratings.count_negative;

        // console.log(votes);

        var nutritionHTML =
          "<li>Calories: " +
          data.results[i].nutrition.calories +
          "</li><li>Carbohydrates: " +
          data.results[i].nutrition.carbohydrates +
          "</li><li>Fat: " +
          data.results[i].nutrition.fat +
          "</li><li>Fibre: " +
          data.results[i].nutrition.fibre +
          "</li><li>Protein: " +
          data.results[i].nutrition.protein +
          "</li><li>Sugar: " +
          data.results[i].nutrition.sugar +
          "</li>";

        html += "<div class='tab' id='" + did + "'>";
        html +=
          "<div class='header'><div><h2>" +
          data.results[i].name +
          "</h2></div><strong><p class='cooking-time'>Cooking Time: </strong>" +
          data.results[i].cook_time_minutes +
          "mins  -<strong>  Prep Time: </strong>" +
          data.results[i].prep_time_minutes +
          "mins  -<strong>  Servings: </strong>" +
          data.results[i].num_servings +
          "  -<strong>  User Rating: </strong>" +
          rating +
          "/10 (" +
          votes +
          " votes)</p></div><button class='" +
          did +
          "' id='savebutton' value='" +
          data.results[i].name +
          "' style='float: right;' >Save Recipe</button>";
        html +=
          "<button class='tablinks tabbtn-" +
          did +
          " active' id='overview" +
          did +
          "' data-id='" +
          did +
          "'>Overview</button>";

        html +=
          "<button class='tablinks tabbtn-" +
          did +
          "' id='ingredients" +
          did +
          "'  data-id='" +
          did +
          "'>Ingredients</button>";
        html +=
          "<button class='tablinks tabbtn-" +
          did +
          "' id='instructions" +
          did +
          "'  data-id='" +
          did +
          "'>Instructions</button>";
        html += "</div>";
        html +=
          "<div class='tabcontent tabcon-" +
          did +
          " active overview" +
          did +
          "'><div class='row'><div class='col s3'><img class='activator' src='" +
          data.results[i].thumbnail_url +
          "'/></div>";
        html +=
          "<div class='col s7'>" +
          data.results[i].description +
          "<div><h4>Nutrition</h4>" +
          nutritionHTML +
          "</div></div></div>";
        html += "</div>";
        html +=
          "<div class='tabcontent tabcon-" +
          did +
          " ingredients" +
          did +
          "'><h4>Click on an ingredient to add it to your shopping list</h4><ul class='inglist'>" +
          ingredientsHtml +
          "</ul><a href='#'></a></div>";
        html +=
          "<div class='tabcontent tabcon-" +
          did +
          " instructions" +
          did +
          "'>" +
          instructionsHtml +
          "</div>";

        $(".title").append(html);
      }
    });
  input.value = "";
}
