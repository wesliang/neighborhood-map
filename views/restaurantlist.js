var data = [];

var viewModel = function() {
  var self = this;

  //hold ton of restaurants
  this.restaurantList = ko.observableArray([]);

  initialRestaurants.forEach(function(e) {
    self.restaurantList.push( new Restaurant(e) );
  });

  //point to starting item in list
  this.currentRestaurant = ko.observable( this.restaurantList()[0] );

  this.setCurrentMarker = function(clickedItem) {
    self.currentRestaurant(clickedItem);
    console.log(clickedItem);
  };


};

ko.applyBindings(new viewModel());
