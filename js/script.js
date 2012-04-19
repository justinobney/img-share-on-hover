function tweetButton(url, tw_user, title) {

    // Create the twitter URL
    var tweeturl = 'http://twitter.com/share?url=' + encodeURI(url) + '&via=' + tw_user  + '&text=' + title;

    // Place the text on the page. Change body to wherever you want the button placed. 
    return '<a title="' + title + '" href=" ' + tweeturl + ' " target="_blank"><img src="http://www.likebuttonshirt.com/img/tweet-button-small.png" alt="Share on Twitter" /></a>';
};

function faceButton(url, imgURL, title, summary) {
    var fb_url_template = 'http://www.facebook.com/sharer.php?s=100&p[url]=' + encodeURI(url) + '&p[images][0]=' + encodeURI(imgURL) + '&p[title]=' + encodeURI(title) + '&p[summary]=' + encodeURI(summary);

    var link_template = '<a title="Post this Monkey on Facebook" href="' + fb_url_template + '" target="_blank"><img src="http://static.ivona.com/www/static/images/icons/share_facebook.png" alt="Share on Facebook" /></a>';

    return link_template;
}

function getShare(el) {
    var test_options = {
        tw_user: 'thepostmonkey',
        post_url: 'http://thepostmonkey.com/',
        post_img: 'http://thepostmonkey.com/wp-content/uploads/2012/04/rag-23-Copy1.jpg',
        post_title: 'The PostMonkey Strikes Again',
        post_desc: 'More Monkey Antics at http://thePostMonkey.com',
        bit_user: 'jay3917',
        bit_key: 'R_67a7af8c9a6bb9ee62920b61687b0857'
    }
    
    var ext = el.href.split("?")[0].split(".").reverse()[0].toString();
    
    test_options.post_img = ("jpg|png|gif".indexOf(ext) > -1) ? el.href : $(el).find('img').attr('src');
    
    get_short_url(test_options.post_img, test_options.bit_user, test_options.bit_key, function(resp){
        
        if(resp.status_code === 200) {
            test_options.post_img = resp.data.url;
        }
        
        $(el).hover(function () {
            $(el).block({
                message: tweetButton(test_options.post_img, test_options.tw_user, test_options.post_title) + '<br />' + faceButton(test_options.post_img, test_options.post_img, test_options.post_title, test_options.post_desc) + '<br /><br />'
            });
        }, function () {
            $(el).unblock();
        });
        
    });
}

function get_short_url(long_url, login, api_key, func) {
    $.getJSON("http://api.bitly.com/v3/shorten?callback=?", {
        "format": "json",
        "apiKey": api_key,
        "login": login,
        "longUrl": long_url
    }, function (response) {
        func(response);
    });
}

$('.share-hover').each(function(idx, el){
    getShare(el);
});