app.controller("MainCtrl", function ($scope, $switch) {

    $switch.add("main", "bcastMain", 100, true);

    $scope.state = $switch.main.clss;

    $scope.$on("bcastMain", function () { $scope.state = $switch.main.clss; });

    $scope.start = function () {

        preScroll(function () {

            $switch.main.hide();
            $switch.acoustic.show();

        });

    };

    var scrollAcceleration = 0;
    var scrollToTop = function (onFinish) {

        var e = $css.slider.pages.page.scroll.selectAt($var.currentTabIndex).element;

        var top = e.scrollTop;

        scrollAcceleration += 1;

        if (0 < top) {

            top -= scrollAcceleration;

            e.scrollTop = top;

            $timeout(function () {
                scrollToTop(onFinish);
            }, 10);

        } else {

            e.scrollTop = 0;

            scrollAcceleration = 0;

            $timeout(function () {
                onFinish();
            }, 250);

        }

    };

    var preScroll = function (onFinish) {

        var e = $css.slider.pages.page.scroll.selectAt($var.currentTabIndex).element;

        if (e.scrollTop == 0) {
            onFinish();
        } else {
            scrollToTop(onFinish);
        }

    };

});