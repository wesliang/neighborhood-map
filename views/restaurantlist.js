//var data = [];

var viewModel = function() {
  var self = this;

  //hold ton of restaurants
  self.restaurantList = ko.observableArray([]);


  initialRestaurants.forEach(function(e) {
    self.restaurantList.push( new Restaurant(e) );
    //data.push( new Restaurant(e) );
  });

  //point to starting item in list
  this.currentRestaurant = ko.observable( this.restaurantList()[0] );

  //get clickItem and pan to it
  this.setCurrentMarker = function(clickedItem) {
    self.currentRestaurant(clickedItem);
    //console.log(markers[clickedItem.id]);
    populateInfoWindow(markers[clickedItem.id], largeInfowindow);
    map.panTo(markers[clickedItem.id].position);
    map.setZoom(15);
  };

  //copy of function in map.js, couldn't figure out how to call this from both without code re-use
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

  // viewModel.filteredItems = ko.computed(function() {
  //   var filter = this.filter().toLowerCase();
  //     if (!filter) {
  //      return this.items();
  //     } else {
  //         return ko.utils.arrayFilter(this.items(), function(item) {
  //           return ko.utils.stringStartsWith(item.name().toLowerCase(), filter);
  //     });
  //   }
  // }, viewModel);
};

ko.applyBindings(new viewModel());
