let rowData = document.getElementById("rowData")

function openSideNav() {
  $(".side-nav-menu").animate({ left: 0 }, 500);
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
}

function closeSideNav() {
  $(".side-nav-menu").animate({ left: -256.562 }, 500);

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
}

closeSideNav()

$(".side-nav-menu i.open-close-icon").click(function () {
  console.log($(".side-nav-menu .nav-tab").outerWidth());

  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});


async function searchByName( name ){

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  response = await response.json();

  displaMeals( response.meals )

}

function displaMeals(arr){
  let cartona = ""

  for( let i = 0 ; i< arr.length ; i++){
    cartona +=  `<div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${arr[i].strMealThumb}" alt="">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${arr[i].strMeal}</h3>
          </div>
        </div>
      </div>`
  }

  rowData.innerHTML = cartona

}

searchByName("")


async function getCategories(){
  let response = await fetch ( `https://www.themealdb.com/api/json/v1/1/categories.php`)
  response = await response.json()

  displaCategories( response.categories )
}


function displaCategories( arr ){
  let cartona = ""

  for( let i = 0 ; i< arr.length ; i++){
    cartona +=  `<div class="col-md-3">
        <div onclick=" getCategoryMeals('${arr[i].strCategory}') " class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
          <div class="meal-layer position-absolute text-center text-black p-2">
            <h3>${arr[i].strCategory}</h3>
            <p>${arr[i].strCategoryDescription}</p>
          </div>
        </div>
      </div>`
  }

  rowData.innerHTML = cartona

}


async function getArea(){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  response = await response.json()
  console.log( response.meals );
  
  displayArea( response.meals)
}



function displayArea(arr){

  let cartona = ""

  for( let i = 0 ; i< arr.length ; i++){
    cartona +=  `<div class="col-md-3">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
        <i class="fa-solid fa-house-laptop fa-4x" ></i>
          <h3>${arr[i].strArea}</h3>
        </div>
      </div>`
  }

  rowData.innerHTML = cartona

}





async function getIngredients(){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response = await response.json()
  console.log( response.meals );
  
  displayIngredients( response.meals.slice(0,20))
}



function displayIngredients(arr){

  let cartona = ""

  for( let i = 0 ; i< arr.length ; i++){
    cartona +=  `<div class="col-md-3">
        <div onclick="getIngrdientsMeals('${ arr[i].strIngredient }')" class="rounded-2 text-center cursor-pointer ">
        <i class="fa-solid fa-utensils fa-4x" ></i>
          <h3>${arr[i].strIngredient}</h3>
          <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
      </div>`
  }

  rowData.innerHTML = cartona

}



async function getCategoryMeals( category ){

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ category }`)

  response = await response.json()

  console.log( response );
  
  displaMeals(response.meals)
}


async function getAreaMeals( area ){

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${ area }`)

  response = await response.json()

  console.log( response );
  
  displaMeals(response.meals)
}


async function getIngrdientsMeals( ingrdients ){

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ ingrdients }`)

  response = await response.json()

  console.log( response );
  
  displaMeals(response.meals)
}



async function getMealDetails( mealId){

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)

  
  
  response = await response.json()
  // console.log(response);

  console.log( response.meals[0] );

  displayMealDetails( response.meals[0] )
  
}


function displayMealDetails( meal ){

  let cartona = `   <div class="col-md-4">
        <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
      </div>

      <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder" >Area: </span> ${meal.strArea} </h3>
        <h3><span class="fw-bolder" >Category: </span>${meal.strCategory} </h3>
        <h3>Recipes:</h3>

        <ul class="list-unstyled d-flex g-3 flex-wrap " >
          <li class=" alert alert-info m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-info m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-info m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-info m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-info m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-info m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-info m-2 p-1 " > 1 Whole Chicken </li>
        </ul>

        <h3>Tags: </h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap " >
          <li class=" alert alert-danger m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-danger m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-danger m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-danger m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-danger m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-danger m-2 p-1 " > 1 Whole Chicken </li>
          <li class=" alert alert-danger m-2 p-1 " > 1 Whole Chicken </li>
        </ul>

        <a target= "_blank" href="${meal.strSource }" class="btn btn-success" >Source</a>
        <a target= "_blank" href="${meal.strYouTube}" class="btn btn-danger" >Youtube</a>
        
      </div>

      `

      rowData.innerHTML = cartona
}


function showSearchInput(){

  rowData.innerHTML = `<div class="container w-75">
      <div class="row py-4">
        <div class="col-md-6">
          <input class="form-control bg-transparent" type="text" placeholder="Search by Name" >
        </div>

        <div class="col-md-6">
          <input class="form-control bg-transparent" type="text" placeholder="Search by First Letter" >
        </div>
      </div>
    </div> `
}


function displayContact(){

  rowData.innerHTML = ` <div class="contact vh-100 d-flex justify-content-center align-items-center">
      <div class="container w-50 text-center">
          <div class="row g-4">
            <div class="col-md-6">
              <input type="text" class="form-control" placeholder="Enter Your Name" >
            </div>

            <div class="col-md-6">
              <input type="email" class="form-control" placeholder="Enter Your Email" >
            </div>

            <div class="col-md-6">
              <input type="text" class="form-control" placeholder="Enter Your Phone" >
            </div>

            <div class="col-md-6">
              <input type="number" class="form-control" placeholder="Enter Your Age" >
            </div>

            <div class="col-md-6">
              <input type="password" class="form-control" placeholder="Enter Your Password" >
            </div>

            <div class="col-md-6">
              <input type="password" class="form-control" placeholder="Enter Your RePassword" >
            </div>
          </div>
          <button class="btn btn-outline-danger px-2 mt-3" > Submit </button>
      </div>
    </div> `

}