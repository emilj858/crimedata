(function() {
    'use strict';

    angular
        .module('crime-data')
        .factory('geocodeFactory', geocodeFactory);

    geocodeFactory.$inject = ['$http'];

    /* @ngInject */
    function geocodeFactory($http) {
        var service = {
            getCoordinates: getCoordinates
        };
        return service;

        ////////////////

        function getCoordinates(cityName) {
            return $http
                .get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=cdb3dd37673de698ff2c51562b68edb1');
        }
    }
})();
