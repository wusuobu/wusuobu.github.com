---
title: jQuery 全选全不选反选
date: 2016-03-10 19:15:08
tags: jquery
categories: reprint
---
``` bash
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>jQuery中的DOM操作</title>
  <script type="text/javascript" src="jquery-1.3.2.js"></script>      //js文件路径改成自己的
     <script type="text/javascript">
      $(function(){
         //全选，反选
           $("button:eq(0)").click(function(){                  
          $(":Checkbox").attr("checked", true);              //":checked"匹配所有的复选框
         });
    //checked是设置选中状态。如果为true则是选中fo否则false为不选中
          $("Button:eq(1)").click(function(){
          $(":Checkbox").attr("checked",false);
          });
         $("Button:eq(2)").click(function(){
         $(":Checkbox").each(function(){
         $(this).attr("checked",!$(this).attr("checked")); 
   //断复选框的状态：如果选中则取反
        })
    });
   });
    
     </script>
  <style type="text/css">
   #apple{color:#F00;}
  </style>
 </head>
 <body>
  <input type="checkbox" id="checkbox1"><label for="checkbox1">TEARS AND RAIN</label><br>
  <input type="checkbox" id="checkbox2"><label for="checkbox2">TEARS AND RAIN</label><br>
  <input type="checkbox" id="checkbox3"><label for="checkbox3">TEARS AND RAIN</label><br>
  <input type="checkbox" id="checkbox4"><label for="checkbox4">TEARS AND RAIN</label><br>
  <input type="checkbox" id="checkbox5"><label for="checkbox5">TEARS AND RAIN</label><br><br>
  <button>全选</button><button>全不选</button><button>全反选</button>
 </body>
</html>
```