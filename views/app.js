//let map be global to get accessed by other funcs
var map;

//for foursquare API
// var clientID;
// var secretID;

var viewModel = function() {
  //reference to the original 'this', aka viewModel object
  var self = this;

  //secret keys
  // clientID = 'NRUWKGX3LTILSCAR3VXHCS2Y1CEVBABBC2Z0ILAWZYI2ZKWC';
  // secretID = 'TX0HTD15ZEMDU4ISKT521WHVYJQSYPN0GDIZZ3BXR040IM32';

  map = new google.maps.Map(document.getElementById('map'), {
   center: { //center around San Francisco
     lat: 37.6773748,
     lng: -122.4170011
   },
   zoom: 11,
   mapTypeId: 'terrain',
   //properties to style map, sourced from snazzy maps author Diana Caballero https://snazzymaps.com/style/93/lost-in-the-desert
   styles: [{"elementType":"labels","stylers":[{"visibility":"off"},{"color":"#000000"}]},{"featureType":"landscape","stylers":[{"color":"#f9ddc5"},{"lightness":-7}]},{"featureType":"road","stylers":[{"color":"#813033"},{"lightness":43}]},{"featureType":"poi.business","stylers":[{"color":"#645c20"},{"lightness":38}]},{"featureType":"water","stylers":[{"color":"#1994bf"},{"saturation":-69},{"gamma":0.99},{"lightness":43}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#f19f53"},{"weight":1.3},{"visibility":"on"},{"lightness":16}]},{"featureType":"poi.business"},{"featureType":"poi.park","stylers":[{"color":"#645c20"},{"lightness":39}]},{"featureType":"poi.school","stylers":[{"color":"#a95521"},{"lightness":35}]},{},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#813033"},{"lightness":38},{"visibility":"off"}]},{},{},{},{},{},{},{},{},{},{},{},{"elementType":"labels"},{"featureType":"poi.sports_complex","stylers":[{"color":"#9e5916"},{"lightness":32}]},{},{"featureType":"poi.government","stylers":[{"color":"#9e5916"},{"lightness":46}]},{"featureType":"transit.station","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","stylers":[{"color":"#813033"},{"lightness":22}]},{"featureType":"transit","stylers":[{"lightness":38}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#f19f53"},{"lightness":-10}]},{},{},{}]
 });

  //hold query and restaurants
  this.restaurantList = ko.observableArray([]);
  this.query = ko.observable('');

  initialRestaurants.forEach(function(e) {
    self.restaurantList.push( new Restaurant(e) );
  });

  this.listClick = function(){
    google.maps.event.trigger(this.marker, 'click');
  };

  //filter the list
  this.filtered = ko.computed( function() {
    //check if filter exists
    var filter = self.query().toLowerCase();
  		if (filter === undefined) {
  			self.restaurantList().forEach(function(item){
          //if filter doesn't exist and item show is on, show on map
  				if (item.show() === true) {
            item.marker.setMap(map);
          } else {
            //otherwise hide
            item.marker.setMap(null);
          }
  			});
        //return the list thus far
  			return self.restaurantList();
  		} else {
  			return ko.utils.arrayFilter(self.restaurantList(), function(item) {
  				var string = item.name.toLowerCase();
  				var result = (string.search(filter) >= 0);
  				item.show(result);
  				return result;
  			});
  		}
  	});

};

var startApp = function() {
  ko.applyBindings(new viewModel());
};
