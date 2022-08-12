var button = document.querySelector(".submit");
var input = document.querySelector(".input_text");
var listings = document.querySelector(".list-group");

function openTab(evt, id) {
  alert(id);
  alert(evt);
}

button.addEventListener("click" || "keypress", function (event) {
  event.preventDefault();
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
        "X-RapidAPI-Key": "e10f9c3829mshc1c6f1c56857494p185016jsne7dfd1e75bb5",
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
              "<li>" +
              data.results[i].sections["0"].components[l].raw_text +
              "</li>";
          }

          ingredientsHtml += "</ul>";
        }
        // let ratingDec = data.results[i].user_ratings;
        // ratingDec = ratingDec * 100;
        var rating = Math.round(data.results[i].user_ratings.score * 10);
        var votes =
          data.results[i].user_ratings.count_positive +
          data.results[i].user_ratings.count_negative;

        console.log(votes);

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

        html += "<div class='tab'>";
        html +=
          "<div class='header'><h2>" +
          data.results[i].name +
          "</h2><strong><p class='cooking-time'>Cooking Time: </strong>" +
          data.results[i].cook_time_minutes +
          "mins  -<strong>  Prep Time: </strong>" +
          data.results[i].prep_time_minutes +
          "mins  -<strong>  Servings: </strong>" +
          data.results[i].num_servings +
          "  -<strong>  User Rating: </strong>" +
          rating +
          "/10 (" +
          votes +
          " votes)</p></div>";
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
          "'>" +
          ingredientsHtml +
          "</div>";
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
