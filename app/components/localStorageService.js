(function (angular) {
    'use strict';

    angular.module('gitApp')

        /**
         *
         */
        .factory('localStorageService', ['$window',
            function ($window) {

                var fac = {
                    /**
                     * 
                     */
                    removeItem: function (key) {
                        return $window.localStorage.removeItem(key);
                    },
                    /**
                     * 
                     */
                    getItem: function (key) {
                        return $window.localStorage.getItem(key);
                    },
                    /**
                     * 
                     */
                    setItem: function (key, value) {
                        $window.localStorage.setItem(key, value);
                    },
                    /**
                     * Local storage helper function
                     */
                    getObject: function (key) {
                        var obj = null;
                        var raw = fac.getItem(key);
                        try {
                            obj = JSON.parse(raw);
                        }
                        catch (e) {
                            console.error("caught exception in localStorageService.getObject(" + key + "): " + e);
                        }
                        return obj;
                    },
                    /**
                     * Local storage helper function
                     */
                    setObject: function (key, value) {
                        var succeeded = true;
                        try {
                            var stringified = JSON.stringify(value);
                            this.setItem(key, stringified);
                        }
                        catch (e) {
                            console.log("caught exception in localStorageService.setObject(" + key + "): " + e);
                            succeeded = false;
                        }
                        return succeeded;
                    },
                };

                return fac;

            }]);

})(window.angular);
