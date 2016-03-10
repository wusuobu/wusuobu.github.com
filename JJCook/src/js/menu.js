function Pulldown(elemObj,showObj,listObj){
    this.elemObj=$(elemObj);
    this.showObj= this.elemObj.find(showObj);
    this.listObj= this.elemObj.find(listObj);
    this.init();
}

Pulldown.prototype={
    constructor:Pulldown,

    init:function(){
        var $showObj=this.showObj;
        var $showObj_txt=$showObj.find("span");
        var $listObj=this.listObj;
        var $listObj_tag=$listObj.find("a");
        console.log($showObj);
        $showObj.on("click",function(){
            $listObj.show();
        });
        $listObj_tag.on("click",function(){
            $listObj.hide();
            $showObj_txt.text($(this).text());
        });
    }
};

function ActiveBtn(elemObj){
    this.elemObj=$(elemObj);
    this.init();
}

ActiveBtn.prototype={
    constructor:ActiveBtn,

    init:function (){
        var $elemObj = this.elemObj;
        var $elemObj_tag = $elemObj.find("dd");
        $elemObj_tag.on("click",function(){
            var index = $(this).index();
            $elemObj_tag.find("a").removeClass('active').eq(index-1).addClass('active');
        })
    }
};

function  HoverChange(elemObj,imgOBJ,hoverObj){
    this.elemObj=$(elemObj);
    this.imgObj=this.elemObj.find(imgOBJ)
    this.hoverObj=this.elemObj.find(hoverObj)
    this.init();
}

HoverChange.prototype={
    constructor:HoverChange,

    init:function(){
        var $imgObj_img = this.imgObj.find("img");
        var $hoverObj_tag = this.hoverObj.find("a");

        $hoverObj_tag.on("mouseenter",function(){
            var img = $(this).data("img");
            $imgObj_img.attr("src",img);
        })
    }
}