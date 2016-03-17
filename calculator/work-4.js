$(function(){
	var  importButtonNumber ="";
	var  outputComputeStyle = "";
	var  getImportNumber = 0;
	var  computResultNumber = 0;
	var  computeSign = "+-*/"
	var  currentSelectComputeSign = "";
	var  equalPressOnOff = false;
	$(".button").on("click", function(){
		//获取按键的值
		var $this = $(this);
		var num = $this.data("number");
		//判断是否数字
		if(!isNaN(num)){
			//按下之前是否按下过等号
			if(equalPressOnOff){
				//等于号开关复原,重置计算,开始新一次计算
				equalPressOnOff = false;
				importButtonNumber = "";
				currentSelectComputeSign = "";
			}
			//当第一个输入为零时，只录入一个零
			if(importButtonNumber == "" && num == "0"){
				return;
			}else{
				//录入值,并显示最新的值
				addImportNumbers(num);
				showComputeResult(importButtonNumber);
			}
			//判断是否为符号.
		}else if(num == "."){
			//检测录入的数字中是否已经录入过.
			if(importButtonNumber.indexOf(".") < 0){
				//检测录入的数字是否为0,为0显示0.
				if(importButtonNumber == "" && num == "."){
					//录入0.
					addImportNumbers("0.");
					showComputeResult(importButtonNumber);
				}else{
					//录入.
					addImportNumbers(".");
					showComputeResult(importButtonNumber);
				}
			}else{
				return;
			}
			//判断是否为四个运算符
		}else if(computeSign.indexOf(num) >= 0){
			//按下之前是否按下过等号
			if(equalPressOnOff){
				equalPressOnOff = false;
				//运算符变量获取运算符
				currentSelectComputeSign = num;
				importButtonNumber = computResultNumber;
				//之前是否运用了“正负”
				if(outputComputeStyle.indexOf("negate(") >= 0){
					addoutputStyle("",num);
				}else{
					addoutputStyle(importButtonNumber,num);
				}
				//重置录入结果
				getImportNumber = 0;
				importButtonNumber ="";
				//显示结果
				showComputeResult(computResultNumber);
				showComputeStyle(outputComputeStyle);
			}else{
				//是否为第一次录入运算符
				if(currentSelectComputeSign == ""){
					currentSelectComputeSign = num;
					//将录入结果转为数字并赋予"结果"
					computResultNumber = parseFloat(importButtonNumber);
					//将录入数字和运算符添加到计算样式
					addoutputStyle(importButtonNumber,num);
					//重置录入结果
					getImportNumber = 0;
					importButtonNumber ="";
					//显示结果
					showComputeResult(computResultNumber);
					showComputeStyle(outputComputeStyle);
				}else{
					//是否刚录入运算符且没有录入过数字
					if(computeSign.indexOf(outputComputeStyle.charAt(outputComputeStyle.length-1)) >= 0 && importButtonNumber == ""){
						//更改运算符，显示，不进行计算
						currentSelectComputeSign = num;
						outputComputeStyle = changeLastOnecomputeSign(outputComputeStyle, num);
						showComputeStyle(outputComputeStyle);
					}else{
						//获取录入数字
						getImportNumber = parseFloat(importButtonNumber);
						//将录入数字和运算符添加到计算样式
						addoutputStyle(importButtonNumber,num);
						//计算结果
						computResultNumber = computeLastResult(getImportNumber, currentSelectComputeSign, computResultNumber);
						//重置录入
						importButtonNumber ="";
						currentSelectComputeSign = num;
						//显示
						showComputeResult(computResultNumber);
						showComputeStyle(outputComputeStyle);
					}
				}
			}									
		}else if(num == "="){
			//按下之前是否按下过等号
			if(equalPressOnOff){
				//运行上一次计算，显示结果
				computResultNumber = computeLastResult(getImportNumber, currentSelectComputeSign, computResultNumber);
				outputComputeStyle = "";
				showComputeResult(computResultNumber);
				showComputeStyle(outputComputeStyle);
			}else{
				//打开等于号开关，等于号第一次按下
				equalPressOnOff = true;
				//获取数字，运算，重置，显示
				getImportNumber = parseFloat(importButtonNumber);
				computResultNumber = computeLastResult(getImportNumber, currentSelectComputeSign, computResultNumber);
				outputComputeStyle = "";
				importButtonNumber ="";
				showComputeResult(computResultNumber);
				showComputeStyle(outputComputeStyle);
			}
		}else if(num == "c"){
			//全部变量重置为初始
			importButtonNumber = "";
			outputComputeStyle = "";
			getImportNumber = 0;
			computResultNumber = 0;
			currentSelectComputeSign = "";
			showComputeStyle(outputComputeStyle);
			showComputeResult("0");
		}else if(num == "ce"){
			//清空录入数字
			importButtonNumber = "";
			showComputeResult("0");
		}else if(num == "delete"){
			//按下之前是否按下过等号
			if(equalPressOnOff || importButtonNumber == ""){
				return;
			}else{		
				//删除最后一个录入的数字
				importButtonNumber = deleteImportNumbers(importButtonNumber);
				//如果删除的是最后一个数字，应显示0
				if(importButtonNumber == ""){
					showComputeResult("0");
				}else{
					showComputeResult(importButtonNumber);
				}			
			}
		}else if(num == "minus"){
			//按下之前是否按下过等号
			if(equalPressOnOff){
				//直接将“结果”取反，显示
				computResultNumber = -computResultNumber;
				outputComputeStyle = "negate("+ -computResultNumber +")";
				showComputeResult(computResultNumber);
				showComputeStyle(outputComputeStyle)
			}else{
				//之前按下的是元素符号，且没有录入数字
				if(computeSign.indexOf(outputComputeStyle.charAt(outputComputeStyle.length-1)) >= 0 && importButtonNumber == ""){
					return;
				}else{
					//取反，显示
					importButtonNumber = minusImportNumbers(importButtonNumber);
					showComputeResult(importButtonNumber);
				}			
			}			
		}
	});
	
	//增加录入数字
	function addImportNumbers (number){
		importButtonNumber += number;
	}
	
	//删除最后一个录入的数字
	function deleteImportNumbers (importNumbers){
		return importNumbers = importNumbers.substring(0,importNumbers.length-1);
	}
	
	//将录入数字取反
	function minusImportNumbers (importNumbers){
		if(importNumbers.charAt(0) == "-"){
			return importNumbers = importNumbers.substring(1,importNumbers.length);
		}else{
			return importNumbers = "-" + importNumbers;
		}
	}
	
	//增加输出样式
	function addoutputStyle (importNumber,importSign){
		outputComputeStyle = outputComputeStyle + importNumber + importSign;
	}
	
	//显示计算结果
	function showComputeResult (result){
		$(".output-result").text(result);
	}
	
	//显示计算样式
	function showComputeStyle (result){
		$(".output-style").text(result);
	}
	
	//根据传入的数字运算符进行计算
	function computeLastResult (start, sign, finish){
		if(sign == "+"){
			return finish = finish + start;
		}else if(sign == "-"){
			return finish = finish - start;
		}else if(sign == "*"){
			return finish = finish * start;
		}else if(sign == "/"){
			return finish = finish / start;
		}else{
			return finish;
		}
	}
	
	//更换最后一个录入的数字
	function changeLastOnecomputeSign(string,computeSign){
		string = string.substring(0, string.length-1);
		string += computeSign;
		return string;
	}
});

function Calculator(id,button,showImportNumber,showOutputStyle){
	this.id = $(id);
	this.btn = this.id.find(button);
	this.showImportNumber = this.id.find(showImportNumber);
	this.showOutputStyle = this.id.find(showOutputStyle);
	this.val;
	this.computeSign = "+-*/";
	
	this.importNumber = "";
	this.outputStyle = "";
	this.waitComputNumber = 0;
	this.finishComputNumber = 0;
	this.importComputeSign = "";
	this.equalsSignOnOff = false;