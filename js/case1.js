$(function(){
//图片轮播
    $('.img').mySlider({
        imgBox: $('.img'),
        imgIco: $('.ico'),
        active: 'on',
        autoPlay: true,
        interval: 5000,
        speed: 500,
        direction: true
    });
    //页面切换
    $(function(){
        $('.title').find('h2').each(function(){
            $(this).on('click',function(){
                var _index=$(this).index();
                $('.content').find('.goods:eq('+_index+')').show().siblings().hide();
            })
        })
    });

    var page=0;
    var size=4;
    $('.goods').dropload({
        scrollArea : window,
        loadDownFn : function(me) {
            page++;
            // 拼接HTML
            var str = "";
            $.ajax({
                url: '../data/product.json',
                dataType: 'json',
                data: {
                    pageNumber: page,
                    name: '',
                    size: size
                },
                type: 'get',
                success: function (data) {
                    //请求数据成功并且有数据
                    if (data.success == true && data.data.length > 0) {
                        for (var i = 0; i < data.data.length; i++) {
                            data.data[i];
                            str += '<li><img src=' + data.data[i].imgUrl + ' />' +
                                ' <p>' + data.data[i].productName + '</p>' +
                                '<div class="down">' +
                                '<div class="left">' +
                                '<div class="container">' +
                                '<div class="bar">' +
                                '<span class="bar-unfill">' +
                                '<span class="bar-fill"></span>' +
                                '</span>' +
                                '</div>' +
                                '</div>' +
                                '<p>开奖进度&nbsp<span>' + data.data[i].rate + '</span></p>' +
                                '</div>' +
                                '<a href="">' +
                                '<img src="../img/duo_bao.jpg" alt=""/>' +
                                '</a>' +
                                '</div></li>';
                        }
                    } else {
                        //请求成功但没有数据
                        me.noData();//无数据
                        me.lock();//锁住
                    }
                    setTimeout(function () {
                        $('.goods').append(str);
                        me.resetload();//重置数据
                    }, 1000)
                },
                //没请求到数据
                error: function () {
                    alert('系统报错');
                }
            })
        }
     })
});
