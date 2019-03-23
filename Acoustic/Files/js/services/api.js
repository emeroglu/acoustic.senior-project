app.factory("$api", function ($http, $data) {

    var $factory = {};

    var api = "/Sync";

    $factory.fetchLexicon = function (onSuccess) {

        $http({
            method: "GET",
            url: "/Files/data/lexicon.json"
        })
            .then(function (response) {

                $data.lexicon = response.data.lexicon;

                onSuccess();

            }, function () {

            });

    };

    $factory.fetchAbout = function (onSuccess) {

        $http({
            method: "GET",
            url: api + "/about/about/json"
        })
            .then(function (response) {

                $data.about = response.data.content;

                var requests = [];

                for (var i = 0; i < $data.about.length; i++) {

                    for (var j = 0; j < $data.about[i].content.length; j++) {

                        if ($data.about[i].content[j].type == "markdown") {

                            $data.about[i].content[j].text = {};

                            requests.push({

                                i:i,
                                j:j,
                                urlEng: "/about/" + $data.about[i].content[j].source.en + "/md",
                                urlTur: "/about/" + $data.about[i].content[j].source.tr + "/md"

                            });

                        }

                    }

                }

                processQueue(requests, onSuccess);

            });

    };

    var queueIndex = 0;
    var processQueue = function (requests, onSuccess) {

        var request = requests[queueIndex];

        $http({
            method: "GET",
            url: api + request.urlEng
        })
            .then(function (res) {

                $data.about[request.i].content[request.j].text["en"] = res.data;

                $http({
                    method: "GET",
                    url: api + request.urlTur
                })
                    .then(function (res2) {

                        $data.about[request.i].content[request.j].text["tr"] = res2.data;

                        queueIndex++;

                        if (queueIndex == requests.length)
                            onSuccess();
                        else
                            processQueue(requests, onSuccess);

                    }, function () {

                    });

            }, function () {

            });

    };

    $factory.fetchGlasses = function (onSuccess) {

        $http({
            method: "GET",
            url: api + "/glass/glass/json"
        })
            .then(function (response) {

                $data.glasses = response.data.content;

                onSuccess();

            });

    };

    $factory.fetchNoises = function (onSuccess) {

        $http({
            method: "GET",
            url: api + "/noise/noise/json"
        })
            .then(function (response) {

                $data.noises = response.data.content;

                onSuccess();

            });

    };

    return $factory;

});