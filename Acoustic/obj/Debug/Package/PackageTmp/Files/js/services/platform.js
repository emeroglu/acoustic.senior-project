app.factory("$platform", function () {

    var $factory = {};

    $factory.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    
    $factory.isFirefox = typeof InstallTrigger !== 'undefined';
    
    $factory.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    
    $factory.isIE = false || !!document.documentMode;
    
    $factory.isEdge = !$factory.isIE && !!window.StyleMedia;
    
    $factory.isChrome = !!window.chrome && !!window.chrome.webstore;
    
    $factory.isBlink = ($factory.isChrome || $factory.isOpera) && !!window.CSS;

    return $factory;

});