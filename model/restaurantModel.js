//global infowindow to prevent multiple windows from being created
var infoWindow;

//restaurant and its properties and attached markers
var Restaurant = function(data) {
  //reference to original object of 'this,' in this case it is the 6 restaurant objects
  var self = this;
  infoWindow = new google.maps.InfoWindow();

  //initialize object fields
  this.name = data.name;
  this.info = data.info;
  this.url = data.url;
  this.rating = data.rating;
  this.lat = data.location.lat;
  this.long = data.location.lng;
  this.id = data.id;
  this.siteURL = '';
  this.checkins = '';
  this.street = '';


  //observable flag to hide markers
  this.show = ko.observable(true);

  var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll='+ this.lat + ',' + this.lng + '&client_id=NRUWKGX3LTILSCAR3VXHCS2Y1CEVBABBC2Z0ILAWZYI2ZKWC&client_secret=TX0HTD15ZEMDU4ISKT521WHVYJQSYPN0GDIZZ3BXR040IM32&v=20170821&query=' + this.name;

  //get json from endpoint store into parameter 'json' and process in function
  $.getJSON(foursquareURL).done(function(json) {
    //capture id, contact, location, categories etc into results
		var results = json.response.venues[0];
		self.siteURL = results.url;
		if (typeof self.URL === 'undefined'){
			self.URL = '';
		}
		self.street = results.location.formattedAddress[0];
    self.city = results.location.formattedAddress[1];
	}).fail(function() {
		alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
	});

  //instantiate markers
  this.marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.location),
			map: map,
      animation: google.maps.Animation.DROP,
			title: data.name
	});

  //click event for each marker
  this.marker.addListener('click', function(){
    //set content of infowindow
		self.contentString = '<div><b>' + data.name + "</b></div>";
    infoWindow.setContent(self.contentString);

    //add bounce effect to markers
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      	self.marker.setAnimation(null);
    }, 1500);

    //move to marker and open its info
    map.panTo(this.position);
    infoWindow.open(map, this);
	});


};
