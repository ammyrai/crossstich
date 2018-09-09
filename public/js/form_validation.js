$(document).ready(function() {
  /*  Login form validation */
  $('#login_form').submit(function(e)
  {
        var email = $('#email').val();
        var password = $('#password').val();
        $(".error").remove();
        var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var validEmail = regEx.test(email);

        if(email === '' && password === '')
        {
              $('#email').after('<span class="error email_error">Please enter your E-mail.</span>');
              $('#password').after('<span class="error password_error">Please enter your password.</span>');
              return false;
        }
        else if (email === '')
        {
              $('#email').after('<span class="error email_error">Please enter your E-mail.</span>');
              return false;
        }
        else if (!validEmail)
        {
            $('#email').after('<span class="error email_error">Please enter a valid E-mail.</span>');
            return false;
        }
        else if (password === '')
        {
            $('#password').after('<span class="error password_error">Please enter your password.</span>');
            return false;
        }
        else {
          return true;
        }
  });

  $('#register').submit(function(e)
  {

    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var password_confirm = $('#password_confirm').val();
    var phone = $('#phone').val();
    var company_name = $('#company_name').val();

    var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var validEmail = regEx.test(email);

    if(name === '' && email === '' && password === '' && password_confirm === '' && phone === '' && company_name === '')
    {
        $('.error_msg_name').html('<span class="error">Please enter your name.</span>');
        $('.error_msg_email').html('<span class="error">Please enter your email.</span>');
        $('.error_msg_password').html('<span class="error">Please enter password.</span>');
        $('.error_msg_confirm').html('<span class="error">Please enter confirm password.</span>');
        $('.error_msg_phone').html('<span class="error">Please enter phone number.</span>');
        $('.error_msg_company').html('<span class="error">Please enter company name.</span>');
        return false;
    }
    else if(name === '')
    {
        $('.error_msg_name').html('<span class="error">Please enter your name.</span>');
        return false;
    }
    else if(email === '')
    {
        $('.error_msg_email').html('<span class="error">Please enter your email.</span>');
        return false;
    }
    else if (!validEmail)
    {
        $('.error_msg_email').html('<span class="error">Enter a valid email</span>');
        return false;
    }
    else if(password === '')
    {
        $('.error_msg_password').html('<span class="error">Please enter password.</span>');
        return false;
    }
    else if (password_confirm === '')
    {
        $('.error_msg_confirm').html('<span class="error">Please enter confirm password.</span>');
        return false;
    }
    else if (password != password_confirm )
    {
        $(".error_msg_confirm").html('<span class="error">Password do not match.</span>');
        hasError = true;
        return false;
    }
    else if (phone === '')
    {
        $('.error_msg_phone').html('<span class="error">Please enter phone number.</span>');
        return false;
    }
    else if (company_name === '')
    {
        $('.error_msg_company').html('<span class="error">Please enter company name.</span>');
        return false;
    }
    else
    {
        return true;
    }
  });

  $("#forgot_password").submit(function()
  {
        $(".error").remove();
        var email = $('#email').val();
        var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var validEmail = regEx.test(email);

        if (email === '')
        {
              $('.error_msg_email').html('<span class="error email_error">Please enter your E-mail.</span>');
              return false;
        }
        else if (!validEmail)
        {
            $('.error_msg_email').html('<span class="error email_error">Please enter a valid E-mail.</span>');
            return false;
        }
        else {
          return true;
        }
  })

  $("#contact").submit(function()
  {
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var validEmail = regEx.test(email);

        if(name === '' && email === '' && message === '')
        {
            $('.error_msg_name').html('<span class="error">Please enter your name.</span>');
            $('.error_msg_email').html('<span class="error">Please enter your email.</span>');
            $('.error_msg_message').html('<span class="error">Please enter a message.</span>');
            return false;
        }
        else if(name === '')
        {
            $('.error_msg_name').html('<span class="error">Please enter your name.</span>');
            return false;
        }
        else if(email === '')
        {
            $('.error_msg_email').html('<span class="error">Please enter your email.</span>');
            return false;
        }
        else if (!validEmail)
        {
            $('.error_msg_email').html('<span class="error">Enter a valid email</span>');
            return false;
        }
        else if(message === '')
        {
            $('.error_msg_message').html('<span class="error">Please enter a message.</span>');
            return false;
        }
        else
        {
          return true;
        }
  });

  $("#save_design").submit(function()
  {
        var patternname = $('#patternname').val();
        var textarea = $('.text-tags').html();
        $(".error").remove();
        if(patternname === '' && textarea === '')
        {
              $('.pattern_error').html('<span class="error">Please enter pattern name.</span>');
              $('.tag_error').html('<span class="error">Please enter tags.</span>');
              return false;
        }
        else if (patternname === '')
        {
              $('.pattern_error').html('<span class="error">Please enter pattern name.</span>');
              return false;
        }
        else if (textarea === '')
        {
            $('.tag_error').html('<span class="error">Please enter tags.</span>');
            return false;
        }
        else {
          return true;
        }
  });

  $('#reset_password').submit(function(e)
  {
      var email = $('#email').val();
      var password = $('#password').val();
      var password_confirm = $('#password-confirm').val();

      var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var validEmail = regEx.test(email);

      if(email === '' && password === '' && password_confirm === '' )
      {
          $('.error_msg_email').html('<span class="error">Please enter your email.</span>');
          $('.error_msg_password').html('<span class="error">Please enter password.</span>');
          $('.error_msg_confirm').html('<span class="error">Please enter confirm password.</span>');
          return false;
      }
      else if(email === '')
      {
          $('.error_msg_email').html('<span class="error">Please enter your email.</span>');
          return false;
      }
      else if (!validEmail)
      {
          $('.error_msg_email').html('<span class="error">Enter a valid email</span>');
          return false;
      }
      else if(password === '')
      {
          $('.error_msg_password').html('<span class="error">Please enter password.</span>');
          return false;
      }
      else if (password_confirm === '')
      {
          $('.error_msg_confirm').html('<span class="error">Please enter confirm password.</span>');
          return false;
      }
      else if (password != password_confirm )
      {
          $(".error_msg_confirm").html('<span class="error">Password do not match.</span>');
          hasError = true;
          return false;
      }
      else
      {
          return true;
      }
  });
});
