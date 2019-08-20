angular.module('OrderCloud-LargeAddressListSearch', []);

angular.module('OrderCloud-LargeAddressListSearch')
     .directive('largeshipaddresssearch', largeshipaddresssearch)
     .controller('LargeShipAddressSearchCtrl', LargeShipAddressSearchCtrl)
     .directive('largebilladdresssearch', largebilladdresssearch)
     .controller('LargeBillAddressSearchCtrl', LargeBillAddressSearchCtrl)
     .factory('LargeAddressList', LargeAddressList);

function largeshipaddresssearch() {
     var directive = {
          restrict: 'E',
          controller: 'LargeShipAddressSearchCtrl',
          template: template
     };
     
	  return directive;
      function template() {
           return [
               '<style>',
                '.largeaddress .dropdown-menu  { background-color:#fff;}',
                '.largeaddress .dropdown-menu .active > a {background-color:#000 !important; color:#fff;}',
                '.count {float;left; color:#000; position:relative;left: 10px; margin:0; padding:0;}',
                '</style>',
                
                '<div> ',
                	'<select id="selectShip" class="form-control "name="shipDepartments" ng-model="shipDepartmentSelect" [(value)]="shipDepartmentSelected">',
                		'<option value="">Select Ship to Department</option> ',
                		'<option value="DQ-">DRIVER QUALIFICATION</option> ',
                		'<option value="TC-">TERMINAL CENTER</option> ',
                		'<option value="TD-">DEDICATED</option> ',
                		'<option value="CEM-">EMERGENCY MANAGEMENT</option> ',
                		'<option value="CHR-">HR, COMPENSATION, BENEFITS & TRAINING</option> ',
                		'<option value="CIE-">INTERSTATE LEASING EQUIPMENT</option> ',
                		'<option value="CMK-">MARKETING</option> ',
                		'<option value="COP-">OPERATIONS</option> ',
                		'<option value="CP-">PERMIT</option> ',
                		'<option value="CPA-">PAYROLL</option> ',
                		'<option value="DQ-">ADADEMY</option> ',
                		'<option value="TC-">TERMINAL CENTER</option> ',
                		'<option value="TCL-">CLINIC & MEDICAL</option> ',
                		'<option value="TD-">DEDICATED – DISTRIBUTION CENTER</option> ',
                		'<option value="TLG-">LOGISTICS</option> ',
                		'<option value="TOO-">OWNER OPERATOR</option> ',
                		'<option value="TR-">RECRUITING</option> ',
                		'<option value="TRF" ->REEFER</option> ',
                		'<option value="TRR-">ROAD TO RECOGNITION</option> ',
                		'<option value="TRW-">REWARDS</option> ',
                		'<option value="TS-">BODY SHOP & SHOP</option> ',
                		'<option value="TSF-">SAFETY & CLAIMS</option> ',
                		'<option value="TSH-">SHIP & MAIL</option> ',
                		'<option value="TSL-">SALES</option> ',
                	'</select> ',
                '</div>',
                '<div>',
                	'<select id="selectShip" class="form-control" name="shipStates" ng-model="shipStateSelect" [(value)]="shipStateSelected">',
                		'<option value="">Select Ship to State</option> ',
                		'<option value="AZ">ARIZONA</option> ',
                		'<option value="CA">CALIFORNIA</option> ',
                		'<option value="CO">COLORADO</option> ',
                		'<option value="FL">FLORIDA</option> ',
                		'<option value="GA">GEORGIA</option> ',
                		'<option value="ID">IDAHO</option> ',
                		'<option value="IL">ILLINOIS</option> ',
                		'<option value="IN">INDIANA</option> ',
                		'<option value="KS">KANSAS </option> ',
                		'<option value="MI">MICHIGAN</option> ',
                		'<option value=“MN“>MINNEAPOLIS</option> ',
                		'<option value="NM">NEW MEXICO</option> ',
                		'<option value="NY">NEW YORK</option> ',
                		'<option value="OH">OHIO</option> ',
                		'<option value="OR">OREGON</option> ',
                		'<option value="OK">OKLAHOMA</option> ',
                		'<option value="PA">PENNSYLVANIA</option> ',
                		'<option value="SC">SOUTH CAROLINA</option> ',
                		'<option value="TN">TENNESSEE</option> ',
                		'<option value="TX">TEXAS</option> ',
                		'<option value="UT">UTAH</option> ',
                		'<option value="VA">VIRGINIA</option> ',
                		'<option value="WA">WASHINGTON</option> ',
                		'<option value="WI">WISCONSIN</option> ',
                	'</select> ',
                
  
                	 '<h3 input type="text">{{shipDepartmentSelect}}{{shipStateSelect}}</h3>',
                	 '<h3 input type="text">{{shipDepartmentSelected}}{{shipStateSelected}}</h3>',
                	 '</div>',
                
                 '<div  class="row  largeaddress  view-form-icon"  ng-show="!copyShipAddress">',
                	 '<div  class="col-xs-12">',
                		 '<label  class="required">{{("Shipping"  |  r)  +  "  "  +  ("Address"  |  r)  |  xlat}}',
                			 '<span  class="count"  ng-show="showBillTip">(  Start  typing  to  find  your  address  )</span>',
                			 '<span  class="count"  ng-show="showBillResult">No  addresses  found!</span>',
                		 '</label>',
                			 '<div  class="form-group">',
                				 '<input  id="addressSearch"  class="form-control"  type="text" ng-bind-template="{{shipDepartmentSelect}}{{shipStateSelect}}" ng-model="ShipAddress" ng-model="shipStateSelect"  ng-readonly="readonlyshipping"  required  ng-change="searchShipAddresses(ShipAddress)"  typeahead-min-length="1"  typeahead="address  as  (address.AddressName  +  \'  \'  +  (address.FirstName  ||  \'\')  +  \'  \'  +  (address.LastName  ||  \'\')  +  \'  \'  +  (address.Street1  ||  \'\')  +  \'  \'  +  (address.Street2  ||  \'\')  +  \'  \'  +  (address.City  ||  \'\')  +  \'  \'  +  (address.State  ||  \'\')  +  \'  \'  +  (address.Zip  ||  \'\'))  for  address  in  shipaddresses  |  filter:$viewValue  |  limitTo:50"  />',
                				 '<i  class="fa  fa-map-marker"></i>',
                		 '</div>',
                	 '</div>',
                 '</div>'
              ].join('');
          }
      }

