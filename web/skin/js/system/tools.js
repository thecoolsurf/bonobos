/* system */
function host(){
    var host;
    if('https:'===document.location.protocol){
        host = 'https://ssl.'+location.host;
    }else{
        host = 'http://'+location.host;
    };
    return host;
}

function ajaxdir(){
    var matches = window.location.href.match('/admin/');
    suffix = (matches && matches.length) ? matches[0] : '/';
    return suffix;
}

function csspair(i){
    var css = (i%2===0)?'pair':'impair';
    return css;
}

function redorgreen(i){
    var css = (i<getTimer())?'green':'red';
    return css;
}

function scrollTop(){
    $(window).scroll(function(){
        var s = parseInt($(window).scrollTop());
        if(s > 100){
            $('#haut').show().animate({
                'marginTop': s+100
            },10);
            $('#haut').on('click',function(){
                $('html,body').scrollTop(0);
                $('#haut').hide().css('marginTop',0);
            });
        }
    });
}

function displayNavigation(){
    var w = parseInt($(window).width());
    var s = parseInt($(window).scrollTop());
    var h = parseInt($('#header').height());
    var n = parseInt($('#navigation').height());
    if(w < 980){
        $('#navigation').show();
        $('#menu').hide();
        $('#navigation .navig').show();
        $('#navigation .close').hide();
        if(s > h){
            $('#menu').css({
                'position':'fixed',
                'top':n
            });
            $('#haut').show();
        } else {
            $('#menu').css({
                'position':'absolute',
                'top':n
            });
            $('#haut').hide();
        }
    } else {
        $('#navigation').hide();
        $('#menu').show();
        $('#menu').css({
            'position':'absolute',
            'top':h
        });
        if(s > h){
            $('#menu').css({
                'position':'fixed',
                'top':0
            });
            $('#haut').show();
        } else {
            $('#haut').hide();
        }
    }
}

function scrollTopAndBlind(){
    $('#cookies .close').on('click',function(){
        $('#cookies').remove();
    });
    $('#logo').on('click',function(){
        window.location.href = '/';
    });
    $('#haut').on('click',function(){
        $('html,body').scrollTop(0);
        $('#haut,.blind,.sblind').hide();
        $('#navigation .navig').show();
        $('#navigation .close').hide();
    });
    $('#navigation .close').on('click',function(){
        $('#menu').hide();
        $('#navigation .navig').show();
        $('#navigation .close').hide();
    });
    $('#navigation .navig').on('click',function(){
        $('#menu').slideDown(400);
        $('.blind,.sblind').hide();
        $('.smenus').show();
        $('#navigation .navig').hide();
        $('#navigation .close').show();
    });
    $('.menu').on('click',function(){
        var e = $(this).attr('id').replace('menu','');
        $('#menu'+e+' .menus').addClass('focusMenus');
        $('.menu:not(#menu'+e+') .menus').removeClass('focusMenus');
        $('.blind:not(#blind'+e+')').slideUp(400);
        $('#blind'+e).slideDown(400);
    });
    $('.smenus').on('click',function(){
        var e = $(this).attr('id').replace('smenus','');
        $('.sblind:not(#sblind'+e+')').slideUp(400);
        $('#sblind'+e).slideDown(400);
    });
}

function switchCssMedias(){
    var w = parseInt($(window).width());
    var hoster = host()+'/web/skin/css/';
    if(w > 1100){
        $('#media').attr('href',hoster+'default.css');
    }
    if(w > 980 && w < 1100){
        $('#media').attr('href',hoster+'tablet.css');
    }
    if(w > 600 && w < 981){
        $('#media').attr('href',hoster+'ipad.css');
    }
    if(w < 600){
        $('#media').attr('href',hoster+'mobile.css');
    }
}

function displayLoader(cible){
    var loader = '<div class="loader"><i class="fa fa-circle-o-notch fa-spin"></i></div>';
    $(loader).appendTo(cible);
}

function removeLoader(){
    $('.loader').remove();
}

function redir(url){
    window.location.assign(url);
}

function redir_blank(url){
    window.open(url,'_blank');
}

