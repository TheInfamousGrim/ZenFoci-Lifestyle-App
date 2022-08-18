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
/*                    function for getting the recipe list                    */
/* -------------------------------------------------------------------------- */

function getRecipeList() {
    if (JSON.parse(localStorage.getItem('meal-list')) !== null) {
        // remove all items from list to re-render
        $('#display-saved-meals').html('');
        const recipeList = localStorage
            .getItem('meal-list')
            .replace(/-/g, '')
            .replace(/","/g, '')
            .replace(/[\[\]']+/g, '')
            .replace(/["]/g, '')
            .replace(/\\ /g, '');
        recipeList.replaceAll('[\\]', '');
        const preExistingMealData = JSON.parse(localStorage.getItem('meal-list')) || [];
        let mealNames = [];
        mealNames.push(preExistingMealData);
        if (preExistingMealData === null) {
            mealNames = [];
        }
        $('#display-saved-meals').append(recipeList).html();
        const savedMealsList = $('.display-saved-meals');
        savedMealsList.children().addClass('collection-item saved-meal-list-item');
    }
}

getRecipeList();

/* -------------------------------------------------------------------------- */
/*                           display a saved search                           */
/* -------------------------------------------------------------------------- */

$('.item').on('click', function (event) {
    displayLoader();
    const query = $(this).attr('id');
    fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${query}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4d71919945mshfeeca5d2011614bp19d595jsncca0579a2980',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            $('.meal-search-results').html('');
            // set innerHTML to be an empty string
            const mealContainer = document.querySelector('.meal-search-results');
            mealContainer.innerHTML = '';

            // create an empty html element
            let html = '';

            const did = data.id;
            const mealName = data.name;

            let instructionsHtml = '';
            let ingredientsHtml = '';
            let componentsHtml = '';
            let nutritionHTML = `<li>Calories: ${data.nutrition.calories}<li><li>Carbohydrates: ${data.nutrition.carbohydrates}<li>`;

            for (let j = 1; j < data.instructions.length; j++) {
                instructionsHtml += `<li>${data.instructions[j].display_text}</li>`;
            }
            instructionsHtml += '</ul>';

            for (let k = 0; k < data.sections.length; k++) {
                componentsHtml += `<li>${data.sections[k]}</li>`;
            }
            componentsHtml += '</ul>';

            for (let l = 0; l < data.sections['0'].components.length; l++) {
                ingredientsHtml += `<li a href='#' class='listitem'>${data.sections['0'].components[l].raw_text}</li>`;
                console.log(`#tabcon-${did} a`);
            }

            ingredientsHtml += '</ul>';

            const rating = Math.round(data.user_ratings.score * 10);
            const votes = data.user_ratings.count_positive + data.user_ratings.count_negative;

            nutritionHTML = `
            <ul class="nutrition-list collection">
                <li class="collection-item">Calories: ${data.nutrition.calories}</li>
                <li class="collection-item">Carbohydrates: ${data.nutrition.carbohydrates}</li>
                <li class="collection-item">Fat: ${data.nutrition.fat}</li>
                <li class="collection-item">Fibre: ${data.nutrition.fibre}</li>
                <li class="collection-item">Protein: ${data.nutrition.protein}</li>
                <li class="collection-item">Sugar: ${data.nutrition.sugar}</li>
            </ul>`;

            html += `<div class='tab' id='${did}'>`;
            html += `
            <div class='header'>
                <div>
                    <h2>${data.name}</h2>
                </div>
                <strong><p class='cooking-time'>Cooking Time: </strong>${data.cook_time_minutes}mins  -<strong>  Prep Time: </strong>${data.prep_time_minutes}mins<br><strong>  Servings: </strong>${data.num_servings}  -<strong>  User Rating: </strong>${rating}/10 (${votes} votes)</p>
            </div>`;
            html += `<button class='tablinks tabbtn-${did} active' id='overview${did}' data-id='${did}'>Overview</button>`;

            html += `<button class='tablinks tabbtn-${did}' id='ingredients${did}'  data-id='${did}'>Ingredients</button>`;
            html += `<button class='tablinks tabbtn-${did}' id='instructions${did}'  data-id='${did}'>Instructions</button>`;
            html += '</div>';
            html += `
            <div class='tabcontent tabcon-${did} active overview${did}'>
                <div class='row'>
                    <div class='col xl4 s12'>
                        <img class='activator' src='${data.thumbnail_url}'/>
                    </div>`;
            html += `
            <div class='col xl7 s12'>${data.description}
                <div>
                    <h4>Nutrition</h4>
                    ${nutritionHTML}</div>
                </div>
            </div>`;
            html += '</div>';
            html += `
            <div class='tabcontent tabcon-${did} ingredients${did}'>
                <ul class='inglist'>${ingredientsHtml}</ul>
                <a href='#'></a>
            </div>`;
            html += `<div class='tabcontent tabcon-${did} instructions${did}'>${instructionsHtml}</div>`;

            $('.meal-search-results').append(html);
            removeLoader();
        });
});
