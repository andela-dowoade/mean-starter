'use strict';
angular.module('app.services')
  .factory('TokenInjector', ['Auth', '$q', function(Auth, $q) {
    return {
      request: (config) => {
        var user = Auth.getUser();
        if (user) {
          config.headers['x-access-token'] = user.token;
        }
        return config;
      }
    };
  }]);
