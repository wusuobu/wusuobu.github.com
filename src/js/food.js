function Change(elemObj,navObj,shrinkObj){
    this.elemObj=$(elemObj);
    this.navObj=$(navObj);
    this.shrinkObj=$(shrinkObj);
    this.init();
}

Change.prototype={
    constructor:Change,

    init:function(){
        var $elemObj_img = this.elemObj.find("img");
        var $navObj_tag = this.navObj.find("a");
        var $shrinkObj_tag = this.shrinkObj.find("a");
        $navObj_tag.add($shrinkObj_tag).on("mouseenter",function(){
            var index = $(this).index();
            var img = $shrinkObj_tag.eq(index).data("img");
            $navObj_tag.removeClass("active").eq(index).addClass("active");
            $shrinkObj_tag.removeClass("active").eq(index).addClass("active");
            $elemObj_img.attr("src",img);
        });

    }
};

function Rotation(elemObj,bannerObj,arrowsObj){
    this.elemObj=$(elemObj);
    this.bannerObj=$(bannerObj);
    this.arrowsObj=$(arrowsObj);
    this.init();
}

Rotation.prototype={
    constructor:Rotation,

    init:function(){
        var $show = this.elemObj;
        var $bannerObj = this.bannerObj;
        var $bannerObj_tag = $bannerObj.find("li");
        var $prev =  this.arrowsObj.find(".prev");
        var $next =  this.arrowsObj.find(".next");
        var $show_width = $show.width();
        var $bannerObj_tag_width = $bannerObj_tag.innerWidth();
        var _switch = true;

        $prev.on("click", function(){
            var _left = parseFloat($bannerObj.css("left"));
            if(_left >= 0 || !_switch) {
                return false;
            }
            _switch = false;
            $bannerObj.stop().animate({
                left:parseFloat(_left)+$bannerObj_tag_width+"px"
            }, 700,function(){
                _switch = true
            });
        });

        $next.on("click", function(){
            var _left = parseFloat($bannerObj.css("left"));
            if(_left <= -$bannerObj_tag.length*$bannerObj_tag_width+$show_width || !_switch) {
                return false;
            }
            _switch = false;
            $bannerObj.stop().animate({
                left:parseFloat(_left)-$bannerObj_tag_width+"px"
            }, 700,function(){
                _switch = true
            });
        });
    }
};