function scrollWithPager(){
    $('.pager button').on('click',function(){
        if($(this).parent().parent().prev().length>0){
            prev = $(this).parent().parent().prev();
        }else{
            prev = $('body');
        }
        if($(this).parent().parent().next().length>0){
            next = $(this).parent().parent().next();
        }else{
            next = $(this).parent().parent();
        }
        if($('.blocOne').length>0){
            if($(this).attr('name')==='prev'){
                pos = prev.offset().top;
            }
            if($(this).attr('name')==='next'){
                pos = next.offset().top;
            }
            $('html,body').scrollTop(pos);
            removeLoader();
        }
    });
}

function loadXml(cat,name,node){
    var xml = new Array();
    $.ajax({
        type: 'GET',
        url: host()+'/web/datas/'+cat+'/'+name+'.xml',
        dataType: 'xml',
        success: function(data){
            $(node,data).each(function(i){
                rows = $(this).text().split(/\n/);
                $(rows).each(function(j,v){
                    if(v){
                        xml[j]=v;
                        console.debug(i+'-'+j+': '+v);
                    }
                });
            });
        }
    });
}

/* dates */
function getDateNow(){
    var n = new Date();
    return n.getDate()+'/'+(n.getMonth()+1)+'/'+n.getFullYear();
}

function getTimer(){
    var n = new Date();
    return Math.round(n.getTime()/1000);
}

function convertTimeToDate(timestamp){
    var a = new Date(timestamp*1000);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date+'/'+month+'/'+year;
    return time;
}

function convertDateToTime(date){
    var s = date.split('/');
    var n = new Date(s[2]+'-'+s[1]+'-'+s[0]);
    return n.getTime()/1000;
}

function datepicker(src,dst,formatte){
    $(src).datepicker({
        altField: $(dst),
        closeText: 'CLOSE',
        prevText: 'PREV',
        nextText: 'NEXT',
        currentText: 'NOW',
        firstDay: 1,
        numberOfMonths: 1,
        showWeek: false,
        weekHeader: 'SEM',
        monthNames: ['janvier','fevrier','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','decembre'],
        dayNames: ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'],
        dayNamesMin: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
        dateFormat: formatte
    });
    $(src).on('change',function(){
        time = convertDateToTime($(src).val());
        $(dst).val(time);
    });
}

/* form */
function addAlerte(datas,setup){
    var c = $(setup[2]);
    var a = '';
    var t = datas.split('|');
    if(t[0].match(/message/gi)){
        id = 'msgValid';
    } else {
        id = 'msgError';
    }
    a += '<div id="'+id+'" class="alerte">';
    $.each(t,function(i){
        a += t[i];
    });
    a += '<div class="close"><i class="fa fa-times-circle"></i></div>';
    a += '</div>';
    $('#'+id).remove();
    $(a).appendTo(c);
    $('#'+id).show().animate({
        'left': '0px'
    },200);
    $('#'+id+' .close').on('click',function(){
        $(this).parent().remove();
    });
}

function compte(target){
    var total = $('#'+target).val().length;
    $('#'+target+'_rest').val(total);
}

function switchDefault(cible,value){
    $(window).load(function(){
        if($('#'+cible).val() === value){
            $('#'+cible).val('');
        } else {
            $('#'+cible).val(value);
        }
    });
    $('#'+cible).focus(function(){
        if($(this).val() === value){
            $(this).val('');
        }
    });
    $('#'+cible).blur(function(){
        if($(this).val() === ''){
            $(this).val(value);
        }
    });
}

function switchCpostal(){
    var c1 = $('#code1');
    var c2 = $('#code2');
    var cp = $('#cpostal');
    $(window).load(function(){
        c1.val('75');
        c2.val('001');
        cp.val(c1.val()+c2.val());
    });
    c1.focus(function(){
        if(c1.val() === '75'){
            c1.val('');
        }
        cp.val(c1.val()+c2.val());
    });
    c1.blur(function(){
        if($(this).val() === ''){
            c1.val('75');
        }
        cp.val(c1.val()+c2.val());
    });
    c2.focus(function(){
        if(c2.val() === '001'){
            c2.val('');
        }
        cp.val(c1.val()+c2.val());
    });
    c2.blur(function(){
        if($(this).val() === ''){
            c2.val('001');
        }
        cp.val(c1.val()+c2.val());
    });
}

function appendSpan(cible,span){
    if($(cible).parent().find(span).size() === 0){
        $('<span class="'+span+'"></span>').appendTo($(cible).parent());
    }
}

