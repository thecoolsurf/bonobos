function focusNavigation(){
    var uri = document.location.href.split('/');
    var n = uri.length-1;
    var id = (uri[n])?uri[n]:uri[n-1];
    $('body').attr('id',id);
    $('#menu_'+id).removeClass().addClass('active');
    $('#subscribe').remove();
}

function FOSUserForm(){
    $('#fos_user_registration_form_genre').addClass('form-control');
    $('#fos_user_registration_form_genre').parent().addClass('form-group');
    $('#fos_user_registration_form_born').addClass('form-control');
    $('#fos_user_registration_form_born').parent().addClass('form-group');
    $('#fos_user_registration_form_race').addClass('form-control');
    $('#fos_user_registration_form_race').parent().addClass('form-group');
    $('#fos_user_registration_form_family').addClass('form-control');
    $('#fos_user_registration_form_family').parent().addClass('form-group');
    $('#fos_user_registration_form_foods').addClass('form-control');
    $('#fos_user_registration_form_foods').parent().addClass('form-group');
    
    $('#fos_user_registration_form_username').addClass('form-control').attr('placeholder','username');
    $('#fos_user_registration_form_username').parent().addClass('form-group');
    $('#fos_user_registration_form_lastname').addClass('form-control');
    $('#fos_user_registration_form_lastname').parent().addClass('form-group');

    $('#fos_user_registration_form_email').addClass('form-control').attr('placeholder','email');
    $('#fos_user_registration_form_email').parent().addClass('form-group');
    
    $('#fos_user_registration_form_plainPassword_first').addClass('form-control').attr('placeholder','password');
    $('#fos_user_registration_form_plainPassword_first').parent().addClass('form-group');
    $('#fos_user_registration_form_plainPassword_second').addClass('form-control').attr('placeholder','password');
    $('#fos_user_registration_form_plainPassword_second').parent().addClass('form-group');
}

$(document).ready(function(){
    scrollTop();
    focusNavigation();
    FOSUserForm();
});
