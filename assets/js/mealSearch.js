/* -------------------------------------------------------------------------- */
/*                             materialize plugins                            */
/* -------------------------------------------------------------------------- */

// Modal initializer

const elems = document.querySelectorAll('.modal');
const instances = M.Modal.init(elems, {});

// error modal instance
const errorModal = document.getElementById('error-modal');

const errorModalInstance = M.Modal.getInstance(errorModal);

/* -------------------------------------------------------------------------- */
/*                                  selctors                                  */
/* -------------------------------------------------------------------------- */

const button = document.querySelector('.submit');
const input = document.querySelector('.input_text');
const listings = document.querySelector('.list-group');
let names = [];
const preExistingData = localStorage.getItem('shopping-list');
let recipe = [];
const recipeID = [];

if (preExistingData === null) {
    names = [];
}

button.addEventListener('click' || 'keypress', (event) => {
    event.preventDefault();
    search(event);
});

/* -------------------------------------------------------------------------- */
/*                              loader functions                              */
/* -------------------------------------------------------------------------- */

/* ------------------ loader functions are in the recipe.js ----------------- */

/* -------------------------------------------------------------------------- */
/*                          filter out all junk data                          */
/* -------------------------------------------------------------------------- */

function filterUndefinedData(data) {
    const noUndefinedData = data.filter((dataItem) => dataItem !== undefined);
    const filteredInstructionsData = noUndefinedData.filter(
        (dataItem) => dataItem.instructions !== undefined && dataItem.instructions !== null
    );
    const filteredUserRatingData = filteredInstructionsData.filter((result) => result.user_ratings !== undefined);
    return filteredUserRatingData;
}

/* -------------------------------------------------------------------------- */
/*                                error message                               */
/* -------------------------------------------------------------------------- */

function displayError(msg) {
    if (msg) {
        // select the error message p tag
        const errorMessage = $('.error-message');
        // inject the error message into the modal
        errorMessage.text(msg);
        // add modal
        errorModalInstance.open();
    }
}

/* ----------------------------- get saved data ----------------------------- */