function removeSpan(cible){
    $(cible).parent().children('.fa').remove();
}

function appendCss(cible,color){
    $(cible).parent().children(':first-child').css({
        'color': color
    });
}

function setupFalse(cible){
    removeSpan($(cible),'fa fa-check');
    appendSpan($(cible),'fa fa-times-circle');
}

function setupTrue(cible){
    removeSpan($(cible),'fa fa-close');
    appendSpan($(cible),'fa fa-check-circle');
    $('#msgError').remove();
}

function reg_select(input){
    $('#'+input).change(function(){
        var value = $(this).parent().children(':first-child').text();
        $(this).val() === 0 ? setupFalse(this,value):setupTrue(this);
    });
}

function reg_text(input){
    $('#'+input).keyup(function(){
        var value = $(this).parent().children(':first-child').text();
        $(this).val().match(/[:$%#\/<>&]/) || $(this).val() === '' ? setupFalse(this):setupTrue(this,value);
    });
}

function reg_phone(){
    if($('#phon5').length > 0){
        switchDefault('phon1','00');
        switchDefault('phon2','00');
        switchDefault('phon3','00');
        switchDefault('phon4','00');
        switchDefault('phon5','00');
        $('#phon5').keyup(function(){
            phon1 = $('#phon1').val();
            phon2 = $('#phon2').val();
            phon3 = $('#phon3').val();
            phon4 = $('#phon4').val();
            phon5 = $('#phon5').val();
            $('#phone').val(phon1+' '+phon2+' '+phon3+' '+phon4+' '+phon5);
            var phone = $('#phone').val();
            phone.match(/^([0-9][1-9]( )){1}(([0-9][0-9])( )){3}([0-9][0-9])$/) ? setupTrue(this):setupFalse(this,'phone');
        });
    } else {
        switchDefault('phone','00 00 00 00 00');
        $('#phone').keyup(function(){
            var phone = $(this).val();
            phone.match(/^([0-9][1-9]( )){1}(([0-9][0-9])( )){3}([0-9][0-9])$/) ? setupTrue(this):setupFalse(this,'phone');
        });
    }
}

function reg_mail(input){
    $('#'+input).keyup(function(){
        var value = $(this).parent().children(':first-child').text();
        $(this).val().match(/^([a-zA-Z0-9._-]*)@([a-zA-Z0-9._-]*)\.([a-zA-Z]*)/) ? setupTrue(this):setupFalse(this,value);
    });
}

function reg_mess(input){
    $('#'+input).blur(function(){
        var value = $(this).parent().children(':first-child').text();
        if($(this).val() === ''){
            setupFalse(this,value);
        } else {
            setupTrue(this);
        }
    });
}

function reg_mdp(input){
    $('#'+input).keyup(function(){
        if(!$(this).val().match(/^([a-zA-Z0-9]{5,15})$/)){
            var minim = 'CARACTERES MIN:5<br />CARACTERES MAX:15';
            var value = $(this).parent().children(':first-child').text()+'<br />'+minim;
            setupFalse(this,value);
        } else {
            setupTrue(this);
        }
    });
}

function reg_date(cible){
    var tag = $('#annee');
    $('#annee').change(function(){
        value = $(this).parent().children(':first-child').text();
        jj = $('#jour').val();
        mm = $('#mois').val();
        aa = $('#annee').val();
        $(cible).val(jj+'/'+mm+'/'+aa);
        $(cible).val().match(/^([0-3][0-9])\/([0-1][1-9])\/([1-2])([0-9]{3})/) ? setupTrue(tag):setupFalse(tag,value);
    });
}

/*addLabelInput*/
function addLabelInput(i,t,v){
    var input = '';
    /*title*/
    if(t === 'titles'){
        input += '<div class="'+t+'" id="'+i+'">'+v+'</div>';
    }
    /*legend*/
    if(t === 'legend'){
        input += '<div class="'+t+'" id="'+i+'">'+v+'</div>';
    }
    /*infos*/
    if(t === 'infos'){
        input += '<div class="form-row">';
        input += '<label>'+t+'</label><span>'+v+'</span>';
        input += '</div>';
    }
    /*text*/
    if(t === 'text'){
        input += '<div class="form-row">';
        input += '<label>'+i+'</label>';
        input += '<input type="'+t+'" id="'+i+'" name="'+i+'" value="'+v+'" class="input" />';
        input += '</div>';
    }
    /*password*/
    if(t === 'password'){
        input += '<div class="form-row">';
        input += '<label>'+i+'</label>';
        input += '<input type="'+t+'" id="'+i+'" name="'+i+'" value="'+v+'" class="input" />';
        input += '</div>';
    }
    /*textarea*/
    if(t === 'textarea'){
        input += '<div class="form-row">';
        input += '<label>'+i+'</label>';
        input += '<'+t+' id="'+i+'" name="'+i+'" class="input">'+v+'</'+t+'>';
        input += '</div>';
    }
    /*textarea_count*/
    if(t === 'textarea_count'){
        input += '<div class="form-row">';
        input += '<label>'+i+'</label>';
        input += '<textarea id="'+i+'" name="'+i+'" class="input" onblur="compte(\''+i+'\');">'+v+'</textarea>';
        input += '<input class="counter" id="'+i+'_rest" readonly="readonly" />';
        input += '</div>';
    }
    /*hidden*/
    if(t === 'hidden'){
        input += '<input type="'+t+'" id="'+i+'" name="'+i+'" value="'+v+'" />';
    }
    /*select*/
    if(t === 'select'){
        input += '<div class="form-row">';
        input += '<label>'+i+'</label>';
        input += '<select class="select" id="'+i+'" name="'+i+'">';
        for (i = 0; i < v.length; i++){
            input += '<option value="'+i+'">'+v[i]+'</option>';
        }
        input += '</select>';
        input += '</div>';
    }
    /*phone*/
    if(t === 'phone'){
        var phon1 = v[0].substr(0,2);
        var phon2 = v[0].substr(3,2);
        var phon3 = v[0].substr(6,2);
        var phon4 = v[0].substr(9,2);
        var phon5 = v[0].substr(12,2);
        input += '<div class="form-row">';
        input += '<label>'+i+'</label>';
        input += '<input type="text" class="phone" id="phon1" name="phon1" value="'+phon1+'" maxlength="2" />';
        input += '<input type="text" class="phone" id="phon2" name="phon2" value="'+phon2+'" maxlength="2" />';
        input += '<input type="text" class="phone" id="phon3" name="phon2" value="'+phon3+'" maxlength="2" />';
        input += '<input type="text" class="phone" id="phon4" name="phon2" value="'+phon4+'" maxlength="2" />';
        input += '<input type="text" class="phone" id="phon5" name="phon2" value="'+phon5+'" maxlength="2" />';
        input += '<input type="hidden" name="phone" id="phone" value="" />';
        input += '</div>';
    }
    /*code*/
    if(t === 'code'){
        var code1 = v.substr(0,2);
        var code2 = v.substr(2,3);
        input += '<div class="form-row">';
        input += '<label>'+i+'</label>';
        input += '<input type="text" class="code1" id="code1" name="code1" value="'+code1+'" maxlength="2" />';
        input += '<input type="text" class="code2" id="code2" name="code2" value="'+code2+'" maxlength="3" />';
        input += '<input type="hidden" name="cpostal" id="cpostal" value="'+v+'" />';
        input += '</div>';
    }
    /*dates*/
    if(t === 'dates'){
        input += '<div class="form-row">';
        input += '<label>'+i+'</label>';
        input += '<select class="dater select" id="jour" name="jour">';
        input += '</select>';
        input += '<select class="dater select" id="mois" name="mois">';
        input += '</select>';
        input += '<select class="dater select" id="annee" name="annee">';
        input += '</select>';
        input += '<input type="hidden" id="'+i+'" name="'+i+'" value="" />';
        input += '</div>';
    }
    /*fin|debut|date|create_at|expire_at*/
    if(i === 'fin' || i=== 'debut' || i==='date' || i==='create_at' || i==='expire_at'){
        input += '<input type="hidden" id="date_'+i+'" name="date_'+i+'" value="'+convertDateToTime(v)+'" />';
    }
    /*photo*/
    if(t === 'photo'){
        input += '<div class="photo">';
        input += '<img id="photoprev" src="'+host()+'/skin/images/no_photo.jpg" />';
        input += '<span class="legend">'+v+'</span>';
        input += '<button class="btnFocus btnPhoto" type="button" id="cropping">photo</button>';
        input += '<input type="hidden" name="photo" id="photo" value="'+getTimer()+'.jpg'+'" />';
        input += '</div>';
    }
    /*image*/
    if(t === 'image'){
        input += '<img class="preview" id="preview" src="" />';
        input += '<table class="uploader">';
        input += '<tr>';
        input += '<td><p><input type="file" name="image" id="image" /></p></td>';
        input += '<td>';
        input += '<p><input type="radio" class="radio" id="radio1" name="crop" value="1" />&nbsp;HORIZONTAL</p>';
        input += '<p><input type="radio" class="radio" id="radio2" name="crop" value="2" />&nbsp;VERTICAL</p>';
        input += '</td>';
        input += '<td><p><label>FILE NAME</label><span id="prev">'+v+'</span></p></td>';
        input += '<td>&nbsp;</td>';
        input += '</tr>';
        input += '</table>';
    }
    /*googlemap*/
    if(t === 'googlemap'){
        input += '<div class="form-row">';
        input += '<div id="google'+i+'" class="googlemap">';
        input += '<div id="'+i+'" class="map"></div>';
        input += '<span class="lat">'+v[0]+'</span>';
        input += '<span class="lng">'+v[1]+'</span>';
        input += '</div>';
        input += '</div>';
    }
    return input;
}

/*slideEditor*/
function slideEditor(data,setup){
    $('#editor,#fondshadow').remove();
    $('<div id="fondshadow"></div>').appendTo('#fondrepeat');
    $('#fondshadow').fadeIn(400);
    var editor = '';
    editor += '<div class="alerte" id="editor">';
    editor += '<div class="close"><i class="fa fa-times-circle"></i></div>';
    $.each(data,function(index,value){
        editor += addLabelInput(index,value[0],value[1]);
    });
    editor += '<p class="form">';
    editor += '<button class="btnFocus" type="button" name="'+setup[0]+'">'+setup[1]+'</button>';
    editor += '</p>';
    editor += '</div>';
    $(editor).appendTo(setup[2]);
    $('#editor').show().animate({'left': '10px'},400);
    $('#editor .close').on('click',function(){
        $(this).parent().remove();
        $('#fondshadow').remove();
    });
    $('#editor textarea').each(function(){
        $(this).height($(this).prop('scrollHeight')+25);
    });
    $('button[name="'+setup[0]+'"]').on('click',function(){
        var news = {};
        $.each(data,function(index,values){
            if(values[0].match(/textarea/)){
                value = $('textarea[name="'+index+'"]').val();
            }else if(values[0].match(/select/)){
                value = $('select[name="'+index+'"]').val();
            }else{
                value = $('input[name="'+index+'"]').val();
            }
            news[index] = encodeURIComponent(value);
        });
        XHRsender(news,setup);
    });
}

/*addSelectOptions*/
function addSelectOptions(type,file,tag,def){
    if(type==='xml'){
        $.ajax({
            type: 'GET',
            url: host()+'/web/datas/system/'+file+'.xml',
            dataType: 'xml',
            success: function(xml){
                $(tag,xml).each(function(i){
                    var selected = (i===def) ? ' selected="selected"':'';
                    $('#editor #'+file).append('<option value="'+i+'"'+selected+'>'+$(this).text()+'</option>');
                });
            },
            error: function(){
                alert(host()+'/web/datas/system/'+file+'.xml');
            }
        });
    }
    if(type==='ari'){
        $.each(file,function(i,v){
            var selected = (i===def) ? ' selected="selected"':'';
            $('#editor #'+tag).append('<option value="'+i+'"'+selected+'>'+v+'</option>');
        });
    }
    if(type==='arv'){
        $.each(file,function(i,v){
            var selected = (v===def) ? ' selected="selected"':'';
            $('#editor #'+tag).append('<option value="'+v+'"'+selected+'>'+v+'</option>');
        });
    }
}

/* xhr */
function XHRsender(data,setup){
    var matches = window.location.href.match('/admin/');
    if(matches && matches.length){
        suffix = matches[0];
    }else{
        suffix = '/';
    }
    var loc = host()+'/web/app_dev.php'+suffix+'ajax/';
    var params = 'xhr='+true+'&';
    var btnName = setup[0];
    var btnValue = setup[1];
    var file = setup[3];
    $.each(data,function(index,value){
        if(!index.match(/titles|legend|information|relogin/)){
            params += index+'='+value+'&';
        }
    });
    params += btnName+'='+btnValue;
    displayLoader('#framepage');
    $.ajax({type: 'POST',url: loc+file,data: params,datatype: 'text',timeout: 6000,
        success: function(res){
            addAlerte(res,setup);
            removeLoader();
        }
    });
}

function XHRgoogle(id){
    var icon = host()+'/web/skin/images/googlemap.png';
    if($('.googlemap').length>0){
        var lat = parseFloat($('#googlemap'+id+' .lat').text());
        var lng = parseFloat($('#googlemap'+id+' .lng').text());
        var pos = {lat:lat,lng:lng};
        var lieu = $('input[name="nom"]').val();
        var adre = $('input[name="adress"]').val();
        var cpos = $('input[name="cpostal"]').val();
        var vill = $('input[name="ville"]').val();
        var option = {center:pos,scrollwheel:true,zoom:16};
        var map = new google.maps.Map(document.getElementById('map'+id),option);
        var marker = new google.maps.Marker({map:map,position:pos,icon:icon,title:lieu+' '+adre+' '+cpos+' '+vill});
        $('.googlemap:not(#googlemap'+id+')').animate({'height':0},400);
        $('#googlemap'+id).animate({'height':400},400);
        $('.googlemap .close').on('click',function(){$(this).parent().slideUp(400);});
    }
}

function XHRupload(a,b){
    var fd = new FormData();
    fd.append('image',$('#image')[0].files[0]);
    displayLoader();
    $('<img id="cropbox" />').appendTo('#crops .right');
    $.ajax({
        type: 'POST',
        url: host()+'/web/ajax/cadrage',
        data: fd,
        processData: false,
        contentType: false,
        xhr: function(){
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress',function(evt){
                if(evt.lengthComputable){
                    var percent = evt.loaded / evt.total * 100;
                    var txt = Math.floor(percent);
                    $('#progress b').html(txt);
                    $('progress').attr('value',percent).text(txt);
                }
            },false);
            return xhr;
        },
        success: function(data){
            removeLoader();
            var jcrop_api,boundx,boundy;
            var result = data.split('|');
            $('#tailles,#telechargement,#validation').hide();
            $('#recadrement,#effacement').show();
            $('#preview').attr('src',host()+'/'+result[0]);
            $('#preview').css({width:'auto',height:b});
            $('#cropbox').attr('src',host()+'/'+result[0]);
            $('#photo').val(result[1]);
            $('#cropbox').Jcrop({
                onChange: updatePreview,
                onSelect: updateCoords,
                boxWidth: 400,
                boxHeight: 500,
                bgColor: 'black',
                bgOpacity: 0.3,
                setSelect: [10,10,a,b],
                aspectRatio: 0.8
            },function(){
                var bounds = this.getBounds();
                boundx = bounds[0];
                boundy = bounds[1];
                jcrop_api = this;
            });
            function updatePreview(c){
                if(parseInt(c.w) > 0){
                    var rx = a / c.w;
                    var ry = b / c.h;
                    $('#preview').css({
                        width: Math.round(rx * boundx)+'px',
                        height: Math.round(ry * boundy)+'px',
                        marginLeft: '-'+Math.round(rx * c.x)+'px',
                        marginTop: '-'+Math.round(ry * c.y)+'px'
                    });
                }
            };
            function updateCoords(c){
                $('#x').val(c.x);
                $('#y').val(c.y);
                $('#w').val(c.w);
                $('#h').val(c.h);
            };
        },
        error: function(){
            $('#preview').attr('src',host()+'/web/skin/images/error_img.jpg');
            $('#preview').css({width: a,height: b,marginLeft: 0,marginTop: 0});
            addAlert('#crops','ERREUR DE TELECARGEMENT');
        }
    });
}

