// function createSearchForm() {
//   const existingForm = document.querySelector("form");
//   if (existingForm) {
//     existingForm.remove();
//   }

//   const form = document.createElement("form");
//   form.setAttribute("action", "#");
//   form.setAttribute("method", "GET");

//   const label = document.createElement("label");
//   label.setAttribute("for", "search");
//   label.textContent = "Search";

//   const input = document.createElement("input");
//   input.setAttribute("type", "text");
//   input.setAttribute("id", "searchInput");
//   input.setAttribute("name", "search");
//   input.setAttribute(
//     "placeholder",
//     "search for recipe by allergies or chronic disease"
//   );
//   input.required = true;

//   const button = document.createElement("button");
//   button.setAttribute("id", "searchButton");
//   button.setAttribute("type", "button");
//   button.textContent = "Search";

//   form.appendChild(label);
//   form.appendChild(input);
//   form.appendChild(button);

//   const container = document.querySelector(".container");
//   container.appendChild(form);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   createSearchForm();
// });
// document.addEventListener("DOMContentLoaded", function () {
//   const searchButton = document.getElementById("searchButton");
//   const searchInput = document.getElementById("searchInput");

//   const performSearch = function () {
//     const inputValue = searchInput.value;
 
//     const searchUrl = `http://localhost:8081/api/v1/recipes/notInclude?search=${inputValue}`;

//     console.log(searchUrl);
//     fetch(searchUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         const container = document.querySelector(".container");
//         if (data.data.length == 0) {
//           const p = document.createElement("p");
//           p.textContent = `No recipes found for ${inputValue}`;
//           container.appendChild(p);
//         }
//         if (
//           data &&
//           data.data &&
//           Array.isArray(data.data) &&
//           data.data.length > 0
//         ) {
//           const form = document.querySelector("form");
//           form.remove();
//           displayRecipes(data);
//         }
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   searchButton.addEventListener("click", performSearch);
//   searchInput.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       performSearch();
//     }
//   });
// });

// const displayRecipes = (data) => {
//   const cardContainer = document.querySelector(".card-container");
//   if (!cardContainer) {
//     console.error('Error: Element with CLASS : "card-container" not found');
//     return;
//   }

//   data.data.forEach((recipe) => {
//     const cardDiv = document.createElement("div");
//     cardDiv.className = "card";
//     cardDiv.addEventListener("click", () => {
//       window.location.href = `recipeSketeton.html?id=${recipe._id}`;
//     });
//     cardContainer.appendChild(cardDiv);

//     const cardImage = document.createElement("img");
//     cardImage.src = recipe.image;
//     cardImage.alt = recipe.title;
//     cardDiv.appendChild(cardImage);

//     const titleElement = document.createElement("h3");
//     titleElement.textContent = recipe.title;
//     cardDiv.appendChild(titleElement);

//     const descriptionElement = document.createElement("p");
//     descriptionElement.textContent = recipe.description;
//     cardDiv.appendChild(descriptionElement);

//     const allergiesElement = document.createElement("p");
//     allergiesElement.textContent = `Allergies: ${formatList(recipe.allergens)}`;
//     cardDiv.appendChild(allergiesElement);

//     const diseasesElement = document.createElement("p");
//     diseasesElement.textContent = `Chronic Diseases: ${formatList(
//       recipe.chronicDiseases
//     )}`;
//     cardDiv.appendChild(diseasesElement);
//   });
// };

// function formatList(list) {
//   return list.join(", ");
// }
let checkedDiseases = [];
let checkedAllergies = [];

