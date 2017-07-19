function XHRconnexion(){
    $('#admin_login').on('click',function(){
        var setup = ['connexion','ENVOYER','#framepage','membres-connex'];
        var adminNom  = $('input[name="admin[nom_admin]"]').val();
        var adminPass = $('input[name="admin[pass_admin]"]').val();
        var data = {
            _username:adminNom,
            _password:adminPass
        };
        XHRsender(data,setup);
    });
}

$(document).ready(function(){
    XHRconnexion();
});
