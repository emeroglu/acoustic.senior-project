app.controller("AcousticCtrl", function ($scope, $timeout, $switch, $audio, $lexicon, $config) {

    $switch.add("acoustic", "bcastAcoustic", 95, false);
    $switch.add("waves", "bcastWaves", 100, true);
    $switch.add("detail", "bcastDetail", 100, true);
    $switch.add("glasses", "bcastGlasses", 95, false);
    $switch.add("info", "bcastInfo", 95, false);
    $switch.add("header", "bcastHeader", 95, false);
    $switch.add("text", "bcastText", 95, false);

    $scope.state = $switch.acoustic.clss;
    $scope.stateWaves = $switch.waves.clss;
    $scope.stateDetail = $switch.detail.clss;
    $scope.stateGlasses = $switch.glasses.clss;
    $scope.stateInfo = $switch.info.clss;
    $scope.stateHeader = $switch.header.clss;
    $scope.stateText = $switch.text.clss;
    $scope.$on("bcastAcoustic", function () { $scope.state = $switch.acoustic.clss; });
    $scope.$on("bcastWaves", function () { $scope.stateWaves = $switch.waves.clss; });
    $scope.$on("bcastDetail", function () { $scope.stateDetail = $switch.detail.clss; });
    $scope.$on("bcastGlasses", function () { $scope.stateGlasses = $switch.glasses.clss; });
    $scope.$on("bcastInfo", function () { $scope.stateInfo = $switch.info.clss; });
    $scope.$on("bcastHeader", function () { $scope.stateHeader = $switch.header.clss; });
    $scope.$on("bcastText", function () { $scope.stateText = $switch.text.clss; });
    
    $switch.waves.direct(true, 100, "center");
    $switch.detail.direct(false, 95, "right");
    $switch.header.direct(true, 100, "center");

    $scope.$on("bcastReset", function () {

        deselectNoiseBackgrounds();
        deselectGlassBackgrounds();

        if (detailed) {

            $scope.back();

            $timeout(function () {

                stopTheFlow(function () {

                    $switch.info.hide();

                    hide([outer, inner, next, glass], function () {

                        initialized = false;

                        $audio.stop();

                        $scope.noise = {};
                        $scope.glass = {};

                    });

                });

            });

        } else {

            stopTheFlow(function () {

                $switch.info.hide();

                hide([outer, inner, next, glass], function () {

                    initialized = false;

                    $audio.stop();

                    $scope.noise = {};
                    $scope.glass = {};

                });

            });

        }

    });

    $scope.noise = {};
    $scope.glass = {};

    $scope.toMain = function () {

        preScroll(function () {

            $switch.main.show();
            $switch.acoustic.hide();

            $scope.$broadcast("bcastReset");

        });

    };

    $scope.navBack = function () {

        deselectNoiseBackgrounds();
        deselectGlassBackgrounds();

        if (detailed) {

            $scope.back();

            $timeout(function () {

                stopTheFlow(function () {

                    hide([outer, inner, next, glass, reduction], function () {

                        initialized = false;

                        $nav.toAbout();

                        $audio.stop();

                    });

                });

            }, 800);

        } else {

            stopTheFlow(function () {

                hide([outer, inner, next, glass, reduction], function () {

                    initialized = false;

                    $nav.toAbout();

                    $audio.stop();

                });

            });

        }

    };

    $scope.next = function () {

        preScroll(function () {

            $switch.detail.direct(true, 100, "right");
            $timeout(function () {
                $switch.detail.animate("center", "ease", 750);
            }, 50);

            $switch.waves.animate("left", "ease", 750);
            $timeout(function () {
                $switch.waves.direct(false, 95, "hide");
                recurse();
            }, 800);

            detailed = true;

        });

    };

    var recurse = function () {

        var img = $css.acoustic.action.detail.panel.info.glass.img.select().element;

        var h = img.height;

        if (h == 0) {
            $timeout(recurse, 250);
        } else {

            $css.acoustic.action.detail.panel.info.glass.img
                .select()
                .heightCentered(h)
                .commit();

        }

    };

    $scope.back = function () {

        preScroll(function () {

            $switch.waves.direct(true, 100, "left");
            $timeout(function () {
                $switch.waves.animate("center", "ease", 750);
            }, 50);

            $switch.detail.animate("right", "ease", 750);
            $timeout(function () {
                $switch.detail.direct(false, 95, "hide");
            }, 800);

            detailed = false;

        });

    };

    $scope.selectNoise = function (noise) {

        if ($scope.noise.index == noise.index)
            return;

        $scope.noise = noise;

        $audio.initialize();

        $audio.list[$scope.noise.index].play();        

        if (noise.index % 7 == 0)
            color = "#FF9D00;";
        else if (noise.index % 7 == 1)
            color = "#0BFF01;";
        else if (noise.index % 7 == 2)
            color = "#FE00F6;";
        else if (noise.index % 7 == 3)
            color = "#FDFE02;";
        else if (noise.index % 7 == 4)
            color = "#00FFD2;";
        else if (noise.index % 7 == 5)
            color = "#FF5555;";
        else if (noise.index % 7 == 6)
            color = "#008FD7;";

        if (detailed) {

            $scope.back();

            $timeout(function () {

                animateOuters();

            }, 800);

        } else {

            animateOuters();

        }

        selectNoiseBackground();

        $switch.glasses.show();

    };

    $scope.selectGlass = function (glass) {

        if (glass.index == $scope.glass.index) {

            if (detailed) {

                $scope.back();

                $timeout(function () {

                    $scope.glass = {};

                    animateOuters();

                    deselectGlassBackgrounds();

                }, 800);

            } else {

                $scope.glass = {};

                animateOuters();

                deselectGlassBackgrounds();

            }

            $audio.current.volume(1);

            return;

        }

        onSetupInners = function () {

            innerActiveIndex = 0;
            innerMaxIndex = parseInt(23 * ($scope.glass.reductionPercentage / 100));
            innerMinIndex = 0;

            reduced = true;

        };

        onPercentage = function () {

            if ($scope.glass.index == 0) {
                
                $scope.header = $lexicon.reference;

                if ($config.language == "tr")
                    $css.acoustic.action.waves.center.info.header.select().textSize(16).commit();
                else if ($config.language == "en")
                    $css.acoustic.action.waves.center.info.header.select().textSize(12).commit();

                $switch.header.direct(true, 100, "center");
                $switch.text.direct(true, 100, "hide");

            } else {

                $scope.header = $scope.glass.reductionPercentage + "%";
                $css.acoustic.action.waves.center.info.header.select().textSize(30).commit();

                $switch.header.direct(true, 100, "top");
                $switch.text.direct(true, 100, "show");

            }            

            $audio.current.volume((100 - $scope.glass.reductionPercentage - 20) / 100);

        };

        if (detailed) {

            $scope.back();

            $timeout(function () {

                $scope.glass = glass;

                animateInners();

                selectGlassBackground();

            }, 800);

        } else {

            $scope.glass = glass;

            animateInners();

            selectGlassBackground();

        }

    };

    var randInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    var outerWaves = [];
    var innerWaves = [];
    var noiseBackgrounds = [];
    var glassBackgrounds = [];

    var outer, inner, reduction, glass, next;

    var outerActiveIndex, outerMinIndex, outerMaxIndex;
    var innerActiveIndex, innerMinIndex, innerMaxIndex;
    var delay;
    var upTo, downTo;

    var color = "";

    var onPercentage, onSwitch, onSetupOuters, onSetupInners;

    var reduced = false;
    var detailed = false;

    var swithcing = false;
    var initialized = false;
    var run = false;    

    var deactivateOutersDownTo = function (index) {

        outerWaves[outerActiveIndex].deactivate();

        outerActiveIndex--;

        if (outerActiveIndex < outerMinIndex)
            outerActiveIndex = outerMinIndex;

        delay = randInt(5, 20);

        $timeout(function () {

            if (run) {

                if (outerActiveIndex <= index)
                    activateOutersUpTo(randInt(outerMinIndex, outerMaxIndex));
                else
                    deactivateOutersDownTo(index);

            }

        }, delay);

    };

    var activateOutersUpTo = function (index) {

        outerWaves[outerActiveIndex].activate();

        outerActiveIndex++;

        if (outerMaxIndex < outerActiveIndex)
            outerActiveIndex = outerMaxIndex;

        delay = randInt(5, 20);

        $timeout(function () {

            if (run) {

                if (index <= outerActiveIndex)
                    deactivateOutersDownTo(randInt(outerMinIndex, outerMaxIndex));
                else
                    activateOutersUpTo(index);

            }

        }, delay);

    };

    var deactivateInnersDownTo = function (index) {

        innerWaves[innerActiveIndex].deactivate();        

        innerActiveIndex--;

        if (innerActiveIndex < innerMinIndex)
            innerActiveIndex = innerMinIndex;

        delay = randInt(20, 30);

        $timeout(function () {

            if (run) {

                if (innerActiveIndex <= index)
                    activateInnersUpTo(randInt(innerMinIndex, innerMaxIndex));
                else
                    deactivateInnersDownTo(index);

            }

        }, delay);

    };

    var activateInnersUpTo = function (index) {                

        if (swithcing) {

            onSwitch();

        } else {

            innerWaves[innerActiveIndex].activate();

            innerActiveIndex++;

            if (innerMaxIndex < innerActiveIndex)
                innerActiveIndex = innerMaxIndex;

            delay = randInt(20, 30);

            $timeout(function () {

                if (run) {

                    if (index <= innerActiveIndex)
                        deactivateInnersDownTo(randInt(innerMinIndex, innerMaxIndex));
                    else
                        activateInnersUpTo(index);

                }

            }, delay);

        }

    };

    var show = function (elements, onShown) {

        for (var i = 0; i < elements.length; i++) {
            elements[i].setAttribute("style", "opacity:1");
        }

        $timeout(onShown, 800);

    };

    var hide = function (elements, onHidden) {

        for (var i = 0; i < elements.length; i++) {
            elements[i].setAttribute("style", "opacity:0");
        }

        $timeout(onHidden, 800);

    };

    var stopTheFlow = function (onStop) {

        //run = false;

        $timeout(onStop, 100);

    };

    onSetupOuters = function () {

        outerActiveIndex = 23;
        outerMaxIndex = 23;
        outerMinIndex = 6;

        reduced = false;

    };

    var activateOuters = function () {

        for (var i = 0; i < outerWaves.length; i++) {
            outerWaves[i].activate();
        }

    };

    var activateInners = function () {

        for (var i = 0; i < innerWaves.length; i++) {
            innerWaves[i].activate();
        }

    };

    var activateAll = function () {

        activateOuters();
        activateInners();

    };

    var deactivateInners = function () {

        for (var i = 0; i < innerWaves.length; i++) {
            innerWaves[i].deactivate();
        }

    };

    var deselectNoiseBackgrounds = function () {

        for (var i = 0; i < noiseBackgrounds.length; i++) {
            noiseBackgrounds[i].setAttribute("style", "background-color:#000000;opacity:0.3");
        }

    };

    var selectNoiseBackground = function () {

        deselectGlassBackgrounds();
        deselectNoiseBackgrounds();

        noiseBackgrounds[$scope.noise.index].setAttribute("style", "background-color:#157dda");

    };

    var deselectGlassBackgrounds = function () {

        for (var i = 0; i < glassBackgrounds.length; i++) {
            glassBackgrounds[i].setAttribute("style", "background-color:#000000;opacity:0.3");
        }

    };

    var selectGlassBackground = function () {

        deselectGlassBackgrounds();

        glassBackgrounds[$scope.glass.index].setAttribute("style", "background-color:#157dda");

    };

    var onSwitch = function () {

        $switch.info.hide();        

        $timeout(function () {

            outer.setAttribute("style", "opacity:0.4");

            hide([inner], function () {

                swithcing = false;

                deactivateInners();

                onPercentage();

                onSetupInners();

                $switch.info.show();

                show([inner, next], function () {

                    run = true;                    

                    activateInnersUpTo(innerMaxIndex);

                });

            });

        }, 250);

    };

    var animateOuters = function () {

        if (initialized) {

            if (reduced) {

                stopTheFlow(function () {

                    $switch.info.hide();

                    hide([outer, inner, next], function () {

                        activateOuters();

                        onSetupOuters();

                        $scope.header = $scope.noise.decibel + " dB";
                        $css.acoustic.action.waves.center.info.header.select().textSize(30).commit();

                        $switch.header.direct(true, 100, "center");
                        $switch.text.direct(false, 95, "hide");

                        $switch.info.show();

                        show([outer], function () {

                            run = true;

                            deactivateOutersDownTo(outerMinIndex);

                        });

                    });

                });

            } else {

                stopTheFlow(function () {

                    $switch.info.hide();

                    hide([outer], function () {

                        activateOuters();

                        $scope.header = $scope.noise.decibel + " dB";

                        $switch.header.direct(true, 100, "center");
                        $switch.text.direct(false, 95, "hide");

                        $switch.info.show();

                        show([outer], function () {

                            run = true;

                            onSetupOuters();

                            deactivateOutersDownTo(outerMinIndex);

                        });

                    });

                });

            }

        } else {

            initialized = true;

            run = true;

            outer = document.querySelector("acoustic view waves center outer");
            inner = document.querySelector("acoustic view waves center inner");
            glass = document.querySelector("acoustic view glasses");
            next = document.querySelector("acoustic view waves next");
            noiseBackgrounds = document.querySelectorAll("acoustic view noises items item background");
            glassBackgrounds = document.querySelectorAll("acoustic view glasses items item background");

            var outerWaveElements = document.querySelectorAll("acoustic view waves center outer svg path");
            var innerWaveElements = document.querySelectorAll("acoustic view waves center inner svg path");

            for (var i = 0; i < outerWaveElements.length; i++) {

                outerWaves.push({
                    element: outerWaveElements[i],
                    activate: function () {
                        this.element.setAttribute("style", "stroke:" + color);
                    },
                    deactivate: function () {
                        this.element.setAttribute("style", "stroke:none");
                    }
                });

            }

            for (var i = 0; i < innerWaveElements.length; i++) {

                innerWaves.push({
                    element: innerWaveElements[i],
                    activate: function (color) {
                        this.element.setAttribute("style", "stroke:#FFFFFF");
                    },
                    deactivate: function () {
                        this.element.setAttribute("style", "stroke:none");
                    }
                });

            }

            activateAll();

            onSetupOuters();

            $scope.header = $scope.noise.decibel + " dB";

            $switch.header.direct(true, 100, "center");
            $switch.text.direct(false, 95, "hide");

            $switch.info.show();

            show([outer, glass], function () {

                deactivateOutersDownTo(outerMinIndex);

            });

        }

    };

    var animateInners = function () {

        stopTheFlow(function () {

            if (reduced) {

                $switch.info.hide();

                hide([inner, next], function () {

                    deactivateInners();

                    onSetupInners();

                    onPercentage();

                    $switch.info.show();

                    show([inner, next], function () {

                        run = true;

                        activateInnersUpTo(innerMaxIndex);

                    });

                });

            } else {

                swithcing = true;

                run = true;

                activateInnersUpTo(innerMaxIndex);

            }

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