function XHRcrop(a,b){
    displayLoader();
    $('#progress b').html(0);
    $('progress').attr('value',0);
    var params = {
        x: $('#x').val(),
        y: $('#y').val(),
        w: $('#w').val(),
        h: $('#h').val(),
        file: $('#photo').val(),
        recadrer: 'RECADRER'
    };
    $.ajax({
        type: 'POST',
        url: host()+'/ajax/cadrage',
        data: $.param(params),
        datatype: 'text',
        timeout: 3000,
        success: function(data){
            removeLoader();
            var result = data.split('|');
            $('#recadrement').hide();
            $('#checker,#validation').show();
            $('#preview_container').attr('href',host()+'/'+result[0]).attr('rel','lightbox');
            $('#preview').attr('src',host()+'/'+result[1]);
            $('#preview').css({width: a,height: b,marginLeft: 0,marginTop: 0});
            $('#photo').val(result[2]);
            $('.membres-adresse .vignette img').attr('src',host()+'/'+result[1]);
        },
        error: function(){
            $('#preview').attr('src',host()+'/skin/images/no_photo.jpg');
            $('#preview').css({width: a,height: b,marginLeft: 0,marginTop: 0});
            addAlert('containFloat','ERREUR DE RECADRAGE');
            return;
        }
    });
}

