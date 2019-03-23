app.factory("$audio", function ($rootScope) {

    var $factory = {
        initialized: false,
        current: {},
        list: []
    };

    $rootScope.$on("bcastReset", function () {
        $factory.initialized = false;
    });

    $factory.initialize = function () {

        if ($factory.initialized)
            return;

        var audios = document.querySelectorAll("audio");
        var audio;

        for (var i = 0; i < audios.length; i++) {

            audio = audios[i];

            $factory.list.push({

                element: audio,
                play: function () {

                    $factory.stop();
                    this.element.play();

                    $factory.current = this;

                },
                pause: function () {
                    this.element.pause();
                },
                volume: function (v) {
                    this.element.volume = v;
                }

            });

        }

        $factory.initialized = true;

    };

    $factory.stop = function () {

        for (var i = 0; i < $factory.list.length; i++) {

            $factory.list[i].element.pause();

        }

        $factory.current = {};

    };

    return $factory;

});