var Util = {};

(function($) {

    Util.getRecentSearch = function(key) {
        if (window.sessionStorage) {
            return sessionStorage.getItem(key);
        } else {
            return null;
        }
    };

    Util.setRecentSearch = function(key, value) {
        if (window.sessionStorage) {
            sessionStorage.setItem(key, value);
        }
    };

})(jQuery);
