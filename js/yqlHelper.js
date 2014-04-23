var YQLHelper = {};

(function($) {


    var defaults = {
        yqlURL: "http://query.yahooapis.com/v1/public/yql"
    };


    function makeAjaxCall(sql, successCallback, errorCallBack) {
        $.ajax({
            url: defaults.yqlURL,

            // the name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // tell jQuery we're expecting JSONP
            dataType: "jsonp",

            // tell YQL what we want and that we want JSON
            data: {
                q: sql,
                format: "json"
            },

            // work with the response
            success: function(response) {
                successCallback.call(window, response);
            },
            error: function(jqXHR, textStatus, error) {
                console.log(error);
                errorCallBack.call(window, jqXHR, textStatus, error);
            }
        });
    }
    YQLHelper.queryYQL = function(zip, radius, query, successCallback, errorCallBack) {

        var sql;
        if (zip === 'My Location') {
            MapHelper.findGeoLocation(function(position) {
                sql = "select * from local.search(20) where latitude='" + position.coords.latitude + "' and longitude='" + position.coords.longitude + "' and radius='" + radius + "' and query='" + query + "'";
                makeAjaxCall(sql, successCallback, errorCallBack);
            }, function(error) {
                console.log(error);
            });

        } else {
            sql = "select * from local.search(20) where zip='" + zip + "' and radius='" + radius + "' and query='" + query + "'";
            makeAjaxCall(sql, successCallback, errorCallBack);
        }

    };

})(jQuery);
