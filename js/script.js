let ulWidth = $(".navList").innerWidth();
let searchHeight;
let randomList = []

// &  WINDOW
$(window).ready(function () {
    runCode().then(() => {
        $(".navBar").css("left", `-${ulWidth}px`)
        $(".loader").fadeOut(500, () => {
        });
        $(".navBar").animate({ opacity: "1" }, 800)
        $(".loaderHeader").slideUp(1000, () => {
            $(".loaderHeader").removeClass("d-flex")
            $("body").removeClass("overflow-hidden");
        });;
    })

});
// &  Add Loader
function addLoading() {
    $(".loaderHeader").addClass("d-flex")
    $(".loaderHeader").removeClass("d-none")
    $(".loader").fadeIn(500);
    $(".loaderHeader").slideDown(500);
}
// &  Remove Loader
function removeLoading() {
    $(".loader").fadeOut(500);
    $(".loaderHeader").slideUp(1500, () => {
        $(".loaderHeader").addClass("d-none")
        $(".loaderHeader").removeClass("d-flex")

    })
}
// &  Close Nav
$(".closeBtn").on("click", function () {
    closeNav()
});
$(".openBtn").on("click", function () {
    closeNav()
});
$(".logo").on("click", function () {
    $(".loaderHeader").css("top", "0px");
    addLoading()
    $("body,html").scrollTop(0);
    randomList.splice(0, randomList.length + 1)
    $(".serachBar").addClass("d-none");
    runCode().then(() => {
        removeLoading()
    })
});
// !Close Nav
function closeNav() {
    if ($(".navBar").css("left") == `-${ulWidth}px`) {
        $(".navBar").animate({ left: `0px` }, 500)
        $(".closeBtn").removeClass("d-none");
        $(".openBtn").addClass("d-none");
        $(".navList li").each(function (i) {
            $(this).delay(50 * i).animate({ top: `0px` }, 1000);
        });
    }
    else {
        $(".navBar").animate({ left: `-${ulWidth}px` }, 500)
        $(".openBtn").removeClass("d-none");
        $(".closeBtn").addClass("d-none");
        $(".navList li").each(function (i) {
            $(this).delay(40 * i).animate({ top: `300px` }, 1000)
        });
    }
}
// &  Main Class
class MainPage {
    async showData() {
        for (let i = 0; i < 20; i++) {
            let httpRq = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
            let data = await httpRq.json()
            randomList.push(data)
        }
    }
    async showCategory() {
        let httpRq = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        let data = await httpRq.json()
        return data
    }
    async mealDetails(id) {
        let httpRq = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        let data = await httpRq.json()
        return data
    }
    async showCategoryDetails(Category) {
        let httpRq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`)
        let data = await httpRq.json()
        return data
    }
    async showArea() {
        let httpRq = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        let data = await httpRq.json()
        return data
    }
    async showAreaFood(Area) {
        let httpRq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
        let data = await httpRq.json()
        return data
    }
    async showIngredients() {
        let httpRq = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        let data = await httpRq.json()
        return data
    }
    async showIngredientsFood(ingredients) {
        let httpRq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
        let data = await httpRq.json()
        return data
    }
    async serachByName(name) {
        let httpRq = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name ? name : ""}`)
        let data = await httpRq.json()
        console.log(await data);
        return data

    }
    async serachByLetter(letter) {
        let httpRq = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        let data = await httpRq.json()
        return data
    }
}
let x = new MainPage()
async function runCode() {
    await x.showData()
    displayRandom(randomList)
    getDetails()
    searchName();
    searchletter();
}
async function backToCat() {
    $(".loaderHeader").css("top", "0px");
    addLoading()
    $("body,html").scrollTop(0);
    let catList = [await x.showCategory()]
    $(".serachBar").addClass("d-none");
    displayCategory(catList[0].categories)
    removeLoading()
}
$("#categories").on("click", async () => {
    await backToCat()
    closeNav()
});
async function backToArea() {
    $(".loaderHeader").css("top", "0px");
    addLoading()
    $("body,html").scrollTop(0);
    let areaList = [await x.showArea()]
    $(".serachBar").addClass("d-none");
    displayArea(areaList[0].meals)
    removeLoading()
}
$("#area").on("click", async () => {
    await backToArea()
    closeNav()
});
async function backToIngredients() {
    $(".loaderHeader").css("top", "0px");
    addLoading()
    $("body,html").scrollTop(0);
    let ingredList = [await x.showIngredients()]
    $(".serachBar").addClass("d-none");
    displayIngredients(ingredList[0])
    removeLoading()
}
$("#ingredients").on("click", async () => {
    await backToIngredients()
    closeNav()
});


