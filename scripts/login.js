$(document).ready(function(){
    
    
    $('.message a').click(function(){
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
    
    
    
    $('.pass').focusin(function(){
        $(this).attr('type', 'password');
    })

    $('.login-form').submit(function(event) {
        event.preventDefault();

        var $form = $(this);
        var url = $form.attr('action');



        var posting = $.post(url, {email: $('.email').val(), password: $('.pass').val()});


        posting.done(function(data) {

            data = JSON.parse(data);

            if (data.login) {
                
                setCookie('login', data.login);
                setCookie('email', data.email);
                setCookie('admin', data.admin);
                setCookie('accountType', data.accountType);
                
                window.location = `https://whsredandblack.herokuapp.com/index.html`;
            }
            else {
                $('.error').html('The email or password you entered is incorrect.')
                $('.error').css('display', 'block');
                $('.pass').val('')
            }

        })

    })
    
    
    $('.register-form').submit(function(event) {
        event.preventDefault();
        
        if ($('.r-pass').val() == $('.r-pass2').val()) {
            pass = $('.r-pass').val()
            if (pass.length >= 8 && /[a-zA-Z]/g.test(pass) && /\d/.test(pass)) {
                // CREATE ACCOUNT
                var $form = $(this);
                var url = $form.attr('action');
                
                var posting = $.post(url, {email: $('.r-email').val(), password: $('.r-pass').val()});
                
                posting.done(function(data) {
                    
                    data = JSON.parse(data);
                    
                    if (data.login) {
                        setCookie('login', data.login);
                        setCookie('email', data.email);
                        setCookie('admin', data.admin);
                        setCookie('accountType', data.accountType);

                        window.location = `https://whsredandblack.herokuapp.com/index.html`;
                    }
                    else {
                        $('.r-error').html('An account already exists for this email.')
                        $('.r-error').css('display', 'block');
                        $('.r-pass').val('')
                        $('.r-pass2').val('')
                    }
                    
                })
            }
            else {
                $('.r-error').html('Password does not meet requirements.')
                $('.r-error').css('display', 'block');
                $('.r-pass').val('')
                $('.r-pass2').val('')
            }
        }
        else {
            $('.r-error').html('Passwords do not match.')
            $('.r-error').css('display', 'block');
            $('.r-pass').val('')
            $('.r-pass2').val('')
        }
        
        
        var $form = $(this);
        var url = $form.attr('action');
    })
    
})