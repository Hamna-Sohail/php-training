$(document).ready(function(){
    $('#contactform').submit(function(e){
        e.preventDefault();

        $('#namecheck, #emailcheck, #messagecheck').html('').css("color", "");

        var name = $('#input-name').val();
        var email = $('#input-email').val();
        var message = $('#input-message').val();
        var isValid = true;

        if(name === ''){
            $('#namecheck').html("Please enter the name").css("color", "red");
            isValid = false;
        }
        if(email === ''){
            $('#emailcheck').html("Please enter the email").css("color", "red");
            isValid = false;
        }
        if(message === ''){
            $('#messagecheck').html("Please enter a message").css("color", "red");
            isValid = false;
        }

        if(isValid){
            setTimeout(function(){
                if(Math.random() > 0.5){
                    $('#response').html("Thank you for your message");

                    $('#input-name').val('');
                    $('#input-email').val('');
                    $('#input-message').val('');
                }
                else{
                    $('#response').html("An error occurred");
                }
            }, 2000);
        }
   
    });
});