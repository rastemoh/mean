(function () {
    'use strict';
    angular.module('core')
      .constant('moment', moment)
      .config(configMoment);
    configMoment.$inject = ['moment'];
    function configMoment(moment) {
      moment.loadPersian();
    }

    angular.module('core')
      .filter('datefa', dateFilter);
    // dateFilter.$inject = ['moment'];
    function dateFilter() {
      return function (input, format) {
        if (!input) {
          return;
        }
        var m = moment(input);
        var dateFormat = 'jYY/jMM/jDD';
        if (format) {
          dateFormat = format;
        }
        return m.format(dateFormat);
      }
    }
  }()
);
