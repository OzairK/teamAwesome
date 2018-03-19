function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center:{ lat: 29.760, lng: -95.369 }
    });

    
    // array of all the restaurants, with coordinates for its markers
    var markers = [
        {
            coords: { lat: 29.7604, lng: -95.3698 },
            iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            content: '<h1>Name of restaurant 1</h1>'
        },
        {
            coords: { lat: 29.7609, lng: -95.361 },
            content: '<h1>Name of restaurant 2</h1>'
        },
        {
            coords: { lat: 29.6, lng: -95.3691 }
        }
    ];

    for (var i = 0; i < markers.length; i++) {
        addRestaurantMarker(markers[i]);
    }

    // Add a new restaurant marker 
    function addRestaurantMarker(newMarker) {
        var marker = new google.maps.Marker({
            position: newMarker.coords,
            map: map,
        });

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
            });
        }
    }

    // var marker = new google.maps.Marker({
    //     position: uluru,
    //     map: map,
    //     icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    // });

    // var infoWindow = new google.maps.InfoWindow({
    //     content: "<h2> this is the content </h2>"
    // });

    // marker.addListener("click", function () {
    //     infoWindow.open(map, marker);
    // })
}