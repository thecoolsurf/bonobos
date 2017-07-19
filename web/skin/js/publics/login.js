function focusNavigation(){
    var uri = document.location.href.split('/');
    var n = uri.length-1;
    var id = (uri[n])?uri[n]:uri[n-1];
    $('body').attr('id',id);
    $('#menu_'+id).removeClass().addClass('active');
}

function FOSUserForm(){
    $('#username').addClass('form-control').attr('placeholder','username');
    $('#password').addClass('form-control').attr('placeholder','password');
    $('#_submit').addClass('btn btn-primary');
    $('input[type="text"]').each(function (){
        $(this).prev().addBack().wrapAll('<div class="form-group">');
    });
    $('input[type="password"]').each(function (){
        $(this).prev().addBack().wrapAll('<div class="form-group">');
    });
    $('input[type="checkbox"]').each(function (){
        $(this).next().addBack().wrapAll('<div class="form-group">');
    });
}

$(document).ready(function(){
    scrollTop();
    focusNavigation();
});
