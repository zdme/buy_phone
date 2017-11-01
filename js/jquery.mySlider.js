;
(function($) {
	$.fn.extend({
		mySlider: function(options) {
			var iset = {
				/*图片容器*/
				imgBox: $(this),
				/*按钮容器*/
				imgIco: $(this),
				/*自动播放*/
				autoPlay: true,
				/*延迟时间*/
				interval: 3000,
				/*速度*/
				speed: 500,
				/*滚动方向  true:左,false:右*/
				direction: true,
				/*当前圆点*/
				active: null
			};
			options = options || {};
			$.extend(iset, options);
			var imgUl = iset.imgBox.find('ul');
			var imgLi = iset.imgBox.find('li');
			var i = 0;
			/* 初始化样式*/
			appendIco = function() {
				/*拷贝图片 实现无缝滚动*/
				imgUl.append(imgLi.eq(0).clone());
				/*添加圆点*/
				for (var j = 0; j < imgLi.length; j++) {
					var a = '<a href="javascript:;"></a>';
					$(iset.imgIco).append(a);
				};
				iset.imgIco.find('a').eq(0).addClass(iset.active);
			};
			/*点击事件*/
			var icoClick = function(){
				iset.imgIco.find('a').click(function(){
					if(!imgUl.is(':animated')){
						$(this).addClass(iset.active).siblings().removeClass(iset.active);
						var index=$(this).index();
						i=index;
						imgUl.stop().animate({
							left: -index*imgLi.eq(0).width()
						},iset.speed);
					}
				});
			}
			/*滚动函数*/
			var autoScroll = function() {
				if (iset.direction) {
					i++;
					if (i >= imgLi.length) {
						iset.imgIco.find('a').eq(0).addClass(iset.active).siblings().removeClass(iset.active);
					};
					if (i > imgLi.length) {
						imgUl.css({
							left: 0
						});
						i = 1;
					};
					imgUl.stop().animate({
						left: -i * imgLi.eq(0).width()
					}, iset.speed);
					iset.imgIco.find('a').eq(i).addClass(iset.active).siblings().removeClass(iset.active);
				} else {
					i--;
					if (i == -1) {
						imgUl.css({
							left: -(imgLi.size() * imgLi.eq(0).width())
						});
						i = imgLi.length - 1;
					};
					imgUl.stop().animate({
						left: -i * imgLi.eq(0).width()
					}, iset.speed);
					iset.imgIco.find('a').eq(i).addClass(iset.active).siblings().removeClass(iset.active);
				};
			};
			/*自动播放*/
			var autoPlay = function() {
				if (iset.autoPlay) {
					timer = setInterval(autoScroll, iset.interval);
				};
			};
			/*鼠标移上去暂停滚动*/
			var MouseStop = function() {
				clearInterval(timer)
			};
			/*鼠标事件*/
			iset.imgBox.parent().hover(function() {
				MouseStop();
			}, function() {
				autoPlay();
			});
			appendIco();
			autoPlay();
			icoClick();
		}
	});
})(jQuery);