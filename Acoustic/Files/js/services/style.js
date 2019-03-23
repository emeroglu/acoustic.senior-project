app.factory("$style", function () {

    var $factory = {};

    $factory.onContentReadyStyling = {
        events: [],
        subscribe: function (event) {
            this.events.push(event);
        }
    };
    $factory.onResponsiveStyling = {
        events: [],
        subscribe: function (event) {
            this.events.push(event);
        }
    };

    return $factory;

});