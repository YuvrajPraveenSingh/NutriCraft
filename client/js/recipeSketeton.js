(function fetchAndDisplayRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (!recipeId) {
        const recipeDetailsContainer = document.getElementById('recipeDetails');
        recipeDetailsContainer.innerHTML = '<p>No recipe ID provided. Please go back and select a recipe.</p>';
        return;
    }

    const recipeDetailsUrl = `http://localhost:8081/api/v1/recipes/getRecipe/${recipeId}`;

    fetch(recipeDetailsUrl)
        .then(response => response.json())
        .then(recipesResponse => {
            console.log(recipesResponse);
            displayRecipes(recipesResponse)
        })
        .catch(error => console.error('Error:', error));
})();
function displayRecipes(recipesResponse) {
    if (!recipesResponse || !recipesResponse.data) {
        console.error('Error: Invalid recipes response');
        return;
    }
    const recipe = recipesResponse.data;
    const capitalizedTitle = recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1);

    const recipeDetailsContainer = document.getElementById('recipeDetails');
    recipeDetailsContainer.innerHTML = `
        <h2>${capitalizedTitle}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p> ${recipe.description}</p>
        <p> ${formatList(recipe.category)}</p>
        <p> ${formatList(recipe.allergens)}</p>
        <p> ${formatList(recipe.chronicDiseases)}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient.name}: ${ingredient.quantity}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <ol>
            ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
        </ol>
        
    `;
}

function formatList(list) {
    return list.join('  ');
}