LargeShipAddressSearchCtrl.$inject = ['$scope', 'AddressList', 'LargeAddressList', 'Address'];

function LargeShipAddressSearchCtrl($scope, AddressList, LargeAddressList, Address) {

     AddressList.shipping(function(list) {
          $scope.shipaddresses = list;
          $scope.readonlyshipping = false;
          if ($scope.shipaddresses.length == 1) {
               $scope.ShipAddressID = list[0].ID;
               $scope.ShipAddress = list[0];
               $scope.readonlyshipping = true;
          } else {
               $scope.shipaddresses = [' '];
          }
     });

     $scope.shipAddressCount = null;
     $scope.showTip = true;
     $scope.showResult = false;
     $scope.shipaddressform = false;

     $scope.$watch('ShipAddress', function(newValue) {
          if (!newValue || !newValue.ID) {
               $scope.orderShipAddress = {};
               $scope.currentOrder.ShipAddressID = null;
               $scope.showTip = true;
               $scope.showResult = false;
          } else {
               $scope.orderShipAddress = newValue;
               $scope.currentOrder.ShipAddress = newValue;
               if ($scope.currentOrder) {
                    $scope.currentOrder.ShipAddressID = newValue.ID;
                    $scope.currentOrder.ShipFirstName = null;
                    $scope.currentOrder.ShipLastName = null;
                    angular.forEach($scope.currentOrder.LineItems, function(item) {
                         item.ShipFirstName = null;
                         item.ShipLastName = null;
                    });
               }
               if (newValue) {
                    if ($scope.user.Permissions.contains('EditShipToName') && !$scope.orderShipAddress.IsCustEditable) {
                         angular.forEach($scope.currentOrder.LineItems, function(item) {
                              item.ShipFirstName = $scope.orderShipAddress.FirstName;
                              item.ShipLastName = $scope.orderShipAddress.LastName;
                         });
                    }
                    $scope.setShipAddressAtOrderLevel();
               }
          }
          //account for New Address
          $scope.$on('event:AddressSaved', function(event, address) {
               if (address.IsShipping) {
                    $scope.ShipAddress = address;
               }
          });

     });

     $scope.searchShipAddresses = function(searchTerm) {
          $scope.shipaddresses = [' ']; //this sets shipaddresses to something while we wait for the search so we don't have to modify existing ng-show/hide(s) for address form / ship method
          if (searchTerm && searchTerm.length > 1) {
               LargeAddressList.queryShipping(searchTerm, function(list, count) {
                    $scope.shipaddresses = list;
                    $scope.shipAddressCount = count; // we will use count to add a filter for the user
                    if (count === 0) {
                         $scope.showTip = false;
                         $scope.showResult = true;
                    } else {
                         $scope.showTip = true;
                         $scope.showResult = false;
                    }
               });
          }
     };

     if ($scope.currentOrder.ShipAddressID) {
          Address.get($scope.currentOrder.ShipAddressID, function(add) {
               $scope.ShipAddress = add;
          });
     }
}