function XHRremove(a,b){
    displayLoader();
    $('#tailles,#telechargement').show();
    $('#recadrement,#effacement,#validation').hide();
    $('#progress b').html(0);
    $('progress').attr('value',0);
    var params = {
        file: $('#photo').val(),
        effacer: 'SUPPRIMER'
    };
    $.ajax({
        type: 'POST',
        url: host()+'/ajax/cadrage',
        data: $.param(params),
        datatype: 'text',
        timeout: 3000,
        success: function(data){
            removeLoader();
            $('#checker').hide();
            $('#preview_container').removeAttr('href').removeAttr('rel');
            $('#photoprev').attr('src',host()+'/web/skin/images/'+data);
            $('#preview').attr('src',host()+'/web/skin/images/'+data);
            $('#preview').css({width: a,height: b,marginLeft: 0,marginTop: 0});
            $('#cropbox,.jcrop-holder').remove();
            $.Jcrop('#cropbox').destroy();
        }
    });
}

function XHRcomplete(){
    var city = 'input[name="membres[city]"]';
    var zipcode = 'input[name="membres[zipcode]"]';
    $(city,zipcode).keyup(function(){
        $('#complete').remove();
        var id = $(this).attr('id');
        if($(this).val().length===3){
            $('<ul id="complete"></ul>').appendTo($('#'+id).parent());
            if(id==='membres_zipcode'){
                var params = $.param({cp: $(zipcode).val()});
            }
            if(id==='membres_city'){
                var params = $.param({vi: $(city).val()});
            }
            $.ajax({
                type: 'POST',
                url: host()+'/ajax/villes',
                data: params,
                datatype: 'text',
                timeout: 3000,
                success: function(data){
                    $('#complete').html(data);
                    $('#complete li').on('click',function(){
                        res = $(this).text().split('|');
                        $(zipcode).val(res[0]);
                        $(city).val(res[1]);
                        $('#complete').remove();
                    });
                }
            });
        }
    });
}

