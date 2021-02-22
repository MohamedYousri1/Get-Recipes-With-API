if (localStorage.getItem("test") !== null) {
    document.getElementById('recipesRow').innerHTML = localStorage.getItem("test");
} else {
    document.getElementById('recipesRow').innerHTML = ``;
}


let searchBtn = document.getElementById('searchBtn'),
    searchInput = document.getElementById('searchInput'),
    allRecipes = [],
    allDetails = [];

// Async Function To Get Recipes With API 
async function getRcipes(searchTerm) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${searchTerm}`);
    let finalResult = await apiResponse.json();
    allRecipes = finalResult.recipes;
    console.log(allRecipes);
    displayRecipes();
}

// Function to Display the Recipes 
function displayRecipes() {
    let content = ``;
    for (let i = 0; i < allRecipes.length; i++) {
        content += ` <div class="col-md-4">
      <div onclick = getDetail(${allRecipes[i].recipe_id})  class="recipess">
        <img src="${allRecipes[i].image_url}" alt="" class="img-fluid w-100" />
        <p>${allRecipes[i].title}</p>
      </div>
    </div>`
    }
    document.getElementById('recipesRow').innerHTML = content;
    localStorage.setItem('test', content);

}
// function To Get The Details Using API That Will Take Id Of Picture 
async function getDetail(id) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    let finalResult = await apiResponse.json();
    allDetails = finalResult.recipe;
    displayDetails()
}
// Function To Display Details Of Recipes 
function displayDetails() {
    let cartoona = ``;
    let cartoona2 = ``;
    allDetails.ingredients.forEach((ingredient) => {
        cartoona2 += `<li class = " font-weight-bolder text-left my-3 ml-5"><span class="fa-li"><i class="fas fa-utensils ml-5 color-mine"></i></span>${ingredient}</li>`;
    });
    cartoona += `<h2 class = 'color-mine text-capitalize '>${allDetails.title}</h2>
      <img class = "img-fluid" src = "${allDetails.image_url}">
      <h3 class = "color-mine py-3">ingredients</h3>
      <ul class="list-unstyled">${cartoona2}</ul>`

    document.getElementById('details').innerHTML = cartoona;
}
//add events listeners 
searchBtn.addEventListener("click", () => {
    //invoke Functions  
    getRcipes(searchInput.value);

});