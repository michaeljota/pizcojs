(function(){
'use strict';

  angular
    .module('pizcojs')
    .controller('SidenavController', SidenavController);

  function SidenavController($state){
    var snVm = this;

    var openedSection;
    var currentSection;
    var currentPage;

    snVm.sections = [{
      name: 'Login',
      state: 'app.login',
      type: 'link',
      icon: 'hexagon'
    },{
      name: 'Main',
      state: 'app.main',
      type: 'link',
      icon: 'hexagon'
    },{
      name: 'Sketchpad',
      state: 'app.sketchpad',
      type: 'link',
      icon: 'hexagon'
    }];

    snVm.autoFocusContent = false;

    snVm.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };

    snVm.getState = function getState(section) {
      return section.state ? section.state : null;
    }

    snVm.isOpen = function (section) {
      return openedSection === section;
    };

    snVm.toggleOpen =  function (section) {
      openedSection = (openedSection === section ? null : section)
    };

    snVm.selectPage = function (section, page) {
      page && page.url && $state.go(page.url);
      currentSection = section;
      currentPage = page;
    };
  }
})();
