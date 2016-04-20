/**
 * Created by Administrator on 2016/4/20 0020.
 */

var swiper = (function(){
    /***变量初始化**/
    var pageWrapper = null;
    var pageContainer = null;
    var pageContent = null;
    var pageWidth = 0;
    var index = 0;
    var inited = false;
    var isSwiper = false;
    var direction = 'right';
    var startX = 0;//默认往右
    var disX = 0;
    var disY = 0;
    var translateX = 0;
    var doc = document;
    var swiper = function(config){
        pageWrapper = config.pageWrapper;
        pageContainer = config.pageContainer;
        pageWidth = config.pageContent[0].offsetWidth;
        pageContent = config.pageContent;
        return new swiper.prototype.init();
    }


    swiper.prototype = {
        constructor : swiper,
        init : function(){
            if(inited) return;
            inited = true;
            this.bindTouchStart().bindToutMove().bindTouchEnd();
            return this;
        },
        bindTouchStart : function(){
            pageContainer.addEventListener('touchstart',this._touchStart,false);
            return this;
        },
        bindToutMove : function(){
            doc.addEventListener('touchmove',this._touchMove,false);
            return this;
        },
        bindTouchEnd : function(){
            doc.addEventListener('touchend',this._touchEnd,false);
            return this;
        },
        _touchStart : function(event){
            if(event.targetTouches.length === 1){
                var touch = event.targetTouches[0];
                disX = touch.clientX - getTranslateX(pageContainer);
                startX = touch.clientX;
                disY = touch.clientY;
            }
        },
        _touchMove : function(event){
            event.preventDefault();
            if(event.targetTouches.length === 1){
                var touch = event.targetTouches[0];
                var x = touch.clientX - disX;
                isSwiper = Math.abs(touch.clientX - startX) >= 150 ? true : false;
                if((touch.clientX - startX) > 0){
                    direction = 'left';
                }else if((touch.clientX - startX) < 0){
                    direction = 'right';
                }
                pageContainer.style.transition = 'none';
                translateX = x;
                pageContainer.style.webkitTransform = 'translateX('+x+'px)';
            }
        },
        _touchEnd : function(){
            if(isSwiper){
                if(direction === 'right'){
                    if(index >= pageContent.length-1){
                        index = pageContent.length-1;
                    }else{
                        index++;
                    }
                }else if(direction === 'left'){
                    if(index <= 0){
                        index = 0;
                    }else{
                        index--;
                    }
                }
            }

            pageContainer.style.transition = '0.5s';
            pageContainer.style.webkitTransform = 'translateX('+(-index*pageWidth)+'px)';
        }

    }
    swiper.prototype.init.prototype = swiper.prototype;

    function getTranslateX(element){
        var translate = element.style.webkitTransform;
        var reg = /\.*translateX\((.*)px\)/i;
        if(!reg.exec(translate)) return 0;
        return parseInt(reg.exec(translate)[1]);
    }
    return function(config){
        swiper(config);
    };

}());





































