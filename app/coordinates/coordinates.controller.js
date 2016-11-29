(function() {
    'use strict';

    angular
        .module('crime-data')
        .controller('CrimeController', CrimeController);

    CrimeController.$inject = ['$http', 'toastr', 'geocodeFactory', 'crimeFactory'];

    /* @ngInject */
    function CrimeController($http, toastr, geocodeFactory, crimeFactory) {
        var vm = this;
        vm.callCrimeController = callCrimeController;
        vm.results = [];

        function callCrimeController(city) {
            geocodeFactory
                .getCoordinates(city)
                .then(extractCoordinates)
                .then(searchForCrimeData)
                .then(showCrimeDataToUser)
                .catch(function(error) {
                    toastr.error('API call failed. Not a valid city :(', 'Crime App: Error');
                });
        }

        function extractCoordinates(response) {
            toastr.info('Progress update', 'Loaded information about your city');

            return response.data.coord;
        }

        function searchForCrimeData(coords) {
            return crimeFactory.searchCrimeData(coords.lon, coords.lat)
        }

        function showCrimeDataToUser(response) {
            toastr.success('Success!', 'Got crime data');

            vm.crimeData = response.data;
        }
        vm.colors = {
            'Assault': '#f48d27',
            'Vandalism': '#a81fba',
            'Murder': '#a2ba1f',
            'Arrest': '#ba1f3e',
            'Robbery': '#ba4b1f',
            'Other': '#E88AFB',
            'Theft': '#6B3FF6',
            'Shooting': '#282222',
            'Burglary': '#4BD057',
        }

    }
})();
