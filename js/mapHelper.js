var MapHelper = {};

(function($) {

    var map,
        mapElement,
        markersArray = [];

    var defaults = {
        zoom: 4,
        us_center_lat: 39.80,
        us_center_long: -98.50
    };

    function initialize() {
        map = new google.maps.Map(mapElement, {
            center: getLatLng(defaults.us_center_lat, defaults.us_center_long),
            zoom: defaults.zoom
        });

        MapHelper.findGeoLocation(function(position) {
            var latLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                icon: 'images/markers/home.png',
                title: 'My Location'
            };

            MapHelper.setMarkers([latLng], false);

        }, function(error) {
            console.log(error);
        });
    }

    function getLatLng(lat, lng) {
        var obj = new google.maps.LatLng(lat, lng);
        return obj;
    }

    MapHelper.findGeoLocation = function(successCallback, erroCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                successCallback.call(window, position);
            }, function(error) {
                erroCallback.call(window, error);
            });
        }
    }

    MapHelper.init = function(mapElem) {
        mapElement = mapElem;

        google.maps.event.addDomListener(window, 'load', initialize);
    };


    MapHelper.setMarkers = function(latLngArray, storeMarker) {

        var bounds = new google.maps.LatLngBounds();

        for (var i = 0; i < latLngArray.length; i++) {
            var arrObj = latLngArray[i];
            var latLng = getLatLng(arrObj.lat, arrObj.lng);
            bounds.extend(latLng);

            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: arrObj.icon,
                title: arrObj.title
            });

            if (storeMarker) {
                markersArray.push(marker);
            }
        }
        map.setCenter(bounds.getCenter());

        map.fitBounds(bounds);
    };

    MapHelper.clearMarkers = function() {
        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    };

    MapHelper.queryPlaces = function(zip, radius, query){
        var request = {
            radius: Number(radius) * 1069, //convert miles tp meters
            query: query
        };
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, function(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  var place = results[i];
                  console.log(place);
                }
            }
        });
    }

})(jQuery);
