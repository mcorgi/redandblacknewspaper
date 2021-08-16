$(document).ready(function(){
    
    
    buildAccount();
    
    
})


function buildAccount() {
    var html =  
    '<div class="account_panel">' +
        '<div class="account_panel_wrapper">' + /*
            '<div class="account_subscribe_section">' +
                '<p class="account_panel_subscribe_button">Upgrade Account</p>' +
            '</div>' +
            '<div class="account_section_section">' +
                '<ul class="section_container">' +
                    '<li class="account_link" data-link="https://whsredandblack.herokuapp.com/bookmarks.html">Bookmarks</li>' +
                    '<li class="account_link" data-link="https://whsredandblack.herokuapp.com/mailbox.html">Mailbox</li>' +
                    '<li class="account_link" data-link="https://whsredandblack.herokuapp.com/my-data.html">My Data</li>' +
                '</ul>' +
            '</div>' + */
            '<div class="account_extra_section">' +
                '<ul class="section_container">' +
                    '<li class="account_link sign_out">Sign Out</li>' +
                '</ul>' +
            '</div>' +
        '</div>' +
    '</div>';

    $('body').append(html);
    
    $('.account_link').bind('click', function(){
        
        if ($(this).attr('data-link') == "https://whsredandblack.herokuapp.com/bookmarks.html" || $(this).attr('data-link') == "https://whsredandblack.herokuapp.com/my-data.html" || $(this).attr('data-link') == "https://whsredandblack.herokuapp.com/mailbox.html" || $(this).hasClass('sign_out')) {
            // nada for now
        }
        else {
            window.location = $(this).attr('data-link');
        }
        
    })
    
    $('.sign_out').bind('click', function(){
        var posting = $.post('logout.php');


        posting.done(function() {

            eraseCookie('login');
            eraseCookie('email');
            eraseCookie('admin');
            eraseCookie('accountType');
            
            window.location = 'https://whsredandblack.herokuapp.com/index.html';

        })
    })
    
    
    
    setAccount();
}

function setAccount(){
    
    if (getCookie('login')) {
        var accountOpen = false;

        $('.nav_account_button').click(function(){
            if ($('.nav_panel').css('display') == 'none') {
                $('.account_panel').toggle('slide', {easing: 'swing', direction: 'right'}, 250);

                if (!accountOpen) {
                    variableWidth = $('.content_wrapper').outerWidth(true) * 0.05;
                    $('.content_wrapper').animate({paddingRight: 300 + variableWidth}, 250, 'swing');
                    $('body, html').animate({scrollLeft: 300 + variableWidth}, 250, 'swing');
                    $('.nav_section_button').css('cursor', 'not-allowed');
                }
                else {
                    $('.content_wrapper').animate({paddingRight: 0}, 250, 'swing');
                    $('.nav_section_button').css('cursor', 'pointer');
                }

                accountOpen = !accountOpen;
            }   
        })

        $('.mobile_account_button').click(function(){
            if ($('.nav_panel').css('display') == 'none') {
                $('.account_panel').toggle('slide', {easing: 'swing', direction: 'right'}, 250);

                if (!accountOpen) {
                    variableWidth = $('.content_wrapper').outerWidth(true) * 0.05;
                    $('.content_wrapper').animate({paddingRight: 300 + variableWidth}, 250, 'swing');
                    $('body, html').animate({scrollLeft: 300 + variableWidth}, 250, 'swing');
                    $('.nav_section_button').css('cursor', 'not-allowed');
                }
                else {
                    $('.content_wrapper').animate({paddingRight: 0}, 250, 'swing');
                    $('.nav_section_button').css('cursor', 'pointer');
                }

                accountOpen = !accountOpen;
            }   
        })

        $('.content_wrapper').click(function(){
            if (accountOpen) {
                $('.account_panel').toggle('slide', {easing: 'swing', direction: 'right'}, 250);

                if (!accountOpen) {
                    variableWidth = $('.content_wrapper').outerWidth(true) * 0.05;
                    $('.content_wrapper').animate({paddingRight: 300 + variableWidth}, 250, 'swing');
                    $('body, html').animate({scrollLeft: 300 + variableWidth}, 250, 'swing');
                }
                else {
                    $('.content_wrapper').animate({paddingRight: 0}, 250, 'swing');
                    $('.nav_section_button').css('cursor', 'pointer');
                }

                accountOpen = !accountOpen;
            }
        })
    }
    
}


function notImplementedNotification(event = null) {
    if (event) {
        event.preventDefault();
    }
    alert('This feature is coming soon.');
}




function accountButtonClick() {
    if (getCookie('login')) {
        //alert('This feature is coming soon...')
    }
    else {
        window.location = 'https://whsredandblack.herokuapp.com/login.html';
    }
}