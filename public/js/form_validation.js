$(document).ready(function() {
  /*  Login form validation */
  $('#login_form').submit(function(e) {

    var email = $('#email').val();
    var password = $('#password').val();

    $(".error").remove();

    var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var validEmail = regEx.test(email);

    if(email === '' && password === '')
    {
      $('#email').after('<span class="error">Please enter your E-mail.</span>');
      $('#password').after('<span class="error">Please enter your password.</span>');
      return false;
    }
    else if (email === '')
    {
          $('#email').after('<span class="error">Please enter your E-mail.</span>');
          return false;
    }
    else if (password === '')
    {
        $('#password').after('<span class="error">Please enter your password.</span>');
        return false;
    }
    else if (!validEmail)
    {
              $('#email').after('<span class="error">Please enter a valid E-mail.</span>');
              return false;
    }
    else {
      return true;
    }

  });



  // $('#register').submit(function(e) {
  //   e.preventDefault();
  //   var name = $('#name').val();
  //   var email = $('#email').val();
  //   var password = $('#password').val();
  //   var password_confirm = $('#password_confirm').val();
  //   var phone = $('#phone').val();
  //   var company_name = $('#company_name').val();
  //
  //   if(name === '' && email === '' && password === '' && password_confirm === '' && phone === '' && company_name === '')
  //   {
  //   }
  //
  //   $(".error").remove();
  //   if (name.length < 1) {
  //     $('#name').after('<span class="error">This field is required</span>');
  //   }
  //   if (email.length < 1) {
  //     $('#email').after('<span class="error">This field is required</span>');
  //   } else {
  //     var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  //     var validEmail = regEx.test(email);
  //     if (!validEmail) {
  //       $('#email').after('<span class="error">Enter a valid email</span>');
  //     }
  //   }
  //   if (password.length < 8) {
  //     $('#password').after('<span class="error">Password must be at least 8 characters long</span>');
  //   }
  //   if (password_confirm.length < 1) {
  //     $('#password_confirm').after('<span class="error">This field is required</span>');
  //   }
  //   else if (password != password_confirm ) {
  //           $("#password_confirm").after('<span class="error">Passwords do not match.</span>');
  //           hasError = true;
  //       }
  //
  //  if (phone.length < 1) {
  //     $('#phone').after('<span class="error">This field is required</span>');
  //   }
  //   if (company_name.length < 1) {
  //     $('#company_name').after('<span class="error">This field is required</span>');
  //   }
  //
  // });
});
