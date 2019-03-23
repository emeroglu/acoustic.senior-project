app.controller("SliderCtrl", function ($scope, $switch, $var, $css) {    

    $switch.add("slider", "bcastSlider", 100, true);

    $scope.state = $switch.slider.clss;
    $scope.$on("bcastSlider", function () { $scope.state = $switch.slider.clss; });    
    
    $scope.to = function (index) {               

        $scope.$broadcast("bcastReset");

        preScroll(function () {

            $var.currentTabIndex = index;  

            $css.slider.navigation.items.item
                .select()
                    .textColorWhite()
                    .commitAll()
                    .selectAt(index)
                    .textColor("#157DDA")
                .commit();

            $css.slider.pages
                .select()
                    .left((960 * -index))
                .commit(); 

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

    $scope.redirect = function (url) {

        window.open(url,"_blank");

    };

});