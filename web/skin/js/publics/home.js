function focusNavigation(){
    $('body').attr('id','home');
    $('#menu_home').removeClass().addClass('active');
}

$(document).ready(function(){
    scrollTop();
    focusNavigation();
});
