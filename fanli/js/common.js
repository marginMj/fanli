$(function () {
    /****************************跨域********************************/
    var Len = 0;
    var lIndex = -1;
    //输入的时候触发
    $('#search-content').bind('input propertychange', function() {
        $('#search-list').css({display:"none"});
        if ($(this).val() !== '') {

            $('#search-list').css({display:"block"});
            $.ajax({
                type:'POST',
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
    /*************************跨域结束*********************/
})