function extend(subType, superType){
	var F = function(){};
	F.prototype = superType.prototype;
	//子类的prototype指向F的_proto_ ， _proto_又指向父类的prototype 
	subType.prototype = new F();
	//在子类上存储一个指向父类的prototype的属性，便于子类的构造方法中与父类的名称解耦 
	//使用subClass.superClass.constructor.call代替superClass.call  
	subType.superClass = superType.prototype; 
}

function Zhilei(id){  
    Zhilei.superClass.constructor.call(this, id);  
} 

extend(Zhilei, Fulei); 




function extend(subType, superType){
	function F(){};
	F.prototype = superType.prototype;	
	F.constructor = subType;
	subType.prototype = new F();
}

function Zhilei(id){  
    Fulei.call(this, id);  
} 

extend(Zhilei, Fulei); 