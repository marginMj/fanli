(function($){
    $(function(){
        var sGoods = getCookie('Mgoods');
        var aGoods = JSON.parse(sGoods);
        var sUlHtml = '';
        var zj = 0;
        //console.log(aGoods.length);
        for(var i =0 ;i<aGoods.length;i++){
            zj += aGoods[i].goodsPrice;
            console.log(zj);
            var ys = aGoods[i].goodsBeforePrice*aGoods[i].goodsNum;
            sUlHtml += '<div class="order-order"> <div class="order-orderInfo"> ' +
                '<img class="shop-Icon" src="../img/taob.png" alt=""> ' +
                '<span class="shop-name">店铺：</span> <a class="shop-url" href="javascript:;">谢绝落幕</a> ' +
                '<span class="shop-seller"> <span>卖家:</span> <span>郑晓萍888</span> </span> ' +
                '<span class="ww-light ww-large"> <a href="javascript:;"> <span>旺旺在线</span> </a> </span> ' +
                '</div> <div class="order-item"> <div class="order-itemInfo"> <div class="info-detail info-cell"> ' +
                '<div class="info-cell"> <a class="info-img" href="javascript:;"> ' +
                '<img class="info-img" src="../img/goodcart.jpg" alt=""> ' +
                '</a> </div> <div class="info-cell info-msg"> ' +
                '<a class="info-title" href="javascript:;">'+aGoods[i].goodsTitle+'<div class="info-icon-list"> <div> ' +
                '<a href="javascript:;" class="icon-main"><img src="../img/day.jpg" alt=""></a> ' +
                '<a href="javascript:;" class="icon-main"><img src="../img/xcard.png" alt=""></a>' +
                '<a href="javascript:;" class="icon-main"><img src="../img/hua.png" alt=""></a> ' +
                '</div> </div> <span class="delivery-time"> <span>发货时间</span><span>卖家承诺48小时发货</span> </span> ' +
                '</div> </div> <div class="info-sku info-cell"> <p>'+aGoods[i].goodsColor+' </p> <p>'+aGoods[i].goodsSize+'</p> </div> ' +
                '<div class="info-price info-cell">'+aGoods[i].goodsBeforePrice+'</div> </div> <div class="order-query"> ' +
                '<span>'+aGoods[i].goodsNum+'</span></div> <div class="order-promotion item-promotion"> <div class="item-promotion-selecter"> ' +
                '<select  class="ins-select"> <option value="0">不再使用优惠</option> ' +
                '<option selected>已省'+ys+'元：质量已验证</option> </select> <span class="widget-tips-box"> ' +
                '<img class="wtip-icon" src="../img/xiaoxi.png" alt=""> </span> ' +
                '</div> </div> <div class="order-itempay"> <span class="simple-price">'+aGoods[i].goodsPrice+'</span> </div> </div> ' +
                '<div class="order-orderExt"> <div class="order-extUser"> <div class="order-memo"> ' +
                '<label class="memo-name" for="memo_f">给卖家留言</label> <div class="memo-detail"> ' +
                '<textarea class="memo-input" name="" placeholder="选填：对本次交易的说明（建议填写已和卖家协商一致的内容）" id="memo_f" cols="30" rows="10"></textarea> ' +
                '</div> </div> </div><div class="order-extInfo"> <div class="order-deliveryMethod clear"> ' +
                '<div class="delivery-title">运送方式</div><div class="delivery-select"> ' +
                '<div class="select-info">普通配送 快递 免邮费</div><div class="select-price">0.00</div></div> ' +
                '</div> <div class="order-promise promise"> <div class="promise-title l">发货时间:</div> ' +
                '<div class="promise-content">卖家承诺订单在买家付款后, 48小时内发货</div> </div> ' +
                '<div class="order-promise promise"> <div class="promise-title l">发货时间:</div> ' +
                '<div class="promise-content">卖家承诺订单在买家付款后, 48小时内发货</div> </div> </div> </div> ' +
                '<div class="orderPay"> <span>店铺合计</span> <span>(含运费)</span> <span class="price g_price"> ' +
                '<span>￥</span> <em class="style-middle-bold-red">'+aGoods[i].goodsPrice+'</em> </span> </div> </div>';
        }
        $('.order-orderDesc').after(sUlHtml);
        $('.realPay-price').html(parseFloat(zj));
    })
})(jQuery);