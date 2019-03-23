app.factory("$config", function ($rootScope) {

    var $factory = {};

    $factory.language = "tr";

    $rootScope.$config = $factory;

    return $factory;

});