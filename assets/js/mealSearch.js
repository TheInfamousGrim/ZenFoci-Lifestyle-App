const button = document.querySelector('.submit');
const input = document.querySelector('.input_text');
const listings = document.querySelector('.list-group');
let names = [' '];
const preExistingData = localStorage.getItem('shopping-list');
const recipe = ["'<li>" + "</li>'"];
names.push(preExistingData);

if (preExistingData === null) {
    names = [' '];
}

button.addEventListener('click' || 'keypress', (event) => {
    event.preventDefault();
    search(event);
});

/* -------------------------------------------------------------------------- */
/*                             materailize plugins                            */
/* -------------------------------------------------------------------------- */

// Mobile side nav
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, {});
});

/* -------------------------------------------------------------------------- */
/*                              loader functions                              */
/* -------------------------------------------------------------------------- */

// loader container selector
const loaderContainer = document.querySelector('.loader-container');

// loader HTML
const preLoaderHTML = `
<div class="lds-heart center">
    <div></div>
</div>
`;

function displayLoader() {
    loaderContainer.innerHTML = preLoaderHTML;
}

function removeLoader() {
    loaderContainer.innerHTML = '';
}

/* -------------------------------------------------------------------------- */
/*                          filter out all junk data                          */
/* -------------------------------------------------------------------------- */

function filterUndefinedData(data) {
    const noUndefinedData = data.filter((dataItem) => dataItem !== undefined);
    const filteredInstructionsData = data.filter(
        (dataItem) => dataItem.instructions !== undefined && dataItem.instructions !== null
    );
    const filteredUserRatingData = filteredInstructionsData.filter((result) => result.user_ratings !== undefined);
    return filteredUserRatingData;
}

/* ----------------------------- get saved data ----------------------------- */

function search(event) {
    const term = input.value;
    displayLoader();
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

            // set innerHTML to be an empty string
            const mealContainer = document.querySelector('.title');
            mealContainer.innerHTML = '';
            console.log(mealContainer.innerHTML);

            // iterate through the data
            for (let i = 0; i < data.results.length; i++) {
                // filter data out and remove the data with undefined instructions
                const filteredData = filterUndefinedData(data.results);
                if (filteredData[i] === undefined) {
                    return;
                }

                // create an empty html element
                let html = '';

                const did = filteredData[i].id;
                const mealName = filteredData[i].name;
                const { description } = filteredData[i];

                let instructionsHtml = '';
                let ingredientsHtml = '';
                let componentsHtml = '';
                let nutritionHTML = '';
                if (filteredData[i].nutrition !== undefined) {
                    nutritionHTML = `<li>Calories: ${filteredData[i].nutrition.calories}<li><li>Carbohydrates: ${filteredData[i].nutrition.carbohydrates}<li>`;
                } else {
                    nutritionHTML = '';
                }

                if (filteredData[i] !== undefined && filteredData[i].instructions.length > 0) {
                    instructionsHtml += '<ul>';

                    for (let j = 1; j < filteredData[i].instructions.length; j++) {
                        instructionsHtml += `<li>${filteredData[i].instructions[j].display_text}</li>`;
                    }
                    instructionsHtml += '</ul>';

                    for (let k = 0; k < filteredData[i].sections.length; k++) {
                        componentsHtml += `<li>${filteredData[i].sections[k]}</li>`;
                    }
                    componentsHtml += '</ul>';

                    for (let l = 0; l < filteredData[i].sections['0'].components.length; l++) {
                        ingredientsHtml += `<li a href='#' class='listitem'>${filteredData[i].sections['0'].components[l].raw_text}</li>`;
                    }

                    ingredientsHtml += '</ul>';
                }

                $('.listitem').on('click', function (e) {
                    e.preventDefault();
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

                    localStorage.setItem('shopping-list', JSON.stringify(filteredNames));

                    // console.log( $( this ).html().replace(/\d+/g, '').replace(/tablespoons|tablespoon|cups|pints|teaspoons|to taste|slices|of|ounces|sliced|teaspoon|cup|sharp|¼|¾|½|⅓|room temperature|/g,"") );
                    // console.log(names)
                });

                $('#savebutton').on('click', function (e) {
                    e.preventDefault();
                    recipe.push(`<li>${$(this).text()}${mealName}</li>`);
                    localStorage.setItem('meal-list', JSON.stringify(recipe));
                });
                // let ratingDec = data.results[i].user_ratings;
                // ratingDec = ratingDec * 100;

                const rating = Math.round(filteredData[i].user_ratings.score * 10);

                const votes = filteredData[i].user_ratings.count_positive + filteredData[i].user_ratings.count_negative;

                nutritionHTML = `<li>Calories: ${filteredData[i].nutrition.calories}</li><li>Carbohydrates: ${filteredData[i].nutrition.carbohydrates}</li><li>Fat: ${filteredData[i].nutrition.fat}</li><li>Fibre: ${filteredData[i].nutrition.fibre}</li><li>Protein: ${filteredData[i].nutrition.protein}</li><li>Sugar: ${filteredData[i].nutrition.sugar}</li>`;

                html += `<div class='tab' id='${did}'>`;
                html += `<div class='header'><div><h2>${filteredData[i].name}</h2></div><strong><p class='cooking-time'>Cooking Time: </strong>${filteredData[i].cook_time_minutes}mins  -<strong>  Prep Time: </strong>${filteredData[i].prep_time_minutes}mins  -<strong>  Servings: </strong>${filteredData[i].num_servings}  -<strong>  User Rating: </strong>${rating}/10 (${votes} votes)</p></div><button class='btn submit' id='savebutton' value='${did}' style='float: right;' >Save Recipe</button>`;
                html += `<button class='tablinks tabbtn-${did} active' id='overview${did}' data-id='${did}'>Overview</button>`;

                html += `<button class='tablinks tabbtn-${did}' id='ingredients${did}'  data-id='${did}'>Ingredients</button>`;
                html += `<button class='tablinks tabbtn-${did}' id='instructions${did}'  data-id='${did}'>Instructions</button>`;
                html += '</div>';
                html += `<div class='tabcontent tabcon-${did} active overview${did}'><div class='row'><div class='col xl4 s12'><img class='activator' src='${filteredData[i].thumbnail_url}'/></div>`;
                html += `<div class='col xl7 s12'>${filteredData[i].description}<div><h4>Nutrition</h4>${nutritionHTML}</div></div></div>`;
                html += '</div>';
                html += `<div class='tabcontent tabcon-${did} ingredients${did}'><ul class='inglist'>${ingredientsHtml}</ul><a href='#'><button class='btn btn-primary' id='addtolist'>Save</button></a></div>`;
                html += `<div class='tabcontent tabcon-${did} instructions${did}'>${instructionsHtml}</div>`;

                $('.title').append(html);
                removeLoader();
            }
        });
    input.value = '';
}
