$(document).ready(function () {
        // Search Dropdowm Menu: Materialize function call
        $('select').material_select();
        // Map tabs : Materialize function call
        $('.tabs').tabs();

        //  Exisitng User : LOGIN  MODAL
        $("#modalBtn").click(function () {
            $("#modal1").modal();
        });
         //  New User : LOGIN  MODAL
         $("#modalBtn2").click(function () {
            $("#modal2").modal();
        });
        //  Map Tabs : Add a Tab MODAL
        $("#modalBtnTab").click(function () {
            $("#modalTabs").modal();
        });
        //  User Notes  MODAL
        $("#modalBtnNotes").click(function () {
            $("#modalNotes").modal();
        });
});

var apiKey="134929701576f37675a021f1de544eed";

initRest();

//populate initial map with veggie restaurants
function initRest(){
    console.log("working");
    cuisine_id=308;
    entity_type="city";
    city_id=277;
    generalSearch=true;
    getRestuarants();
};

//get location coordinates

//from form get:
    //city -->query to get city code
    //type of cuisine (provide dropdown) -->query to get cuisine code

//after showing restuarants on map, click on one (input code) to get daily menu, restaurant info, and reviews
//place to search a restaurant to also do this
var city; //from user
var cuisine; //from user
var restName;
var generalSearch;
$("#searchIt").on("click", function (event){
    event.preventDefault();
    generalSearch=true;
    city=capUpper($("#city").val().trim());
    restName=capUpper($("#restaurant").val().trim());
    console.log(city);
    console.log(restName);
    if (restName===""){
        gereralSearch=true;
        // console.log("true");
    }
    else {
        generalSearch=false; 
        // console.log("false");
    };
    console.log(generalSearch, restName);
    //validate that city has been entered before finding cuisines and/or restaurant
    if (city===""){
        // alert("enter city");
        console.log(city);
    }
    else {
        city=capUpper($("#city").val().trim());
        if (generalSearch){
            console.log("running gen search");
            getCityInfo(function(){
                getCuisineInfo();
                // getCuisineInfo(function(){
                    // getRestuarants();
                // })
            })
        }
        else {
            console.log("running specific search");
            getCityInfo(function(){
                getSpecificRest();
            })
        };
    };
    });
    // cuisine=capUpper($("#cuisine").val().trim());
// });

$(document).on("click", ".cuisineOptionBox", function(){
    event.preventDefault();
    var c=$(this).val();
    cuisine_id="308%2C%20"+c;
    console.log(this);
    getRestuarants();
});

var queryUrlLocation;
var city_id;
var city_name;
var entity_type;
//gives location info for use in other queries; also gives suggestd city name from a search word (use this function for search??)
//gives location information for inputed city, Ex: name, city_id, city_type
function getCityInfo(callback){
    console.log("running getCityInfo; always run");
    queryUrlLocation="https://developers.zomato.com/api/v2.1/locations?query="+city; 
    $.ajax({
        url:queryUrlLocation,
        method:"GET",
        headers: {"user-key": apiKey}
    }).then(function(response) {
        console.log(response);
        city_id=response.location_suggestions[0].city_id;
        city_name=response.location_suggestions[0].city_name;
        entity_type=response.location_suggestions[0].entity_type;
        console.log(city_id, city_name, entity_type);
        callback();
    });
};

var queryUrlCuisines;
var cuisine_id;
var cuisine_name;
var allCuisines=[]; //list of all cuisines and ids in obj
// var allCuisines=[]; //list all cuisines in array
//gives list of cuisine types for a city
function getCuisineInfo(){
    console.log("running getCuisineInfo; always on general search");
    if (!generalSearch)return;
    console.log(generalSearch+" running getCuisineInfo");queryUrlCuisines="https://developers.zomato.com/api/v2.1/cuisines?city_id="+city_id; 

    $.ajax({
        url:queryUrlCuisines,
        method:"GET",
        headers: {"user-key": apiKey}
    }).then(function(response) {
        for (var i=0; i<response.cuisines.length; i++){
            var r=response.cuisines[i].cuisine;
            allCuisines[i] = {"name":r.cuisine_name,
            "id":r.cuisine_id};
            allCuisines.push(r.cuisine_name);
            if (r.cuisine_name === cuisine){
                cuisine_name= r.cuisine_name;
                cuisine_id =r.cuisine_id;
                console.log("308%2C%20"+r.cuisine_id); //cajun=491 //working
            };
            
            //create option, add class/attr/text, and append to dropdown menu
            var cuisineOption=$("<li>").addClass("cuisineOptionBox").attr("value",r.cuisine_id).text(r.cuisine_name);
            $(".select-dropdown").append(cuisineOption);
        };
        console.log(allCuisines);

        // console.log(allCuisines); //object of names and ids
        // $("#cuisines-list").append("<strong>List of all cuisines for " + city_name + " : </strong><br>");
        // for (var j=0; j<allCuisines.length; j++){
        //     $("#cuisines-list").append(allCuisines[j].name + " - ");
        // }; //delete later
        // callback();
    });
};

