---
title: windows10日历
date: 2016-03-17 10:06:59
tags: jquery
categories: works
---
# [日历](http://wusuobu.github.io/calendar/index.html)
显示当前时间,日期 选定日期 查看以前以后的日期.
---
## 代码
``` bash
function Calendar(calendarObj){
	this.calendarObj = $(calendarObj);
	this.initElements();
	this.initEvents();
}

Calendar.prototype = {
	constructor:Calendar,
	
	initElements:function(){
		//定义时间样式
		this.dateStyle = 'YYYY年MM月DD日,星期W';
		this.yearMonthStyle = 'YYYY年MM月';
		this.timeStyle = 'HH:mm:ss';
		this.weekStyleArray = ['日','一','二','三','四','五','六'];
		
		//现在时间
		this.nowDate = new Date();
		
		//显示年月
		this.showDateYear = this.nowDate.getFullYear();
		this.showDateMonth = this.nowDate.getMonth()+1;
		this.calendarBody = this.foundCalendarBody(7, 7);
		this.setCalenderBodyDay(this.showDateYear,this.showDateMonth);
		
		var calendarObjHtml = '<div class="calendar-time"><span class="calendar-time-hour">'+this.getNowTimeHours()+'</span>'+
								'<span>:</span>'+
								'<span class="calendar-time-minute">'+this.getNowTimeMinutes()+'</span>'+
								'<span>:</span>'+
								'<span class="calendar-time-second">'+this.getNowTimeSeconds()+'</span>'+
								'</div>'+
								'<div class="calendar-date">'+this.getNowDate(this.dateStyle,new Date())+'</div>'+
								'<div class="calendar-tit">'+
									'<span class="calendar-tit-txt">'+this.getNowDate(this.yearMonthStyle,new Date())+'</span>'+
									'<a class="calendar-btn-last">上一个月</a>'+
									'<a class="calendar-btn-next">下一个月</a>'+
								'</div>';
		
		this.calendarObj.html(calendarObjHtml).append(this.calendarBody);
		
		
	},
	
	initEvents:function(){
		//显示最新时间
		this.repeatShowNowTime();
		
		//上个月
		var that = this;
		this.calendarObj.find('.calendar-btn-last').on('click',function(){
			if(that.showDateMonth == 1){
				that.showDateMonth = 12;
				that.showDateYear--;
			}else{
				that.showDateMonth--;
			}
			that.showDateMonth = parseInt(that.showDateMonth)>9?that.showDateMonth.toString():'0'+that.showDateMonth;
			that.calendarObj.find('.calendar-tit-txt').text(that.showDateYear+'年'+that.showDateMonth+'月');
			that.setCalenderBodyDay(that.showDateYear,that.showDateMonth);
			that.calendarBody.find('td').removeClass('calendar-active');
			that.calendarBody.find('td').removeClass('calendar-today-active');
		});
		
		
		//下个月
		this.calendarObj.find('.calendar-btn-next').on('click',function(){
			if(that.showDateMonth == 12){
				that.showDateMonth = 1;
				that.showDateYear++;
			}else{
				that.showDateMonth++;
			}
			that.showDateMonth = parseInt(that.showDateMonth)>9?that.showDateMonth.toString():'0'+that.showDateMonth;
			that.calendarObj.find('.calendar-tit-txt').text(that.showDateYear+'年'+that.showDateMonth+'月');
			that.setCalenderBodyDay(that.showDateYear,that.showDateMonth);
			that.calendarBody.find('td').removeClass('calendar-active');
			that.calendarBody.find('td').removeClass('calendar-today-active');
		});
		
		//选择日期
		var selectToday,activeToday;
		this.calendarBody.find('tr').slice(1,7).find('td').on('click',function(){
			activeToday = $(this).text();
			that.calendarBody.find('td').removeClass('calendar-active calendar-today-active');
			if(activeToday != selectToday){
				$(this).addClass('calendar-active');
				selectToday = $(this).text();
				//选择的日期为今天
				if(that.importantShowToday($(this).text())){
					$(this).addClass("calendar-today-active");
				}
			}else{				
				selectToday = null;
			}
		});
	},
	
	//获取现在日期
	getNowDate:function(dateStyle,newTime){
		dateStyle = dateStyle.replace(/YYYY/, newTime.getFullYear().toString());
		dateStyle = dateStyle.replace(/MM/, (newTime.getMonth()+1)>9?(newTime.getMonth()+1).toString():'0'+(newTime.getMonth()+1));
		dateStyle = dateStyle.replace(/DD/, newTime.getDate()>9?newTime.getDate().toString():'0'+newTime.getDate());
		dateStyle = dateStyle.replace(/W/, this.weekStyleArray[newTime.getDay()]);
		return dateStyle;
	},
	getNowTimeHours:function(){
		var nowDate = new Date;
		var nowTimeHours = nowDate.getHours()>9?nowDate.getHours().toString():'0'+nowDate.getHours();
		return nowTimeHours;
	},
	
	getNowTimeMinutes:function(){
		var nowDate = new Date;
		var nowTimeMinutes = nowDate.getMinutes()>9?nowDate.getMinutes().toString():'0'+nowDate.getMinutes();
		return nowTimeMinutes;
	},
	
	getNowTimeSeconds:function(){
		var nowDate = new Date;
		var nowTimeSeconds = nowDate.getSeconds()>9?nowDate.getSeconds().toString():'0'+nowDate.getSeconds();
		return nowTimeSeconds;
	},
	
	//重复显示最新时间--
	repeatShowNowTime:function(){	
		var that =this;
		var seconds = this.getNowTimeSeconds();
		this.calendarObj.find('.calendar-time-second').text(seconds); 
		if(seconds == '00'){
			var minutes = this.getNowTimeMinutes();
			this.calendarObj.find('.calendar-time-minute').text(minutes);
			if(minutes == '00'){
				this.calendarObj.find('.calendar-time-hour').text(this.getNowTimeHours());
			}
		}
		setTimeout(function(){
			that.repeatShowNowTime();
		},1000); 
	},
	
	
	//创建日历主体
	foundCalendarBody:function(rows,cells){
		var table = $('<table class="calendar-body"><tr class="calendar-body-tit"></tr></table>');
		for(var i=0; i<rows; i++){
			var tr = $('<tr></tr>');
			for(var j=0;j<cells;j++){
				var td=$('<td></td>');
				td.appendTo(tr);
			}
			table.append(tr);
		}
		var xx = table.find('.calendar-body-tit');
		for(var k=0; k<rows; k++){
			var cc = '<td>' + this.weekStyleArray[k] + '</td>'
			xx.append(cc);
		}		
		return table;
	},
	
	//往日历中填入日期
	setCalenderBodyDay:function(year,month){
		month=parseInt(month,10);
		var days = new Date(year,month,0);
		days = days.getDate();
		var weekday = new Date(year,month-1,1);
		weekday = weekday.getDay();
		var lastMonthDays = new Date(year,month-1,0);
		lastMonthDays = lastMonthDays.getDate()-weekday+1;
		var monthDays = 1;
		var nextMonthDays = 1;
		for(var i=1;i<7;i++){
			for(var j=0;j<7;j++){
				if(i==1&&j<weekday){
					this.calendarBody.find('tr').eq(i).find('td').eq(j).text(lastMonthDays);
					this.calendarBody.find('tr').eq(i).find('td').eq(j).removeClass("calendar-now");
					lastMonthDays++;
				}else{
					if(monthDays <= days){
						if(this.importantShowToday(monthDays)){
							this.calendarBody.find('tr').eq(i).find('td').eq(j).addClass("calendar-today");
						}else{
							this.calendarBody.find('tr').eq(i).find('td').eq(j).removeClass("calendar-today");
						}
						this.calendarBody.find('tr').eq(i).find('td').eq(j).text(monthDays);
						this.calendarBody.find('tr').eq(i).find('td').eq(j).addClass("calendar-now");
						monthDays++;
					}else{
						this.calendarBody.find('tr').eq(i).find('td').eq(j).text(nextMonthDays);
						this.calendarBody.find('tr').eq(i).find('td').eq(j).removeClass("calendar-now");
						nextMonthDays++;
					}
				}
			}
		}
		
	},
	
	//"今天"重点显示
	importantShowToday:function(today){
		if(this.showDateYear === this.nowDate.getFullYear()&&this.showDateMonth === this.nowDate.getMonth()+1){
			if(today == this.nowDate.getDate()){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	},
	
}
```
![](https://raw.githubusercontent.com/wusuobu/wusuobu.github.com/master/image/2016-03-17-10-11.jpg)
### 案例展示链接: [page](http://wusuobu.github.io/calendar/index.html)