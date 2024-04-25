window.onload = function() {
    document.getElementById('nav-container').innerHTML = `
        <div id="header">
            <div id="title"><a href="./index.html" class="active">NutriCraft</a></div>
   
        <div class="nav-bar">
          <ul>
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="./recipes.html">All-Recipes</a>
            </li>
            <li>
              <a href="./allergy.html">Diet-sens-Recipes</a>
            </li>
            <li>
              <a href="./search.html">Search</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    `;
}