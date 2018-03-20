function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center:{ lat: 29.760, lng: -95.369 }
    });

    
    // array of all the restaurants, with coordinates for its markers
    var markers=[];
    for (var i=0; i<allRestaurants.length; i++){
        var latInt = parseFloat(allRestaurants[i].location.latitude);
        var longInt=parseFloat(allRestaurants[i].location.longitude);
        markers[i] = {
            coords:{
               lat: latInt,
               lng: longInt
            },
            name: allRestaurants[i].name,
            imageURL: allRestaurants[i].image,
            avgRating: allRestaurants[i].user_rating.avg,
            address: allRestaurants[i].location.address,
            priceRange:allRestaurants[i].price
            
        }
    };
        console.log(markers);


    for (var i = 0; i < markers.length; i++) {
        addRestaurantMarker(markers[i]);
        // console.log(markers[i]);
    }

    // Add a new restaurant marker 
    function addRestaurantMarker(newMarker) {
        // console.log(newMarker);
        var marker = new google.maps.Marker({
            position: newMarker.coords,
            map: map,
        });

        // is there a specific icon to display? if so, set it. 
        if (newMarker.iconImage) {
            marker.setIcon(newMarker.iconImage);
        }

        // is there name to display? if so, display when icon is clicked
        if (newMarker.name) {
            var infoWindow = new google.maps.InfoWindow({
                content: newMarker.name
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
                if(newMarker.imageURL){
                $("#restaurant-photo").html(`<img src=${newMarker.imageURL}  class="restaurantImage">`);
                }
                else{
                    var stockImage = "http://img1.cookinglight.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2017/07/main/veggie-tofu-stir-fry-ck.jpg?itok=V88FQY4y";
                    $("#restaurant-photo").html(`<img src=${stockImage} class="restaurantImage">`);  
                }
                $("#restaurants-big").html(` <h2>${newMarker.name}</h2> <hr>`);

                $("#restaurant-info").html(`User Rating: ${newMarker.avgRating} <br>
                Average Price: ${newMarker.priceRange} <br> Address: ${newMarker.address}`);
            

                
            });
        }
    }

}