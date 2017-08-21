//restaurant objects to initialize
var initialRestaurants = [
  {
    name : 'Garden Fresh',
    info: 'A Chinese restaurant that specializes in Vegetarian dishes',
    location: {lat: 37.4455772, lng: -122.165027},
  },

  {
    name: 'Marafuku Ramen',
    info: 'The newest Ramen shop in Japantown featuring the Hakata Tonkotsu Ramen',
    location: {lat: 37.78505, lng: -122.4342819},
  },

  {
    name: 'Gogi Time',
    info: 'AYCE Kbbq and Hotpot, fresh food for one low price.',
    location: {lat: 37.8155272, lng: -122.2698097},
  },

  {
    name: 'Noori',
    info: 'Indian, Pakistani and Halal cuisine featuring their specialty Butter Chicken and Spicy Garlic Naan',
    location: {lat: 37.6271474, lng: -122.4132797},
  },

  {
    name: 'The Codmother Fish and Chips',
    info: 'Low-key Fish and Chips shop right near the marina of Pier 39, good food at low prices especially in San Francisco.',
    location: {lat: 37.8072766, lng: -122.4192702},
  },

  {
    name: 'Fish',
    info: 'Specializing in local seafood fare, this is a staple in San Franciscan cuisine with its view of the Bay.',
    location: {lat: 37.8681402, lng: -122.4999625},
  }
];

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
  this.lat = data.location.lat;
  this.long = data.location.lng;
  //json data fields
  this.siteURL = '';
  this.checkins = '';
  this.street = '';

  //observable flag to hide markers
  this.show = ko.observable(true);

  var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll='+ this.lat + ',' + this.long + '&client_id=NRUWKGX3LTILSCAR3VXHCS2Y1CEVBABBC2Z0ILAWZYI2ZKWC&client_secret=TX0HTD15ZEMDU4ISKT521WHVYJQSYPN0GDIZZ3BXR040IM32&v=20170821&query=' + this.name;

  // get json from endpoint store into parameter 'json' and process in function
  $.getJSON(foursquareURL).done(function(json) {
    //capture id, contact, location, categories etc into results
		var results = json.response.venues[0];

    //assign objects from JSON to values in our object
    self.siteURL = results.url === undefined ? '' : results.url;
		self.street = results.location.formattedAddress[0];
    self.city = results.location.formattedAddress[1];
	}).fail(function() {
		alert('Error with retrieving data from Foursquare. Please refresh the page and try again.');
	});

  //instantiate markers
  this.marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.location),
			map: map,
      animation: google.maps.Animation.DROP,
			title: data.name
	});

  this.showMarker = ko.computed(function() {
    //check to see if item is boolean true visible, put marker on map if so
		var result = this.show()? this.marker.setMap(map) : this.marker.setMap(null);

		return result;
	}, this);

  //click event for each marker
  this.marker.addListener('click', function(){
    //set content of infowindow
		self.contentString = '<div><b>' + data.name + "</b></div>" +
                        '<div"><a href=""' + self.siteURL +'">' + self.siteURL + '</a></div>' +
                        '<div>' + self.street + '</div>' +
                        '<div>' + self.city + '</div>';
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