// &  Display Randoms
function displayRandom(item) {
    let cartoona = ``
    for (let i = 0; i < item.length; i++) {
        let mini = item[i].meals[0]
        cartoona += `<div class="col-md-3 ">
                        <div data-code="${mini.idMeal}"
                         class="layerItem position-relative rounded-3 overflow-hidden">
                            <img src="${mini.strMealThumb}" class="w-100" alt="${mini.strMeal}">
                            <div 
                                class="layOut position-absolute start-0 end-0 bottom-0 
                                bg-white bg-opacity-50 d-flex align-items-center px-3 fs-2 fw-bold">
                                ${mini.strMeal.split(" ").splice(0, 2).join(" ")}
                            </div>
                        </div>
                    </div>`

    }
    $("#myData").html(cartoona);

}

// &  Get Details
function getDetails() {
    $(".layerItem").on("click", async function (e) {
        addLoading()
        let mealId = $(e.currentTarget).attr("data-code");
        let theMeal = await x.mealDetails(mealId);
        displayDetails(theMeal)
        removeLoading()
    });
}

// &  Display Details
function displayDetails(item) {
    let mini = item.meals[0]
    let miniCartonna = ``
    let cartoona;
    for (let i = 1; i < 21; i++) {
        if (mini[`strIngredient${i}`]) {
            miniCartonna += `
                        <li
                            class="recipes btn btn-primary btn-lighblue">${mini[`strMeasure1${i}`] ? mini[`strMeasure1${i}`] : ""} ${mini[`strIngredient${i}`]}
                        </li>`
        }
    }
    let tagList;
    let miniTage = ``
    mini["strTags"] ? tagList = mini["strTags"] : tagList = ""
    tagList = tagList.split(",")
    for (let i = 0; i < tagList.length; i++) {
        miniTage += `
        <span
            class="alert alert-danger py-2 fs-5 px-2 me-3">${tagList[i] ? tagList[i] : "No Tags"}
        </span>`

    }
    cartoona = `    <div class="col-md-4 ">
                        <div
                            class="layerItem position-relative rounded-3 overflow-hidden">
                            <img src="${mini.strMealThumb}"
                                class="w-100" alt="${mini.strMeal}">
                            <div
                                class="px-2 py-4 text-center text-white">
                                <h3 class="h2 fw-bold">${mini.strMeal}</h3>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="text-white">
                            <h2>Instructions</h2>
                            <p>${mini.strInstructions}</p>
                            <h3>Area : <span>${mini.strArea}</span></h3>
                            <h3>Category : <span>${mini.strCategory}</span> </h3>
                            <h3>Recipes : </h3>
                            <ul class="list-unstyled">
                                ${miniCartonna}
                            </ul>
                            <h3>Tages :</h3>
                            <div class="ms-3 my-4">
                                ${miniTage}
                            </div>
                            <div class>
                                <a href="${mini.strSource}" class="btn btn-success me-3"
                                    target="_blank">Source</a>
                                <a href="${mini.strYoutube}" class="btn btn-danger me-3"
                                    target="_blank">YouTube</a>
                                <button class="backToHome btn btn-secondary position-relative py-2 mb-1">Back to Home</button>
                            </div>
                        </div>
                    </div>
    `
    $("#myData").html(cartoona);
    $(".backToHome").on("click", function () {
        $(".loaderHeader").css("top", "0px");
        addLoading()
        $("body,html").scrollTop(0);
        randomList.splice(0, randomList.length + 1)
        $(".serachBar").addClass("d-none");
        runCode().then(() => {
            removeLoading()
        })

    });
}
// &  Display Randoms Category
function displayRandomCategory(item) {
    let cartoona = ``
    if (item.meals) {
        for (let i = 0; i < (item.meals.length); i++) {
            let mini = item.meals[i]
            cartoona += `<div class="col-md-3 ">
                        <div data-code="${mini.idMeal}"
                         class="layerItem position-relative rounded-3 overflow-hidden">
                            <img src="${mini.strMealThumb}" class="w-100" alt="${mini.strMeal}">
                            <div 
                                class="layOut position-absolute start-0 end-0 bottom-0 
                                bg-white bg-opacity-50 d-flex align-items-center px-3 fs-2 fw-bold">
                                ${mini.strMeal.split(" ").splice(0, 2).join(" ")}
                            </div>
                        </div>
                        </div>
                       
                        `

        }
        cartoona += ` <button class="returnToCategory btn btn-secondary">Go To Category</button>
    <button class="returnToArea btn btn-secondary">Go To Area</button>
    <button class="returnToIngredients btn btn-secondary">Go To Ingredients</button>
    `
        $("#myData").html(cartoona);
        $(".returnToCategory").on("click", async () => {
            await backToCat()
        });
        $(".returnToArea").on("click", async () => {
            await backToArea()
        });
        $(".returnToIngredients").on("click", async () => {
            await backToIngredients()
        });
        getDetails()
    }
    else {
        return
    }
}
// &  Display Category
function displayCategory(item) {
    let cartoona = ``
    for (let i = 0; i < item.length; i++) {
        cartoona += `<div class="col-md-3 ">
                        <div data-category="${item[i].strCategory}"
                            class="layerItem position-relative rounded-3 overflow-hidden">
                            <img src="${item[i].strCategoryThumb}"
                                class="w-100" alt="${item[i].strCategory}">
                            <div
                                class="layOut position-absolute start-0 end-0 bottom-0 
                                bg-white bg-opacity-75 d-flex flex-column align-items-center px-2 py-4 text-center">
                                <h2 class="fw-bold">${item[i].strCategory}</h2>
                                <p>${item[i].strCategoryDescription.split(" ").splice(0, 20).join(" ")}</p>
                            </div>
                        </div>
                    </div>`
    }
    $("#myData").html(cartoona);
    $(".layerItem").on("click", async (e) => {
        addLoading()
        let categories = await x.showCategoryDetails($(e.currentTarget).attr("data-category"))
        displayRandomCategory(categories)
        removeLoading()
    });
}
// &  Display Ingredients
function displayIngredients(item) {
    let cartoona = ``
    for (let i = 0; i < 25; i++) {
        cartoona += `<div class="col-md-3">
                        <div class="ingredients text-light text-center" data-ingredients="${item.meals[i].strIngredient}">
                            <i class="fa-solid fa-plate-wheat fa-5x"></i>
                            <i class="fa-solid fa-utensils fa-5x"></i>
                            <h2 class="mt-2">${item.meals[i].strIngredient}</h2>
                            <p>${item.meals[i].strDescription.split(" ").splice(0, 20).join(" ")}</p>
                        </div>
                    </div>`
    }
    $("#myData").html(cartoona);
    $(".ingredients").on("click", async (e) => {
        addLoading()
        let ingredients = await x.showIngredientsFood($(e.currentTarget).attr("data-ingredients"));
        displayRandomCategory(ingredients)
        removeLoading()
    });
}
// &  Display Area
function displayArea(item) {
    let cartoona = ``
    for (let i = 0; i < item.length; i++) {
        cartoona += `<div class="col-md-3">
                        <div class="area text-light text-center" data-area="${item[i].strArea}">
                            <i class="fa-solid fa-house-laptop fa-5x"></i>
                            <h2 class="mt-2 mb-0">${item[i].strArea}</h2>
                        </div>
                    </div>`
    }
    $("#myData").html(cartoona);
    $(".area").on("click", async (e) => {
        addLoading()
        let area = await x.showAreaFood($(e.currentTarget).attr("data-area"));
        displayRandomCategory(area)
        removeLoading()
    });
}
// &  Search 
$("#search").on("click", function (e) {
    addLoading()
    searchHeight = $(".serachBar").outerHeight()
    $(".serachBar").removeClass("d-none");
    $("#myData").html("");
    $("#serachByName").val("");
    $("#serachByFirstLetter").val("");
    closeNav()
    removeLoading()
});
// &  Search By Name
function searchName() {
    $(".serachBtn").on("click", async () => {
        $(".loaderHeader").css("top", searchHeight);
        let searchVal = $("#serachByName").val();
        if (searchVal.length >= 1) {
            addLoading()
            displayRandomCategory(await x.serachByName(searchVal))
            removeLoading()
        }
        else {
            addLoading()
            displayRandomCategory(await x.serachByName(""))
            removeLoading()
        }

    });
}
// &  Search By Letter
function searchletter() {
    $("#serachByFirstLetter").on("input", async (e) => {
        $(".loaderHeader").css("top", searchHeight);
        let searchVal = $(e.target).val()
        if (searchVal.length != 0) {
            addLoading()
            displayRandomCategory(await x.serachByLetter(searchVal))
            removeLoading()
        }
        else {
            console.log("empty");
        }
    });
}
// &  Contact US
function displayContact() {
    let cartoona = `
                   <div
                        class="contactUs vh-100 d-flex align-items-center justify-content-center text-center">
                        <div class="container w-75">
                            <div class="row gy-4">
                                <div class="col-md-6">
                                    <div class="form-floating mb-3">
                                        <input type="text"
                                            class="form-control regexFilter mb-2"
                                            id="uName" name="uName"
                                            placeholder="uName">
                                        <div
                                            class="alert alert-danger d-none py-3"
                                            role="alert">
                                            <strong>
                                                must start with cabital and more
                                                than 3 letters
                                            </strong>
                                        </div>
                                        <label for="uName">Enter Your
                                            Name</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating mb-3">
                                        <input type="email"
                                            class="form-control regexFilter mb-2"
                                            id="uEmail" name="uEmail"
                                            placeholder="uEmail">
                                        <div
                                            class="alert alert-danger d-none py-3"
                                            role="alert">
                                            <strong id="alert">
                                                must has more than 5 letters
                                                followed by @gamil.com
                                            </strong>
                                        </div>
                                        <label for="uEmail">Enter Your
                                            Email</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating regexFilter mb-3">
                                        <input type="tel"
                                            class="form-control mb-2"
                                            id="uPhone" name="uPhone"
                                            placeholder="uPhone">
                                        <div
                                            class="alert alert-danger d-none py-3"
                                            role="alert">
                                            <strong>
                                                Enter valid Phone Number
                                            </strong>
                                        </div>
                                        <label for="uPhone">Enter Your
                                            Phone</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating regexFilter mb-3">
                                        <input type="number"
                                            class="form-control mb-2"
                                            id="uAge" name="uAge"
                                            placeholder="uAge">
                                        <div
                                            class="alert alert-danger d-none py-3"
                                            role="alert">
                                            <strong>
                                                Enter valid age
                                            </strong>
                                        </div>
                                        <label for="uAge">Enter Your
                                            Age</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating regexFilter mb-3">
                                        <input type="password"
                                            class="form-control mb-2"
                                            id="uPassword" name="uPassword"
                                            placeholder="uPassword">
                                        <div
                                            class="alert alert-danger d-none py-3"
                                            role="alert">
                                            <strong>
                                                must start with cabital and more
                                                than 5 letters
                                            </strong>
                                        </div>
                                        <label for="uPassword">Enter Your
                                            Password</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating mb-3">
                                        <input type="password"
                                            class="form-control mb-2"
                                            id="uPasswordRe" name="uPasswordRe"
                                            placeholder="uPasswordRe">
                                        <div
                                            class="alert alert-danger d-none py-3"
                                            role="alert">
                                            <strong>
                                                Enter valid repassword
                                            </strong>
                                        </div>
                                        <label for="uPasswordRe">Repeat Your
                                            Password</label>
                                    </div>
                                </div>
                            </div>
                            <button
                                class="submit btn btn-outline-danger" disabled>Submit</button>
                        </div>
                    </div>
    `
    $("#myData").html(cartoona);

}
$("#contactUs").on("click", function () {
    displayContact()
    closeNav()
    $(".contactUs .regexFilter").on("input", function (e) {
        validation(e.target);
    });
    $("#uPassword").on("change", function (e) {
        checkRe()
    });
    $("#uPasswordRe").on("input", function (e) {
        checkRe()
    });
    $(".submit").on("click", function () {
        clearValidation()
    });
});
// &  Check Pass Validation
function checkRe() {
    if ($("#uPassword").val() === $("#uPasswordRe").val()) {
        $("#uPasswordRe").addClass("is-valid")
        $("#uPasswordRe").removeClass("is-invalid")
        $("#uPasswordRe").next().addClass("d-none")
        $("#uPasswordRe").next().removeClass("d-block")
        checkBtn()
    }
    else {
        $("#uPasswordRe").removeClass("is-valid")
        $("#uPasswordRe").addClass("is-invalid")
        $("#uPasswordRe").next().removeClass("d-none")
        $("#uPasswordRe").next().addClass("d-block")
        checkBtn()
    }
}
// &  Check Btn Validation
function checkBtn() {
    if ($("#uName").hasClass("is-valid") && $("#uEmail").hasClass("is-valid") &&
        $("#uPhone").hasClass("is-valid") && $("#uAge").hasClass("is-valid") &&
        $("#uPassword").hasClass("is-valid") && $("#uPasswordRe").hasClass("is-valid")) {
        $(".submit").removeAttr("disabled");
    }
    else {
        $(".submit").attr("disabled", "disabled");
    }
}

// &  Clear Validation
function clearValidation() {
    $(".contactUs input").removeClass("is-valid");
    $(".contactUs input").val("");
    $(".submit").attr("disabled", "disabled");
}
// &  Check Validation
function validation(element) {
    var regex = {
        uName: /^[A-Z][a-z]{3,8}$/,
        uEmail: /^[\w]{5,10}@((gmail)|(yahoo))\.(com)$/,
        uPhone: /^(002)?01[0125][0-9]{8}$/,
        uAge: /^(([1-9][0-9]?)|(100))$/,
        uPassword: /^[A-Z][\w]{5,10}$/,
    }
    if (regex[element.id].test(element.value)) {
        $(element).addClass("is-valid")
        $(element).removeClass("is-invalid")
        $(element).next().addClass("d-none")
        $(element).next().removeClass("d-block")
        checkBtn()
    }
    else {
        $(element).removeClass("is-valid")
        $(element).addClass("is-invalid")
        $(element).next().removeClass("d-none")
        $(element).next().addClass("d-block")
        checkBtn()
    }
}


