var _sharer = _sharer || {};

(function(app) {
    app.querystring = function() {
        // by Chris O'Brien, prettycode.org
        var collection = {};
        // Gets the query string, starts with '?'
        var querystring = window.location.search;
        // Empty if no query string
        if(!querystring) {
            return {
                toString : function() {
                    return "";
                }
            };
        }
        // Decode query string and remove '?'
        querystring = decodeURI(querystring.substring(1));
        // Load the key/values of the return collection
        var pairs = querystring.split("&");
        for(var i = 0; i < pairs.length; i++) {
            // Empty pair (e.g. ?key=val&&key2=val2)
            if(!pairs[i]) {
                continue;
            }
            // Don't use split("=") in case value has "=" in it
            var seperatorPosition = pairs[i].indexOf("=");
            if(seperatorPosition == -1) {
                collection[pairs[i]] = "";
            } else {
                collection[pairs[i].substring(0, seperatorPosition)] = decodeURIComponent(pairs[i].substr(seperatorPosition + 1));
            }
        }
        // toString() returns the key/value pairs concatenated
        collection.toString = function() {
            return "?" + querystring;
        };
        return collection;
    };

    app.init = function() {
        $('#the_img').attr({
            src : _sharer.querystring().img,
            title : _sharer.querystring().title
        });

        getPopular();
        
        this.getShare();
    }
    
    function getPopular() {
        var popular, popular_url = 'monkey.html';
        //'http://thepostmonkey.com/'

        $.get(popular_url, function(html) {
            popular = $(html).find('#wpp-4');

            popular.find('ul>li').filter(function(index) {
                return index > 1;
            }).remove()

            $('#popular_post').html(popular);
        });
    }

    function tweetButton(url, tw_user, title) {

        // Create the twitter URL
        var tweeturl = 'http://twitter.com/share?url=' + encodeURI(url) + '&via=' + tw_user + '&text=' + title;

        // Place the text on the page. Change body to wherever you want the button placed.
        var tw_img_url = "http://cdn1.iconfinder.com/data/icons/Modern_Web_Social_Icons_by_SimekOneLove/128/twitter.png";
        return '<a title="' + title + '" href=" ' + tweeturl + ' " target="_blank"><img src="' + tw_img_url + '" alt="Share on Twitter" /></a>';
    };

    function faceButton(url, imgURL, title, summary) {
        var fb_url_template = 'http://www.facebook.com/sharer.php?s=100&p[url]=' + encodeURI(url) + '&p[images][0]=' + encodeURI(imgURL) + '&p[title]=' + encodeURI(title) + '&p[summary]=' + encodeURI(summary);
        
        var fb_img_url = "http://cdn1.iconfinder.com/data/icons/Modern_Web_Social_Icons_by_SimekOneLove/128/facebook.png";
        var link_template = '<a title="Post this Monkey on Facebook" href="' + fb_url_template + '" target="_blank"><img src="' + fb_img_url + '" alt="Share on Facebook" /></a>';

        return link_template;
    }

    app.getShare = function(el) {
        var test_options = {
            tw_user : 'thepostmonkey',
            post_url : 'http://thepostmonkey.com/',
            post_img : document.location.href,
            post_title : 'The PostMonkey Strikes Again',
            post_desc : 'More Monkey Antics at http://thePostMonkey.com',
            bit_user : 'jay3917',
            bit_key : 'R_67a7af8c9a6bb9ee62920b61687b0857'
        }

        get_short_url(test_options.post_img, test_options.bit_user, test_options.bit_key, function(resp) {

            if(resp.status_code === 200) {
                test_options.post_img = resp.data.url;
            }

            var share_buttons = faceButton(test_options.post_img, test_options.post_img, test_options.post_title, test_options.post_desc) + '&nbsp;' + tweetButton(test_options.post_img, test_options.tw_user, test_options.post_title);
            $('#share_containter').append(share_buttons);

            $('#short_link').val(test_options.post_img);

        });
    }
   
    function get_short_url(long_url, login, api_key, func) {
        $.getJSON("http://api.bitly.com/v3/shorten?callback=?", {
            "format" : "json",
            "apiKey" : api_key,
            "login" : login,
            "longUrl" : long_url
        }, function(response) {
            func(response);
        });
    }

})(_sharer);
