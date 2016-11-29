(function() {
    'use strict';

    angular
        .module('crime-data')
        .factory('crimeFactory', crimeFactory);

    crimeFactory.$inject = ['$http'];

    function crimeFactory($http) {
        var service = {
            searchCrimeData: searchCrimeData
        };

        return service;

        function searchCrimeData(longitude, latitude) {
            return $http
                .get('http://api.spotcrime.com/crimes.json?lat=' + latitude + '&lon=' + longitude + '&radius=0.02&key=.');

        };
    }
})();
