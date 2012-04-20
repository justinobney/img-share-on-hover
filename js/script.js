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
    
    var href = encodeURIComponent(test_options.post_img),
            title = encodeURIComponent(document.title);
            
    var share_url = '<a class="share_link" href="sharer.html?img=' + href + '&title=' + title + '">Share This</a>';
    
    $(el).parent().parent().prepend(share_url);
}