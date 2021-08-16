var year;
var month;
var monthString;
var dateString;

$(document).ready(function(){
    getEdition();

    $('.subscribe_box_button').click(function(){
        window.location = "https://whsredandblack.herokuapp.com/subscription.html";
    })
    
    
    $('.section_title[data-section="L"]').bind('click', function(){
        window.location = 'https://whsredandblack.herokuapp.com/student-life.html';
    })
    $('.section_title[data-section="O"]').bind('click', function(){
        window.location = 'https://whsredandblack.herokuapp.com/opinion.html';
    })
    $('.section_title[data-section="N"]').bind('click', function(){
        window.location = 'https://whsredandblack.herokuapp.com/news.html';
    })
    $('.section_title[data-section="S"]').bind('click', function(){
        window.location = 'https://whsredandblack.herokuapp.com/sports.html';
    })
    $('.section_title[data-section="E"]').bind('click', function(){
        window.location = 'https://whsredandblack.herokuapp.com/arts-and-entertainment.html';
    })
    
    var throttled = throttle(setScrollAnimation, 1000);
    $(window).scroll(throttled);
    
    
    var offset = $('.ad_column').offset();
    var topPadding = 50;
    
    $(window).scroll(function() {
        
        if (window.innerWidth > 500) {
        
            console.log(offset.top);

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
        }
    });
    
    
    // MOBILE SCRIPT
    if (window.innerWidth <= 500) {
        $('.news_1 .news_article_content').after($('.news_1 .news_image'));
        $('.news_2 .news_article_content').after($('.news_2 .news_image'));
    }
    
    
    
    
    accountSetup();
    
})

function getEdition() {
    $.ajax({
        type: 'POST',
        url: 'get_edition.php',
    }).done(function(date) {
        date = JSON.parse(date);
        year = parseInt(date.year);
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
        
        $('.edition_date').html(dateString);
        
        getFrontArticles();
        
        
    }).fail(function() {
        console.log('ERROR')
    })
    
    
}


function getFrontArticles() {
    var article_elements_list = ['student_life_1', 'student_life_2', 'student_life_3', 'opinion_1', 'opinion_2', 'opinion_3', 'news_1',                                      'news_2', 'sports_1', 'sports_2', 'arts_1', 'arts_2'];
    
    for (i = 0; i < article_elements_list.length; i++) {
        current_element_class = article_elements_list[i];
        current_element = document.querySelector(`.${current_element_class}`);
        
        section = current_element.getAttribute('data-section');
        order_number = current_element.getAttribute('data-order_number');
        
        $.ajax({
            type: 'POST',
            url: 'get_front_articles.php',
            data: {'year' : year, 'month' : month, 'section' : section, 'order_number' : order_number},
        }).done(function(fetch) {
            fetch = JSON.parse(fetch);

            current_element = document.querySelector(`[data-section="${fetch.section}"][data-order_number="${fetch.order_number}"]`);
            

            if (fetch.id) {
                fillFrontArticles(fetch, current_element);
            }
            else {
                current_element.remove();
                columnHeightCorrection();
            }
            
        }).fail(function() {
            console.log('ERROR')
        })
    }
}



function fillFrontArticles(fetch, current_element) {

    current_element = $(current_element);
    
    current_element.attr('data-id', fetch.id);
    
    
    current_element.find('.article_title').html(fetch.title);
    current_element.find('.article_title').bind('click', function(){
        window.location = `https://whsredandblack.herokuapp.com/article.php?id=${fetch.id}`;
    })
    current_element.find('.article_author').html('By ' + fetch.author);
    current_element.find('.article_text').html(fetch.hook);
    
    if (fetch.image) {
        current_element.find('img').attr('src', fetch.image);
    }
    else {
        current_element.find('img').remove();
        current_element.find('.bottom_block_article_content').addClass('no_picture');
    }
    
    
    
    columnHeightCorrection();
}

var now = Date.now || function() {
  return new Date().getTime();
};

function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var _now = now();
    if (!previous && options.leading === false) previous = _now;
    var remaining = wait - (_now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}



function setScrollAnimation() {
    if (window.innerWidth > 500) { 
        if ($(window).scrollTop() > 150) {
            $('.rb_logo').animate({opacity: 1}, 600, 'swing');
        }
        else if ($(window).scrollTop() < 100) {
            $('.rb_logo').animate({opacity: 0}, 600, 'swing');
        }
    }
}