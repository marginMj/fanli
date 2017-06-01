(function($){
    $(function(){


        //动态添加商品、
        var oAll = $(".liitem-list");
        var allHtml = "";
        var s = 0;
        for(var i = 0;i<51;i++){
            s++;
            if(s>17){
                s=1;
            }
            //var r = parseInt(Math.random()*100)/10;
            allHtml += '<div class="bankuai"> <a href="details.html" class="lj"> ' +
                '<img class="img" src="../img/list'+s+'.jpg" alt=""> ' +
                '<div class="lititle">【包邮】韩版时尚修身羽绒棉衣潮流加厚显瘦</div> ' +
                '<div class="moneyinfo clear"><div class="price">￥<strong>58</strong></div> ' +
                '<div class="left-box"><div class="" class="tags"></div>' +
                '<del>￥399</del> </div> <div class="right-box"> <div class="logo"> ' +
                '<img src="../img/tao.png" alt=""> </div> <div class="amout">已售1363</div> ' +
                '</div> </div> <i class="flag flag-new"></i> </a></div>';
        }
        oAll.html(allHtml);




        //瀑布流
        var iLoadingH  = 30;
        var flag = true;
        var iWindowH   = document.documentElement.clientHeight;
        $(window).scroll(function(){
            var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var iCrticalPoint = $('.liitem-list:last').offset().top + $('.liitem-list:last').height() - iLoadingH;

            /***************返回顶部,吸顶开始****************/
            if(iScrollTop>482){
                $('#backtop').fadeIn();
                $('#tuan-top').css({position:"fixed",background:'#fff',top:0})
            }else {
                $('#backtop').fadeOut();
                $('#tuan-top').css({position:"static",background:'none'})
            }
            $('#backtop').click(function(){
                $(window).scrollTop(0);
            });
            /***************返回顶部，吸顶结束****************/



            if(flag&&(iWindowH + iScrollTop >= iCrticalPoint)){
                //console.log(111);
                $.ajax({
                    type:'GET',
                    url:'../waterfall2.php',
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
                            $(".liitem-list").append(
                                '<div class="bankuai"> <a href="javascript:;" class="lj"></a> ' +
                                '<img class="img" src="'+ v.url+'" alt=""> ' +
                                '<div class="lititle">【包邮】韩版时尚修身羽绒棉衣潮流加厚显瘦</div> ' +
                                '<div class="moneyinfo clear"><div class="price">￥<strong>58</strong></div> ' +
                                '<div class="left-box"><div class="" class="tags"></div>' +
                                '<del>￥399</del> </div> <div class="right-box"> <div class="logo"> ' +
                                '<img src="../img/tao.png" alt=""> </div> <div class="amout">已售1363</div> ' +
                                '</div> </div> <i class="flag flag-new"></i> </div>'
                            );
                            $('.liitem-list:last').css({opcity:0}).animate({opacity:1},1000);
                        }

                    },
                    complete: function(){
                        flag = true;
                        $('#loading').css({display:'none'});
                    }
                });
            }


        });
    });
})(jQuery);