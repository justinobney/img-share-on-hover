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
        return '<a title="' + title + '" href=" ' + tweeturl + ' " target="_blank"><img src="http://dl.dropbox.com/u/2857953/PostMonkey/twitter_button.png" alt="Share on Twitter" /></a>';
    };

    function faceButton(url, imgURL, title, summary) {
        var fb_url_template = 'http://www.facebook.com/sharer.php?s=100&p[url]=' + encodeURI(url) + '&p[images][0]=' + encodeURI(imgURL) + '&p[title]=' + encodeURI(title) + '&p[summary]=' + encodeURI(summary);

        var link_template = '<a title="Post this Monkey on Facebook" href="' + fb_url_template + '" target="_blank"><img src="http://dl.dropbox.com/u/2857953/PostMonkey/facebook_button.png" alt="Share on Facebook" /></a>';

        return link_template;
    }

    app.getShare = function(el) {
        var test_options = {
            tw_user : 'thepostmonkey',
            post_url : 'http://thepostmonkey.com/',
            post_img : 'http://thepostmonkey.com/wp-content/uploads/2012/04/rag-23-Copy1.jpg',
            post_title : 'The PostMonkey Strikes Again',
            post_desc : 'More Monkey Antics at http://thePostMonkey.com',
            bit_user : 'jay3917',
            bit_key : 'R_67a7af8c9a6bb9ee62920b61687b0857'
        }

        var ext = el.href.split("?")[0].split(".").reverse()[0].toString();

        test_options.post_img = ("jpg|png|gif".indexOf(ext) > -1) ? el.href : $(el).find('img').attr('src');

        var href = encodeURIComponent(test_options.post_img), title = encodeURIComponent(document.title);

        var share_url = '<a href="sharer.html?img=' + href + '&title=' + title + '"';

        get_short_url(share_url, test_options.bit_user, test_options.bit_key, function(resp) {

            if(resp.status_code === 200) {
                test_options.post_img = resp.data.url;
            }

            var share_buttons = tweetButton(share_url, test_options.tw_user, test_options.post_title) + '&nbsp;' + faceButton(test_options.post_img, test_options.post_img, test_options.post_title, test_options.post_desc);

            $(el).parent().parent().prepend(share_buttons);

        });

        $(el).parent().parent().prepend(share_buttons);
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
