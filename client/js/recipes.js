document.addEventListener('DOMContentLoaded', function () {

  const url = 'http://localhost:8081/api/v1/recipes/getRecipes?page=1&limit=12';

  
  fetch(url)
    .then(response => response.json())
    .then(recipes => {
      console.log(recipes);
      displayRecipes(recipes)
    })
    .catch(error => console.error('Error:', error));
});

function displayRecipes(recipesResponse) {
  if (!recipesResponse || !recipesResponse.data || !Array.isArray(recipesResponse.data.results)) {
      console.error('Error: Invalid recipes response');
      return;
  }
  const recipes = recipesResponse.data.results; 

  const cardContainer = document.getElementById('card-container');
  if (!cardContainer) {
      console.error('Error: Element with CLASS : "card-container" not found');
      return;
  }

  recipes.forEach(recipe => {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      cardDiv.addEventListener('click', () => {
        window.location.href = `recipeSketeton.html?id=${recipe._id}`;
      });
      
      const cardImage = document.createElement('img');
      cardImage.src = recipe.image;
      cardImage.alt = recipe.title;
      cardDiv.appendChild(cardImage);

  
      const titleElement = document.createElement('h3');
      titleElement.textContent = recipe.title;
      cardDiv.appendChild(titleElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = recipe.description;
      cardDiv.appendChild(descriptionElement);

      const allergiesElement = document.createElement('p');
      allergiesElement.textContent = `Allergies: ${formatList(recipe.allergens)}`;
      cardDiv.appendChild(allergiesElement);

      const diseasesElement = document.createElement('p');
      diseasesElement.textContent = `Chronic Diseases: ${formatList(recipe.chronicDiseases)}`;
      cardDiv.appendChild(diseasesElement);

      cardContainer.appendChild(cardDiv);
  });
}

function formatList(list) {
  return list.join(', ');
}
