(function () {
  'use strict';
  angular
    .module('core')
    .filter('htmlToPlaintext', stripper);
  function stripper() {
    return function (input) {
      return input ? String(input).replace(/<[^>]+>/gm, '') : '';
    };
  }
}());