function createAllergyBar(allergies) {
    const allergyBar = document.createElement('div');
    allergyBar.setAttribute('id', 'allergyBar');

  
    
    allergies.forEach(allergy => {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', allergy);
        checkbox.setAttribute('name', 'allergy');
        checkbox.setAttribute('value', allergy);

        const label = document.createElement('label');
        label.setAttribute('for', allergy);
        label.textContent = allergy;

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                checkedAllergies.push(label.textContent);
            } else {
                const index = checkedAllergies.indexOf(label.textContent);
                if (index > -1) {
                    checkedAllergies.splice(index, 1);
                }
            }

            fetchData();
        });


        allergyBar.appendChild(checkbox);
        allergyBar.appendChild(label);
    
    });

    const container = document.querySelector('.container');
    container.appendChild(allergyBar);
}


function createChronicDiseaseBar(diseases) {
    const diseaseBar = document.createElement('div');
    diseaseBar.setAttribute('id', 'diseaseBar');

    diseases.forEach(disease => {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', disease);
        checkbox.setAttribute('name', 'disease');
        checkbox.setAttribute('value', disease);

        const label = document.createElement('label');
        label.setAttribute('for', disease);
        label.textContent = disease;

       
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                checkedDiseases.push(label.textContent);
            } else {
                const index = checkedDiseases.indexOf(label.textContent);
                if (index > -1) {
                    checkedDiseases.splice(index, 1);
                }
            }
            fetchData();
        });

        diseaseBar.appendChild(checkbox);
        diseaseBar.appendChild(label);
    });

    const container = document.querySelector('.container');
    container.appendChild(diseaseBar);
}




function fetchData() {
    let url = 'http://localhost:8081/api/v1/recipes/notInclude';

    if (checkedAllergies.length > 0 && checkedDiseases.length > 0) {
        url += `?searchAllergens=${checkedAllergies.join(',')}&searchChronicDiseases=${checkedDiseases.join(',')}`;
    } else if (checkedAllergies.length > 0) {
        url += `?searchAllergens=${checkedAllergies.join(',')}`;
    } else if (checkedDiseases.length > 0) {
        url += `?searchChronicDiseases=${checkedDiseases.join(',')}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayRecipes(data);
        })
        .catch(error => console.error('Error:', error));
}


document.addEventListener('DOMContentLoaded', function() {
    // Create bar-container div
    const barContainer = document.createElement('div');
    barContainer.id = 'bar-container';
    document.body.appendChild(barContainer);

    // Create card-container div
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    document.body.appendChild(cardContainer);

    createChronicDiseaseBar(['Diabetes', 'Hypertension', 'Heart Disease', 'Obesity', 'Celiac Disease', 'Crohn\'s Disease', 'Ulcerative Colitis', 'Irritable Bowel Syndrome'], barContainer);
    createAllergyBar(['Peanuts', 'Tree nuts', 'Milk', 'Eggs', 'Wheat', 'Soy', 'Fish', 'Shellfish'], barContainer);
    fetchData(cardContainer);
});


const displayRecipes = (data) => {
    const recipesContainer = document.getElementsByClassName('card-container')[0];
    recipesContainer.innerHTML = ''; 

    data.data.forEach(recipe => {

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.addEventListener('click', () => {
            window.location.href = `recipeSketeton.html?id=${recipe._id}`;
        });

        const cardImage = document.createElement("img");
        cardImage.src = recipe.image;
        cardImage.alt = recipe.title;
        cardDiv.appendChild(cardImage);


        const recipeElement = document.createElement('div');
        recipeElement.textContent = recipe.title;
        cardDiv.appendChild(recipeElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = recipe.description;
        cardDiv.appendChild(descriptionElement);
    
        const allergiesElement = document.createElement("p");
        allergiesElement.textContent = `Allergies: ${formatList(recipe.allergens)}`;
        cardDiv.appendChild(allergiesElement);
    
        const diseasesElement = document.createElement("p");
        diseasesElement.textContent = `Chronic Diseases: ${formatList(
          recipe.chronicDiseases
        )}`;
        cardDiv.appendChild(diseasesElement);


        
        
        recipesContainer.appendChild(cardDiv);
    });
};

function formatList(list) {
  return list.join(", ");
}


