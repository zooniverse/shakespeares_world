'use strict';

require('./favorites.module.js')
    .controller('FavoritesController', FavoritesController);

// @ngInject
function FavoritesController(FavoritesFactory) {
    var vm = this;
}
