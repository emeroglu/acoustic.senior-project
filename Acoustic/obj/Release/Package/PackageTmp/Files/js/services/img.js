app.factory("$img", function () {

    var $factory = {};

    $factory.acoustic = {
        ratioWH: (248 / 278).toFixed(2),
        ratioHW: (278 / 248).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    $factory.logo = {
        ratioWH: (420 / 135).toFixed(2),
        ratioHW: (135 / 420).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    $factory.logo_en = {
        ratioWH: (480 / 135).toFixed(2),
        ratioHW: (135 / 480).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    $factory.appstore = {
        ratioWH: (2000 / 593).toFixed(2),
        ratioHW: (593 / 2000).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    $factory.playstore = {
        ratioWH: (646 / 250).toFixed(2),
        ratioHW: (250 / 646).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    $factory.left_arrow = {
        ratioWH: (25 / 20).toFixed(2),
        ratioHW: (20 / 25).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    $factory.glass_standard = {
        ratioWH: (151 / 35).toFixed(2),
        ratioHW: (35 / 151).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    $factory.glass_c = {
        ratioWH: (105 / 45).toFixed(2),
        ratioHW: (45 / 105).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    $factory.glass_s = {
        ratioWH: (124 / 45).toFixed(2),
        ratioHW: (45 / 124).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    $factory.glass_k = {
        ratioWH: (174 / 44).toFixed(2),
        ratioHW: (44 / 174).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    $factory.glass_k3 = {
        ratioWH: (144 / 45).toFixed(2),
        ratioHW: (45 / 144).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }
    };

    return $factory;

});