function XHRtimer(cible,callback){
    $(cible).on({
        mouseenter: function(){
            clearInterval($(this).data('timer'));
        },
        mouseleave: function(){
            $(this).data('timer',setInterval(callback,6000));
        }
    }).trigger('mouseleave');
}

/* gallery */
function galeriePhotos(){
    $('#galerie img').on('load',function(){
        $(this).animate({'width': '100%','marginLeft': '0%'},1000);
        removeLoader();
    }).each(function(){
        if(this.complete){
            $(this).load();
        }
    });
}

/*widget*/
function widgetInsert(){
    var setup = ['insert','ENVOYER','#fondrepeat','membres-insert'];
    var n = new Date();
    var jour = $('#jour').val(),
        mois = $('#mois').val(),
        annee = $('#annee').val();
    var dd={0:'JJ'};for(i=1;i<32;i++){i<10?dd[i]='0'+i:dd[i]=i;}
    var mm={0:'MM'};for(i=1;i<13;i++){i<10?mm[i]='0'+i:mm[i]=i;};
    var yy={0:'AAAA'};var y=n.getFullYear();for(i=y-70;i<y-18;i++){yy[i]=i;};
    var legend  = 'Pour toute demande de renseignement ou inscription,remplissez le formulaire ci-après,';
        legend += 'ou contactez-nous au:<br /><b>06.16.39.04.64</b><br />ou par email à:<br />';
        legend += '<a href="mailto:soireesdannie[a]orange.fr">soireesdannie[a]orange.fr</a>';
    var data = {
        titles:['titles','Demande de<br>renseignements'],
        legend:['legend',legend],
        genre:['select',['Choisissez','Madame','Mademoiselle','Monsieur']],
        statut:['select',['Choisissez','Célibataire','Divorcé(e)','Veuf','Veuve','Confidentiel']],
        naissance:['dates',[]],
        nom:['text',''],
        prenom:['text',''],
        email:['text','votre@email.fr'],
        pseudo:['text','pseudonyme'],
        motpass:['password','motdepass'],
        phone:['phone',['00 00 00 00 00']]
        //photo:['photo','Ajoutez ou Modifiez la Photo du profil membre.']
    };
    slideEditor(data,setup);
    addSelectOptions('arv',dd,'jour',jour);
    addSelectOptions('arv',mm,'mois',mois);
    addSelectOptions('arv',yy,'annee',annee);
    $('#editor #'+setup[0]).on('click',function(){
        var params = {};
        $.each(data,function(i){
            params[i] = $('#editor #'+i).val();
        });
    });
}

