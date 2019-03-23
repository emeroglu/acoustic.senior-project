app.factory("$switch", function ($rootScope, $timeout) {

    var $factory = [];

    $factory.add = function (key, address, z, show) {

        var object = {

            clss: (show) ? "a-disp a-" + z + " a-show" : "a-disp a-" + z + " a-hide",
            address: address,
            z: z,
            direct: function (show, z, state) {

                var clss = "";

                clss += (show) ? "a-disp" : "a-none";
                clss += " a-" + z;
                clss += " a-" + state;

                this.clss = clss;

                $rootScope.$broadcast(this.address);

            },
            pop: function (z) {

                if (z == null)
                    z = 100;

                this.clss = "a-disp a-" + z + " a-show";
                $rootScope.$broadcast(this.address);

                this.present = true;

            },
            appear: function (animation, duration, z) {

                if (animation == null)
                    animation = "ease";

                if (duration == null)
                    duration = 1000;

                if (z == null)
                    z = 100;

                this.z = z;

                var state = this;

                state.clss = "a-none a-" + z + " a-hide";
                $rootScope.$broadcast(state.address);

                $timeout(function () {

                    state.clss = "a-disp a-" + z + " a-hide";
                    $rootScope.$broadcast(state.address);

                    $timeout(function () {

                        state.clss = "a-" + animation + "-" + duration + " a-disp a-" + z + " a-show";
                        $rootScope.$broadcast(state.address);

                        state.present = true;

                        $timeout(function () {

                            state.clss = "a-disp a-" + z + " a-show";
                            $rootScope.$broadcast(state.address);

                        }, duration + 50);

                    }, 50);

                }, 50);

            },
            show: function (animation, duration, z) {

                if (animation == null)
                    animation = "ease";

                if (duration == null)
                    duration = 500;

                if (z == null)
                    z = 100;

                this.z = z;

                var state = this;

                state.clss = "a-disp a-" + z + " a-hide";
                $rootScope.$broadcast(state.address);

                $timeout(function () {

                    state.clss = "a-" + animation + "-" + duration + " a-disp a-" + z + " a-show";
                    $rootScope.$broadcast(state.address);

                    state.present = true;

                    $timeout(function () {

                        state.clss = "a-disp a-" + z + " a-show";
                        $rootScope.$broadcast(state.address);

                    }, duration + 50);

                }, 50);

            },
            dissapear: function (animation, duration, z) {

                if (animation == null)
                    animation = "ease";

                if (duration == null)
                    duration = 500;

                if (z == null)
                    z = 95;

                var state = this;

                state.clss = "a-" + animation + "-" + duration + " a-disp a-" + state.z + " a-hide";
                $rootScope.$broadcast(state.address);

                $timeout(function () {

                    state.clss = "a-none a-" + state.z + " a-hide";
                    $rootScope.$broadcast(state.address);

                    $timeout(function () {

                        state.clss = "a-none a-" + z + " a-hide";
                        $rootScope.$broadcast(state.address);

                        state.z = z;
                        state.present = false;

                    }, 50);

                }, duration + 50);

            },
            hide: function (animation, duration, z) {

                if (animation == null)
                    animation = "ease";

                if (duration == null)
                    duration = 500;

                if (z == null)
                    z = 95;

                var state = this;

                state.clss = "a-" + animation + "-" + duration + " a-disp a-" + state.z + " a-hide";
                $rootScope.$broadcast(state.address);

                $timeout(function () {

                    state.clss = "a-disp a-" + state.z + " a-hide";
                    $rootScope.$broadcast(state.address);

                    state.z = z;
                    state.present = false;

                }, duration + 50);

            },
            animate: function (clss, animation, duration, z) {

                if (animation == null)
                    animation = "ease";

                if (duration == null)
                    duration = 500;

                if (z == null)
                    z = 100;

                var state = this;              

                state.clss = "a-" + animation + "-" + duration + " a-disp a-" + z + " a-" + clss;
                $rootScope.$broadcast(state.address);

                $timeout(function () {

                    state.clss = "a-disp a-" + z + " a-" + clss;
                    $rootScope.$broadcast(state.address);

                }, duration + 50);                             

            }

        };

        if (key.indexOf(".") != -1) {

            var path = key.split(".");

            if (path.length == 2) {

                if ($factory[path[0]][path[1]] == null)
                    $factory[path[0]][path[1]] = object;

            }
            else if (path.length == 3) {

                if ($factory[path[0]][path[1]][path[2]] == null)
                    $factory[path[0]][path[1]][path[2]] = object;

            }
            else if (path.length == 4) {

                if ($factory[path[0]][path[1]][path[2]][path[3]] == null)
                    $factory[path[0]][path[1]][path[2]][path[3]] = object;

            }
            else if (path.length == 5) {

                if ($factory[path[0]][path[1]][path[2]][path[3]][path[4]] == null)
                    $factory[path[0]][path[1]][path[2]][path[3]][path[4]] = object;

            }
            else if (path.length == 6) {

                if ($factory[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]] == null)
                    $factory[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]] = object;

            }

        } else {

            if ($factory[key] == null)
                $factory[key] = object;

        }

    };

    return $factory;

});