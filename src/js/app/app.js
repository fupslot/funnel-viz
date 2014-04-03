var real
  , settings;

real = {"compare":true,"breakdown":[],"events":["Play song","Next song","Previous song","Create playlist"],"labels":[],"sections":[{"name":"IT","actual":[6,6,3,3],"compare":[0,0,0,0]},{"name":"SE","actual":[5,5,4,2],"compare":[0,0,0,0]},{"name":"ES","actual":[18,17,11,1],"compare":[0,0,0,0]},{"name":"AU","actual":[3,2,2,1],"compare":[0,0,0,0]},{"name":"BR","actual":[4,4,1,1],"compare":[0,0,0,0]},{"name":"AR","actual":[1,1,1,1],"compare":[0,0,0,0]},{"name":"NO","actual":[10,7,4,2],"compare":[0,0,0,0]},{"name":"MX","actual":[14,14,12,6],"compare":[0,0,0,0]},{"name":"GB","actual":[24,24,21,7],"compare":[0,0,0,0]},{"name":"FI","actual":[10,10,7,3],"compare":[0,0,0,0]},{"name":"DE","actual":[19,18,12,3],"compare":[0,0,0,0]},{"name":"US","actual":[62,59,47,15],"compare":[0,0,0,0]},{"name":"IE","actual":[6,6,6,2],"compare":[0,0,0,0]},{"name":"CA","actual":[27,26,21,7],"compare":[0,0,0,0]},{"name":"PL","actual":[5,5,4,1],"compare":[0,0,0,0]},{"name":"FR","actual":[15,14,7,2],"compare":[0,0,0,0]},{"name":"DK","actual":[6,6,5,3],"compare":[0,0,0,0]},{"name":"NL","actual":[10,9,8,2],"compare":[0,0,0,0]},{"name":"KR","actual":[2,2,2,0],"compare":[0,0,0,0]},{"name":"JP","actual":[2,2,2,0],"compare":[0,0,0,0]},{"name":"IL","actual":[1,1,1,0],"compare":[0,0,0,0]},{"name":"RU","actual":[4,4,3,0],"compare":[0,0,0,0]},{"name":"AT","actual":[3,3,1,0],"compare":[0,0,0,0]},{"name":"NZ","actual":[4,4,4,0],"compare":[0,0,0,0]},{"name":"GR","actual":[4,4,2,0],"compare":[0,0,0,0]}]};

settings = {
    compare: false,
    breakdown: [],
    // breakdown: false,
    
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
};

$(function () {
    $('#funnel-viz').FunnelViz(real);
    $('#funnel-viz').on('breakdown', function (e, legend) {
        console.log(legend);
    });

    $('#destroy').on('click', function () {
        $('#funnel-viz').FunnelViz('destroy');
    });

    $('#init').on('click', function () {
        $('#funnel-viz').FunnelViz(real);
    });
});

angular.module('CoolaData.UI.Test', ['CoolaData.UI'])
.controller('TestCtrl', function ($scope) {
    $scope.funnels = [
        {
            name: 'Funnel #1',
            settings: {
                compare: false,
                // breakdown: [0,1],
                // breakdown: false,
                
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
        }
    };
    $scope.loadFunnel = function (index) {
        $scope.data = $scope.funnels[index].settings;
        console.log($scope.funnels[index].name);
    }
});