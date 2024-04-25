function createSearchForm() {
    const existingForm = document.querySelector("form");
    if (existingForm) {
      existingForm.remove();
    }
  
    const form = document.createElement("form");
    form.setAttribute("action", "#");
    form.setAttribute("method", "GET");
  
    const label = document.createElement("label");
    label.setAttribute("for", "search");
    label.textContent = "Search all recipes ";
  
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "searchInput");
    input.setAttribute("name", "search");
    input.setAttribute(
      "placeholder",
      "search for recipe by allergies or chronic disease"
    );
    input.required = true;
  
    const button = document.createElement("button");
    button.setAttribute("id", "searchButton");
    button.setAttribute("type", "button");
    button.textContent = "Search";
  
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
  
    const container = document.querySelector(".container");
    container.appendChild(form);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    createSearchForm();
  });
  document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
  
    const performSearch = function () {
      const inputValue = searchInput.value;
      const searchUrl = `http://localhost:8081/api/v1/recipes/search?search=${inputValue}`;

      console.log(searchUrl);
      fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
          const container = document.querySelector(".container");
          if (data.data.length == 0) {
            const p = document.createElement("p");
            p.textContent = `No recipes found for ${inputValue}`;
            container.appendChild(p);
          }
          if (
            data &&
            data.data &&
            Array.isArray(data.data) &&
            data.data.length > 0
          ) {
            const form = document.querySelector("form");
            form.remove();
            displayRecipes(data);
          }
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  
    searchButton.addEventListener("click", performSearch);
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
      }
    });
  });
  
  const displayRecipes = (data) => {
    const cardContainer = document.querySelector(".card-container");
    if (!cardContainer) {
      console.error('Error: Element with CLASS : "card-container" not found');
      return;
    }
  
    data.data.forEach((recipe) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.addEventListener("click", () => {
        window.location.href = `recipeSketeton.html?id=${recipe._id}`;
      });
      cardContainer.appendChild(cardDiv);
  
      const cardImage = document.createElement("img");
      cardImage.src = recipe.image;
      cardImage.alt = recipe.title;
      cardDiv.appendChild(cardImage);
  
      const titleElement = document.createElement("h3");
      titleElement.textContent = recipe.title;
      cardDiv.appendChild(titleElement);
  
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
    });
  };
  
  function formatList(list) {
    return list.join(", ");
  }
  