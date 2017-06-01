(function($){
    $(function() {
        if(getCookie("islogin")){
            console.log('islogin'+getCookie("islogin"));
            if(getCookie("islogin") == 1) {
                var shtml = '<li>欢迎' + getCookie("name") + '</li>';
                $('.topbar_left').html(shtml)
            }
        }
    /****************************跨域*******************************
        var Len = 0;
        var lIndex = -1;
        //输入的时候触发
        $('#search-content').bind('input propertychange', function() {
            $('#search-list').css({display:"none"});
            if ($(this).val() !== '') {

                $('#search-list').css({display:"block"});
                $.ajax({
                    url:'http://fun.fanli.com/api/search/searchshop?',
                                       jsonp: 'jsoncallback',
                    dataType: 'jsonp',
                    data: {
                        keywords: $(this).val()
                    },
                    success: function (data) {
                        console.log(data);
                        var sHtml = '';
                        var sTitle = '';
                        for(var i = 0;i<data.data.length;i++){
                            var v = data.data[i];
                            if(v.stype == "shops"&& v.hasspace == "0"){
                                sHtml += '<li class="borb"><a href="javascript:;">' + v.name + '</a></li>';
                            }else if(v.hasspace == "1"){
                                sHtml += '<li><a href="javascript:;"><span class="icon-t" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin:-2px 4px 0 0 ;background:url('+ v.icon+' ) no-repeat;"></span>' +
                                    '<span class="kw-text">'+ v.name+'</span>' +
                                    '<span class="hasfl">'+ v.benefit+'</span></a></li>';
                            } else if(v.stype == "gifts"|| v.stype == "taobao"){
                                sHtml += '<li class="bort"><a href="javascript:;">' + v.name + '</a></li>';
                            }
                            else{
                                console.log("有误");
                            }

                        }

                        $('#search-list').html(sHtml);
                        Len = $("#search-list li").length;
                        lIndex = -1;
                    }
                });
            }
        });

        //失去焦点的时候隐藏
        $('#search-content').blur(function(){
            $('#search-list').css({display:"none"});
        });
        //获得焦点的时候判断是否有内容，有的话显示
        $('#search-content').focus(function(){
            if($(this).val() !== ''){
                $("#search-list li").removeClass("active");
                lIndex = -1;
                $('#search-list').css({display:"block"});
            }

        });

        //按下上下的时候触发
        $('#search-content').keydown(function(evt){
            var event = evt || window.event;
            var Code = event.keyCode || event.which;
            if(Len &&(Code === 38 || Code === 40)){
                if(Code == 38){
                    lIndex--;
                    if(lIndex<0){
                       lIndex = Len-1;
                    }
                }else {
                    lIndex++;
                    if(lIndex>Len){
                        lIndex = 0;
                    }
                }

                $("#search-list li").removeClass("active").eq(lIndex).addClass("active");
            }
        });
        ************************跨域结束*********************/



        /************************主体内容动态添加开始*********************/
        var oAll = $("#all");
        var allHtml = "";
        var s = 5;
        for(var i = 0;i<100;i++){
            s++;
           if(s>28){
              s=5;
           }
            var r = parseInt(Math.random()*100)/10;
            allHtml += '<div class="box"> ' +
                '<img class="left" src="../img/cjf'+s+'.jpg" alt=""> ' +
                '<div class="logo right"> ' +
                '<img src="../img/cjf_'+s+'.png" alt=""> ' +
                '<p class="fam">北美知名巧克力品牌</p> ' +
                '<p class="disc"><strong>'+r+'</strong>折起</p> ' +
                '</div> <div class="act">超级返<strong>15~50</strong>% ' +
                '</div> <a href="javascript:;"></a> <i></i> </div>';
        }
        oAll.html(allHtml+'<a class="more">查看更多<i class="simsun"> > </i></a>');

        /************************主体内容动态添加结束*********************/



        /***************右边动态添加开始*********************/
        var xlHtml = '';
        var t = 0;
        for (var i =0;i<40;i++){
            t++;
            if(t>14){
                t=1;
            }
            xlHtml += '<div class="limit"> <a href="javascript:;">' +
                ' <img src="../img/limit'+t+'.jpg" alt=""> <p class="flag"> ' +
                '<span class="zk"> <em>返利53%</em><strong>2.6</strong>折</span> </p> ' +
                '<p class="name">买一送五，新七白美白保湿护肤礼盒，同步店铺买赠</p> ' +
                '<p class="info"> <strong>￥199.00</strong> <del>￥360</del> </p> ' +
                '<p class="fl">购买后返利: <strong>105.47</strong></p> </a> </div>';
        }
        $('.xl').html(xlHtml);
        /***************右边动态添加结束*********************/


        /*************************主体选项卡开始**********************************/
        $('#tab li').click(function(){
            var Tindex = $(this).index();
            if(Tindex==0){
                $('.huan2 strong').css({color:"#666"});
                $('.huan1 strong').css({color:"#C00"});
            }else {
                $('.huan1 strong').css({color:"#666"});
                $('.huan2 strong').css({color:"#fd3667"});
            }
            $("#tab li").removeClass("current").eq(Tindex).addClass("current");
            $('.tab-child').css({display:"none"}).eq(Tindex).css({display:"block"});
        });
        /*************************主体选项卡结束**********************************/


        /*******************右边选项卡开始***********************/
        $(".tabs li").click(function(){
            var TIndex = $(this).index();
            $(".tabs li a").removeClass("current").eq(TIndex).addClass("current");
            $(".panel").css({display:"none"}).eq(TIndex).css({display:"block"});
        });
        /*******************右边选项卡结束***********************/


        /******************9块9包邮开始********************/
        var nineLim = 18 ;
        var nineHtml = '';
        var n = 0;
        for (var i =0;i<30;i++) {
            n++;
            if (n > nineLim) {
                n = 1;
            }
            console.log(n)
            nineHtml += '<div class="nine-item"> <a class="bor" href="javascript:;"></a><img src="../img/nine'+ n +'.jpg" alt="">' +
                '<p class="by">【包邮】【9.9纸巾团】维达海绵宝宝手帕纸3层20包</p>' +
                ' <div class="money"> <div class="mo1 left">￥<strong>9 <em>.9</em></strong></div> ' +
                '<div class="mo2 left"><del>￥25</del></div> <div class="mo3 right"> ' +
                '<img src="../img/t.png" alt=""> <p>已售718</p> </div> </div> </div>';
        }
        $('.nine-main').html(nineHtml);
        /******************9块9包邮结束********************/


        /*******************瀑布流开始*********************/
        //添加滚动事件
        var iLoadingH  = 30;
        var flag = true;
        //var iWindowW   = document.documentElement.clientWidth;
        var iWindowH   = document.documentElement.clientHeight;
        $(window).scroll(function(){
            var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var iCrticalPoint = $('.nine-item:last').offset().top + $('.nine-item:last').height() - iLoadingH;
            //console.log(iWindowH + iScrollTop);
            //console.log(iCrticalPoint);

            /***************返回顶部,吸顶开始****************/
            if(iScrollTop>482){
                $('#backtop').fadeIn();
                $('.con-nav').css({position:"fixed",top:0})
            }else {
                $('#backtop').fadeOut();
                $('.con-nav').css({position:"relative",top:0})
            }
            $('#backtop').click(function(){
                $(window).scrollTop(0);
            });
            /***************返回顶部，吸顶结束****************/



            if(flag&&(iWindowH + iScrollTop >= iCrticalPoint)){
                //console.log(111);
                $.ajax({
                    url:'../waterfall1.php',
                    dataType:'json',
                    beforeSend:function(){
                        //console.log(111);
                        flag = false;
                        $('#loading').css({
                            display:'block',
                        });
                    },
                    success:function(data){
                        //console.log(data);
                        for(var i = 0;i<data.length;i++){
                            var v = data[i];
                            $('#nine-box').append(
                                '<div class="nine-item"><img src="'+ v.url +'" alt=""> ' +
                                '<p class="by">【包邮】【9.9纸巾团】维达海绵宝宝手帕纸3层20包</p> ' +
                                '<div class="money"><div class="mo1 left">￥<strong>9 <em>.9</em>' +
                                '</strong> </div> <div class="mo2 left"><del>￥25</del></div> ' +
                                '<div class="mo3 right"> <img src="../img/t.png" alt=""> ' +
                                '<p>已售718</p> </div> </div> </div>'
                            );
                            $('.nine-item:last').css({opcity:0}).animate({opacity:1},1000);
                        }

                    },
                    complete: function(){
                        flag = true;
                        $('#loading').css({display:'none'});
                    }
                });
            }


        });

        /*******************瀑布流结束*********************/

        /**************右侧登录出没开始*********************/
        $('#mbarclose').click(function(){
            $('#mbar').animate({left:-41},300,function(){
                $('#mar-show').animate({left:0},300);
            });
        });
        $('#mar-show').click(function(){
            $('#mar-show').animate({left:-48},300,function(){
                $('#mbar').animate({left:0},300);
            });
        });

        $('.zh').click(function(){
            $('.mbar-box').css({top:0}).toggle();
        });
        $('.xx').click(function() {
            $('.mbar-box').css({top: 74}).toggle();
        });


        /**************右侧登录出没结束*********************/

        /****************弹出层开始*******************/
        $('.dialog').click(function(){
            $('#fg').show();
            $('#zz').css({height:iWindowH}).show();
        });
        $('.fg-close').click(function(){
            $('#fg').hide();
            $('#zz').hide();
        });
        /****************弹出层结束*******************/

        /************注册号****************/



    });
})(jQuery);