var settings;

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
};

$(function () {
    $('#funnel-viz').FunnelViz(settings)
        .on('breakdown', function (e, legend) {
            console.log(legend);
        })
        .on('highlight', function (e,  sectionName, eventName, part, isSection) {
            console.log(sectionName, eventName, part, isSection);
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

    $scope.options = {
        onBreakdown: function (legend) {
            console.log('onBreakdown' + legend);
        },
        onHighlight: function (e, sectionName, eventName, part, isSection) {
            console.log(sectionName, eventName, part, isSection);
        }
    };
    $scope.loadFunnel = function (index) {
        $scope.data = $scope.funnels[index].settings;
    }
});