var initialRestaurants = [
  {
    name : 'Garden Fresh',
    info: 'A Chinese restaurant that specializes in Vegetarian dishes',
    url: 'gardenfresh.us',
    rating: '4'
  },

  {
    name: 'Marafuku Ramen',
    info: 'The newest Ramen shop in Japantown featuring the Hakata Tonkotsu Ramen',
    url: 'marafukuramen.com',
    rating: '4.5'
  },

  {
    name: 'Gogi Time',
    info: 'AYCE Kbbq and Hotpot, fresh food for one low price.',
    url: 'gogitime.com',
    rating: '4'
  },

  {
    name: 'Noori',
    info: 'Indian, Pakistani and Halal cuisine featuring their specialty Butter Chicken and Spicy Garlic Naan',
    url: 'noorisf.com',
    rating: '4'
  },

  {
    name: 'The Codmother Fish and Chips',
    info: 'Low-key Fish and Chips shop right near the marina of Pier 39, good food at low prices especially in San Francisco.',
    url: 'codmother.com',
    rating: '4.5'
  },

  {
    name: 'Fish',
    info: 'Specializing in local seafood fare, this is a staple in San Franciscan cuisine with its view of the Bay.',
    url: '331fish.com',
    rating: '4'
  }
];

var Restaurant = function(data) {
  this.name = data.name;
  this.info = data.info;
  this.url = data.url;
  this.rating = data.rating;
};
