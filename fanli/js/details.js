(function($){
    $(function(){
        //鼠标划过小图片，大图片出来


        //放大镜
        var iIndex = 0;
        var maxx = $('#fdj-origin').width() - $('#move').width();
        var maxy = $('#fdj-origin').height() - $('#move').height();
        var scale = $('#fdj-bigger').width()/$("#move").width();
        $('#fdj-list li').mouseenter(function(){
            iIndex = $(this).index();
            console.log(iIndex);
            $('#fdj-origin li').removeClass("fdj-active").eq(iIndex).addClass('fdj-active');
            $('#fdj-list li').removeClass("fdj-select").eq(iIndex).addClass('fdj-select');
            });
        //鼠标进入origin，move出来，bigger出来
        $('#fdj-origin').mouseenter(function(){
            $('#move').css({display:'block'});
            $('#fdj-bigger').css({display:'block'});
            $('#fdj-bigger li').css({display:'none'}).eq(iIndex).css({display:'block'});
        });
        //鼠标移除origin，move隐藏，bigger隐藏
        $('#fdj-origin').mouseleave(function(){
            $('#move').css({display:'none'});
            $('#fdj-bigger').css({display:'none'});
            $('#fdj-bigger li').css({display:'none'});
        });
        //添加移动事件
        $('#fdj-origin').mousemove(function(evt){
            var event = evt || window.event;

            //小黄块的位置
            var x = event.pageX - $('#fdj-origin').offset().left - $('#move').width()/2;
            var y = event.pageY - $('#fdj-origin').offset().top - $('#move').height()/2;
            console.log(x);
            console.log(y);
            if(x>maxx){
                x = maxx;
            }
            if(x<0){
                x = 0;
            }
            if(y<0){
                y = 0;
            }
            if(y>maxy){
                y = maxy;
            }
            $('#move').css({left:x,top:y});
            //图的坐标
            console.log(-scale*x,-scale*y);
            $('#fdj-bigger img').eq(iIndex).css({left:-scale*x,top:-scale*y});

        });



        //切换评论
        var iIndex = 0;
        $('.tb-tabbar li').click(function(){
            iIndex = $(this).index();
            $('.tb-tabbar li').removeClass('selected').eq(iIndex).addClass('selected');
            $('.sub-wrap').css({display:'none'}).eq(iIndex).css({display:'block'});
        });
        //评论跨域
        var t = 1;
        ky(t);
        $('.kg-pagination li').click(function(){
            var s = $(this).index();
            if(s>0&&s<6){
                t = $(this).index();


            }else if(s==0){
                t--;
                if(t<1){
                    t=1;
                }
            }else if(s==6){
                t++;
                if(t>5){
                    t=5;
                }
            }
            $('.kg-pagination li').removeClass('pg-current').eq(t).addClass('pg-current');
            ky(t);

        });


        function ky(t){
            console.log(t);
            $.ajax({
                type:'GET',
                //https://rate.taobao.com/feedRateList.htm?auctionNumId=527766258768&userNumId=390861396&currentPageNum=1&pageSize=20&rateType=&orderType=sort_weight&attribute=&sku=&hasSku=false&folded=0&ua=175UW5TcyMNYQwiAiwZTXFIdUh1SHJOe0BuOG4%3D%7CUm5Ockt%2FRn5EfEd8RH1HcyU%3D%7CU2xMHDJ7G2AHYg8hAS8XIgwsAl4%2FWTVSLFZ4Lng%3D%7CVGhXd1llXGhRaVNrUGtTalBkU25Mckd%2FQ3ZNd05zTndCf0N8Q31TBQ%3D%3D%7CVWldfS0SMg0yCioWKAgmHjQONhM2RDtSKQV%2FHDJkMg%3D%3D%7CVmJCbEIU%7CV2lJGSQEORklGyIWNgg1DDkZJRsgGzsBOg8vEy0WLQ03CD1rPQ%3D%3D%7CWGFcYUF8XGNDf0Z6WmRcZkZ8R2dZDw%3D%3D&_ksTS=1494575665681_1395&callback=jsonp_tbcrate_reviews_list
                url:'https://rate.taobao.com/feedRateList.htm?auctionNumId=527766258768&userNumId=390861396&currentPageNum='+ t +'&pageSize=20&rateType=&orderType=sort_weight&attribute=&sku=&hasSku=false&_ksTS=1474898307167_1435',
                jsonpCallback:'jsonp_tbcrate_reviews_list',
                dataType: 'jsonp',
                success: function (data) {
                    console.log(data);
                    var sHtml = '';
                    var cHtml = '';
                    for(var i = 0;i<data.comments.length;i++){
                        var v = data.comments[i];
                        for(var j = 0 ;j< v.photos.length;j++){
                            cHtml += '<li><img src="'+ v.photos[j].thumbnail+'" alt=""> </li>';
                        }
                        sHtml += '<li class="comment"> <div class="from-whom"> <img class="avatar" src="../img/tbtx.png" alt=""> ' +
                            '<div>'+ v.user.nick+'</div> <img src="" alt=""></div> <div class="review-details"><div class="tb-rev-item"> ' +
                            '<div class="tb-tbcr-content clear">'+ v.content+' </div> <ul class="tb-tbcr-mt clear"> '+cHtml+' </ul> ' +
                            '<div class="tb-r-act-bar clear"> <div class="tb-r-info"> <span class="tb-r-date">'+ v.date+'</span>'+ v.auction.sku+'</div> ' +
                            '<ul class="tb-rev-actions"> <li class="tb-rev-action"> <span class="tb-r-action-btn">有用</span> ' +
                            '<span class="tb-tbcr-num">(0)</span> </li> <li class="tb-rev-action"> ' +
                            '<span class="tb-r-action-btn">提问</span> </li> </ul> </div> </div> </div> </li>';
                        cHtml = '';
                    }
                    $('#comments').html(sHtml);
                }
            });

        }
        //添加到购物车
        var lIndex = 0;
        // data-id="1" data-src="../img/TB2uIstX6nyQeBjSszbXXbCxVXa_!!390861396.jpg_30x30.jpg"
        //data-title="2016春秋新款韩版大码宽松小碎花雪纺衬衫女印花衬衣上衣T恤潮" data-price="29.9" data-bprice="219.90"
        //data-color="白色" data-size="S" data-num="1"
        var sGoodsSize = '';
        var iGoodsColor= '';
        var sizeIndex = 0 ;
        var colorIndex = 0;
        var number = 1;
        var sizeflag = false;
        var colorflag = false;
        $('.salesize li').click(function(){
            sizeflag = true;
            sizeIndex = $(this).index();
            sGoodsSize   = $(this).attr('data-size');
            console.log(sGoodsSize);
            $('.salesize li a').removeClass('sizecoth').eq(sizeIndex).addClass('sizecoth');
        });
        $('.tb-img li').click(function(){
            colorflag = true;
            colorIndex = $(this).index();
            if($(this).attr('data-color')){
                iGoodsColor   = $(this).attr('data-color');
                console.log(iGoodsColor);
            }

            $('.tb-img li a').removeClass('colorcoth sc').eq(colorIndex).addClass('colorcoth sc');
        });
        $('.tb-re').click(function(){
            if(number===1){
                return false;
            }else {
                number--;
                if(number==1){
                    $('.tb-re').addClass('tb-reduce');
                }
                $('.tb-text').val(number);
            }
        });
        $('.tb-increase').click(function(){
            number++;
            if(number>1){
                $('.tb-re').removeClass('tb-reduce');
            }
            $('.tb-text').val(number);
        });
        $('#close').click(function(){
            $('.tb-sure').css({display:'none'});
            $('.tb-key').removeClass('tb-key-border');
            $('.tb-action').css({display:'block'});
        });

        $('.linkadd').click(function(){
            //判断是否选择了商品颜色和尺寸
            if(sizeflag===false||colorflag===false){
                $('.tb-sure').css({display:'block'});
                $('.tb-key').addClass('tb-key-border');
                $('.tb-action').css({display:'none'});
                console.log('请勾选商品信息');
                return false;
            }else {
                location.href = 'cart.html';
            //console.log(1111);
            lIndex = $(this).index();
            //要存储的商品信息
            //console.log($(this).attr('data-id'));
            var iGoodsId            = $(this).attr('data-id');
            var sGoodsTitle         = $(this).attr('data-title');
            var iGoodsPrice         = $(this).attr('data-price');
            var sGoodsbeforePrice   = $(this).attr('data-before-price');
            /*var iGoodsColor         = $(this).attr('data-color');*/
            /*var sGoodsSize        = $(this).attr('data-size');*/
            var iGoodsSrc           = $(this).attr('data-src');
            //console.log(iGoodsId);

            var sGoods = getCookie('Mgoods');
            var bBtn = true;

            if(sGoods === undefined){
                var aGoods = [];
            }else {
                var aGoods = JSON.parse(sGoods);
            }
            for(var k = 0;k<aGoods.length;k++){
                if(aGoods[k].goodsSize == sGoodsSize&&aGoods[k].goodsColor == iGoodsColor){
                    aGoods[k].goodsNum++;
                    bBtn = false;
                }
            }
            if(bBtn){
                var oGoods = {
                    goodsId   :iGoodsId,
                    goodsTitle:sGoodsTitle,
                    goodsPrice:iGoodsPrice,
                    goodsBeforePrice:sGoodsbeforePrice,
                    goodsColor:iGoodsColor,
                    goodsSize:sGoodsSize,
                    goodsSrc:iGoodsSrc,
                    goodsNum:number,

                }
                aGoods.push(oGoods);
            }
            //写入cookie
            setCookie('Mgoods',JSON.stringify(aGoods),7,'/');
            }

        });





    });
})(jQuery);