function widgetConex(){
    var setup = ['connexion','ENVOYER','#fondrepeat','membres-connex'];
    var data = {
        titles:['titles','Connexion membres'],
        legend:['legend','Pour obtenir des informations sur votre compte ou une soirée,complétez le formulaire ci-après.'],
        _username:['text','votre@email.fr'],
        _password:['password','motdepass'],
        relogin:['legend',['<a href="#">Mot de passe oublié?</a>']]
    };
    $('html,body').scrollTop(0);
    slideEditor(data,setup);
    $('#editor label:eq(0)').text('Email');
    $('#editor label:eq(1)').text('Mot passe');
    switchDefault('_username','votre@email.fr');
    switchDefault('_password','motdepass');
    reg_mail('_username');
    reg_mdp('_pasword');
    $('#editor #relogin').on('click',function(){
        widgetRelog();
        switchDefault('email','votre@email.fr');
        reg_mail('email');
    });
}

function widgetRelog(){
    var setup = ['relogin','ENVOYER','#fondrepeat','membres-relogin'];
    var data = {
        titles:['titles','Mot de passe oublié?'],
        legend:['legend','Pour obtenir les informations de votre compte,complétez le formulaire ci-après.'],
        email:['text','votre@email.com']
    };
    slideEditor(data,setup);
}

