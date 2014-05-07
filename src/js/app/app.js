var settings
  , q;

q = {"compare":true,"onlyOneEventCanBeSelected":true,"onlyChartCanBeSelected":true,"breakdown":[],"events":["Play song","Play song","Next song","Play song"],"labels":[],"sections":[{"name":"NZ","actual":[10,10,10,9],"compare":[8,7,7,7]},{"name":"RU","actual":[4,4,4,3],"compare":[4,4,4,4]},{"name":"FI","actual":[12,10,10,10],"compare":[4,4,3,3]},{"name":"KR","actual":[6,5,4,4],"compare":[2,2,2,2]},{"name":"JP","actual":[2,2,2,2],"compare":[1,1,1,1]},{"name":"MX","actual":[14,14,14,14],"compare":[13,13,12,11]},{"name":"GR","actual":[8,8,8,8],"compare":[4,3,3,3]},{"name":"AT","actual":[6,6,6,6],"compare":[4,4,4,4]},{"name":"SE","actual":[6,6,6,6],"compare":[6,6,6,5]},{"name":"AU","actual":[4,4,4,4],"compare":[4,4,4,3]},{"name":"NO","actual":[7,7,7,7],"compare":[3,3,3,3]},{"name":"GB","actual":[36,35,35,33],"compare":[21,21,19,18]},{"name":"ES","actual":[20,20,20,18],"compare":[16,15,14,14]},{"name":"DE","actual":[29,28,28,25],"compare":[13,13,10,10]},{"name":"IE","actual":[10,10,10,10],"compare":[6,6,5,5]},{"name":"IL","actual":[3,3,3,3],"compare":[0,0,0,0]},{"name":"BE","actual":[5,5,5,5],"compare":[1,1,1,1]},{"name":"NL","actual":[6,6,5,5],"compare":[7,7,7,7]},{"name":"BR","actual":[4,4,4,4],"compare":[2,2,2,2]},{"name":"US","actual":[80,79,77,76],"compare":[49,49,48,47]},{"name":"PL","actual":[3,3,3,3],"compare":[3,3,3,3]},{"name":"IT","actual":[14,14,14,14],"compare":[6,5,5,5]},{"name":"FR","actual":[34,33,31,31],"compare":[27,25,23,22]},{"name":"DK","actual":[14,14,14,14],"compare":[11,11,11,11]},{"name":"CA","actual":[36,36,36,36],"compare":[23,23,22,21]},{"name":"AR","actual":[0,0,0,0],"compare":[2,2,2,1]}]};

settings = {
    compare: true,
    breakdown: [],
    
    events: ['Sign up', 'Add item', 'View cart', 'Purchase', 'Enjoyed'],
    labels: ['did not bounce', 'looked at a product', 'put an item in a cart', 'completed a sale'],
    
    onlyOneEventCanBeSelected: true,
    onlyChartCanBeSelected: true,

    sections: [
        {
            name:    'Landing page #1',
            actual:  [1598, 1167, 1110, 189, 112],
            compare: [1187, 1143, 1100, 134, 117]
        },
        {
            name:    'Landing page #2',
            actual:  [1452, 1201, 1134, 132, 110],
            compare: [1241, 1208, 1173, 190, 126]
        },
        {
            name:    'Landing page #3',
            actual:  [1143, 1132, 198, 165, 18],
            compare: [1176, 1154, 1120, 178, 12]
        }
    ]
};

$(function () {
    $('#funnel-viz').FunnelViz(settings)
        .on('breakdown', function (e, legend) {
            console.log(legend);
        })
        .on('highlight', function (e,  sectionName, eventName, part, isSection, isHighlighted) {
            console.log(sectionName, eventName, part, isSection, isHighlighted);
        });

    $('#destroy').on('click', function () {
        $('#funnel-viz').FunnelViz('destroy');
    });

    $('#init').on('click', function () {
        $('#funnel-viz').FunnelViz(settings);
    });
});

angular.module('CoolaData.UI.Test', ['CoolaData.UI'])
.controller('TestCtrl', function ($scope) {
    $scope.$on('funnelChartViz_onBreakdown', function (e, legend) {
        console.log(legend);
    });
    
    $scope.funnels = [
        {
            name: 'Funnel #1',
            settings: {
                compare: false,

                onlyOneEventCanBeSelected: true,
                onlyChartCanBeSelected: true,
                
                events: ['Sign up', 'Add item', 'View cart'],
                labels: ['did not bounce', 'looked at a product', 'put an item in a cart'],
                
                sections: [
                    {
                        name:    'Male',
                        actual:  [198, 167, 110, 89, 12],
                        compare: [187, 143, 100, 34, 17]
                    },
                    {
                        name:    'Female',
                        actual:  [243, 201, 134, 32, 10],
                        compare: [241, 208, 173, 90, 26]
                    }
                ]
            }
        },
        {
            name: 'Funnel #2',
            settings: {
                compare: false,
                breakdown: [0,1,2],
                // breakdown: false,

                onlyOneEventCanBeSelected: true,
                onlyChartCanBeSelected: true,
                
                events: ['Sign up', 'Add item', 'View cart', 'Purchase', 'Enjoyed'],
                labels: ['did not bounce', 'looked at a product', 'put an item in a cart', 'completed a sale'],
                
                sections: [
                    {
                        name:    'Landing page #1',
                        actual:  [198, 167, 110, 89, 12],
                        compare: [187, 143, 100, 34, 17]
                    },
                    {
                        name:    'Landing page #2',
                        actual:  [243, 201, 134, 32, 10],
                        compare: [241, 208, 173, 90, 26]
                    },
                    {
                        name:    'Landing page #3',
                        actual:  [143, 132, 98, 65, 8],
                        compare: [176, 154, 120, 78, 2]
                    }
                ]
            }
        },
        {
            name: 'Empty',
            settings: {}
        }
    ];

    $scope.size = {width: 400, height: 222};
    $scope.$on('funnelChartViz_onHighlight', function(e,sectionName, eventName, part, isSection, isHighlighted){
        console.log(sectionName, eventName, part, isSection, isHighlighted);
    });

    $scope.options = {
        onBreakdown: function (legend) {
            console.log('onBreakdown' + legend);
        },
        onHighlight: function (e, sectionName, eventName, part, isSection, isHighlighted) {
            console.log(sectionName, eventName, part, isSection, isHighlighted);
        }
    };
    $scope.loadFunnel = function (index) {
        $scope.data = $scope.funnels[index].settings;
    }
});