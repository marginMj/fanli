(function($){
    $(function(){
        //账号输入框
        //当输入不为空时（包括空格），显示×
        var space = /\s+/g;
        /*var a = '      1245 21354 56345 ';
        console.log(a.replace(space,''));*/
        $('input').focus(function(){
            $(this).addClass("input-focus");
        });
        $('input').blur(function(){
            $(this).removeClass("input-focus");
        });

        if(getCookie("emile")&&getCookie("password")){
            console.log('is cookie')
            $('#username').val(getCookie("emile"));
            $('#psw').val(getCookie("password"));

        }


        $('#username').bind('input propertychange', function() {
            var value = $(this).val().replace(space,'');
           if(value.length!=0){
               $('#empty-username').css({display:'block'});
               $('#empty-username').click(function(){
                   $('#username').val('');
               });
                //console.log(($(this).val().replace(space,'')));
           }
        });

        //密码输入框
        /*$('#password').bind('input propertychange', function() {
            var value = $(this).val().replace(space,'');
        });*/
        //密码框聚焦时，如果输入框有空格，则去掉
        $('#psw').focus(function(){
            //console.log(111);
            $('#username').val($('#username').val().replace(space,''));
        });


        //匹配验证码
        /*var flag = false;
        var words = ['3EM6','VGCR','9YTB','YCBL','RKM9','M384','EM2N','5X9D','XS43','LYTS','W4UV']
        var ran = Math.ceil(Math.random()*10);
        $('#codeimg').attr('src','../img/yzm'+ran+'.png');
        $('.change-verify').click(function(){
            ran = Math.ceil(Math.random()*10);
            $('#codeimg').attr('src','../img/yzm'+ran+'.png');
        });
        $('#passcode').bind('input propertychange', function() {
            //console.log(words[ran]);
            if($(this).val().length==4){
                if($('#passcode').val()==words[ran]){
                    $('.wrap-verify s').css({display:"block"}).removeClass('error').addClass('succ');
                console.log('ok');
                    flag = true;
                }else {
                    $('.wrap-verify s').css({display:"block"}).removeClass('succ').addClass('error');
                    flag = false;
                }
            }else {
                flag = false;
            }
        });*/


    $('#btn-login').click(function(){
        //console.log(111);
        //console.log(getCookie("emile"));
        //console.log(getCookie("password"));
        if ($('#username').val() === getCookie("emile")&&$('#psw').val()===getCookie("password")) {
            setCookie("emile", $('#username').val(), 30,"/");
            setCookie("password", $('#psw').val(), 30,"/");
            console.log('ok');
            location.href = 'index.html';
        }else {

        $('#msg-login').css({display:'block'}).animate();

        if($('#username').val() !== getCookie("emile")){
            if($('#username').val()==''){
                $('#msg-login').html('<p class="error2">请输入用户名或邮箱</a></p>');
            }else {
                $('#msg-login').html('<p class="error2">输入的账号不正确</p>');
            }
            //console.log('输入的账号不正确');
            //console.log('请输入用户名或邮箱');
            //console.log('输入的密码账号不匹配，忘记密码？');
        }else if($('#psw').val()!==getCookie("password")){
            if($('#psw').val()==''){
                $('#msg-login').html('<p class="error2">请输入密码，<a href="javascript:;" class="green">或者你忘了密码？</a></p>');
            }else if($('#username').val() != getCookie("emile")&&$('#psw').val()!=getCookie("password")){
                $('#msg-login').html('<p class="error2">输入的账号密码不匹配<a href="javascript:;" class="green">或者你忘了密码？</a></p>');
            }
            //console.log('请输入密码，或者你忘了密码？');
        }else if(flag == false) {
            if($('#passcode').val()==''){
                $('#msg-login').html('<p class="error2">请输入验证码</a></p>');
            }else {
                $('#msg-login').html('<p class="error2">验证码错误，请重新输入</a></p>');
            }
            //console.log('请输入验证码');
           //console.log('验证码错误，请重新输入');
        }
        }
});


    });
})(jQuery);