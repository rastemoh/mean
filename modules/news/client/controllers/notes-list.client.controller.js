(function () {
  'use strict';

  angular
    .module('news')
    .controller('notesListController', NotesListController);

  NotesListController.$inject = ['NewsService'];

  function NotesListController(NewsService) {
    var vm = this;
    vm.news = NewsService.fetchNotes();
    vm.title = 'یادداشت‌ها';
  }
}());
