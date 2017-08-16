//var data = [];

var viewModel = function() {
  var self = this;

  //hold ton of restaurants
  this.restaurantList = ko.observableArray([]);

  initialRestaurants.forEach(function(e) {
    self.restaurantList.push( new Restaurant(e) );
    //data.push( new Restaurant(e) );
  });

  //point to starting item in list
  this.currentRestaurant = ko.observable( this.restaurantList()[0] );

  //get clickItem and pan to it
  this.setCurrentMarker = function(clickedItem) {
    self.currentRestaurant(clickedItem);
    map.panTo(clickedItem.location);
    map.setZoom(15);
  };

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
