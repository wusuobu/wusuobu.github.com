$(function(){
    var change = new Change(".gs-img",".gs-nav",".gs-small-img");
    var rotation = new Rotation(".device-list",".device-list ul",".arrow");

    var $gs_nav = $(".gs-nav");
    var $gs_small_img = $(".gs-small-img");

    var $add_btn = $(".add-btn");
    var $sub_btn= $(".sub-btn");
    var $points=  $("input[name='points']");
    var num = 1;

    var $close = $(".icon-close");
    var $detail_hide = $(".detail-hide");

    $(window).on('resize', transfer).trigger('resize');

    $add_btn.on("click",function(){
        num = $points.val();
        if( num < $points.data("max")){
            num++;
            $points.val(num);
        }
    });
    $sub_btn.on("click",function(){
        num = $points.val();
        if( num > $points.data("min")){
            num--;
            $points.val(num);
        }
    });

    $close.on("click",function(){
        var _index = $(this).data("index");
        if(!_index){
            $detail_hide.show();
            $close.data("index",1).text("收起详情");
        }else{
            $detail_hide.hide();
            $close.data("index",0).text("展开详情");
        }

    });


    function transfer(){
        if($(document).width()==1000){
            $gs_nav.hide();
            $gs_small_img.addClass("align");
        }else{
            $gs_nav.show();
            $gs_small_img.removeClass("align");
        }
    }

});

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