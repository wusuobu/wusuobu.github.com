
function Agiotage(agiotageObj){
	this.agiotageObj = $(agiotageObj);
	this.initElements();
	this.initEvents();
}

Agiotage.prototype = {
	constructor:Agiotage,
	
	initElements:function(){		
		
		var agiotageObjHtml =   
		'<div class="agiotage-show">'+
			'<div class="agiotage-icon"><i class="icon"></i></div>'+
			'<h3 class="agiotage-tit">货币兑换</h3>'+
			'<span class="agiotage-show-result">1人民币元=0.1568美元</span>'+
		'</div>'+
		'<div class="agiotage-import">'+
			'<input class="agiotage-import-number" type="text" value="1" maxlength="12">'+
			'<select class="agiotage-import-currency-a">'+this.getSelectCurrency()+
			'</select>'+
			'<a href="#" onclick="return false;" class="agiotage-import-replace"><i class="icon-replace"></i></a>'+
			'<select class="agiotage-import-currency-b">'+this.getSelectCurrency()+
			'</select>'+
			'<a href="#" onclick="return false;" class="agiotage-get-result">转换</a>'+				
		'</div>'+
		'<div class="agiotage-warn">'+
			'<span class="agiotage-warn-currency" style="display:none;">请选择不同的货币单位</span>'+
			'<span class="agiotage-warn-number" style="display:none;">请输入数字</span>'+
		'</div>';
		
		
		this.agiotageObj.html(agiotageObjHtml);
		this.agiotageObj.find('.agiotage-import-currency-b option:eq(1)').attr('selected','selected');
		
	},
	
	initEvents:function(){
		//转换货币选择
		var that =this;		
		var selectFirstCurrency;
		var selectSecondCurrency;
		var importCurrencyA = this.agiotageObj.find('.agiotage-import-currency-a');
		var importCurrencyB = this.agiotageObj.find('.agiotage-import-currency-b');	
		var importNumber = this.agiotageObj.find('.agiotage-import-number');		
		var agiotageShowResult = this.agiotageObj.find('.agiotage-show-result');
		var agiotageWarnCurrency = this.agiotageObj.find('.agiotage-warn-currency');
		var agiotageWarnNumber = this.agiotageObj.find('.agiotage-warn-number');
		
		this.agiotageObj.find('.agiotage-import-replace').on('click',function(){
			var temporary ;
			temporary = importCurrencyA.val();
			importCurrencyA.val(importCurrencyB.val());
			importCurrencyB.val(temporary);
		});	
		
		this.agiotageObj.find('select').on('change',function(){
			selectFirstCurrency = importCurrencyA.find('option:selected').data('id');
			selectSecondCurrency = importCurrencyB.find('option:selected').data('id');
			if(selectFirstCurrency == selectSecondCurrency){
				agiotageWarnCurrency.show();
			}else{
				agiotageWarnCurrency.hide();
			}
		});
		
		this.agiotageObj.find('.agiotage-get-result').on('click',function(){
			var getOutput;
			var getOutputNumber;
			var getImportNumber = importNumber.val();
			if(isNaN(getImportNumber)){
				agiotageWarnNumber.show();
				return false;
			}else{
				agiotageWarnNumber.hide();
			}
			selectFirstCurrency = importCurrencyA.find('option:selected').data('id');
			selectSecondCurrency = importCurrencyB.find('option:selected').data('id');
			getOutputNumber = (that.currency.data[selectFirstCurrency].exchangeRate[selectSecondCurrency].number * 10000) * getImportNumber /10000;
			getOutput = getImportNumber + that.currency.data[selectFirstCurrency].value + '=' + getOutputNumber + that.currency.data[selectSecondCurrency].value
			agiotageShowResult.html(getOutput);
			that.getStringLength(getOutput);
		});
		
	},
	
	//获取可以选择的货币
	getSelectCurrency:function(){
		var SelectCurrency = '';
		for(var i=0;i<this.currency.data.length;i++){
			SelectCurrency += '<option data-id='+this.currency.data[i].id+' value="'+this.currency.data[i].value+'">'+this.currency.data[i].name+'</option>';
		}
		return SelectCurrency;
	},
	
	//计算字符串长度调整字体大小
	getStringLength:function(string){
		var length = 0;
		var agiotageResult = this.agiotageObj.find('.agiotage-show-result');
		length = string.replace(/[^\x00-\xff]/g,"**").length;
		length = Math.floor(900/length);
		if(length>=22){
			agiotageResult.css("fontSize","22px");
		}else{
			agiotageResult.css("fontSize",length+"px");
		}
		console.log(length);
	},
	
	
	currency: window.CURRENCY_DATA
}

