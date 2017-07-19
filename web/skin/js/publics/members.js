function XHRinsert(){
    var msg = '';
    var loc = '/web/app_dev.php/ajax/friend-insert';
    $('button[name="friend-insert"]').on('click',function(){
        var id = $(this).parent().parent().attr('id').replace('row','');
        var data = {id:id};
        $.ajax({
            type:'POST',url:host()+loc,data:data,datatype:'text',timeout:3000,
            success:function(data){
                msg += '<div id="msg" class="alert alert-success">';
                msg += '<p>'+data+'</p>';
                msg += '</div>';
                if($('#msg').length===0){
                    $('#main .row:first').before(msg);
                }else{
                    $('#msg').remove();
                    $('#main .row:first').before(msg);
                }
            },
            error:function(){
                msg += '<div id="msg" class="alert alert-danger">';
                msg += '<p>'+'This friend allready exists!'+'</p>';
                msg += '</div>';
                if($('#msg').length===0){
                    $('#main .row:first').before(msg);
                }else{
                    $('#msg').remove();
                    $('#main .row:first').before(msg);
                }
            }
        });
    });
}

function focusNavigation(){
    var uri = document.location.href.split('/');
    var n = uri.length-1;
    var id = (uri[n])?uri[n]:uri[n-1];
    $('body').attr('id',id);
    $('#menu_'+id).removeClass().addClass('active');
    $('#subscribe').remove();
}

$(document).ready(function(){
    scrollTop();
    focusNavigation();
    XHRinsert();
});
