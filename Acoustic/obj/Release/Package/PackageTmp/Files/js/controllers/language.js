app.controller("LanguageCtrl", function ($scope, $switch) {

    $switch.add("language", "bcastLanguage", 105, true);

    $scope.state = $switch.language.clss;
    $scope.$on("bcastLanguage", function () { $scope.state = $switch.language.clss; });  

    $scope.changeLanguage = function (language) {

        $lexicon.changeLanguage(language);

    }; 

});