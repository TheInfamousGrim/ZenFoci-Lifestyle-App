const button = document.querySelector('.submit');
const input = document.querySelector('.input_text');
const listings = document.querySelector('.list-group');
var names = [' '];
const preExistingData = localStorage.getItem('shopping-list');
const recipe = ["'<li>" + "</li>'"];
names.push(preExistingData);

if (preExistingData === null) {
    var names = [' '];
}

function openTab(evt, id) {
    alert(id);
    alert(evt);
}

button.addEventListener('click' || 'keypress', (event) => {
    event.preventDefault();
    $('.title').empty().append(`<h2>Search results for : ${input.value}</h2>`);
    search(event);
});

function search(event) {
    const term = input.value;

    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${term}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd1b6b0fd0emsh148b53da77ee623p1c1b9ajsn30bddddf5591',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const items = [];

            for (let i = 0; i < data.results.length; i++) {
                let html = '';

                const did = data.results[i].id;
                var mealName = data.results[i].name;
                const { description } = data.results[i];

                let instructionsHtml = '';
                let ingredientsHtml = '';
                let componentsHtml = '';
                var nutritionHTML = `<li>Calories: ${data.results[i].nutrition.calories}<li><li>Carbohydrates: ${data.results[i].nutrition.carbohydrates}<li>`;

                if (data.results[i].instructions.length > 0) {
                    instructionsHtml += '<ul>';

                    for (let j = 1; j < data.results[i].instructions.length; j++) {
                        instructionsHtml += `<li>${data.results[i].instructions[j].display_text}</li>`;
                    }
                    instructionsHtml += '</ul>';

                    for (let k = 0; k < data.results[i].sections.length; k++) {
                        componentsHtml += `<li>${data.results[i].sections[k]}</li>`;
                    }
                    componentsHtml += '</ul>';

                    for (let l = 0; l < data.results[i].sections['0'].components.length; l++) {
                        ingredientsHtml += `<li a href='#' class='listitem'>${data.results[i].sections['0'].components[l].raw_text}</li>`;
                        console.log(`#tabcon-${did} a`);
                    }

                    ingredientsHtml += '</ul>';
                }

                $('.listitem').on('click', function (event) {
                    event.preventDefault();
                    // var items = new Array();
                    // localStorage.items("items" ,$( this ).text().replace(/\d+/g, '').replace(/tablespoons|tablespoon|cups|pints|teaspoons|to taste|slices|of|ounces|sliced|teaspoon|cup|sharp|¼|¾|½|⅓|room temperature|/g,""))
                    // setItem(keyName, keyValue)
                    // let list = JSON.parse(localStorage.getItem("shopping-list", "[]"))

                    names.push(
                        `</div><li id='item'>${$(this)
                            .html()
                            .replace(/\d+/g, '')
                            .replace(
                                /tablespoons|tablespoon|cups|pints|teaspoons|to taste|slices|of|ounces|sliced|teaspoon|cup|sharp|¼|¾|½|⅓|room temperature|/g,
                                ''
                            )}</li></div>`
                    );

                    const filteredNames = [...new Set(names)];

                    console.log(filteredNames);

                    localStorage.setItem('shopping-list', JSON.stringify(filteredNames));

                    // console.log( $( this ).html().replace(/\d+/g, '').replace(/tablespoons|tablespoon|cups|pints|teaspoons|to taste|slices|of|ounces|sliced|teaspoon|cup|sharp|¼|¾|½|⅓|room temperature|/g,"") );
                    // console.log(names)
                });

                $('#savebutton').on('click', function (event) {
                    event.preventDefault();
                    recipe.push(`<li>${$(this).text()}${mealName}</li>`);
                    localStorage.setItem('meal-list', JSON.stringify(recipe));

                    console.log(recipe);
                });
                // let ratingDec = data.results[i].user_ratings;
                // ratingDec = ratingDec * 100;
                const rating = Math.round(data.results[i].user_ratings.score * 10);
                const votes = data.results[i].user_ratings.count_positive + data.results[i].user_ratings.count_negative;

                console.log(votes);

                var nutritionHTML = `<li>Calories: ${data.results[i].nutrition.calories}</li><li>Carbohydrates: ${data.results[i].nutrition.carbohydrates}</li><li>Fat: ${data.results[i].nutrition.fat}</li><li>Fibre: ${data.results[i].nutrition.fibre}</li><li>Protein: ${data.results[i].nutrition.protein}</li><li>Sugar: ${data.results[i].nutrition.sugar}</li>`;

                html += `<div class='tab' id='${did}'>`;
                html += `<div class='header'><div><h2>${data.results[i].name}</h2></div><strong><p class='cooking-time'>Cooking Time: </strong>${data.results[i].cook_time_minutes}mins  -<strong>  Prep Time: </strong>${data.results[i].prep_time_minutes}mins  -<strong>  Servings: </strong>${data.results[i].num_servings}  -<strong>  User Rating: </strong>${rating}/10 (${votes} votes)</p></div><button class='btn submit' id='savebutton' value='${did}' style='float: right;' >Save Recipe</button>`;
                html += `<button class='tablinks tabbtn-${did} active' id='overview${did}' data-id='${did}'>Overview</button>`;

                html += `<button class='tablinks tabbtn-${did}' id='ingredients${did}'  data-id='${did}'>Ingredients</button>`;
                html += `<button class='tablinks tabbtn-${did}' id='instructions${did}'  data-id='${did}'>Instructions</button>`;
                html += '</div>';
                html += `<div class='tabcontent tabcon-${did} active overview${did}'><div class='row'><div class='col xl4 s12'><img class='activator' src='${data.results[i].thumbnail_url}'/></div>`;
                html += `<div class='col xl7 s12'>${data.results[i].description}<div><h4>Nutrition</h4>${nutritionHTML}</div></div></div>`;
                html += '</div>';
                html += `<div class='tabcontent tabcon-${did} ingredients${did}'><ul class='inglist'>${ingredientsHtml}</ul><a href='#'><button class='btn btn-primary' id='addtolist'>Save</button></a></div>`;
                html += `<div class='tabcontent tabcon-${did} instructions${did}'>${instructionsHtml}</div>`;

                $('.title').append(html);
            }
        });
    input.value = '';
}
