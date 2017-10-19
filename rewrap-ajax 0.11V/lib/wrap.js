/*
 * @Author: cungen
 * @Date:   2017-09-25 15:32:29
 * @Last Modified by:   cungen
 * @Last Modified time: 2017-05-22 11:16:44
 * updating time 2017-9-25
*/

'use strict';
(function (global){

typeof defaults === 'undefined' ? false : defaults;


var defaults = {
    g: global,
    step: 0,
    stamp: 0,
    wrap: global.wrap || {}
};


global.wrap = defaults.wrap;


// init wrap lib
defaults.wrap = function (){
  this.absoluteObject = [];
  this.relativeObject = [];
}


// 一、AJAX封装
// 1、封裝AJAX函數
defaults.wrap.prototype.nativeAjax = function (success, error) {

  // 定义domain,方便环境切换
  var domain = 'https://' + global.location.host + '/';

  var url = domain + this.relativeObject.URL;
  var type = this.relativeObject.TYPE;
  var data = this.relativeObject.data;
  var xhrRequest = null;
  var _this = this;
  var str = '';

  if (global.XMLHttpRequest) xhrRequest = new XMLHttpRequest();
  else xhrRequest = new ActiveXObject('Microsoft.XMLHTTP');

  xhrRequest.open(type, url, true);

  if (type === "POST" && data != null) {
    xhrRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    for (var key in data) {
      str += '&'+key+'='+data[key];
      str = str.slice(1);
    }
  }

  xhrRequest.onreadystatechange = function() {

    if (xhrRequest.readyState == 4) {

      if (xhrRequest.status == 200) {

        var obj = {
          statu: xhrRequest.status,
          textData: xhrRequest.responseText
        }

        var responseData = _this.resolveData(obj);

        _this.validateSuccess(success,[responseData],true)

      } else error(xhrRequest.status);

    }

  }

  xhrRequest.send(str);
  ++defaults.step
}


defaults.wrap.prototype.resolveData = function (options){
  var responseTextData = options.textData;

  (options.statu === 200) && !0;

  var text;
  if(typeof responseTextData === 'string'){
    var _search = responseTextData.search(' ');
    if(_search >= 0){
      text = this.trim(responseTextData)
    }
    else text = responseTextData;
  }

  return this.compileParse(text);
}



defaults.wrap.prototype.validateSuccess = function (isComplate,options,bool){
  var turn = [{
    bool: bool,
    msg:'查询成功',
    count: options.length,
    result: options
  }];

  isComplate(turn)
}



defaults.wrap.prototype.compileStringify = function (options){
  return typeof options === 'object' ? JSON.stringify(options) : false;
}


defaults.wrap.prototype.compileParse = function (options){
  return typeof options === 'string' ? JSON.parse(options) : false;
}


// call fallback method
defaults.wrap.prototype.resolveComplexFallback = function resolveComplexFallback(options){
    var bindCall = [options];
    var _this = this;
    return {
      custom : function (){
        var callAjaxMehtod = bindCall;

        for(;;){
          if( callAjaxMehtod instanceof Array ){
            callAjaxMehtod = callAjaxMehtod.pop();
            continue;
          }
          break;
        }

        _this.absoluteObject = callAjaxMehtod;

        return this
      },
      bind : function (){
        console.log([bindCall?bindCall:false])
      }
    }
}


defaults.wrap.prototype.trim = function(options){
  return options.replace(/^\s+|\S|\n$/,'');
}


defaults.wrap.prototype.toUppCase = function(options){
  return options.toUpperCase();
}


defaults.wrap.prototype.toLowCase = function(options){
  return options.toLowerCase();
}


defaults.wrap.prototype.setType = function(options){
    this.relativeObject[this.toUppCase(options)] = this.toUppCase(this.absoluteObject[options]);
}


defaults.wrap.prototype.getType = function(options){
  // please return a debug log
  var takeUpper = this.relativeObject[this.toUppCase(options)];
  if(takeUpper === 'GET' || takeUpper === 'POST') return takeUpper;
  return false
}


defaults.wrap.prototype.setUrl = function(options){
  // please return a debug log
    this.relativeObject[this.toUppCase(options)] = this.toLowCase(this.absoluteObject[options]);
}


defaults.wrap.prototype.getUrl = function(options){
  return this.relativeObject[this.toUppCase(options)];
}


defaults.wrap.prototype.setData = function(options){
  // please return a debug log
  if(options in this.absoluteObject) this.relativeObject[this.toUppCase(options)] = this.toLowCase(this.absoluteObject[options]);
  else this.relativeObject[this.toUppCase(options)] = null;
}


defaults.wrap.prototype.getData = function(options){
  return this.relativeObject[this.toUppCase(options)];
}


defaults.wrap.prototype.setSuccess = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]];
}


defaults.wrap.prototype.getSuccess = function(options){
    return this.relativeObject[this.toUppCase(options)];
}


defaults.wrap.prototype.setError = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]];
}


defaults.wrap.prototype.getError = function(options){
  return this.relativeObject[this.toUppCase(options)];
}


defaults.wrap.prototype.validateKeyForLowerCase = function (){
  var lower;

  for(var k in this.absoluteObject){
    lower = this.toLowCase(k);

    if(lower !== k){
      this.absoluteObject[lower] = this.absoluteObject[k];
      delete this.absoluteObject[k];
    }

  }
  return 1
}


// return procssing ajax
defaults.wrap.fn = function bindObjectGroup(opt,fallback){
  var bindCall = new defaults.wrap(true);
  var empty = [];

  if(typeof opt === 'string'){

    if(opt === 'ajax'){
      empty.length = 0;
      defaults.wrap.chain; 
      defaults.wrap.module = opt;
    }
    else return false;
  }


  if(typeof fallback === 'function'){

    if(empty.length) empty.length = 0;
    else empty.push(fallback);

    defaults.wrap.chain = function (options){
      return [(new empty[0])]
    }

  }


  var resolveComplexFallback = bindCall.resolveComplexFallback(defaults.wrap.chain());
  var _customMethod = resolveComplexFallback.custom();



  if(typeof _customMethod === 'object'){
    // return boolean true
    var isTruth = bindCall.validateKeyForLowerCase();

    bindCall.setType('type');
    bindCall.setUrl('url');
    bindCall.setData('data');
    bindCall.getType('type');
    bindCall.getUrl('url');
    bindCall.getData('data');
    bindCall.setSuccess('success');
    bindCall.setError('error');
  }

  var getSuccess = bindCall.getSuccess('success');
  var getError =  bindCall.getError('error');

  // dist property bound to this pointer
  var print = bindCall.nativeAjax(getSuccess.pop(), getError.pop());

  return print ? 'request json data success' : false
}


global.wrap['service'] = defaults.wrap.fn;

})(this);








/*
合并其他分支上指定的文件或者文件夹到当前分支

git checkout branchName folderName
git checkout branchName path

注：一下都是在主分支master上执行的命令
1 把dev1 分支上app下所有的文件合并到主分支master上.
git checkout dev app

2 部分更新，如单独合并app/css/index.css到master主分支上.
git checkout dev app/css/index.css

3 部分文件夹dev分支上app的js文件夹下有多个JS文件都更新了.
git checkout dev app/js

合并过来的文件或者文件夹在主分支master上都是默认add过的，
然后需要在master分支上commit,再push即可完成合并更新！
*/