function widgetPhoto(){
    var def = host()+'/web/skin/images/no_photo.jpg';
    $('#preview').attr('src',def);
    $('#cropping').on('click',function(){
        $('html,body').scrollTop(0);
        $('#crops').slideDown(400);
    });
    $('#image').on('change',function(){
        XHRupload(100,125);
    });
    $('#cadrage').on('click',function(){
        XHRcrop(100,125);
        var src = $('#preview').attr('src');
        $('#photoprev').attr('src',src);
        $('#photo').val($('#file').val());
    });
    $('#validate').on('click',function(){
        var src = $('#preview').attr('src');
        $('#photoprev').attr('src',src);
        $('#crops').slideUp(400);
    });
    $('#effacer').on('click',function(){
        $('#photoprev,#preview').attr('src',def);
        XHRremove(100,125);
    });
    $('#crops #btnClose').on('click',function(){
        $('#crops').slideUp(400);
    });
}

/* animation galerie */

function slideHeader(){
    var width = $('#header .slide').width();
    var count = $('#header .slide').length-1;
    var maxi = count*width;
    var marge = 0;
    $('#header #slider').css('width',maxi*width);
    $('#header .slide').each(function(i){
        $('#header #slider').delay(2000).animate({'marginLeft':-(i*width)+'px'},1500,
        function(){
            marge = parseInt($('#header #slider').css('marginLeft'));
            $('#header #slide'+i+' .caption').animate({'bottom':0},600).delay(1500).animate({'bottom':-150},600);
            if(marge===-maxi){
                $('#header #slider').delay(2000).animate({'marginLeft':0},1000);
            }
        });
    });
}