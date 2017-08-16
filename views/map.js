var mapModel = {
  initMap: function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { //center around San Francisco
        lat: 37.6773748,
        lng: -122.4170011
      },
      zoom: 11,
      mapTypeId: 'roadmap',
      //properties to style map, sourced from snazzy maps author Diana Caballero https://snazzymaps.com/style/93/lost-in-the-desert
      styles: [{"elementType":"labels","stylers":[{"visibility":"off"},{"color":"#000000"}]},{"featureType":"landscape","stylers":[{"color":"#f9ddc5"},{"lightness":-7}]},{"featureType":"road","stylers":[{"color":"#813033"},{"lightness":43}]},{"featureType":"poi.business","stylers":[{"color":"#645c20"},{"lightness":38}]},{"featureType":"water","stylers":[{"color":"#1994bf"},{"saturation":-69},{"gamma":0.99},{"lightness":43}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#f19f53"},{"weight":1.3},{"visibility":"on"},{"lightness":16}]},{"featureType":"poi.business"},{"featureType":"poi.park","stylers":[{"color":"#645c20"},{"lightness":39}]},{"featureType":"poi.school","stylers":[{"color":"#a95521"},{"lightness":35}]},{},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#813033"},{"lightness":38},{"visibility":"off"}]},{},{},{},{},{},{},{},{},{},{},{},{"elementType":"labels"},{"featureType":"poi.sports_complex","stylers":[{"color":"#9e5916"},{"lightness":32}]},{},{"featureType":"poi.government","stylers":[{"color":"#9e5916"},{"lightness":46}]},{"featureType":"transit.station","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","stylers":[{"color":"#813033"},{"lightness":22}]},{"featureType":"transit","stylers":[{"lightness":38}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#f19f53"},{"lightness":-10}]},{},{},{}]
    });

    //below section modeled after Udacity tutorial on marker creation
    //array to hold markers
    var markers = [];

    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    var restList = initialRestaurants;
    //loop through and make markers from each marker array
    // for (var i = 0; i < locations.length; i++) {
    //   var position = locations[i].location;
    //   var title = locations[i].title;
    for (var i = 0; i < restList.length; i++) {
      var position = restList[i].location;
      var title = restList[i].name;

      //make the markers
      //from var marker
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      //push onto array of markers
      markers.push(marker);
      //move map over to make space for marker window
      bounds.extend(marker.position);

      //onclick event for each marker to have a info window and move to it
      marker.addListener('click', function() {
        //addMarkerToList(self);
        // console.log(marker.property.name);
        populateInfoWindow(this, largeInfowindow);
        moveToMarker(this, position);
      });
      map.fitBounds(bounds);
    }

    //put information onto the info window
    function populateInfoWindow(marker, infowindow) {
      //Check window not already open
      if (infowindow.marker != marker) {

        infowindow.marker = marker;
        infowindow.setContent('<div class= "marker">' + marker.title + '</div>');

        //animation for bounce and cancel after 1.5 seconds
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
      		marker.setAnimation(null);
     	  }, 1500);

        infowindow.open(map, marker);

        //reset zoom on map after closing infowindow
        infowindow.addListener('closeclick', function() {
          map.setZoom(11);
        });
      }
    }
    //moves screen to the marker
    function moveToMarker(marker, position) {
      map.panTo(marker.position);
      map.setZoom(15);
    }

    // var currRestaurant = initialRestaurants[i];

    // function addMarkerToList(marker) {
    //   marker = currRestaurant.url;
    //   marker = currRestaurant.rating;
    // }
  }
};
