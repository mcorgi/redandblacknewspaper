$(document).ready(function(){
    getIndividualArticle();
    getRelatedArticles();
    columnHeightCorrection();
    
    
    window.addEventListener('resize', setAdScroll);
    
    if (!title) {
        invalidPage();
    }
    
    accountSetup();
})

function getIndividualArticle() {
	alert(id);
    $.ajax({
        type: 'POST',
        url: 'get_individual_article.php',
        data: {'id' : id}
    }).done(function(fetch){
        fetch = JSON.parse(fetch);
        
        if (fetch.title == 'c6f13093-512c-4ada-9729-665060869c66') {
            window.location = 'https://whsredandblack.herokuapp.com/article_limit.html';
        }
        
        fillIndividualArticle(fetch);
    }).fail(function() {
        console.log('ERROR')
    })
}

function fillIndividualArticle(fetch) {
	alert(fetch.title);
	
    $('.full_article_title').html(fetch.title);
    $('.full_article_author').html('By ' + fetch.author);
    
    var tempSection;
    
    if (fetch.section == 'N') {
        tempSection = 'News';
        tempURL = 'news'
    }
    else if (fetch.section == 'L') {
        tempSection = 'Student Life';
        tempURL = 'student-life'
    }
    else if (fetch.section == 'O') {
        tempSection = 'Opinion';
        tempURL = 'opinion'
    }
    else if (fetch.section == 'E') {
        tempSection = 'Arts &amp; Entertainment';
        tempURL = 'arts-and-entertainment'
    }
    else if (fetch.section == 'S') {
        tempSection = 'Sports';
        tempURL = 'sports'
    }
    else {
        tempSection = '';
    }
    
    $('.full_article_section').html(tempSection);
    
    $('.full_article_section').bind('click', function(){
        window.location = `https://whsredandblack.herokuapp.com/${tempURL}.html`;
    })
    
    if (fetch.image) {
        $('.full_article_image').attr('src', fetch.image);
        $('.full_article_image_caption').html(fetch.image_caption);
    }
    else {
        $('.full_article_image').remove();
        $('.full_article_image_caption').remove();
    }
    
    if (fetch.text) {
        $('.full_article_paragraph_container').html(fetch.text);
    }
    else {
        $('.full_article_paragraph_container').remove();
    }  
}





function getRelatedArticles() {
    $.ajax({
        type: 'POST',
        url: 'get_related_articles.php',
        data: {'id' : id}
    }).done(function(fetch){
        fetch = JSON.parse(fetch);
        getRelatedArticlesContent(fetch);
    }).fail(function() {
        console.log('ERROR')
    })
}

function getRelatedArticlesContent(idArray) {
    for (i = 0; i < idArray.length; i++) {
        
        article = document.createElement('div');
        article.classList.add('bottom_block_article');
        article.setAttribute('data-id', idArray[i]);
        
        content = document.createElement('div');
        content.classList.add('bottom_block_article_content');
        
        title = document.createElement('p');
        title.classList.add('article_title');
        
        text = document.createElement('p');
        text.classList.add('article_text');
        
        author = document.createElement('p');
        author.classList.add('article_author');
        
        image = document.createElement('img');
        image.classList.add('bottom_block_article_image');
        
        document.querySelector('.bottom_block_section').append(article);
        article.append(content);
        content.append(title);
        content.append(text);
        content.append(author);
        article.append(image);
        
        $.ajax({
            type: 'POST',
            url: 'get_related_articles_content.php',
            data: {'id' : idArray[i]}
        }).done(function(fetch){
            fetch = JSON.parse(fetch);
            fillRelatedArticles(fetch);
        }).fail(function() {
            console.log('ERROR')
        }) 
    }
    
    if (idArray.length == 0) {
        $('.bottom_block_section').append('<h1 class="no_related">Looks like this article is alone. Try browsing another section.</h1>');
    }
}

function fillRelatedArticles(fetch) {
    current_article = $(`[data-id="${fetch.id}"]`);
    current_article.find('.article_title').html(fetch.title);
    current_article.find('.article_title').bind('click', function(){
        window.location = `https://whsredandblack.herokuapp.com/article.php?id=${fetch.id}`;
    })
    current_article.find('.article_text').html(fetch.hook);
    current_article.find('.article_author').html(fetch.author);
    
    if (fetch.image) {
        current_article.find('.bottom_block_article_image').attr('src', fetch.image);
    }
    else {
        current_article.find('.bottom_block_article_image').remove();
        current_article.find('.bottom_block_article_content').addClass('no_picture');
    }
    
    setAdScroll();
}

function setAdScroll() {
    var offset = $('.ad_column').offset();
    var topPadding = 80;
    
    
    heightLimit = $('.bottom_block').height();
    
    $('.bottom_block').css('maxHeight', heightLimit);
    
    if (window.innerWidth > 500) {
    
        $(window).scroll(function() {
            if ($(window).scrollTop() - offset.top + topPadding + $('.bottom_block_ad_container').outerHeight(false) >= $('.bottom_block').outerHeight(false)) {
                // just chill
            }
            else if ($(window).scrollTop() > offset.top) {
                $('.ad_column').stop().animate({
                    marginTop: $(window).scrollTop() - offset.top + topPadding
                });
            } else {
                $('.ad_column').stop().animate({
                    marginTop: 0
                });
            };
        });
    }
}



function invalidPage() {
    $('.content_wrapper').remove();
    
    html_invalid =
    '<div class="invalid_wrapper">' +
        '<h1>Whoops! That page doesn\'t exist.</h1>' +
    '</div>';
    
    $('body').append(html_invalid);
    $('.behind_nav').after($('.invalid_wrapper'));
    
    $('.footer').css('marginTop', 0);
    
    
    
}