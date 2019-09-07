/*(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'loader/foundItems.html',
    link: FoundLink,
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

function FoundLink(scope, element, attrs, controller) {
  //console.log("Link scope is: ", scope);
  //console.log("Controller instance is: ", controller);
  //console.log("Element is: ", element);

  scope.$watch('list.found', function (newValue, oldValue) {
  //  console.log("Old value: ", oldValue);
  //  console.log("New value: ", newValue);

    if (newValue !== undefined) {
      displayFoundItems();

    }
    else {
      removeFoundItems();

    }

  });

  function displayFoundItems() {

    var foundItems = element.find("div.message");
    foundItems.slideDown(1000);
  }


  function removeFoundItems() {

    var foundItems = element.find("div.message");
    foundItems.slideUp(1000);
  }
}

function FoundItemsDirectiveController() {
  var list = this;

  list.isEmpty = function() {
    return list.found != undefined && list.found.length === 0;
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.searchTerm = "";


  controller.narrowIt = function() {
    if (controller.searchTerm === "") {
      controller.found = [];
      return;
    }
    var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
    promise.then(function(response) {
      controller.found = response;
    })
    .catch(function(error) {
      console.log("Something went wrong", error);
    });
  };

  controller.removeItem = function(index) {
    controller.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function (result) {
      // process result and only keep items that match
      var found = result.data.menu_items;


      var foundItems = [];
          for (var i = 0; i < found.length; i++) {
            if (found[i].description.toLowerCase().match("\\b"+searchTerm.toLowerCase()+"\\b") !== null) {
              console.log("Found at : ( "+ i + " )"+ ",and the object is : ", found[i] );
			  foundItems.push(found[i]);
            }
          }

      // return processed items

      return foundItems;
    });
  };
}

}
)();*/
!function(){"use strict";function e(e,n,t,o){e.$watch("list.found",function(e,t){void 0!==e?n.find("div.message").slideDown(1e3):n.find("div.message").slideUp(1e3)})}function n(){var e=this;e.isEmpty=function(){return null!=e.found&&0===e.found.length}}function t(e){var n=this;n.searchTerm="",n.narrowIt=function(){""!==n.searchTerm?e.getMatchedMenuItems(n.searchTerm).then(function(e){n.found=e}).catch(function(e){console.log("Something went wrong",e)}):n.found=[]},n.removeItem=function(e){n.found.splice(e,1)}}function o(e){this.getMatchedMenuItems=function(n){return e({method:"GET",url:"https://davids-restaurant.herokuapp.com/menu_items.json"}).then(function(e){for(var t=e.data.menu_items,o=[],r=0;r<t.length;r++);for(r=0;r<t.length;r++)null!==t[r].description.toLowerCase().match("\\b"+n.toLowerCase()+"\\b")&&(console.log("Found at : ( "+r+" ),and the object is : ",t[r]),o.push(t[r]));return o})}}angular.module("NarrowItDownApp",[]).controller("NarrowItDownController",t).service("MenuSearchService",o).directive("foundItems",function(){return{templateUrl:"loader/foundItems.html",link:e,scope:{found:"<",onRemove:"&"},controller:n,controllerAs:"list",bindToController:!0}}),t.$inject=["MenuSearchService"],o.$inject=["$http"]}();
