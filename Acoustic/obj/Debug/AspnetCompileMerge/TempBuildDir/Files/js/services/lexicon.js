app.factory("$lexicon", function ($rootScope, $config, $data, $switch, $timeout, $style) {

    var $factory = {
        about: [],
        noises: {},
        glasses: {},
        logo: "/Files/img/logo.png"
    };

    var urlVlsync = "http://v-sync.s3-website-eu-west-1.amazonaws.com/3080ffeb-52c3-4c8b-8917-8a4a1e3b17d4/contents";

    $factory.initialize = function () {

        for (var key in $data.lexicon) {
            $factory[key] = $data.lexicon[key][$config.language];
        }

        handleAbout();
        handleNoises();
        handleGlasses();

        if ($config.language == "tr") {
            $factory.logo = "/Files/img/logo.png";
        } else if ($config.language == "en") {
            $factory.logo = "/Files/img/logo_en.png";
        }

        document.title = $lexicon.title;

    };

    $factory.changeLanguage = function (l) {

        if ($config.language == l) {
            return;
        }

        $switch.lexicon.hide("ease", 500);

        $timeout(function () {

            $rootScope.$broadcast("bcastReset");

            $css.slider.navigation.items.revert();

            if ($config.language == "tr") {

                $css.language.tur
                    .select()
                    .textColorWhite()
                    .commit();

                $css.language.eng
                    .select()
                    .textColor("#157DDA")
                    .commit();

            } else if ($config.language == "en") {

                $css.language.tur
                    .select()
                    .textColor("#157DDA")
                    .commit();

                $css.language.eng
                    .select()
                    .textColorWhite()
                    .commit();

            }

            if ($config.language != l) {
                $config.language = l;
                $factory.initialize();
            }

            $timeout(function () {

                for (var key in $style.onContentReadyStyling.events)
                    $style.onContentReadyStyling.events[key]();

                $switch.lexicon.show("ease", 500);

            }, 350);

        }, 550);

    };

    var handleAbout = function () {

        var converter = new showdown.Converter();
        converter.setOption("simplifiedAutoLink", true);

        var index = 0;

        if ($config.language == "tr") {

            $factory.about = [];
            $factory.about.push({
                index: 0,
                title: "Ana Sayfa",
                content: []
            });

            var content, lexicon;

            for (var i = 0; i < $data.about.length; i++) {

                index++;

                lexicon = {
                    index: index,
                    title: $data.about[i].header.tr,
                    content: []
                };

                for (var j = 0; j < $data.about[i].content.length; j++) {

                    content = $data.about[i].content[j];

                    if (content.type == "markdown") {

                        lexicon.content.push({
                            type: "markdown",
                            title: $data.about[i].content[j].title.tr,
                            text: converter.makeHtml(content.text.tr)
                        });

                    } else if (content.type == "url") {

                        lexicon.content.push({ type: "link", title: $data.about[i].content[j].title.tr, text: content.source.tr });

                    }

                }

                $factory.about.push(lexicon);

            }

        } else if ($config.language == "en") {

            $factory.about = [];
            $factory.about.push({
                index: 0,
                title: "Main Page",
                content: []
            });

            var content, lexicon;

            for (var i = 0; i < $data.about.length; i++) {

                index++;

                lexicon = {
                    index: index,
                    title: $data.about[i].header.en,
                    content: []
                };

                for (var j = 0; j < $data.about[i].content.length; j++) {

                    content = $data.about[i].content[j];

                    if (content.type == "markdown") {

                        lexicon.content.push({
                            type: "markdown",
                            title: $data.about[i].content[j].title.en,
                            text: converter.makeHtml(content.text.en)
                        });

                    } else if (content.type == "url") {

                        lexicon.content.push({ type: "link", title: $data.about[i].content[j].title.en, text: content.source.en });

                    }

                }

                $factory.about.push(lexicon);

            }

        }

    };

    var handleNoises = function () {

        $factory.noises = {
            firstRow: [],
            secondRow: []
        };

        var noise, clone;

        if ($config.language == "tr") {

            for (var i = 0; i < $data.noises.length; i++) {

                noise = $data.noises[i];

                clone = {
                    index: i,
                    title: noise.title.tr,
                    decibel: noise.decibel,
                    src: urlVlsync + "/noise/android-noises/" + noise.noiseSource + ".mp3",
                    img: urlVlsync + "/noise/" + noise.imageDir + "/" + noise.imageDir + "@3x.png",
                    btn: noise.buttonImageDir
                };

                if (i <= 3)
                    $factory.noises.firstRow.push(clone);
                else
                    $factory.noises.secondRow.push(clone);

            }

        } else if ($config.language == "en") {

            for (var i = 0; i < $data.noises.length; i++) {

                noise = $data.noises[i];

                clone = {
                    index: i,
                    title: noise.title.en,
                    decibel: noise.decibel,
                    src: urlVlsync + "/noise/android-noises/" + noise.noiseSource + ".mp3",
                    img: urlVlsync + "/noise/" + noise.imageDir + "/" + noise.imageDir + "@3x.png",
                    btn: noise.buttonImageDir
                };

                if (i <= 3)
                    $factory.noises.firstRow.push(clone);
                else
                    $factory.noises.secondRow.push(clone);

            }

        }

    };

    var handleGlasses = function () {

        $factory.glasses = {
            all: [],
            firstRow: [],
            secondRow: []
        };

        var glass, clone;

        if ($config.language == "tr") {

            for (var i = 0; i < $data.glasses.length; i++) {

                glass = $data.glasses[i];

                clone = {
                    index: i,
                    title: glass.title.tr,
                    description: glass.description.tr,
                    combinationLong: glass.combinationLongValue.tr,
                    combinationShort: glass.combinationShortValue.tr,
                    acoustic: glass.acoustic,
                    security: glass.security,
                    uValue: glass.uValue,
                    reductionPercentage: glass.reductionPercentage,
                    logo: urlVlsync + "/glass/" + glass.imageDir + "/" + glass.logoDir + "-tr@3x.png",
                    img: urlVlsync + "/glass/" + glass.imageDir + "/" + glass.imageDir + "@3x.png",
                    summer: glass.badge1,
                    winter: glass.badge2,
                    security: glass.badge3,
                    reduction: glass.badge4
                };

                $factory.glasses.all.push(clone);

                if (i <= 1)
                    $factory.glasses.firstRow.push(clone);
                else
                    $factory.glasses.secondRow.push(clone);

            }            

        } else if ($config.language == "en") {

            for (var i = 0; i < $data.glasses.length; i++) {

                glass = $data.glasses[i];

                clone = {
                    index: i,
                    title: glass.title.en,
                    description: glass.description.en,
                    combinationLong: glass.combinationLongValue.en.replace("\n","<br />"),
                    combinationShort: glass.combinationShortValue.en,
                    acoustic: glass.acoustic,
                    security: glass.security,
                    uValue: glass.uValue,
                    reductionPercentage: glass.reductionPercentage,
                    logo: urlVlsync + "/glass/" + glass.imageDir + "/" + glass.logoDir + "-en@3x.png",
                    logoStatic: "/Files/img/glass_" + (i + 1) + ".png",
                    img: urlVlsync + "/glass/" + glass.imageDir + "/" + glass.imageDir + "@3x.png",
                    summer: glass.badge1,
                    winter: glass.badge2,
                    security: glass.badge3,
                    reduction: glass.badge4
                };

                $factory.glasses.all.push(clone);

                if (i <= 1)
                    $factory.glasses.firstRow.push(clone);
                else
                    $factory.glasses.secondRow.push(clone);

            }   

        }

    };

    return $factory;

});