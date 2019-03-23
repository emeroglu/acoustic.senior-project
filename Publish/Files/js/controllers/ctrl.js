app.controller("Ctrl", function ($scope, $timeout, $window, $nav, $api, $config, $css, $audio, $switch, $data, $var, $lexicon, $img, $style, $platform) {

    $window.$window = $window;

    $window.$api = $api;
    $window.$config = $config;
    $window.$css = $css;
    $window.$switch = $switch;
    $window.$data = $data;
    $window.$var = $var;
    $window.$lexicon = $lexicon;
    $window.$img = $img;
    $window.$style = $style;
    $window.$timeout = $timeout;
    $window.$nav = $nav;
    $window.$audio = $audio;
    $window.$platform = $platform;

    $scope.$nav = $nav;

    $switch.add("lexicon", "bcastLexicon", 100, true);

    $scope.stateLexicon = $switch.lexicon.clss;
    $scope.$on("bcastLexicon", function () { $scope.stateLexicon = $switch.lexicon.clss; });

    $window.onresize = function () {

        for (var key in $style.onResponsiveStyling.events)
            $style.onResponsiveStyling.events[key]();

    };

    $api.fetchLexicon(function () {

        $api.fetchAbout(function () {

            $api.fetchNoises(function () {

                $api.fetchGlasses(function () {

                    $lexicon.initialize();

                    $scope.$lexicon = $lexicon;                    

                    $timeout(function () {

                        for (var key in $style.onContentReadyStyling.events)
                            $style.onContentReadyStyling.events[key]();

                    });

                });

            });

        });

    });

});