function largebilladdresssearch() {
     var directive = {
          restrict: 'E',
          controller: 'LargeBillAddressSearchCtrl',
          template: template
     };
     return directive;

    function template() {
  		  return [
  				 '<style>',
  				 '.largeaddress .dropdown-menu  { background-color:#fff;}',
  				 '.largeaddress .dropdown-menu .active > a {background-color:#000 !important; color:#fff;}',
  				 '.count {float;left; color:#000; position:relative;left: 10px; margin:0; padding:0;}',
  				 '</style>',
  				 '<div> ',
  				 '<select id="selectBill" class="form-control" name="billDepartments" ng-model="billDepartmentSelect" [(value)]="billDepartmentSelected"> ',
  				 '<option value="">Select Bill to Department</option> ',
  				 '<option value="DQ-">DRIVER QUALIFICATION</option> ',
  				 '<option value="TC-">TERMINAL CENTER</option> ',
  				 '<option value="TD-">DEDICATED</option> ',
  				 '<option value="CEM-">EMERGENCY MANAGEMENT</option> ',
  				 '<option value="CHR-">HR, COMPENSATION, BENEFITS & TRAINING</option> ',
  				 '<option value="CIE-">INTERSTATE LEASING EQUIPMENT</option> ',
  				 '<option value="CMK-">MARKETING</option> ',
  				 '<option value="COP-">OPERATIONS</option> ',
  				 '<option value="CP-">PERMIT</option> ',
  				 '<option value="CPA-">PAYROLL</option> ',
  				 '<option value="DQ-">ADADEMY</option> ',
  				 '<option value="TC-">TERMINAL CENTER</option> ',
  				 '<option value="TCL-">CLINIC & MEDICAL</option> ',
  				 '<option value="TD-">DEDICATED – DISTRIBUTION CENTER</option> ',
  				 '<option value="TLG-">LOGISTICS</option> ',
  				 '<option value="TOO-">OWNER OPERATOR</option> ',
  				 '<option value="TR-">RECRUITING</option> ',
  				 '<option value="TRF-" ->REEFER</option> ',
  				 '<option value="TRR-">ROAD TO RECOGNITION</option> ',
  				 '<option value="TRW-">REWARDS</option> ',
  				 '<option value="TS-">BODY SHOP & SHOP</option> ',
  				 '<option value="TSF-">SAFETY & CLAIMS</option> ',
  				 '<option value="TSH-">SHIP & MAIL</option> ',
  				 '<option value="TSL-">SALES</option> ',
  				 '</select> ',
  				 '</div> ',
  				 '<div> ',
  				 '<select id="selectBill" class="form-control" name="billStates" ng-model="billStateSelect" [(value)]="billStateSelected"> ',
  				 '<option value="">Select Bill To State</option> ',
  				 '<option value="AZ">ARIZONA</option> ',
  				 '<option value="CA">CALIFORNIA</option> ',
  				 '<option value="CO">COLORADO</option> ',
  				 '<option value="FL">FLORIDA</option> ',
  				 '<option value="GA">GEORGIA</option> ',
  				 '<option value="ID">IDAHO</option> ',
  				 '<option value="IL">ILLINOIS</option> ',
  				 '<option value="IN">INDIANA</option> ',
  				 '<option value="KS">KANSAS </option> ',
  				 '<option value="MI">MICHIGAN</option> ',
  				 '<option value=“MN“>MINNEAPOLIS</option> ',
  				 '<option value="NM">NEW MEXICO</option> ',
  				 '<option value="NY">NEW YORK</option> ',
  				 '<option value="OH">OHIO</option> ',
  				 '<option value="OR">OREGON</option> ',
  				 '<option value="OK">OKLAHOMA</option> ',
  				 '<option value="PA">PENNSYLVANIA</option> ',
  				 '<option value="SC">SOUTH CAROLINA</option> ',
  				 '<option value="TN">TENNESSEE</option> ',
  				 '<option value="TX">TEXAS</option> ',
  				 '<option value="UT">UTAH</option> ',
  				 '<option value="VA">VIRGINIA</option> ',
  				 '<option value="WA">WASHINGTON</option> ',
  				 '<option value="WI">WISCONSIN</option> ',
  				 '</select> ',
  				 '</div> ',
  				 '</p> ',
  				 '<div>',
  				 '<h3 input type="text">{{billDepartmentSelect}}{{billStateSelect}}</h3>',
  				 '</div>',
  				 '<div class="row largeaddress view-form-icon" ng-show="!copyShipAddress">',
  				 '<div class="col-xs-12">',
  				 '<label class="required">{{("Billing" | r) + " " + ("Address" | r) | xlat}}',
  				 '<span class="count" ng-show="showBillTip">( Key in the code above to find your address )</span>',
  				 '<span class="count" ng-show="showBillResult">No addresses found!</span>',
  				 ' </label>',
  				 '<div class="form-group">',
  				 '<input class="form-control" type="text" ng-model="BillAddress" ng-readonly="readonlybilling" required ng-change="searchBillAddresses(BillAddress)" typeahead-min-length="1" typeahead="address as (address.AddressName + \' \' + (address.FirstName || \'\') + \' \' + (address.LastName || \'\') + \' \' + (address.Street1 || \'\') + \' \' + (address.Street2 || \'\') + \' \' + (address.City || \'\') + \' \' + (address.State || \'\') + \' \' + (address.Zip || \'\')) for address in billaddresses | filter:$viewValue | limitTo:10" />',
  				 '<i class="fa fa-map-marker"></i>',
  				 '</div>',
  				 '</div>',
  				 '</div>'
  		  ].join('');
  	}
  }

