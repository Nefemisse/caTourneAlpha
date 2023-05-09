// Loggin

// A l'impulsion sur la touche
$(()=>{
    $("#field-password").keyup(function() {
        if($("#field-password").val() == "") {
            let errorMessage = "Entrez votre mot de passe";
            document.getElementById('password').textContent = errorMessage;
            $("#field-password").css("border-color", "#FF0000");
            $("#field-password").next(".cross").show();
            $("#password").css("color", "#FF0000");
        } else {
            $("#field-password").next(".cross").hide().text("");
            document.getElementById('password').textContent = ""
            $("#password").css("color", "#000000");
            $("#field-password").css("border-color", "#ced4da");
        }
    })
    $("#field-email").keyup(function() {
        if($("#field-email").val() == "") {
            let errorMessage = "Entrez votre adresse mail";
            document.getElementById('email').textContent = errorMessage;
            $("#field-email").css("border-color", "#FF0000");
            $("#field-email").next(".cross").show();
        $("#email").css("color", "#FF0000");
        } else if (!$("#field-email").val().match(/^([^<>\[\]\\,;:\s@"]*)@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}$/)) {
            $("#field-email").next(".cross").show().text("");
            let errorMessage = "Entrez une adresse mail valide";
            document.getElementById('email').textContent = errorMessage;
            $("#email").css("color", "#FF0000");
            $("#field-email").css("border-color", "#ced4da");
        } else {
            $("#field-email").next(".cross").hide().text("");
            document.getElementById('email').textContent = ""
            $("#email").css("color", "#000000");
            $("#field-email").css("border-color", "#ced4da");
        }
    })

    // A l'envois
    $("#envoyerLogin").click(()=>{
        valid = true;
        if($("#field-password").val() == "") {
            let errorMessage = "Entrez votre mot de passe";
            document.getElementById('password').textContent = errorMessage;
            $("#field-password").css("border-color", "#FF0000");
            $("#field-password").next(".cross").fadeIn();
            $("#password").css("color", "#FF0000");
            valid = false;
        }
        if($("#field-email").val() == "") {
            let errorMessage = "Entrez votre adresse mail";
            document.getElementById('email').textContent = errorMessage;
            $("#field-email").css("border-color", "#FF0000");
            $("#field-email").next(".cross").fadeIn();
            $("#email").css("color", "#FF0000");
            valid = false;
        } 
        return valid;
    })
});