function search(event) {
    const term = input.value;
    displayLoader();
    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${term}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4d71919945mshfeeca5d2011614bp19d595jsncca0579a2980',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.results.length === 0) {
                errorModalInstance.open();
            }
            // set innerHTML to be an empty string
            const mealContainer = document.querySelector('.meal-search-results');
            mealContainer.innerHTML = '';

            // filter data out and remove the data with undefined instructions
            const filteredData = filterUndefinedData(data.results);
            // iterate through the data
            for (let i = 0; i < filteredData.length; i++) {
                if (filteredData[i] === undefined) {
                    return;
                }

                // create an empty html element
                let html = '';

                const did = filteredData[i].id;

                let instructionsHtml = '';
                let ingredientsHtml = '';
                let componentsHtml = '';
                let nutritionHTML = '';
                if (filteredData[i].nutrition !== undefined) {
                    nutritionHTML = `<li>Calories: ${filteredData[i].nutrition.calories}<li><li>Carbohydrates: ${filteredData[i].nutrition.carbohydrates}<li>`;
                } else {
                    nutritionHTML = '';
                }

                if (filteredData[i].instructions.length > 0) {
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
                        ingredientsHtml += `<li a href='#' class='list-item collection-item'>${filteredData[i].sections['0'].components[l].raw_text}</li>`;
                    }

                    ingredientsHtml += '</ul>';
                }

                const rating = Math.round(filteredData[i].user_ratings.score * 10);

                const votes = filteredData[i].user_ratings.count_positive + filteredData[i].user_ratings.count_negative;

                nutritionHTML = `
                <ul class="nutrition-list collection">
                    <li class="collection-item">Calories: ${filteredData[i].nutrition.calories}</li>
                    <li class="collection-item">Carbohydrates: ${filteredData[i].nutrition.carbohydrates}</li>
                    <li class="collection-item">Fat: ${filteredData[i].nutrition.fat}</li>
                    <li class="collection-item">Fiber: ${filteredData[i].nutrition.fiber}</li>
                    <li class="collection-item">Protein: ${filteredData[i].nutrition.protein}</li>
                    <li class="collection-item">Sugar: ${filteredData[i].nutrition.sugar}</li>
                </ul>`;

                if (filteredData[i].nutrition.calories === undefined) {
                    nutritionHTML = `<p>Couldn't find those scrumptious nutritional factoids 🍖😢</p>`;
                }

                html += `<div class='tab' id='${did}'>`;
                html += `
                <div class='header'>
                    <div>
                        <h2>${filteredData[i].name}</h2>
                    </div>
                    <strong><p class='cooking-time'>Cooking Time: </strong>${filteredData[i].cook_time_minutes}mins  -<strong>  Prep Time: </strong>${filteredData[i].prep_time_minutes}mins  -<strong>  Servings: </strong>${filteredData[i].num_servings}  -<strong>  User Rating: </strong>${rating}/10 (${votes} votes)</p>
                    </div>
                    <div class="row save-recipe-btn-container">
                        <button class='btn submit save-recipe-btn ${did}' id='savebutton' value='${filteredData[i].name}'>Save Recipe</button>
                </div>`;
                html += `<button class='tablinks tabbtn-${did} active' id='overview${did}' data-id='${did}'>Overview</button>`;

                html += `<button class='tablinks tabbtn-${did}' id='ingredients${did}'  data-id='${did}'>Ingredients</button>`;
                html += `<button class='tablinks tabbtn-${did}' id='instructions${did}'  data-id='${did}'>Instructions</button>`;
                html += '</div>';
                html += `
                <div class='tabcontent tabcon-${did} active overview${did}'>
                    <div class='row'>
                        <div class='col xl4 s12 center-align'>
                            <img class='activator' src='${filteredData[i].thumbnail_url}'/>
                        </div>`;
                html += `
                <div class='col xl7 s12'>${filteredData[i].description}
                    <div>
                        <h4>Nutrition</h4>
                        ${nutritionHTML}
                    </div>
                </div>
                </div>`;
                html += '</div>';
                html += `
                <div class='tabcontent tabcon-${did} ingredients${did}'>
                    <ul class='inglist collection'>${ingredientsHtml}</ul>
                        <a href='#'><button class='btn btn-primary' id='addtolist'>Save</button></a>
                    </div>`;
                html += `
                <div class='tabcontent tabcon-${did} instructions${did}'>${instructionsHtml}</div>`;
                $('.meal-search-results').append(html);
            }
            removeLoader();

            /* -------------------- save recipe to the local storage -------------------- */

            // select all the save buttons
            const saveRecipeBtn = document.querySelectorAll('.save-recipe-btn');

            saveRecipeBtn.forEach((saveBtn) =>
                saveBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    recipe = e.currentTarget.value;
                    console.log(e.currentTarget.value);
                    // gets the class list of the button
                    const saveRecipeClassList = e.currentTarget.classList;
                    // gets the last class list of the button
                    /* ------------ ENSURE THE BUTTTON"S LAST CLASS IS ALWAYS THE ID ------------ */
                    const unqref = saveRecipeClassList.item(saveRecipeClassList.length - 1);
                    recipeID.push(`<li id='${unqref}' class='item collection-item'>${recipe}</li>`);

                    const filteredMealID = [...new Set(recipeID)];
                    localStorage.setItem('meal-list', JSON.stringify(filteredMealID));
                    // FUNCTION DEFINED IN recipe.js
                    getRecipeList();
                })
            );

            /* -------------------- save ingredients to shopping list ------------------- */
            const ingredientsAll = document.querySelectorAll('.list-item');

            ingredientsAll.forEach((ingredient) =>
                ingredient.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add('added-to-list');
                    e.currentTarget.setAttribute('id', 'done');
                    // jquery selector
                    const currentIngredient = $(e.currentTarget);

                    names.push(
                        `<li id='item'>${currentIngredient
                            .html()
                            .replace(/\d+/g, '')
                            .replace(
                                /tablespoons|tablespoon|cups|pints|teaspoons|to taste|slices|of|ounces|sliced|teaspoon|cup|sharp|¼|¾|½|⅓|room temperature|-ounce|-ounces|plus more|-whole|cans|can/g,
                                ''
                            )}</li>`
                    );

                    const filteredNames = [...new Set(names)];

                    localStorage.setItem('shopping-list', JSON.stringify(filteredNames));
                    // FUNCTION DEFINED IN shopping.js
                    getShoppingList();
                })
            );
        })
        .catch((error) => {
            displayError(`*** in the catch() method *** ${error}`);
        });
    input.value = '';
}
