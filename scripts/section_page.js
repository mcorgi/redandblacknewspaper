var year;
var month;
var monthString;
var dateString;

$(document).ready(function(){
    getEdition();
    
    
    var offset = $('.ad_column').offset();
    var topPadding = 80;
    
    $(window).scroll(function() {
        
        if (window.innerWidth > 500) { 
        
            if ($(window).scrollTop() - offset.top + topPadding + $('.bottom_block_ad_container').outerHeight(false) >= $('.column_container').outerHeight(false)) {
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
        }
    });
    
    
    
    // MOBILE SCRIPT
    if (window.innerWidth <= 500) {
        $('.article_column_side').before($('.article_column_main'));
        
    }
    
    accountSetup();
    
})

function getEdition() {
    $.ajax({
        type: 'POST',
        url: 'get_edition.php',
    }).done(function(date) {
        date = JSON.parse(date);
        year = date.year.toString();
        month = date.month;
        
        switch (parseInt(month)) {
            case 1:
                monthString = 'January';
                break;
            case 2:
                monthString = 'February';
                break;
            case 3:
                monthString = 'March';
                break;
            case 4:
                monthString = 'April';
                break;
            case 5:
                monthString = 'May';
                break;
            case 6:
                monthString = 'June';
                break;
            case 7:
                monthString = 'July';
                break;
            case 8:
                monthString = 'August';
                break;
            case 9:
                monthString = 'September';
                break;
            case 10:
                monthString = 'October';
                break;
            case 11:
                monthString = 'November';
                break;
            case 12:
                monthString = 'December';
                break;
        }
        
        dateString = monthString + ' ' + year;
        
        $('.section_date').html(dateString);
        
        getSectionArticles();
        
        
    }).fail(function() {
        console.log('ERROR')
    })
}





function getSectionArticles() {
    
    section = $('body').attr('data-section');
    
    i = 1;
    
    var cond = true;
    
    var runOnce = true;
    
    var totalArticlesFound = 0;
    
    while (cond) {
        
        $.ajax({
            type: 'POST',
            url: 'get_section_articles.php',
            data: {'year' : year, 'month' : month, 'section' : section, 'order_number' : i}
        }).done(function(fetch){
            
            if (!fetch) {
                return;
            }
            
            fetch = JSON.parse(fetch);
            
            if (!fetch.id) {
                cond = false;
                return;
            }
            else {
                totalArticlesFound++;
            }
            
            if (fetch.order_number <= 3) {
                current_element = $(`[data-order="${fetch.order_number}"]`);
                
                current_element.find('.article_title').html(fetch.title);
                current_element.find('.article_title').bind('click', function(){
                    window.location = `https://www.whsredandblack.com/article.php?id=${fetch.id}`;
                })
                current_element.find('.article_text').html(fetch.hook);
                current_element.find('.article_author').html('By ' + fetch.author);
                current_element.find('.main_article_image').attr('src', fetch.image);
                current_element.find('.image_caption').html(fetch.image_caption);
                
                
                if (fetch.image) {
                    current_element.find('.hidden_image').attr('src', fetch.image);
                }
                else {
                    current_element.find('.hidden_image').remove();
                }
                
            }
            else {
                article = document.createElement('div');
                article.classList.add('bottom_block_article');
                article.setAttribute('data-id', fetch.id);

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

                document.querySelector('.article_column').append(article);
                article.append(content);
                content.append(title);
                content.append(text);
                content.append(author);
                article.append(image);
                
                title.innerHTML = fetch.title;
                
                title.addEventListener('click', function(){
                    window.location = `https://www.whsredandblack.com/article.php?id=${fetch.id}`;
                })
                
                text.innerHTML = fetch.hook;
                author.innerHTML = 'By ' + fetch.author;
                
                current_article = $(article);
                
                if (fetch.image) {
                    current_article.find('.bottom_block_article_image').attr('src', fetch.image);
                }
                else {
                    current_article.find('.bottom_block_article_image').remove();
                    current_article.find('.bottom_block_article_content').addClass('no_picture');
                }
                
                
            }
        }).fail(function(){
            console.log('ERROR');
        }).always(function(){
            
            
            if (i > 20) {
                if (totalArticlesFound == 0 && runOnce == true) {
                    runOnce = false;
                    $('.article_columns_container').css('display', 'none');

                    html_insert =
                    '<h1 class="no_articles_notice">There are no articles in this section right now. Please check back later.';

                    $('.article_column').append(html_insert);
                }
                else if (totalArticlesFound == 1) {
                    $('.no_articles_notice').remove();
                    $('.article_columns_container').css('display', 'block');
                    
                    $('.article_column_side').css('display', 'none');
                    $('.article_column_main').addClass('only_article');
                    $('.article_columns_container').css({paddingBottom: 0, borderBottom: 'none'});
                    $('.article_column_main').css({paddingLeft: 0});
                }
                else if (totalArticlesFound == 2) {
                    $('.article_column_side').css('display', 'block');
                    $('.article_column_main').removeClass('only_article');
                    $('.article_column_main').css({paddingLeft: 20});
                    
                    $('.first_block_article:first-child').css({paddingBottom: 0, borderBottom: 'none'});
                    $('.article_columns_container').css({paddingBottom: 0, borderBottom: 'none'});
                }
                else if (totalArticlesFound == 3) {
                    $('.article_column_side .first_block_article:first-child').css({paddingBottom: 20, borderBottom: '1.5px solid #DFDFDF'});
                    
                    $('.article_columns_container').css({paddingBottom: 0, borderBottom: 'none'});
                }
                else if (totalArticlesFound > 3) {
                    $('.article_columns_container').css({paddingBottom: 25, borderBottom: '1.5px solid #DFDFDF'});
                }
            }
            
            
            
            columnHeightCorrection();
            
        })
        
        // I'm sorry for the bad code but the asynchronous calls made breaking out of the loop at a non-constant difficult :(
        // I can't imagine any section having more than 20 articles per edition, but this number can always be increased
        if (i > 20) {
            break;
        }
        
        i++;
    }
    
    
    
    
}