app.factory("$css", function ($rootScope, $timeout) {

    var $factory = [];

    $factory.select = function (query) {
        return document.querySelector(query);
    };

    $factory.add = function (key) {

        var selector = "";

        if (key.indexOf(".") == -1) {

            if (key.indexOf("_") == -1)
                selector = key + " view";
            else
                selector = key.replace("_", "[") + "] view";

        }
        else
            selector = key.replace(".", " ").replace(".", " ").replace(".", " ").replace(".", " ").replace(".", " ").replace(".", " ").replace(".", " ").replace(".", " ");

        var object = {

            element: {},
            elements: [],
            selector: selector,
            query: "",
            psudeo: "",
            json: {},
            mission: "",
            clss: "",           
            first: function () {
                this.psudeo = ":first-of-type";
                return this;
            },
            ofType: function (n) {
                this.psudeo = ":nth-of-type(" + n + ")";
                return this;
            },
            child: function (c) {
                this.psudeo = ":nth-child(" + c + ")";
                return this;
            },
            childIgnoreFirst: function (c) {
                this.psudeo = ":nth-child(n+" + (c + 1) + ")";
                return this;
            },
            hover: function () {
                this.psudeo = ":hover";
                return this;
            },            
            widthBetween: function (from, to) {

                this.query = "@media";

                this.query += " (min-width: " + from + "px) and";
                this.query += " (max-width: " + to + "px) {";

                return this;

            },
            heightBetween: function (from, to) {

                this.query = "@media";

                this.query += " (min-height: " + from + "px) and";
                this.query += " (max-height: " + to + "px) {";

                return this;

            },
            begin: function () { this.mission = "css"; return this; },
            beginPseduo: function (c) { this.mission = "css"; this.psudeo = ""; return this; },
            beginQuery: function () { this.mission = "css"; this.query = ""; return this; },
            state: function (s) { this.mission = "state"; this.clss = "a-" + s; return this; },
            clear: function () { this.mission = ""; this.clss = ""; this.pseduo = ""; this.json = {}; return this; },
            clearInline: function () { this.revert(); return this; },
            select: function () {
                this.elements = document.querySelectorAll(this.selector);
                this.element = this.elements[0];
                return this;
            },
            selectAt: function (i) {
                this.elements = document.querySelectorAll(this.selector);
                this.element = this.elements[i];
                return this;
            },
            commit: function () {

                var css = JSON.stringify(this.json)
                    .replaceAll(",", ";")
                    .replaceAll("<>", ",")
                    .replaceAll("\"", "")
                    .replace("}", "")
                    .replace("{", "");

                this.element.setAttribute("style", css);

                this.clear();

                return this;

            },
            commitAll: function () {

                var css = JSON.stringify(this.json)
                    .replaceAll(",", ";")
                    .replaceAll("<>", ",")
                    .replaceAll("\"", "")
                    .replace("}", "")
                    .replace("{", "");

                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].setAttribute("style", css);
                }

                this.clear();

                return this;

            },
            revert: function () {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].setAttribute("style", "");
                }
            },
            save: function () {

                var css = "";

                if (this.mission == "css") {

                    css = this.query + " " + this.selector + this.psudeo + " " + JSON.stringify(this.json)
                        .replaceAll(",", ";")
                        .replaceAll("<>", ",")
                        .replaceAll("\"", "")
                        .replace("}", ";}")
                        .replace("}", " }")
                        .replace("{", "{ ");

                    if (this.query.length != 0)
                        css += " }";

                } else if (this.mission == "state") {

                    css = this.selector + "." + this.clss + JSON.stringify(this.json)
                        .replaceAll(",", ";")
                        .replaceAll("<>", ",")
                        .replaceAll("\"", "")
                        .replace("}", ";}");

                }

                console.log(css);

                document.getElementById("dynamic").innerHTML += css;

                this.clear();

                return this;

            },
            disp: function () {
                this.json.display = "block";
                return this;
            },
            none: function (i) {
                this.json.display = "none" + (i ? " !important" : "");
                return this;
            },
            rightToLeft: function () {
                this.json.direction = "rtl";
                return this;
            },
            leftToRight: function () {
                this.json.direction = "ltr";
                return this;
            },
            overflow: function (o) {
                this.json.overflow = o;
                return this;
            },
            overflowY: function (o) {
                this.json["overflow-y"] = o;
                return this;
            },
            verticalScroll: function () {
                this.json["overflow-y"] = "scroll";
                return this;
            },
            horizontalScroll: function () {
                this.json["overflow-x"] = "scroll";
                return this;
            },
            hideVerticalScroll: function () {
                this.json["overflow-y"] = "hidden";
                return this;
            },
            hideHorizontalScroll: function () {
                this.json["overflow-x"] = "hidden";
                return this;
            },
            mask: function () {
                this.json["overflow-y"] = "hidden";
                this.json["overflow-x"] = "hidden";
                return this;
            },
            maskVertical: function () {
                this.json["overflow-y"] = "hidden";
                return this;
            },
            maskHorizontal: function () {
                this.json["overflow-x"] = "hidden";
                return this;
            },
            opaque: function () {
                this.json.opacity = "1";
                return this;
            },
            opacity: function (o) {
                this.json.opacity = o;
                return this;
            },
            inheritOpacity: function () {
                this.json.opacity = "inherit";
                return this;
            },
            transparent: function () {
                this.json.opacity = 0;
                return this;
            },
            absolute: function () {
                this.json.position = "absolute";
                return this;
            },
            relativeLeft: function () {
                this.json.position = "relative";
                this.json.float = "left";
                return this;
            },
            relativeLeftFull: function () {
                this.json.position = "relative";
                this.json.float = "left";
                this.json.width = "100%";
                return this;
            },
            relativeRight: function () {
                this.json.position = "relative";
                this.json.float = "right";
                return this;
            },
            width: function (px) {
                this.json.width = px + "px";
                return this;
            },
            widthHalf: function () {
                this.json.width = "50%";
                return this;
            },
            widthCropFromHalf: function (px) {
                this.json.width = "calc(50% - " + px + "px)";
                return this;
            },
            widthCropFromFull: function (px) {
                this.json.width = "calc(100% - " + px + "px)";
                return this;
            },
            widthExtendUponFull: function (px) {
                this.json.width = "calc(100% + " + px + "px)";
                return this;
            },
            widthCentered: function (px) {
                this.json.width = px + "px";
                this.json.left = "calc(50% - " + (px * 0.5) + "px)";
                return this;
            },
            widthFull: function () {
                this.json.width = "100%";
                return this;
            },
            widthPercent: function (p) {
                this.json.width = p + "%";
                return this;
            },
            widthPercentCentered: function (p) {
                this.json.width = p + "%";
                this.json.left = ((100 - p) * 0.5) + "%";
                return this;
            },
            minHeight: function (px) {
                this.json["min-height"] = px + "px";
                return this;
            },
            maxHeight: function (px) {
                this.json["max-height"] = px + "px";
                return this;
            },
            height: function (px) {
                this.json.height = px + "px";
                return this;
            },
            heightPercent: function (p) {
                this.json.height = p + "%";
                return this;
            },
            heightCentered: function (px) {
                this.json.height = px + "px";
                this.json.top = "calc(50% - " + (px * 0.5) + "px)";
                return this;
            },
            heightFull: function () {
                this.json.height = "100%";
                return this;
            },
            heightCropFromFull: function (px) {
                this.json.height = "calc(100% - " + px + "px)";
                return this;
            },
            heightCropFromFullScreen: function (px) {
                this.json.height = "calc(100vh - " + px + "px)";
                return this;
            },            
            side: function (px) {
                this.json.width = px + "px";
                this.json.height = px + "px";
                return this;
            },
            sideFull: function () {
                this.json.width = "100%";
                this.json.left = "0px";
                this.json.height = "100%";
                this.json.top = "0px";
                return this;
            },
            sideCentered: function (px) {
                this.json.width = px + "px";
                this.json.left = "calc(50% - " + (px * 0.5) + "px)";
                this.json.height = px + "px";
                this.json.top = "calc(50% - " + (px * 0.5) + "px)";
                return this;
            },
            top: function (px) {
                this.json.top = px + "px";
                return this;
            },
            topPercent: function (p) {
                this.json.top = p + "%";
                return this;
            },
            left: function (px) {
                this.json.left = px + "px";
                return this;
            },
            right: function (px) {
                this.json.right = px + "px";
                return this;
            },
            bottom: function (px) {
                this.json.bottom = px + "px";
                return this;
            },
            bottomPercent: function (p) {
                this.json.bottom = p + "%";
                return this;
            },
            leftFromHalf: function (px) {
                this.json.left = "calc(50% - " + px + "px)";
                return this;
            },
            marginTop: function (px) {
                this.json["margin-top"] = px + "px";
                return this;
            },
            marginTopPercent: function (p) {
                this.json["margin-top"] = p + "%";
                return this;
            },
            marginLeft: function (px) {
                this.json["margin-left"] = px + "px";
                return this;
            },
            marginRight: function (px) {
                this.json["margin-right"] = px + "px";
                return this;
            },
            marginBottom: function (px) {
                this.json["margin-bottom"] = px + "px";
                return this;
            },
            marginHorizontal: function (px) {
                this.json["margin-left"] = px + "px";
                this.json["margin-right"] = px + "px";
                return this;
            },
            marginVertical: function (px) {
                this.json["margin-top"] = px + "px";
                this.json["margin-bottom"] = px + "px";
                return this;
            },
            paddingLeft: function (px) {
                this.json["padding-left"] = px + "px";
                return this;
            },
            paddingRight: function (px) {
                this.json["padding-right"] = px + "px";
                return this;
            },
            paddingTop: function (px) {
                this.json["padding-top"] = px + "px";
                return this;
            },
            paddingBottom: function (px) {
                this.json["padding-bottom"] = px + "px";
                return this;
            },
            backgroundColor: function (c) {
                this.json["background-color"] = c;
                return this;
            },
            textColorWhite: function () {
                this.json.color = "#FFFFFF";
                return this;
            },
            textColor: function (c) {
                this.json.color = c;
                return this;
            },
            textLeft: function () {
                this.json["text-align"] = "left";
                return this;
            },
            textCenter: function () {
                this.json["text-align"] = "center";
                return this;
            },
            textRight: function () {
                this.json["text-align"] = "right";
                return this;
            },
            textSize: function (px) {
                this.json["font-size"] = px + "px";
                return this;
            },
            textSizeFromHeightPercent: function (h) {
                this.json["font-size"] = h + "vh";
                return this;
            },
            textBold: function () {
                this.json["font-weight"] = "600";
                return this;
            },
            textRegular: function () {
                this.json["font-weight"] = "500";
                return this;
            },
            textLight: function () {
                this.json["font-weight"] = "400";
                return this;
            },
            textHeight: function (px) {
                this.json.height = px + "px";
                this.json["line-height"] = px + "px";
                return this;
            },
            textLineHeight: function (px) {
                this.json["line-height"] = px + "px";
                return this;
            },
            removeTextDecoration: function () {
                this.json["text-decoration"] = "none";
                return this;
            },
            underline: function () {
                this.json["text-decoration"] = "underline";
                return this;
            },
            cursorPointer: function () {
                this.json.cursor = "pointer";
                return this;
            },
            removeBullets: function () {
                this.json["list-style-type"] = "none";
                return this;
            },
            round: function (px) {
                this.json["border-radius"] = px + "px";
                return this;
            },
            fillNone: function () {
                this.json.fill = "none";
                return this;
            },
            stroke: function (c) {
                this.json.stroke = c;
                return this;
            },
            strokeWidth: function (px) {
                this.json["stroke-width"] = px + "px";
                return this;
            },
            rotate: function (deg) {
                this.json.transform = "rotate(" + deg + "deg)";
                return this;
            }
        };

        if (key.indexOf(".") != -1) {

            var path = key.split(".");

            if (path.length == 2)
                $factory[path[0]][path[1]] = object;
            else if (path.length == 3)
                $factory[path[0]][path[1]][path[2]] = object;
            else if (path.length == 4)
                $factory[path[0]][path[1]][path[2]][path[3]] = object;
            else if (path.length == 5)
                $factory[path[0]][path[1]][path[2]][path[3]][path[4]] = object;
            else if (path.length == 6)
                $factory[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]] = object;
            else if (path.length == 7)
                $factory[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]][path[6]] = object;
            else if (path.length == 8)
                $factory[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]][path[6]][path[7]] = object;

        } else {

            $factory[key] = object;

        }

    };

    return $factory;

});
