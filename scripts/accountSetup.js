function accountSetup() {
    window.onload = function() {
        if (getCookie('login')) {
            $('.nav_account_button_text').html('My Account');
            
            
            if (getCookie('accountType') == 'PAID') {
                $('.nav_subscribe_button').remove();
                $('.subscribe_block').remove();
                $('.footer_subscribe_column').remove();
                $('.nav_panel_subscribe_button').remove();
                $('.account_subscribe_section').remove();
                
                $('.nav_section_section').css('marginTop', 0);
                $('.account_section_section').css('marginTop', 0);
            }
        }
        else {
            setCookie('login', false);
        }
    }  
}