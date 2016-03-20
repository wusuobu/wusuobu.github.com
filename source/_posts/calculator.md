---
title: 计算器
date: 2016-03-17 10:06:37
tags: jquery
categories: works
---
# [计算器](http://wusuobu.github.io/calculator/index.html)
HTML+js实现windows自带计算机功能
---
## 代码
``` bash
function Calculator(calculatorObj,button,showImportNumber,showOutputStyle){
	this.calculatorObj = $(calculatorObj);
	this.btn = this.calculatorObj.find(button);
	this.showImportNumber = this.calculatorObj.find(showImportNumber);
	this.showOutputStyle = this.calculatorObj.find(showOutputStyle);
	
	
		
		
	this.initElements();
	this.initEvents();
}

Calculator.prototype = {
	constructor:Calculator,
	
	initElements:function(){
		this.computeSign = "+-*/";
		this.importNumber = "";
		this.outputStyle = "";
		this.waitComputNumber = 0;
		this.finishComputNumber = 0;
		this.importComputeSign = "";
		this.equalsSignOnOff = false;
	},
	
	initEvents:function(){
		var that = this;
		var val;
		var showComputeResult = [];
		this.btn.on("click", function(){
			val = $(this).data("number");

			if(!isNaN(val)){
				showComputeResult =that.loggingDataNumber(val);
				that.showResult(showComputeResult,that.showImportNumber,that.showOutputStyle);
			}else if(val == "."){
				showComputeResult =that.loggingDataPoint(val);	
				that.showResult(showComputeResult,that.showImportNumber,that.showOutputStyle);
			}else if(that.computeSign.indexOf(val) >= 0){
				showComputeResult =that.loggingDataComputeSign(val);
				console.log(showComputeResult);
				console.log(that.waitComputNumber);
				that.showResult(showComputeResult,that.showImportNumber,that.showOutputStyle);
			}else if(val == "="){
				showComputeResult =that.computResult(val);
				that.showResult(showComputeResult,that.showImportNumber,that.showOutputStyle);
			}else if(val == "c"){
				showComputeResult =that.resetCalculator(val);
				that.showResult(showComputeResult,that.showImportNumber,that.showOutputStyle);
			}else if(val == "ce"){
				showComputeResult =that.resetLoggingDataNumber(val);
				that.showResult(showComputeResult,that.showImportNumber,that.showOutputStyle);
			}else if(val == "delete"){
				showComputeResult =that.deleteLastNumber(val);
				that.showResult(showComputeResult,that.showImportNumber,that.showOutputStyle);
			}else if(val == "minus"){
				showComputeResult =that.minusLoggingDataNumber(val);
				that.showResult(showComputeResult,that.showImportNumber,that.showOutputStyle);
			}
		});
	},
	
	//录入数字
	loggingDataNumber:function(val){
		if(this.equalsSignOnOff){
			this.equalsSignOnOff = false;
			this.importNumber = "";
			this.outputStyle = "";
			this.waitComputNumber = 0;
			this.finishComputNumber = 0;
		}
		if(this.importNumber == "" && val == "0" ){
			return [null,"0"];
		}else{
			this.importNumber = this.mergeNumber(this.importNumber,val,"");
			return [null,this.importNumber];
			
		}		
	},
	
	//录入"."
	loggingDataPoint:function(val){
		if(this.importNumber.indexOf(".") < 0){
			if(this.importNumber == "" && val == "."){
				this.importNumber = this.mergeNumber(this.importNumber,"0.","");
			}else{
				this.importNumber = this.mergeNumber(this.importNumber,".","");
			}
			return [null,this.importNumber];
		}else{
			return [null,this.importNumber];
		}
	},
	
	//录入运算符
	loggingDataComputeSign:function(val){
		if(this.equalsSignOnOff){
			this.equalsSignOnOff = false;
			this.importComputeSign = val;
			this.importNumber = this.finishComputNumber;
			if(this.outputStyle.indexOf("negate(") >= 0){
				this.outputStyle = this.mergeNumber(this.outputStyle,val,"");
			}else{
				this.outputStyle = this.mergeNumber(this.outputStyle,this.importNumber,val);
			}
			//重置录入
			this.resetImportNumber();
			//显示结果
			return [this.outputStyle,this.finishComputNumber];
		}else{
			if(this.importComputeSign == ""){
				this.importComputeSign = val;
				this.importNumber = this.deleteLastOnePoint(this.importNumber);
				this.finishComputNumber = parseFloat(this.importNumber);
				this.outputStyle = this.mergeNumber(this.outputStyle,this.importNumber,val);
				//重置录入
				this.resetImportNumber();
				//显示结果
				return [this.outputStyle,this.finishComputNumber];
			}else{
				if(this.computeSign.indexOf(this.outputStyle.charAt(this.outputStyle.length-1)) >= 0 && this.importNumber == ""){
					this.importComputeSign = val;
					this.outputStyle = this.changeLastOnecomputeSign(this.outputStyle, val);
					return [this.outputStyle,null];
					//this.showResult(this.showOutputStyle,this.outputStyle);
				}else{
					this.importNumber = this.deleteLastOnePoint(this.importNumber);
					this.waitComputNumber = parseFloat(this.importNumber);
					this.outputStyle = this.mergeNumber(this.outputStyle,this.importNumber,val);
					this.finishComputNumber = this.computeLastResult(this.waitComputNumber,this.importComputeSign,this.finishComputNumber);
					this.importComputeSign = val;
					//重置录入
					this.resetImportNumber();
					//显示结果
					return [this.outputStyle,this.finishComputNumber];
				}
			}
		}
	},
	
	//录入"="
	computResult:function(val){
		if(this.equalsSignOnOff){
			this.finishComputNumber = this.computeLastResult(this.waitComputNumber,this.importComputeSign,this.finishComputNumber);
			return [null,this.finishComputNumber];
		}else{
			this.equalsSignOnOff = true;
			this.importNumber = this.deleteLastOnePoint(this.importNumber);
			if(this.importNumber === ''){
				this.waitComputNumber = 0;
			}else{
				this.waitComputNumber = parseFloat(this.importNumber);
			}		
			this.finishComputNumber = this.computeLastResult(this.waitComputNumber,this.importComputeSign,this.finishComputNumber);
			//重置录入、样式
			this.importNumber = "";
			this.outputStyle = "";
			//显示结果
			return [this.outputStyle,this.finishComputNumber];
		}
	},
	
	//录入"c"
	resetCalculator:function(val){
		this.importNumber = "";
		this.outputStyle = "";
		this.waitComputNumber = 0;
		this.finishComputNumber = 0;
		this.importComputeSign = "";
		return [this.outputStyle,this.finishComputNumber];
	},
	
	//录入"ce"
	resetLoggingDataNumber:function(val){
		this.resetImportNumber();
		return [null,this.waitComputNumber];
	},
	
	//录入"delete"
	deleteLastNumber:function(val){
		if(this.equalsSignOnOff || this.importNumber == ""){
			return [null,null];
		}else{
			this.importNumber = this.deleteLastImportNumbers(this.importNumber);
			if(this.importNumber == ""){
				return [null,"0"];
			}else{
				return [null,this.importNumber];
			}
		}
	},
	
	//录入"minus"
	minusLoggingDataNumber:function(val){
		if(this.equalsSignOnOff){
			this.finishComputNumber = -this.finishComputNumber;
			this.outputStyle = "negate(" + -this.finishComputNumber + ")";
			//显示结果
			return [this.outputStyle,this.finishComputNumber];
		}else{
			if(this.computeSign.indexOf(this.outputStyle.charAt(this.outputStyle.length-1)) >= 0 && this.importNumber == ""){
				return [null,null];
			}else{
				this.importNumber = this.minusImportNumber(this.importNumber);
				return [null,this.importNumber];
			}
		}
	},
	
	//合并数字
	mergeNumber:function(Numbera,Numberb,Numberc){
		return Numbera+=Numberb + Numberc;
	},
	
	
	//显示结果
	showResult:function(data,displayPositiona,displayPositionb){
		if(data[0] != null){
			if(data[0].length>21){
				displayPositionb.val(data[0].slice(-21,data[0].length));
			}else{
				displayPositionb.val(data[0]);
			}			
		}
		if(data[1] != null){
			displayPositiona.text(data[1]);
		}
	},
	
	
	//重置录入
	resetImportNumber:function(){
		this.importNumber = "";
		this.waitComputNumber = 0;
	},
					
	//根据传入的数字运算符进行计算
	computeLastResult:function(start, sign, finish){
		if(sign == "+"){
			return finish = finish + start;
		}else if(sign == "-"){
			return finish = finish - start;
		}else if(sign == "*"){
			return finish = finish * start;
		}else if(sign == "/"){
			return finish = finish / start;
		}
	},
	
	//删除最后一位
	deleteLastImportNumbers:function(importNumbers){
		return importNumbers = importNumbers.substring(0,importNumbers.length-1);
	},
	
	//更换最后一个录入的数字
	changeLastOnecomputeSign:function(string,computeSign){
		string = string.substring(0, string.length-1);
		string += computeSign;
		return string;
	},
	
	//将录入数字取反
	minusImportNumber:function(importNumbers){
		if(importNumbers.charAt(0) == "-"){
			return importNumbers = importNumbers.substring(1,importNumbers.length);
		}else{
			return importNumbers = "-" + importNumbers;
		}
	},
	
	//当最后一位为'.'时删除
	deleteLastOnePoint:function(importNumbers){
		console.log(typeof(importNumbers));
		if(typeof(importNumbers) === 'string'){
			if(importNumbers.charAt(importNumbers.length-1) === '.'){
				return importNumbers = importNumbers.substring(0,importNumbers.length-1);
			}else{
				return importNumbers;
			}
		}else{
			return importNumbers;
		}
	},
	
}
```
![](https://raw.githubusercontent.com/wusuobu/wusuobu.github.com/master/image/2016-03-17-10-10.jpg)
### 案例展示链接: [page](http://wusuobu.github.io/calculator/index.html)