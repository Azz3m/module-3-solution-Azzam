(function() {
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
      /*
      if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
         foundItems.push(items[i]);
       }
       */

          for (var i = 0; i < found.length; i++) {


          }

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
)();
