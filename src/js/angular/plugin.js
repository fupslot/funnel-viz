
angular.module('CoolaData.UI',[])
.controller('mainCtrl', function ($scope) {
    $scope.message = 'hello';
})
.directive('funnelViz', function () {
    var defaults = {
        onBreakdown: angular.noop
    };
    return {
        restrict: 'AC',
        require: 'ngModel',
        link: function  (scope, el, attrs, ctrl) {
            var data
              , options;

            options = angular.extend({}, defaults, scope.$eval(attrs.funnelViz));
            
            ctrl.$render = function () {
                if (data) {
                    el.FunnelViz('destroy');
                    data = void 0;
                }
                
                if (!$.isEmptyObject(ctrl.$viewValue)) {
                    data = ctrl.$viewValue;
                    el.FunnelViz(data);
                    el.on('breakdown', options.onBreakdown);
                    console.log('Created');
                }
            }
        }
    };
});