LargeBillAddressSearchCtrl.$inject = ['$scope', 'AddressList', 'LargeAddressList', 'Address'];

function LargeBillAddressSearchCtrl($scope, AddressList, LargeAddressList, Address) {

     AddressList.billing(function(list) {
          $scope.billaddresses = list;
          $scope.readonlybilling = false;
          if ($scope.billaddresses.length == 1) {
               $scope.BillAddressID = list[0].ID;
               $scope.BillAddress = list[0];
               $scope.readonlybilling = true;
          } else {
               $scope.billaddresses = [' '];
          }
     });

     $scope.billaddressform = false;
     $scope.billAddressCount = null;
     $scope.showBillTip = true;
     $scope.showBillResult = false;

     $scope.$watch('BillAddress', function(newValue) {

          if (!newValue || !newValue.ID) {
               $scope.BillAddressID = null;
               $scope.currentOrder.BillAddressID = null;
               $scope.showBillTip = true;
               $scope.showBillResult = false;
          } else {
               if ($scope.currentOrder) {
                    $scope.currentOrder.BillAddress = newValue;
                    $scope.currentOrder.BillAddressID = newValue.ID;
                    $scope.BillAddressID = newValue.ID;
                    $scope.BillAddress = newValue;
               }

          }
          //account for New Address
          $scope.$on('event:AddressSaved', function(event, address) {
               if (address.IsBilling) {
                    $scope.BillAddress = address;
               }
          });
     });

     $scope.searchBillAddresses = function(searchTerm) {
          if (searchTerm && searchTerm.length > 1) {
               $scope.billaddresses = [' '];
               $scope.billAddressCount = null;
               LargeAddressList.queryBilling(searchTerm, function(list, count) {
                    $scope.billaddresses = list;
                    $scope.billAddressCount = count; // we will use count to add a filter for the user
                    if (count === 0) {
                         $scope.showBillTip = false;
                         $scope.showBillResult = true;
                    } else {
                         $scope.showBillTip = true;
                         $scope.showBillResult = false;
                    }
               });
          }
     };

     if ($scope.currentOrder.BillAddressID) {
          Address.get($scope.currentOrder.BillAddressID, function(add) {
               $scope.BillAddress = add;
          });
     }

}

LargeAddressList.$inject = ['$resource', '$451'];

function LargeAddressList($resource, $451) {
     var service = {
          queryShipping: _queryShipping,
          queryBilling: _queryBilling
     };
     return service;

     function _queryShipping(searchTerm, success) {
          $resource($451.api('address/shipping')).get({
               key: searchTerm,
               page: 1,
               pagesize: 100
          }).$promise.then(function(list) {
               success(list.List, list.Count);
          });
     }

     function _queryBilling(searchTerm, success) {
          $resource($451.api('address/billing')).get({
               key: searchTerm,
               page: 1,
               pagesize: 100
          }).$promise.then(function(list) {
               success(list.List, list.Count);
          });
     }
}
