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

    //init long lat coordinates for each marker
    var gardenFresh = {lat: 37.4455772, lng: -122.165027};
    var marufuku = {lat: 37.78505, lng: -122.4342819};
    var gogiTime = {lat: 37.8155272, lng: -122.2698097};
    var noori = {lat: 37.6271474, lng: -122.4132797};
    var codmother = {lat: 37.8072766, lng: -122.4192702};
    var fish = {lat: 37.8681402, lng: -122.4999625};

    //create markers for each location
    var gardenMarker = new google.maps.Marker({
      position: gardenFresh,
      map: map,
      title: 'Garden Fresh'
    });

    var maruMarker = new google.maps.Marker({
      position: marufuku,
      map: map,
      title: 'Marufuku'
    });

    var gogiMarker = new google.maps.Marker({
      position: gogiTime,
      map: map,
      title: 'Gogi Time'
    });

    var nooriMarker = new google.maps.Marker({
      position: noori,
      map: map,
      title: 'Noori'
    });

    var codMarker = new google.maps.Marker({
      position: codmother,
      map: map,
      title: 'Codmother Fish and Chips'
    });

    var fishMarker = new google.maps.Marker({
      position: fish,
      map: map,
      title: 'Fish'
    });

    var gardenWindow = new google.maps.InfoWindow({
      content: 'Garden Fresh'
    });

    var gogiWindow = new google.maps.InfoWindow({
      content: 'Gogi Time'
    });

    var maruWindow = new google.maps.InfoWindow({
      content: 'Marufuku'
    });

    var nooriWindow = new google.maps.InfoWindow({
      content: 'Noori'
    });

    var codWindow = new google.maps.InfoWindow({
      content: 'Codmother Fish and Chips'
    });

    var fishWindow = new google.maps.InfoWindow({
      content: 'Fish'
    });

    gardenMarker.addListener('click', function() {
      gardenWindow.open(map, gardenMarker);
    });


  }
};
