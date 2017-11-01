$(function(){
    $('.title').find('li').each(function(){
        $(this).on('click',function(){
            var _index=$(this).index();
            $('.content').find('ul:eq('+_index+')').show().siblings().hide();
        })
    })

});