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
            content: allRestaurants[i].name,
            imageURL: allRestaurants[i].image
            
        }
    };
        console.log(markers);


    for (var i = 0; i < markers.length; i++) {
        addRestaurantMarker(markers[i]);
        // console.log(markers[i]);
    }

    // Add a new restaurant marker 
    function addRestaurantMarker(newMarker) {
        console.log(newMarker);
        var marker = new google.maps.Marker({
            position: newMarker.coords,
            map: map,
        });
        console.log(marker);

        // is there a specific icon to display? if so, set it. 
        if (newMarker.iconImage) {
            marker.setIcon(newMarker.iconImage);
        }

        // is there content to display? if so, display when icon is clicked
        if (newMarker.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: newMarker.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
                alert(newMarker.content);
                $("#restaurant-photo").html(`<img src=${newMarker.imageURL}  class="restaurantImage">`);
                $("#restaurants-big").text(newMarker.content);
                console.log(newMarker.imageURL);

                
            });
        }
    }

}