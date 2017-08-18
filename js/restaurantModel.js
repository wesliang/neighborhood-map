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
  this.long = data.location.long;
  this.id = data.id;

  //observable flag to hide markers
  this.visible = ko.observable(true);

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
