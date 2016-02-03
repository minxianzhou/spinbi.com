'use strict';

var services = angular.module('app.services.dialog',[]);

services.factory('DialogService', ['$mdDialog', function($mdDialog) {
  return {
		ShowAlert : function(title, description, caption) {


      if( typeof title === 'undefined' || title == null)
        var title = "title..";
      if( typeof description === 'undefined' || description == null)
        var description = "description....";
      if( typeof caption === 'undefined' || caption == null)
        var caption = "OK";
     

      $mdDialog.show(
          $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title(title)
              .content(description)
              .ariaLabel('Alert Dialog')
              .ok(caption)
              //.targetEvent(ev)
      );

		},

  }
}]);