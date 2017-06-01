(function($){
    $(function(){
        var sGoods = getCookie('Mgoods');
        var aGoods = JSON.parse(sGoods);
        var sUlHtml = '';
        var iIndex = 0;
        var num = [];
        var flag = false;
        var sum = 0;
        var pri = 0;
        console.log(aGoods);
        for(var i =0 ;i<aGoods.length;i++){

            //$(this).index = i;
            //console.log(iIndex);
            sUlHtml +='<div id="orderHolder"> <div id="order_s"> <div class="itemHead shop clear"> ' +
                '<div class="shop-info"> <div class="cart-checkbox"> ' +
                '<input id="checkBoxShop2" class="checkBoxShop" type="checkbox" name="select-all" value="true"> ' +
                '<label for="checkBoxShop2">勾选购物车内所有商品</label> </div> <span class="shop-icon icon-B"></span>店铺: ' +
                '<a href="javascript:;" class="makepoint">韩鹤旗舰店</a> <span class="ww-light ww-small"> ' +
                '<a class="ww-inline ww-online" href="javascript:;"> <span>旺旺在线</span> </a> </span> </div> </div> ' +
                '<div class="order-content"><ul class="item-content clear"><li class="td td-chk"><div class="td-inner"> ' +
                '<div class="cart-checkbox"> <input id="checkbox_12" class="checkboxitem" type="checkbox"> ' +
                '<label for="checkbox_12">勾选商品</label> </div> </div> </li> <li class="td td-item"> ' +
                '<div class="td-inner"> <div class="item-pic img-loaded"> <a class="makepoint" href="javascript:;"> ' +
                '<img src="'+aGoods[i].goodsSrc+'" alt=""> </a> </div> <div class="item-info"> <div class="item-basic-info"> ' +
                '<a class="item-title" href="javascript:;">'+aGoods[i].goodsTitle+'</a> </div> <div class="item-other-info"> ' +
                '<div class="promo-logos"></div> <div class="item-icon-list clear"> <div class="item-icons item-icons-fixed"> ' +
                '<span class="item-icon item-icon-0"> <img src="../img/xcard.png" alt=""></span><a href="javascript:;" class="item-icon"> ' +
                '<img src="../img/day.jpg" alt=""></a><a class="item-icon item-icon-2 makepoint" href="javascript:;"> ' +
                '<img src="../img/hua.png" alt=""> </a> </div> </div></div></div></div> </li> ' +
                '<li class="td td-info"> <div class="item-props item-props-can item-props-can-hover"> ' +
                '<p class="sku-line">'+aGoods[i].goodsColor+'</p> <p class="sku-line">'+aGoods[i].goodsSize+'</p><span class="btn-edit-sku">修改</span> ' +
                '</div> </li> <li class="td td-price"> <div class="td-inner"> <div class="item-price price-promo-promo"> ' +
                '<div class="price-content"> <div class="price-line"> <em class="price-origina">'+aGoods[i].goodsBeforePrice+'</em> </div> ' +
                '<div class="price-line"> <em class="price-now">￥29.90</em> </div> </div> <div class="promo-main promo-promo"> ' +
                '<div class="promo-content">卖家促销 <span class="arrow"></span> </div> </div> </div> </div> </li> ' +
                '<li class="td td-amount"> <div class="td-inner"> <div class="amount-wrapper"> <div class="item-amount">' +
                ' <a href="javascript:;" class="no-minus">-</a> ' +
                '<input type="text" value="'+aGoods[i].goodsNum+'" class="text text-amount" autocomplete="off"> <a href="javascript:;" class="plus">+</a> ' +
                '</div> <div class="amount-msg"></div> </div> </div> </li> <li class="td td-sum"> <div class="td-inner"> ' +
                '<em class="number sumprice">￥'+aGoods[i].goodsPrice+'</em> <div class="lottery"></div> </div> </li> <li class="td td-op"> ' +
                '<div class="td-inner"> <a href="javascript:;" class="btn-fav">移入收藏夹</a> <a href="javascript:;" class="del">删除</a>' +
                '</div> </li> </ul> </div> </div> </div>';


            //num.push(aGoods[i].goodsNum);
            $('#orderList').html(sUlHtml);


            sum += Number(aGoods[i].goodsNum);
            pri += Number(aGoods[i].goodsPrice);

            //console.log(aGoods[i].goodsNum);
            if(aGoods[i].goodsNum==1){
                $('.no-minus').eq(iIndex).css({color:'#e5e5e5'});
            }else {
                console.log(i);
                $('.no-minus').eq(iIndex).css({color:'#343434'});

            }


        }
        console.log(sum);





        $('.no-minus').click(function(){
            flag = true;
            iIndex =  $('.no-minus').index($(this));
            //console.log(iIndex);
                if(aGoods[iIndex].goodsNum==1){
                    $('.no-minus').eq(iIndex).css({color:'#e5e5e5'});
                    return false;

                }else {
                    aGoods[iIndex].goodsNum--;
                    $('.text-amount').eq(iIndex).val(aGoods[iIndex].goodsNum);
                }
            aGoods[iIndex].goodsPrice = parseInt(aGoods[iIndex].goodsNum*29.90*100)/100;
            $('.sumprice').eq(iIndex).html('￥'+aGoods[iIndex].goodsPrice);
            //console.log(aGoods[iIndex].goodsPrice);
            setCookie('Mgoods',JSON.stringify(aGoods),7,'/');

        });
        $('.plus').click(function(){
            flag = true;
            iIndex =  $('.plus').index($(this));
            //console.log(iIndex);
            aGoods[iIndex].goodsNum++;
            $('.no-minus').eq(iIndex).css({color:'#343434'});
            $('.text-amount').eq(iIndex).val(aGoods[iIndex].goodsNum);
            aGoods[iIndex].goodsPrice = parseInt(aGoods[iIndex].goodsNum*29.90*100)/100;
            $('.sumprice').eq(iIndex).html('￥'+aGoods[iIndex].goodsPrice);
            //console.log(aGoods[iIndex].goodsPrice);
            setCookie('Mgoods',JSON.stringify(aGoods),7,'/');
        });
        var xz = true;
        $('#checkBoxShop1').click(function(){
            if(xz){
                xz = false;
                $('.cart-checkbox').addClass('cart-checkbox-checked');
                $('#J_SelectedItemsCount').html(sum);
                $('#J_Total').html(pri);
                $('.submit-btn').removeClass('submit-btn-disabled');
            }else {
                xz = true;
                $('.cart-checkbox').removeClass('cart-checkbox-checked');
                $('#J_SelectedItemsCount').html('0');
                $('#J_Total').html('0.00');
                $('.submit-btn').addClass('submit-btn-disabled');
            }
        });



            $('.submit-btn').click(function(){
                if(xz==false){
                location.href = 'order.html';
                }
            });




    })
})(jQuery);