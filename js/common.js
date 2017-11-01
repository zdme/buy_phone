$(function(){
    $('.fixed').find('a').on('click',function(){

        history.go(-1);
    })
    recalc();
    function recalc(){
        var wid = document.documentElement.clientWidth;
        var sizeF = 20 * (wid / 640) + 'px';
        $('html').css('font-size',sizeF);
    }
})