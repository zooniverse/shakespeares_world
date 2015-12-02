'use strict';

require('./favourites.module.js')
    .controller('FavouritesController', FavouritesController);

// @ngInject
function FavouritesController(FavouritesFactory) {
    var vm = this;
}
