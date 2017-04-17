(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'ویرایش پروفایل',
      state: 'settings.profile'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'ویرایش تصویر کاربر',
      state: 'settings.picture'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'تغییر رمز عبور',
      state: 'settings.password'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'مدیریت حسابهای اجتماعی',
      state: 'settings.accounts'
    });
  }
}());
