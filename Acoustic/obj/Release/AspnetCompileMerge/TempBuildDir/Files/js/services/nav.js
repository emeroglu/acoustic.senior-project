app.factory("$nav", function ($window, $switch, $timeout, $rootScope) {

    var $factory = {};

    $factory.page = "about";

    var scrollAcceleration = 0;

    $factory.scrollToTop = function (onFinish) {

        var e = $css.slider.scroll.element;

        var top = e.scrollTop;

        scrollAcceleration += 1;

        if (0 < top) {

            top -= scrollAcceleration;

            e.scrollTop = top;

            $timeout(function () {
                $factory.scrollToTop(onFinish);
            }, 10);

        } else {

            e.scrollTop = 0;

            scrollAcceleration = 0;

            $timeout(function () {
                onFinish();
            }, 250);

        }

    };

    $factory.preScroll = function (onFinish) {

        if ($css.slider.scroll.element.scrollTop == 0) {
            onFinish();
        } else {
            $factory.scrollToTop(onFinish);
        }

    };

    $factory.exitingPage = function (incoming) {

        if ($factory.page == "about") {

            $switch.about.animate("left", "ease", 750);
            $timeout(function () {
                $switch.about.direct(false, 95, "hide");
            }, 800);

        } else if ($factory.page == "explore") {

            if (incoming == "about") {

                $switch.explore.animate("right", "ease", 750);
                $timeout(function () {
                    $switch.explore.direct(false, 95, "hide");
                }, 800);

            } else {

                $switch.explore.animate("left", "ease", 750);
                $timeout(function () {
                    $switch.explore.direct(false, 95, "hide");
                }, 800);

            }

        } else if ($factory.page == "contact") {

            if (incoming == "terms") {

                $switch.contact.animate("left", "ease", 750);
                $timeout(function () {
                    $switch.contact.direct(false, 95, "hide");
                }, 800);

            } else {

                $switch.contact.animate("right", "ease", 750);
                $timeout(function () {
                    $switch.contact.direct(false, 95, "hide");
                }, 800);

            }

        } else if ($factory.page == "terms") {

            $switch.terms.animate("right", "ease", 750);
            $timeout(function () {
                $switch.terms.direct(false, 95, "hide");
            }, 800);

        } else if ($factory.page == "acoustic") {            

            $switch.acoustic.animate("right", "ease", 750);
            $timeout(function () {
                $rootScope.$broadcast("bcastReset");
                $switch.acoustic.direct(false, 95, "hide");
            }, 800);        

        }

    };

    $factory.toAbout = function () {

        $css.topbar.navigation.items.item
            .clearInline();

        $css.topbar.navigation.items.item
            .beginPseduo().child(1)
            .textColor("#157DDA")
            .commit();

        $factory.preScroll(function () {

            $factory.exitingPage("about");

            $switch.about.direct(true, 100, "left");
            $timeout(function () {
                $switch.about.animate("center", "ease", 750);
            }, 50);

            $factory.page = "about";

        });

    };

    $factory.toExplore = function () {

        $css.topbar.navigation.items.item
            .clearInline();

        $css.topbar.navigation.items.item
            .beginPseduo().child(2)
            .textColor("#157DDA")
            .commit();

        $factory.preScroll(function () {

            $factory.exitingPage("explore");

            if ($factory.page == "about") {

                $switch.explore.direct(true, 100, "right");
                $timeout(function () {
                    $switch.explore.animate("center", "ease", 750);
                }, 50);

            } else {

                $switch.explore.direct(true, 100, "left");
                $timeout(function () {
                    $switch.explore.animate("center", "ease", 750);
                }, 50);

            }

            $factory.page = "explore";

        });

    };

    $factory.toContact = function () {

        $css.topbar.navigation.items.item
            .clearInline();

        $css.topbar.navigation.items.item
            .beginPseduo().child(3)
            .textColor("#157DDA")
            .commit();

        $factory.preScroll(function () {

            $factory.exitingPage("contact");

            if ($factory.page == "terms" || $factory.page == "acoustic") {

                $switch.contact.direct(true, 100, "left");
                $timeout(function () {
                    $switch.contact.animate("center", "ease", 750);
                }, 50);

            } else {

                $switch.contact.direct(true, 100, "right");
                $timeout(function () {
                    $switch.contact.animate("center", "ease", 750);
                }, 50);

            }

            $factory.page = "contact";

        });

    };

    $factory.toTerms = function () {

        $css.topbar.navigation.items.item
            .clearInline();

        $css.topbar.navigation.items.item
            .beginPseduo().child(4)
            .textColor("#157DDA")
            .commit();

        $factory.preScroll(function () {

            $factory.exitingPage("terms");

            if ($factory.page == "acoustic") {

                $switch.terms.direct(true, 100, "left");
                $timeout(function () {
                    $switch.terms.animate("center", "ease", 750);
                }, 50);

            } else {

                $switch.terms.direct(true, 100, "right");
                $timeout(function () {
                    $switch.terms.animate("center", "ease", 750);
                }, 50);

            }

            $factory.page = "terms";

        });

    };

    $factory.toAcoustic = function () {

        $factory.preScroll(function () {

            $factory.exitingPage("acoustic");

            $switch.acoustic.direct(true, 100, "right");
            $timeout(function () {
                $switch.acoustic.animate("center", "ease", 750);
            }, 50);

            $factory.page = "acoustic";

        });

    };

    return $factory;

});