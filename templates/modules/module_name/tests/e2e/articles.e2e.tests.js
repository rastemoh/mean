'use strict';

describe('module_name E2E Tests:', function () {
  describe('Test module_name page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/module_name');
      expect(element.all(by.repeater('article in module_name')).count()).toEqual(0);
    });
  });
});
