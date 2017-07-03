# javaScript

	```javascriipt
	
		/*
	'use strict';
	// 一、AJAX封装
	// 1、封裝AJAX函數
	function nativeAjax(option,success,error){
		// 定义domain,方便环境切换
		var domain='https://' + window.location.host + '/';
		// var domain='http://' + window.location.host + '/';
		var url=domain+option.urlStr;
		var type=option.ajaxType;
		var data=option.ajaxData;
		var xhrRequest=null;
		if(window.XMLHttpRequest){
	        xhrRequest = new XMLHttpRequest();
	    } else {
	        xhrRequest = new ActiveXObject('Microsoft.XMLHTTP')
	    }
		var str=null;
		xhrRequest.open(type,url,true);
		if(type==="POST"&&data!=null){
			xhrRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
			for(var key in data){
				str+='&'+key+'='+data[key];
				str=str.slice(1);
			}
		}
		xhrRequest.onreadystatechange=function(){
			if(xhrRequest.readyState==4){
				if(xhrRequest.status==200){
					// 1.1、格式化返回的数据
					var responseData=JSON.parse(xhrRequest.responseText);
					// 1.2、这里操作数据--------
					success(responseData);
				}else{
					// 1.3、没成功返回HTTP状态码
					error(xhrRequest.status);
				}
			}
		}
		xhrRequest.send(str);
	}
	// 2、POST：定義請求參數
	var postOption={
		ajaxType:"POST",
		urlStr:"v2/html/broke/get_broke_ranked_info",
		ajaxData:{										
			"HTTP_USER_TOKEN":token,
			"HTTP_USER_UID":pfid, 
			"anchor_pfid":anchor_pfid,
			"broke_pfid":pfid,
			"date":date
		}
	}
	// 3、调用AJAX
	nativeAjax(postOption,function(data){
		// 3.1、请求成功回调
		console.log(data);
	},function(error){
		// 3.2、请求失败回调,返回HTTP状态码
		console.log(error);
	});
	//4、GET：定义请求参数
	var getOption={
		ajaxType:"GET",	
		urlStr:"v2/html/broke/get_broke_ranked_info",
		ajaxData:null		
	}
	nativeAjax(getOption,function(data){
		// 成功函数
		console.log(data);
	},function(error){
		// 失败返回HTTP状态码
		console.log(error);
	
	});
	// 使用说明
	// 、option必须
	option={
		//1、ajaxType必须："GET"或者"POST"
		ajaxType:"",
		//2、urlStr必须："string类型"
		urlStr:"",
		//3、必须：POST时候为object{key:value}，GET的时候直接为：null
		ajaxData:null
	}
	//  success请求成功回调必须
	//  error请求失败回调必须
	
	
	// 二、判断是否是IOS
	function isIos(){
	    var u = navigator.userAgent,
	    app = navigator.appVersion;
	    //ios终端
	    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	    return isiOS;
	}
	
	//1、ClassName切换,是否含有指定class
	function hasClass(elem,cls){
	    return elem.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}
	// 2、没有就追加指定class
	function addClass(elem,cls){
	    if(!hasClass(elem,cls)){
	        elem.className+=" "+cls;
	    }
	}
	// 3、有就移除指定class
	function removeClass(elem,cls){
	    if(hasClass(elem,cls)){
	        var reg=new RegExp('(\\s|^)'+cls+'(\\s|$)');
	        elem.className=elem.className.replace(reg,"");
	    }
	}
	
	
	// 三、获取DOM
	// 3.1
	window.$=HTMLElement.prototype.$=function(selector){
		return (this==window?document:this).querySelectorAll(selector);
	}
	// 3.2
	function getEleId(id){
	    return document.getElementById(id);
	}
	// 5、追加HTML
	function pushHtml(id,html){
	    return document.getElementById(id).innerHTML=html;
	}
	
	// 四、封装綁定事件
	function on(type,selector,callback){
	    document.addEventListener(type,function(e){
	        e.preventDefault();
	        e.stopPropagation();
	        if(selector==e.target.tagName.toLowerCase()||selector==e.target.className||selector==e.target.id){
	            callback(e);
	        }
	    })
	}


```
