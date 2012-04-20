var _sharer = _sharer || {};

(function(app){
    app.querystring = function() {
        // by Chris O'Brien, prettycode.org
        var collection = {};
        // Gets the query string, starts with '?'
        var querystring = window.location.search;
        // Empty if no query string
        if (!querystring) {
            return { toString: function() { return ""; } };
        }
        // Decode query string and remove '?'
        querystring = decodeURI(querystring.substring(1));
        // Load the key/values of the return collection
        var pairs = querystring.split("&");
        for (var i = 0; i < pairs.length; i++) {
            // Empty pair (e.g. ?key=val&&key2=val2)
            if (!pairs[i]) {
                continue;
            }
            // Don't use split("=") in case value has "=" in it
            var seperatorPosition = pairs[i].indexOf("=");
            if (seperatorPosition == -1) {
                collection[pairs[i]] = "";
            }
            else {
                collection[pairs[i].substring(0, seperatorPosition)] = decodeURIComponent(pairs[i].substr(seperatorPosition + 1));
            }
        }
        // toString() returns the key/value pairs concatenated
        collection.toString = function() {
            return "?" + querystring;
        };
        return collection;
    };
    
    app.init = function(){
        $('#the_img').attr({
            src: _sharer.querystring().img,
            title: _sharer.querystring().title
        });
        
        getPopular();
    }
    
    function getPopular(){
        var popular,
            popular_url = 'http://127.0.0.1:8020/img-share-on-hover/monkey.html'; //'http://thepostmonkey.com/'

        $.get(popular_url, function (html) {
            popular = $(html).find('#wpp-4');
        
            popular.find('ul>li').filter(function (index) {
                return index > 1;
            }).remove()
            
            $('#popular_post').html(popular);
        });
    }
    
    
})(_sharer);
