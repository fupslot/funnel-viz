angular.module('CoolaData.UI',[])
.directive('funnelChartViz', function () {
    var defaults = {
        onBreakdown: angular.noop,
        onHighlight: angular.noop
    };

    return {
        restrict: 'AC',
        require: 'ngModel',
        link: function  (scope, el, attrs, ctrl) {
            var data
              , options
              , initialized;

            initialized = false;
            options = angular.extend({}, defaults, scope.$eval(attrs.funnelChartViz));

            function getParentSizeAttrValue () {
                var size;
                size = scope.$eval(attrs.parentSize) || {width:0, height:0};
                size.width  = parseInt(size.width)  || 0;
                size.height = parseInt(size.height) || 0;
                return size;
            }
            
            attrs.$observe('parentSize', function () {
                if (initialized && !$.isEmptyObject(attrs)) el.FunnelViz('resize', getParentSizeAttrValue());
            });

            ctrl.$render = function () {
                if (data) {
                    el.FunnelViz('destroy');
                    data = void 0;
                    initialized = false;
                }
                
                if (!$.isEmptyObject(ctrl.$viewValue)) {
                    data = ctrl.$viewValue;
                    el.FunnelViz(data);
                    el.FunnelViz('resize', getParentSizeAttrValue());
                    el.on('breakdown', options.onBreakdown);
                    el.on('highlight', options.onHighlight);
                    initialized = true;
                }
            }
        }
    };
});