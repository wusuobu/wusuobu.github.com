function NavigationBar(navigationBarObj,dataName){
	this.$navigationBarObj = $(navigationBarObj);
	this.data = dataName.data;
	this.initElements();
}

NavigationBar.prototype = {
	constructor:NavigationBar,
	
	initElements:function(){
		this.create();
		
		var $navigationBarObj = this.$navigationBarObj;
		
		$.each(this.data,function(){
			var name = this.value;
			var $navigationBarObjBD = $navigationBarObj.find('.'+name+'-bd');
			var $navigationBarObjList = $navigationBarObj.find('.list');
			$.each(this.content,function(index){
				$navigationBarObjBD.eq(index).hover(
					function(){
						$navigationBarObjList.eq(index).show();
					},
					function(){
						$navigationBarObj.Timeout = setTimeout(function(){
							$navigationBarObjList.eq(index).hide();
						},10);
					}					
				);
				
				$navigationBarObjList.eq(index).hover(
					function(){
						clearTimeout($navigationBarObj.Timeout);
						$navigationBarObjList.eq(index).show();
						$navigationBarObjBD.eq(index).addClass(name+'-bd-hover');
					},function(){
						$navigationBarObjList.eq(index).hide();
						$navigationBarObjBD.eq(index).removeClass(name+'-bd-hover');
					}
				);
				
			});	
		});	
	},
	
	create:function(){
		this.createNavigationBarHead(this.data);
		this.createNavigationBarBody(this.data[0].content);
	},
	
	createNavigationBarHead:function(data){
		var that = this;
		var navigationBarHeadHtml = '';
		$.each(data,function(){
			navigationBarHeadHtml += '<div class="title">淘宝特色服务</div><dl class="'+this.value+'">'+
										'<dt class="'+this.value+'-hd"><i class="icon-'+this.value+'"></i>'+this.name+'</dt>';										
										$.each(this.content,function(value){											
											navigationBarHeadHtml += '<dd class="'+value+'-bd">'
											$.each(this.className,function(){
												navigationBarHeadHtml += '<a href"#">'+this+'</a>';
											});
											navigationBarHeadHtml += '</dd>';
											//that.createNavigationBarBody(this.list);
										},[this.value]);										
			navigationBarHeadHtml +='</dl>';
									
		});
		this.$navigationBarObj.prepend(navigationBarHeadHtml);
	},
	
	createNavigationBarBody:function(data){
		var navigationBarBodyHtml = '<div class="particular">';
		$.each(data,function(){
				navigationBarBodyHtml += '<div class="list">';
				$.each(this.list,function(){
					navigationBarBodyHtml += '<div class="items">'+
												'<div class="items-title items-title-'+this.value+'">'+
													'<a href="#" class="title-txt">'+
														'<i></i><span>'+this.name+'</span>'+
													'</a>'+
													'<a href="#" class="more">更多</a>'+
												'</div>'+
												'<ul class="'+this.value+'">';
												$.each(this.items,function(){
													navigationBarBodyHtml += '<li><a href"'+this.link+'">'+this.name+'</a></li>';
												});
					navigationBarBodyHtml += '</ul>'+
											'</div>';
				});
			navigationBarBodyHtml += '</div>';	
		});
		navigationBarBodyHtml += '</div>';
		this.$navigationBarObj.append(navigationBarBodyHtml);
	}
}
