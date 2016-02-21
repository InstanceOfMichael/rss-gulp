/**
 * IE 8-11 CustomEvent polyfill
 * http://stackoverflow.com/a/22946340
 */
(function () {
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();
