var mapModel = {
  initMap: function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { //center around San Francisco
        lat: 37.6773748,
        lng: -122.4170011
      },
      zoom: 11,
      mapTypeId: 'roadmap',
      //properties to style map, sourced from snazzy maps author Diana Caballero
      styles: [{"elementType":"labels","stylers":[{"visibility":"off"},{"color":"#000000"}]},{"featureType":"landscape","stylers":[{"color":"#f9ddc5"},{"lightness":-7}]},{"featureType":"road","stylers":[{"color":"#813033"},{"lightness":43}]},{"featureType":"poi.business","stylers":[{"color":"#645c20"},{"lightness":38}]},{"featureType":"water","stylers":[{"color":"#1994bf"},{"saturation":-69},{"gamma":0.99},{"lightness":43}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#f19f53"},{"weight":1.3},{"visibility":"on"},{"lightness":16}]},{"featureType":"poi.business"},{"featureType":"poi.park","stylers":[{"color":"#645c20"},{"lightness":39}]},{"featureType":"poi.school","stylers":[{"color":"#a95521"},{"lightness":35}]},{},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#813033"},{"lightness":38},{"visibility":"off"}]},{},{},{},{},{},{},{},{},{},{},{},{"elementType":"labels"},{"featureType":"poi.sports_complex","stylers":[{"color":"#9e5916"},{"lightness":32}]},{},{"featureType":"poi.government","stylers":[{"color":"#9e5916"},{"lightness":46}]},{"featureType":"transit.station","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","stylers":[{"color":"#813033"},{"lightness":22}]},{"featureType":"transit","stylers":[{"lightness":38}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#f19f53"},{"lightness":-10}]},{},{},{}]
    });

    //below section modeled after Udacity tutorial on marker creation
    //array to hold markers
    var markers = [];

    //create location info for each marker
    var locations = [
      {title: 'Garden Fresh', location: {lat: 37.4455772, lng: -122.165027}},
      {title: 'Marufuku', location: {lat: 37.78505, lng: -122.4342819}},
      {title: 'Gogi Time', location: {lat: 37.8155272, lng: -122.2698097}},
      {title: 'Noori', location: {lat: 37.6271474, lng: -122.4132797}},
      {title: 'Codmother Fish and Chips', location: {lat: 37.8072766, lng: -122.4192702}},
      {title: 'Fish', location: {lat: 37.8681402, lng: -122.4999625}}
    ];

    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    //loop through and make markers from each marker array
    for (var i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var title = locations[i].title;
      //console.log(locations[i].location.lat);

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
      //onclick event for each marker to have a info window
      marker.addListener('click', function() {
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
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);

        infowindow.addListener('closeclick', function() {
          infowindow.setMarker(null);
        });
      }
    }
    //moves screen to the marker
    function moveToMarker(marker, position) {
      map.panTo(marker.position);
      map.setZoom(15);
    }
  }
};
