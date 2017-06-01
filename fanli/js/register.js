/******************注册页面正则开始********************/
(function($){
    $(function () {

        /*****************账号验证********************/

        var flag = true;
        var iIndex = 0;
        var reg = '';
        var reg1 = '';
        var btn1 = false;
        var btn2 = false;
        var btn3 = false;
        var btn4 = false;

        reg = /^1[34578]\d{9}$/;
        reg1 = /^\w+@(qq.com|163.com|126.com|sina.com|sina.com.cn|hotmail.com|gmail.com|sohu.com|139.com)$/;
        var words = ['3EM6','VGCR','9YTB','YCBL','RKM9','M384','EM2N','5X9D','XS43','LYTS','W4UV']
        var ran = Math.ceil(Math.random()*10);
        $('.be-c img').attr('src','../img/verify'+ran+'.png');
        /*$(document).keydown(function(evt){

        });*/



        /*****************是否有cookie**************************/

        $('#emile').val(getCookie("emile"));
        $('#username').val(getCookie("name"));
        $('#password').val(getCookie("password"));


        //$("form").bind("submit", function() { return false; })
        //邮箱/手机输入时
        $('#emile').bind('input propertychange', function() {
            //当输入不为空的时候
            if ($(this).val() !== '') {
                //点击×按钮，输入内容清空
                $('.cha1').css({display:"block"});
                $('.cha1').click(function(){
                    $('.message').removeClass().addClass('message1 message noti').text('邮箱/手机号可作为登录账号，并用于找回密码，接收通知等');
                    $('#emile').val('');
                    $('#emile').focus();
                });
                //下拉列表显示
                $('#info-list').css({display:"block"});
                //给里面加html标签
                var reg3 = /@/;
                //console.log(reg3.test('dsf@fsdf'));
                if(reg3.test($(this).val())){
                    $('#info-list ul').html('<li><a href="javascript:;">'+$(this).val()+'</a></li>');
                }else {
                    $('#info-list ul').html('' +
                        '<li>请选择或继续输入...</li> ' +
                        '<li><a href="javascript:;">'+$(this).val()+'</a></li> ' +
                        '<li><a href="javascript:;">'+$(this).val()+'@qq.com</a></li> ' +
                        '<li><a href="javascript:;">'+$(this).val()+'@163.com</a></li> ' +
                        '<li><a href="javascript:;">'+$(this).val()+'@126.com</a></li> ' +
                        '<li><a href="javascript:;">'+$(this).val()+'@sina.com</a></li> ' +
                        '<li><a href="javascript:;">'+$(this).val()+'@sina.com.cn</a></li> ' +
                        '<li><a href="javascript:;">'+$(this).val()+'@hotmail.com</a></li> ' +
                        '<li><a href="javascript:;">'+$(this).val()+'@gmail.com</a></li> ' +
                        '<li><a href="javascript:;">'+$(this).val()+'@sohu.com</a></li> ' +
                        '<li><a href="javascript:;">'+$(this).val()+'@139.com</a></li> ');

                }

            }else {
                $('.message1').removeClass().addClass('message message1 noti').text('邮箱/手机号可作为登录账号，并用于找回密码，接收通知等');
            }
        });
        //当手机邮箱触发键盘事件的时候
        $('#emile').keydown(function(evt){

            var event = evt || window.event;
            var code = event.keyCode || event.which;
            //当输入不为空且是上，下，enter时
            if($('#emile').val() !== ''&& (code === 38 || code ===40 || code===13) ){
                //触发上下时
                if(code === 40 || code == 38){
                    if(code ===40){
                        iIndex++;
                        if(iIndex == 11){
                            iIndex = 1;
                        }
                    }else{
                        iIndex--;
                        if(iIndex==0){
                            iIndex=10;
                        }
                    }
                    //console.log(iIndex);
                    $('#info-list ul li').removeClass('selected').eq(iIndex).addClass("selected");
                }else {
                    //如果是手机号码，按下的enter键时，则隐藏下拉列表，
                    //如果是手机号码且是下拉框按下enter时，隐藏下拉列表，
                    //如果是邮箱，直接enter，不隐藏下拉框

                    if(reg.test($(this).val() ) ){
                        if(iIndex != 0){
                            $('#use').css({display:"block"});
                            $('.send').css({display:"none"});
                            $('#emile').val($('#info-list ul li').eq(iIndex).text());
                        }else {
                            $('#use').css({display:"none"});
                            $('.send').css({display:"block"});
                        }
                        $('#info-list').css({display:"none"});
                        $('.message1').removeClass().addClass('message message1 succ').text('ok');
                        btn1 = true;
                    }else {
                        if(iIndex == 1||iIndex==0){
                            return false;
                        }else {
                            $('#emile').val($('#info-list ul li').eq(iIndex).text());
                            $('#info-list').css({display:"none"});
                            $('.message1').removeClass().addClass('message message1 succ').text('ok');
                            btn1 = true;
                        }
                    }

                    evt?evt.preventDefault():window.event.returnValue = false;
                }
            }
        });

        //手机邮箱失去焦点的时候
        $('#emile').blur(function(){
            $('#info-list').css({display:"none"});
            if($(this).val()==''){
                $('.message1').remove();
                flag = true;
            }else {
                //输入框不为空时，
                //检测是否是手机注册，如果是，则显示验证码send
                //如果是邮箱注册
                //console.log(reg1.test("14@qq.com"));
                if(reg.test($(this).val())){
                    $('#use').css({display:"none"});
                    $('.send').css({display:"block"});
                    $('.message1').removeClass().addClass('message message1 succ').text('ok');
                    btn1 = true;
                }else if(reg1.test($(this).val() ) ){
                    $('.message1').removeClass().addClass('message message1 succ').text('ok');
                    btn1 = true;
                }else{
                    $('.message1').removeClass().addClass('message message1 err').text('邮箱格式不正确');
                    btn1 =false;
                }
            }
        });

        //手机邮箱聚焦的时候
        //判断是否为空，空的话显示notice，
        $('#emile').focus(function(){
            //console.log(111);
            if(flag){
                $(this).after('<div class="message message1">邮箱/手机号可作为登录账号，并用于找回密码，接收通知等</div>');
                flag = false;
            }
            if($(this).val()==''){
                $('.message1').addClass('noti');
                btn1 = false;
            }else {
                //console.log(111);
                if($(this).val()==getCookie('emile')){
                    //console.log(111);
                    $('.message1').removeClass().addClass('message message1 succ').text('ok');
                }else {
                    console.log($(this).val());
                    console.log(getCookie('emile'));
                }

            }
        });

        //如果是手机注册，填验证码
        /****************验证码开始*******************/
        //获取到当前图片的字符

        $('.be-r').click(function(){
            //console.log(111);
            ran = Math.ceil(Math.random()*10);
            $('.be-c img').attr('src','../img/verify'+ran+'.png');
        });

        //匹配验证码
        $('#yz').bind('input propertychange', function() {
            //当用户填写的长度为4时
             if($(this).val().length===4){
                 //当匹配成功时
                 if($(this).val()==words[ran]){
                     //验证码send-before隐藏
                     //短信验证码send-before显示
                     //使秒数onemin显示出来
                     //让获取短信验证框aft2隐藏
                     $('.send-before').css({display:"none"});
                     $('.send-after').css({display:"block"});
                     $('#onemin').css({display:"block"});
                     $('.aft2').css({display:"none"});
                     var i= 5;
                     //定时器，显示当前多少面之后重新获取验证码
                     var Timer = setInterval(function(){
                         i--;
                         if(i<0){
                             //当秒数为0时，，清楚定时器，让秒数btn隐藏，
                             //显示获取短信验证码aft2
                             clearInterval(Timer);
                             $('#onemin').css({display:"none"});
                             $('.aft2').css({display:"block"});
                         }
                         $('#time').val(i)
                     },1000)
                 }

            return false;
            }
        });
        //验证码enter阻止
        $('#yz').keydown(function(evt){
            var event = evt || window.event;
            var code = event.keyCode || event.which;
            if(code===13){
                evt?evt.preventDefault():window.event.returnValue = false;
            }

        });
        //验证码失去焦点的时候
        $('#yz').blur(function(){
            //如果输入的长度没有4，则显示错误图标
            if($(this).val().length!==4){
                $('.be-l i').css({display:"block"}).removeClass().addClass("stafa");
            }
        });
        //当点击重新获取短信验证码时
        $('.aft2').click(function(){
            //$('#use').css({display:"none"});
            //回到输入验证码，send-before显示
            //send-after隐藏
            $('.send-before').css({display:"block"});
            $('.send-after').css({display:"none"});
            return false;
        });
        /****************验证码结束*******************/


        /*****************账号验证********************/




        /*****************用户名验证********************/


        var flag1 = true;
        var regu = /^[\u4e00-\u9fa50-9a-zA-z_]{3,25}$/;
        var regu1 = /^\d+$/;
        $('#username').bind('input propertychange', function() {
            if ($(this).val() !== '') {
                //点击×按钮，输入内容清空
                $('.cha2').css({display:"block"});
                $('.cha2').click(function(){
                    $('#username').val('');
                    $('.message2').removeClass().addClass('message message2 noti').text('用户名不能为纯数字，不能含符号除下划线外');
                    $('#username').focus();
                });
            }else {
                $('.message2').removeClass().addClass('message message2 noti').text('用户名不能为纯数字，不能含符号除下划线外');
            }
        });
        $('#username').keydown(function(evt){
            var event = evt || window.event;
            var code = event.keyCode || event.which;
            if(code===13){

                if(regu1.test($(this).val())){
                    //console.log(111);
                    $('.message2').removeClass().addClass('message message2 err').text('用户名不能为纯数字,请重新输入');
                    btn2 = false;

                }else if(regu.test($(this).val())){
                    //console.log(222);
                    //var chinese = /\u4e00-\u9fa5/;
                    $('.message2').removeClass().addClass('message message2 succ').text('ok');
                    btn2 = true;

                }else{
                    //console.log(333);

                    $('.message2').removeClass().addClass('message message2 err').text('用户名长度为3-25个字符，只允许中英文，数字及下划线');
                    btn2 = false;

                }
                return false;
            }



        });
        //username聚焦的时候
        $('#username').focus(function(){
            if(flag1){
                $('#username').after('<div class="message message2">用户名不能为纯数字，不能含符号除下划线外</div>');
                flag1 = false;
            }
            if($(this).val()==''){
                $('.message2').removeClass().addClass('message message2 noti');
                btn2 = false;
            }else {
                $('.message2').removeClass().addClass('message message2 succ').text('ok');
            }
        });
        //失去焦点的时候
        //不能为纯数字
        //用户名长度为3—25个字符，只允许中英文、数字及下划线

        $('#username').blur(function(){
            if($(this).val()==''){
                $('.message2').remove();
                flag1 = true;
                btn2 = false;
            }else {
                if(regu1.test($(this).val())){
                    //console.log(111);
                    $('.message2').removeClass().addClass('message message2 err').text('用户名不能为纯数字,请重新输入');
                    btn2 = false;
                }else if(regu.test($(this).val())){
                    //console.log(222);

                    //var chinese = /\u4e00-\u9fa5/;
                    $('.message2').removeClass().addClass('message message2 succ').text('ok');
                    btn2 = true;

                }else{
                    //console.log(333);

                    $('.message2').removeClass().addClass('message message2 err').text('用户名长度为3-25个字符，只允许中英文，数字及下划线');
                    btn2 = false;

                }
            }
        });
        /*****************用户名验证********************/

        /*************************密码验证**************************/
        //密码长度在6-25位之间
        //密码必须为6-25位半角字符(包含数字，英文，或符号)，区分大小写
        //您的密码过于简单，请不要使用相同字符
        //聚焦时，如果为空，则显示提示，否则不提示
        //不能包含特殊字符
        flag2 = true;
        var regp = /^\w{6,25}$/;
        var su = '';
        var arr1 = [];
        $('#password').bind('input propertychange', function() {
            arr1.push($(this).val());
            su = $(this).val();
            if ($(this).val() !== '') {
                //点击×按钮，输入内容清空
                $('.cha3').css({display:"block"});
                $('.cha3').click(function(){
                    $('#password').val('');
                    $('.message3').removeClass().addClass('message message3 noti').text('密码必须为6-25位半角字符(包含数字，英文，或符号)，区分大小写');
                    $('#password').focus();
                });
            }else {

                $('.message3').removeClass().addClass('message message3 noti').text('密码必须为6-25位半角字符(包含数字，英文，或符号)，区分大小写');
            }
        });

        $('#password').focus(function(){
            if(flag2){
                $('#password').after('<div class="message message3">密码必须为6-25位半角字符(包含数字，英文，或符号)，区分大小写</div>');
                flag2 = false;
            }
            if($(this).val()==''){
                $('.message3').addClass('noti');
            }else{
                $('.message3').addClass('succ');
            }
        });
        //失去焦点
        $('#password').blur(function(){
            //console.log(arr1[0]);
            //console.log(arr1[arr1.length-2]);
            if($(this).val()==''){
                btn3 = false;
                $('.message3').remove();
                flag2 = true;
            }else {
                //console.log(111);
                if(regp.test($(this).val())){
                    //console.log(222);
                    if(arr1[0]+arr1[arr1.length-2]==su){
                        $('.message3').removeClass().addClass('message message3 err').text('密码过于简单');
                        btn3 = false;
                        return false;
                    }else {
                        $('.message3').removeClass().addClass('message message3 succ').text('ok');
                        btn3 = true;
                    }


                }else if($(this).val().length<6||$(this).val().length>25){
                    $('.message3').removeClass().addClass('message message3 err').text('密码长度在6-25位之间');
                    btn3 = false;
                }else {
                    $('.message3').removeClass().addClass('message message3 noti').text('密码必须为6-25位半角字符(包含数字，英文，或符号)，区分大小写');
                    btn3 = false;
                }
            }
        });


        /*************************密码验证**************************/



        /*************************密码确认验证**************************/
/*
        $('#rpassword').bind('input propertychange', function() {

        }

*/

        $('#rpassword').blur(function(){
            $('.message4').remove();
            if($(this).val()!=''){
                //console.log($('#password').val());
                //console.log($('#rpassword').val());
                if($('#password').val()==$('#rpassword').val()){
                    $('#rpassword').after('<div class="message message4 succ">ok</div>');
                    btn4 = true;
                }else {
                    $('#rpassword').after('<div class="message message4 err">两次密码输入不一致</div>');
                    btn4 = false;
                }
            }else {
                $('.message4').remove();
                btn4 = false;
            }
        });

        /*************************密码确认验证**************************/


        /*************************提交**************************/
        $('.reg-title').click(function(){
            //console.log(btn1);
            //console.log(btn2);
            //console.log(btn3);
            console.log(btn4);
        });

        document.forms[0].onsubmit = function () {
            if($('#emile').val()===getCookie("emile")){
                btn1 = true;
            }
            if($('#username').val()===getCookie("name")){
                btn2 = true;
            }
            if($('#password').val()===getCookie("password")){
                btn3 = true;
            }
            console.log(btn1);
            console.log(btn2);
            console.log(btn3);
            console.log(btn4);

                /*$('#sub-btn').click(function(){*/
                    if (btn1&&btn2&&btn3&&btn4) {
                        console.log(111);
                        $.ajax({
                            type:"POST",
                            url:'http://localhost/test.php',
                            data:{email:$('#emile').val(),username:$('#username').val(),password:$('#password').val()},
                            success: function (res) {
                                console.log('登陆请求成功');
                                console.log(res)

                            },
                            error: function (err) {
                                console.log(err)
                                console.log('登陆请求错误');
                            },
                            complete: function (com) {
                                console.log('登陆请求完成')
                            }
                        })
                        setCookie("emile", $('#emile').val(), 7, "/");
                        setCookie("name", $('#username').val(), 7, "/");
                        setCookie("password", $('#password').val(), 7, "/");
                        setCookie("islogin",1,7,"/");
                        window.location.href = 'login.html';
                        return false;
                    } else {
                $('#emile').focus();
                return false;
                }

            /*});*/
            //return false;


        }
        /*************************提交**************************/


    })
})(jQuery);





/******************注册页面正则结束********************/