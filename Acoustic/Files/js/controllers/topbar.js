app.controller("TopbarCtrl", function ($scope, $switch) {

    $switch.add("topbar", "bcastTopbar", 100, true);

    $scope.state = $switch.topbar.clss;
    $scope.$on("bcastTopbar", function () { $scope.state = $switch.topbar.clss; });  

});