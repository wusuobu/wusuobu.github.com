(function ($){
	function Rotate(containerObj, params) {
		var defaults = {
			'skin': 'rotate',//皮肤
			'effect': 'x',//方向 x或y  none fade
			'speed':800, //动画速度
			'space':3000, //间隔
			'easing':'Quart',
			'autoPlay': true,  //自动
			'trigger':'mouseover', //触发事件 点击 移上 mouseenter mouseover hover
			'displayClass':'.wrapper', //显示窗口id或class 带.或#
			'sliderClass':'.slide',  //轮播图id或class  带.或#			
			'arrowsClass':'.arrows',//箭头id或class 或false
			'paginationClass':'.pagination',//页码id或class 或false
			'paginationTagClass':'.pagination-tag',//页码标签 false id或class  false时不创建直接引用
			'paginationContent':function (index, className) {
				  return '<a class="' + className + '">' + index + '</a>';
			},//false使用默认或函数自设
			'loop':false,  //无缝循环
			'callback':false   //function(){}
		};
		
		this.config = $.extend(defaults,params || {});
		this.$containerObj = $(containerObj).addClass(this.config.skin);
		this.$displayObj = this.$containerObj.find(this.config.displayClass).addClass(this.config.skin+'-wrapper');
		this.$sliderObj = this.$containerObj.find(this.config.sliderClass).addClass(this.config.skin+'-slider');
		this.maxlength = this.$sliderObj.length;
		this.finishSwitch = true;
		this.index = 1;
		this.lastIndex = 1;
		this.init();
	};
	
	Rotate.prototype ={
		constructor:Rotate,
		
		init:function(){
			var that = this;
			var config = this.config;
			var index = this.index;
			var lastIndex = this.lastIndex;
			var $containerObj = this.$containerObj;
			var $displayObj = this.$displayObj;
			var $sliderObj = this.$sliderObj;
			var maxlength = this.maxlength;
			var indexActive ;
			
			$containerObj.css('position','relative');
			
			//必要CSS
			switch(config.effect){
				case 'x': {
					$displayObj.css('position','absolute');
					if(config.loop){					
						$sliderObj.width($displayObj.width());						
						$sliderObj.eq(0).clone(true).appendTo($displayObj);	
						$sliderObj.eq(maxlength-1).clone(true).prependTo($displayObj);
						$displayObj.width($displayObj.width()*(maxlength+2));
						$displayObj.css({left:-$sliderObj.width()+'px'});
					}else{
						$sliderObj.width($displayObj.width());
						$displayObj.width($displayObj.width()*maxlength);
					}
				}break;
				case 'y': {
					$displayObj.css('position','absolute');					
					if(config.loop){
						$sliderObj.height($displayObj.height());					
						$sliderObj.eq(0).clone(true).appendTo($displayObj);	
						$sliderObj.eq(maxlength-1).clone(true).prependTo($displayObj);
						$displayObj.height($displayObj.height()*(maxlength+2));
						$displayObj.css({left:-$sliderObj.height()+'px'});
						index = 1;
					}else{
						$sliderObj.height($displayObj.height());
						$displayObj.height($displayObj.height()*maxlength);
					}
				}break;
				case 'none': {
					$sliderObj.css({'width':'100%','height':'100%'});				
					$sliderObj.hide().eq(0).show();
				}break;
				case 'fade': {
					$displayObj.css('position','relative');
					$sliderObj.css('position','absolute');	
					$.each($sliderObj,function(i){
						(i == 0) ? $(this).css({'opacity':'1'}):$(this).css({'opacity':'0'})
					});
				}break;
			};
			
			config.arrowsClass && initArrows();
			config.paginationClass && initPagination();
			config.autoPlay && autoPlay();  
			config.autoPlay && hoverSuspend();
			
			//初始化按钮及事件
			function initArrows(){
				var $arrowsObj = $containerObj.find(config.arrowsClass).addClass(config.skin+'-arrows');
				var arrowsHtml = '<a class="'+config.skin+'-arrow-prev">←</a><a class="'+config.skin+'-arrow-next">→</a>'
				$arrowsObj.prepend(arrowsHtml);	
				$arrowsObj.on('click','a',function (){
					if(that.finishSwitch){
						that.finishSwitch = false;
						var $arrowsClassName = $(this).attr('class');
						suspend();
						if($arrowsClassName == config.skin+'-arrow-prev'){
							index--;
							slide();
						}else{
							index++;
							slide();
						}					
						//autoPlay();
					}					
				});
			};
			
			//初始化页码及事件
			function initPagination(){
				var $pagination = $containerObj.find(config.paginationClass).addClass(config.skin+'-pagination');
				
				if(!config.paginationTagClass){
					var paginationHtml = '<ol class="'+config.skin+'-pagination-nav">';
					for(var i=1,j=maxlength;i<=j;i++){
						paginationHtml += '<li class="'+config.skin+'-pagination-item" data-slide="' + i + '">';
						if(typeof config.paginationContent =='function'){
							paginationHtml += config.paginationContent(i,config.skin+'-pagination-txt');
						}else{
							paginationHtml += '<a class="'+config.skin+'-pagination-txt">'+i+'</a>';
						}
						paginationHtml += '</li>';
					}
					paginationHtml += '</ol>';
					$pagination.html(paginationHtml).find('li').eq(0).addClass(config.skin+'-pagination-active');
					$pagination.on(config.trigger,'li',function(){
						suspend();
						index = $(this).data('slide');
						config.loop && that.index++;
						slide();
					});
				}else{
					var $paginationTag = $pagination.find(config.paginationTagClass).addClass(config.skin+'-pagination-item');;
					$.each($paginationTag,function(i){
						if(i == 0) $(this).addClass(config.skin+'-pagination-active');
						$(this).data('slide',i+1);
					});
					$pagination.on(config.trigger,config.paginationTagClass,function(){
						suspend();
						index = $(this).data('slide');
						config.loop && that.index++;
						slide();
					});
				}
				
				/*
				$pagination.on(config.trigger,'li',function(){
					suspend();
					index = $(this).data('slide');
					config.loop && that.index++;
					slide();
				});*/
			};
			
			//滑动
			function slide(){
				switch(config.effect){
				case 'x': {
					slideLeft();
				}break;
				case 'y': {
				}break;
				case 'none': {
					slideNone();
				}break;
				case 'fade': {
					slideFade();
				}break;
			};
			};
			
			//左右滑动
			function slideLeft(){
				var slideWidth = $sliderObj.width();
				if(config.loop){
					if(index > maxlength+1){
						$displayObj.css({left:-slideWidth+'px'});
						index = 2;
					}else if(index < 0){
						$displayObj.css({left:-slideWidth*maxlength+'px'});
						index = maxlength-1;
					}
					indexActive = index-1;
					indexActive == 5 && (indexActive = 0);
				}else{
					index >  maxlength && (index=1) ;		 
					index <= 0 && (index = maxlength) ;
					indexActive = index-1;
				}
				$displayObj.stop().animate({
					left:-parseInt(slideWidth)*indexActive+'px'
				},config.speed,config.easing,function(){
					if(config.paginationClass){
						var $paginationTag = $containerObj.find(config.paginationClass+' li');
						$paginationTag.removeClass(config.skin+'-pagination-active').eq(indexActive).addClass(config.skin+'-pagination-active');
					}
					that.finishSwitch = true;
				});			
			};
			
			//消失滑动
			function slideNone(){
				index >  maxlength && (index=1) ;		 
				index <= 0 && (index = maxlength) ;
				indexActive = index-1;
				$sliderObj.hide().eq(index-1).show();
				if(config.paginationClass){
					var $paginationTag = $containerObj.find(config.paginationClass+' li');
					$paginationTag.removeClass(config.skin+'-pagination-active').eq(indexActive).addClass(config.skin+'-pagination-active');
				}
				that.finishSwitch = true;
			};
			
			//淡入淡出滑动
			function slideFade(){
				index >  maxlength && (index=1) ;		 
				index <= 0 && (index = maxlength) ;
				indexActive = index-1;
				$sliderObj.eq(lastIndex-1).stop().animate({
					'opacity':'0'
				},config.speed,config.easing);
				$sliderObj.eq(index-1).stop().animate({
						'opacity':'1'
					},config.speed,config.easing,function(){
						that.finishSwitch = true;
				});
				if(config.paginationClass){
					var $paginationTag = $containerObj.find(config.paginationClass+' li');
					$paginationTag.removeClass(config.skin+'-pagination-active').eq(indexActive).addClass(config.skin+'-pagination-active');
				}
				lastIndex = index;
				
			}
			
			//自动
			function autoPlay(){
				clearInterval($containerObj.timer);
				$containerObj.timer = setInterval(function(){
					index++;
					slide();					
				},config.space);
			
			};
			
			//暂停
			function suspend(){
				clearInterval($containerObj.timer);
			};
			
			//滑入暂停
			function hoverSuspend(){
				console.log('1')
				$containerObj.on({
					'mouseover':suspend,
					'mouseout':autoPlay,
				});		
			};
		}
	};
	
	$.extend($.easing, {
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
		Quart : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t * t * t + b;
			}
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		}
	});

	$.fn.rotate = function (opts) {
		return this.each(function () {
			var $this = $(this);
			
			return $this.data('rotate', new Rotate($this, opts));
		});
	};
})(window.jQuery);