$(function(){
    var rotate = new Rotate(".gh-bg ul",".arrow");
    var change = new Change(".comment-txt",".comment-nav");
});



function Rotate(elemObj, arrowsObj){
    this.elemObj=$(elemObj);
    this.arrowsObj=$(arrowsObj);
    this.init();
};

Rotate.prototype ={
    constructor:Rotate,

    init:function(){
        var $elemObj_tag = this.elemObj.find("li");
        var $prev =  this.arrowsObj.find(".prev");
        var $next =  this.arrowsObj.find(".next");
        var index=1;

        $next.on("click", function(){
            if(index >= $elemObj_tag.length){
                return false;
            }
            $elemObj_tag.eq(index-1)
                .stop().animate({
                'opacity':0
                },700)
                .css('z-index', 1)
                .end()
                .eq(index)
                .css('z-index', 9)
                .stop().animate({
                    'opacity':1
                },700);
            index++;
            $prev.removeClass("hide");
            if(index>=$elemObj_tag.length){
                $next.addClass("hide");
            }
        });

        $prev.on("click", function(){
            if(index <= 1){
                $(this).addClass("hide");
                return false;
            }
            index--;
            $elemObj_tag.eq(index)
                .stop().animate({
                    'opacity':0
                },700)
                .css('z-index', 1)
                .end()
                .eq(index-1)
                .css('z-index', 9)
                .stop().animate({
                    'opacity':1
                },700);
            $next.removeClass("hide");
            if(index<=1){
                $prev.addClass("hide");
            }
        });
    }
};

function Change(elemObj,navObj){
    this.elemObj=$(elemObj);
    this.navObj=$(navObj);
    this.init();
}

Change.prototype ={
    constructor:Change,

    init:function(){
        var $elemObj_tag = this.elemObj.find("li");
        var $navObj_tag = this.navObj.find("li");

        $navObj_tag.on("mouseenter",function(){
            var index = $(this).index();
            console.log(index);
            $navObj_tag.removeClass("active").eq(index).addClass("active");
            $elemObj_tag.stop().animate({
                    'opacity':0
                },700,function(){})
                .css('z-index', 1)
                .eq(index)
                .css('z-index', 9)
                .stop().animate({
                    'opacity':1
                },700,function(){});
        });
    }
};

