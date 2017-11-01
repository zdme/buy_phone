$(function(){
    $('.btn').on('click',function(){
        var checked=$('.btn').hasClass('checked');
        if(checked){
            $('.btn').removeClass('checked').addClass('unchecked');
        }else{
            $('.btn').removeClass('unchecked').addClass('checked');
        }
    })

})