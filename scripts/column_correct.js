$(document).ready(function(){
    columnHeightCorrection();
    
    window.addEventListener('resize', columnHeightCorrection);
    
    window.onorientationchange = function(){
        window.location.reload();
    }
    
    /*
    window.onresize = function(){
        window.location.reload();
    }
    */
})


function columnHeightCorrection(){
    
    if (window.innerWidth > 500) {
    
        if ($('body').hasClass('front_page')) {
            $('.media_column').css('height', 'auto');
            if (!($('.media_column').outerHeight(false) > $('.student_life_column').outerHeight(false) && $('.media_column').outerHeight(false) > $('.opinion_column').outerHeight(false))) {
                first_block_height = $('.first_block').outerHeight(false) - 50;
                $('.media_column').css('height', first_block_height);
            }

            $('.news_column:first').css('height', 'auto');
            news_block_height = $('.news_block').outerHeight(false) - 100;
            $('.news_column:first').css('height', news_block_height);

            $('.footer_subscribe_column').css('height', 'auto');
            footer_height = $('.footer_columns').outerHeight(false);
            $('.footer_subscribe_column').css('height', footer_height);
        }
        else if ($('body').hasClass('section_page')) {

            //console.log($('.article_columns_container').outerHeight(false));


            $('.article_column_side').css('height', 'auto');
            article_column_height = $('.article_columns_container').outerHeight(false) - 25;
            $('.article_column_side').css('height', article_column_height);

            $('.footer_subscribe_column').css('height', 'auto');
            footer_height = $('.footer_columns').outerHeight(false);
            $('.footer_subscribe_column').css('height', footer_height);

        }
        else if ($('body').hasClass('article_page')) {


            $('.article_column_side').css('height', 'auto');
            article_column_height = $('.article_columns_container').outerHeight(false);
            $('.article_column_side').css('height', article_column_height);

            $('.footer_subscribe_column').css('height', 'auto');
            footer_height = $('.footer_columns').outerHeight(false);
            $('.footer_subscribe_column').css('height', footer_height);
        }
    
    }
}