var allRestaurants=[];
var queryUrlRestaurants;
// list of restaurants for inputed cuisine and city, ex: vegetarian in Houston
function getRestuarants(){
    console.log("running getRestaurants; only on general search");
    console.log(cuisine_id);
    if (!generalSearch)return;
    queryUrlRestaurants="https://developers.zomato.com/api/v2.1/search?entity_id=" + city_id + "&entity_type=" + entity_type + "&cuisines=" + cuisine_id;

// https://developers.zomato.com/api/v2.1/search?entity_id=277&entity_type=city&cuisines=308%2C%2073

    console.log(queryUrlRestaurants);
    console.log(cuisine_id, entity_type, city_id);
    $.ajax({
        url:queryUrlRestaurants,
        method:"GET",
        headers: {"user-key": apiKey} //api key
    }).then(function(response) {
        console.log(response.restaurants); //lists 20 restaurants
        for (var j=0; j<response.restaurants.length; j++){
            var r=response.restaurants[j].restaurant;
            var rl=r.location;
            var ru=r.user_rating;
            allRestaurants[j]={
                "name":r.name,
                "id":r.id,
                "image":r.featured_image,
                "location":{
                    "address":rl.address,
                    "city":rl.city,
                    "latitude":rl.latitude,
                    "longitude":rl.longitude,
                    "zipcode":rl.zipcode
                },
                "menu":r.menu_url,
                "price":r.price_range,
                "user_rating":{
                    "avg":ru.aggregate_rating,
                    "rating_word":ru.rating_text,
                    "votes":ru.votes
                }
            };
        }; 
        initMap();
    });
};

var querySpecificRest;
var specific_rest_id;
var specificRest;
//function to get restaurant data from search bar
function getSpecificRest(){
    console.log(restName);
    //if text in search by name bar, run this
    //get rest id of text entered
    if (generalSearch) return;
    console.log("running getSpecifRest");
    querySpecificRest="https://developers.zomato.com/api/v2.1/search?entity_id="+city+"&entity_type="+entity_type+"&q=hobbit%20cafe"; //change search words hobbit, cafe
    $.ajax({
        url:querySpecificRest,
        method:"GET",
        headers: {"user-key": apiKey}
    }).then(function(response) {
        var r=response.restaurants[0].restaurant;
        var rl=r.location;
        var ru=r.user_rating;
        console.log(response);
        if (r.name===restName) {
            specific_rest_id=r.id;
            console.log(specific_rest_id);

            querySpecificRest="https://developers.zomato.com/api/v2.1/restaurant?res_id="+specific_rest_id;
            $.ajax({
                url:querySpecificRest,
                method:"GET",
                headers: {"user-key": apiKey}
            }).then(function(response) {
                specificRest={
                    "name":r.name,
                    "id":r.id,
                    "image":r.featured_image,
                    "location":{
                        "address":rl.address,
                        "city":rl.city,
                        "latitude":rl.latitude,
                        "longitude":rl.longitude,
                        "zipcode":rl.zipcode
                    },
                    "menu":r.menu_url,
                    "price":r.price_range,
                    "user_rating":{
                        "avg":ru.aggregate_rating,
                        "rating_word":ru.rating_text,
                        "votes":ru.votes
                    }
                }
                console.log(specificRest);
            });
        }
        else {
            alert("no restaurant by that name");
        };
    });
};

    // $("#form")[0].reset();

function capUpper(string){
    var splitStr = string.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' '); 
};

