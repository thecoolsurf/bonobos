function focusNavigation(){
    var uri = document.location.href.split('/');
    var n = uri.length-1;
    var id = (uri[n])?uri[n]:uri[n-1];
    $('body').attr('id',id);
    $('#menu_'+id).removeClass().addClass('active');
}

$(document).ready(function(){
    scrollTop();
    focusNavigation();
});
