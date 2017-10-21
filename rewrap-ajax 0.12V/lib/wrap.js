
 /* @Author: zhengshanggen
 * @Team group: wangjianfei ...
 * @Date: 2017-09-25 15:32:29
 * @Last Modified by: zhengshanggen
 * @Last Modified time: 2017-10-17 08:00:00
*/

'use strict';

(function (global){

typeof defaults === 'undefined' ? false : defaults


var defaults = {
    g: global,
    step: 0,
    stamp: 0,
    wrap: global.wrap || {}
}


global.wrap = defaults.wrap


// init wrap lib
defaults.wrap = function (){
  this.absoluteObject = []
  this.relativeObject = []
  this.$promise = []
  // save call the object of functional, the parent 'default.wrap'
  this.common = []
  // save 'this.methods' used public method of call 
  this.public = []
  // save 'new this.methods' steal invoked methods
  this.static = []
  // save 'this.el' need method and class to call 
  this.class = {}
  // save the first create 'register' method
  this.create = {}
  // used scope invoked attr
  this.$scope = {}
  // the method manage attr for another the methods
  this.$props = {}
}


defaults.wrap.mess = null
defaults.wrap.target = null
defaults.wrap.common = []
defaults.wrap.storageNodeElement = [[],[]]
defaults.wrap.managePlanPartment = []


// 一、AJAX rewrap call
defaults.wrap.prototype.nativeAjax = function (success, error) {

  // define domain
  var domain = 'https://' + global.location.host + '/'

  var url = domain + this.relativeObject.URL
  var type = this.relativeObject.TYPE
  var data = this.relativeObject.DATA
  var xhrRequest = null
  var _this = this
  var str = ''

  if (global.XMLHttpRequest) xhrRequest = new XMLHttpRequest()
  else xhrRequest = new ActiveXObject('Microsoft.XMLHTTP')

  xhrRequest.open(type, url, true)

  if (type === "POST" && data != null) {
    xhrRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
    for (var key in data) {
      str += '&'+key+'='+data[key]
      str = str.slice(1)
    }
  }

  xhrRequest.onreadystatechange = function() {

    if (xhrRequest.readyState == 4) {

      if (xhrRequest.status == 200) {

        var obj = {
          state: xhrRequest.status,
          textData: xhrRequest.responseText
        }

        var responseData = _this.resolveData( obj )

        _this.validateSuccess( _this.$scope, success, [responseData], true )

      } else error( _this.$scope, xhrRequest.status )

    }

  }

  xhrRequest.send(str)
  ++defaults.step
}


defaults.wrap.prototype.resolveData = function (options){
  (options.state === 200) && !0
  var responseTextData = options.textData

  var text
  if(typeof responseTextData === 'string'){
    var _search = responseTextData.search(' ')
    if(_search >= 0){
      text = this.trim(responseTextData)
    }
    else text = responseTextData
  }

  return this.compileParse(text)
}


defaults.wrap.prototype.validateSuccess = function ($scope,isComplate,options,bool){
  var turn = [{
    bool: bool,
    msg:'查询成功',
    count: options.length,
    result: options
  }]

  isComplate($scope,turn)
}


defaults.wrap.prototype.compileStringify = function (options){
  return typeof options === 'object' ? JSON.stringify(options) : false
}


defaults.wrap.prototype.compileParse = function (options){
  return typeof options === 'string' ? JSON.parse(options) : false
}


// call fallback method
defaults.wrap.prototype.resolveComplexFallback = function resolveComplexFallback(options){
    var bindCall = [options]
    var _this = this
    return {
      custom : function (){
        var callAjaxMehtod = bindCall

        for(;;){
          if( callAjaxMehtod instanceof Array ){
            callAjaxMehtod = callAjaxMehtod.pop()
            continue
          }
          break
        }

        _this.absoluteObject = callAjaxMehtod

        return this
      },
      bind : function (){
        console.log([bindCall?bindCall:false])
      }
    }
}


defaults.wrap.prototype.trim = function(options){
  return options.replace(/^\s+|\S|\n$/,'')
}


defaults.wrap.prototype.toUppCase = function(options){
  return options.toUpperCase()
}


defaults.wrap.prototype.toLowCase = function(options){
  return options.toLowerCase()
}


defaults.wrap.prototype.setType = function(options){
    this.relativeObject[this.toUppCase(options)] = this.toUppCase(this.absoluteObject[options])
}


defaults.wrap.prototype.getType = function(options){
  // please return a debug log
  var takeUpper = this.relativeObject[this.toUppCase(options)]
  if(takeUpper === 'GET' || takeUpper === 'POST') return takeUpper
  return false
}


defaults.wrap.prototype.setUrl = function(options){
  // please return a debug log
    this.relativeObject[this.toUppCase(options)] = this.toLowCase(this.absoluteObject[options])
}


defaults.wrap.prototype.getUrl = function(options){
  return this.relativeObject[this.toUppCase(options)]
}


defaults.wrap.prototype.setData = function(options){
  // please return a debug log
  if(options in this.absoluteObject) this.relativeObject[this.toUppCase(options)] = this.toLowCase(this.absoluteObject[options])
  else this.relativeObject[this.toUppCase(options)] = null
}


defaults.wrap.prototype.getData = function(options){
  return this.relativeObject[this.toUppCase(options)]
}


defaults.wrap.prototype.setSuccess = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]]
}


defaults.wrap.prototype.getSuccess = function(options){
    return this.relativeObject[this.toUppCase(options)]
}


defaults.wrap.prototype.setError = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]]
}


defaults.wrap.prototype.getError = function(options){
  return this.relativeObject[this.toUppCase(options)]
}



defaults.wrap.prototype.setRegister = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]]
}


defaults.wrap.prototype.getRegister = function(options){
  return this.relativeObject[this.toUppCase(options)]
}



defaults.wrap.prototype.setProps = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]]
}


defaults.wrap.prototype.getProps = function(options){
  return this.relativeObject[this.toUppCase(options)]
}


defaults.wrap.prototype.setMethods = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]]
}


defaults.wrap.prototype.getMethods = function(options){
  return this.relativeObject[this.toUppCase(options)]
}


defaults.wrap.prototype.validateKeyForLowerCase = function (){
  var lower

  for(var k in this.absoluteObject){
    lower = this.toLowCase(k)

    if(lower !== k){
      this.absoluteObject[lower] = this.absoluteObject[k]
      delete this.absoluteObject[k]
    }

  }
  return 1
}

function parseData (options){
  var opt = options
  var ebbe = /(\{\{)\s*([a-zA-Z]*(\_|\$)?)*\s*(\}\})/g
  if(opt.search(/\{\{/) >= 0){
    var rem = opt.match(ebbe)
    var paramName = rem[0].replace(/\{\{|\}\}|\s*/g,'')

    var dataTarget = defaults.wrap.common[0].$scope.$props.$dataTarget[paramName]
    var str = ''
    for(var i= 0; i < dataTarget.length; i++){
      str += opt.replace(ebbe,dataTarget[i])
    }

    return (str.length > 1) && str
  }
  else return options
}


defaults.wrap.prototype.initStaticMethods = function (){
  
  return {
    addClass : function (elem,cls){
      if(!this.hasClass(elem,cls)){
          this.getSelector(elem).className += " "+cls
      }
    },
    hasClass : function (elem,cls){
      return this.getSelector(elem).className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))
    },
    pushHtml : function (elem,data){
      var value = parseData(data)
      return this.getSelector(elem).innerHTML = value
    },
    removeClass : function (elem,cls){
      var node = this.getSelector(elem)
      if(this.hasClass(elem,cls)){
          var reg=new RegExp('(\\s|^)'+cls+'(\\s|$)')
          node.className = node.className.replace(reg,"")
      }
    },
    getEleId : function (id){
        return document.getElementById(id)
    },
    getSelector : function (options){
        return document.querySelector(options)
    }
  }
}


defaults.wrap.prototype.staticMethods = function (){
  this.static.push(new this.initStaticMethods())
}


defaults.wrap.prototype.organization = function ( getArgs, location ){

  if(this.$promise.length > 0) {
    location = [this.$promise[0]]
  }

  var dist = location.push({
    'dist register': getArgs.getRegister[0],
    'dist props': getArgs.getProps[0],
    'dist methods': getArgs.getMethods[0]
  })

  if(this.$promise[0] instanceof Object){
    Object.assign(this.$promise[0], location.pop())
  }
  else this.$promise.push(location.shift())

  var _this = this

  return {
    count: defaults.stamp++,
    type: Array,
    isComplate: defaults.wrap.mess,
    state: 'successful distribution!',
    result: {
      get $promise() {
        return _this.$promise
      },
      set $promise( val ) {
        _this.$promise.mount = val
      }
    }
  }
}


defaults.wrap.prototype.analysisPlan = function ( giz ){
  var acceptPlan = giz.$promise
  var _this = this

  return {
    analysisProps: function () {
      return acceptPlan[acceptPlan.length-1]['dist props'](acceptPlan.mount)
    },

    analysisMethods: function () {
      var distMethods = acceptPlan[acceptPlan.length-1]

      distMethods.nail = {}

      // this is bottom $scope domain
      distMethods.nail.$scope = acceptPlan.mount()

      Object.assign(_this, distMethods.nail)

      distMethods.$scope = distMethods.nail.$scope[0].$scope

      var len = 0
      var keys

      for(var k in distMethods.$scope){
        if(distMethods.$scope[k].length > 0){
          Object.assign(distMethods.$scope[k], distMethods.$scope[k][distMethods.$scope[k].length-1])
          delete distMethods.$scope[k][distMethods.$scope[k].length-1]
          keys = Object.keys(distMethods.$scope[k])
        }
        distMethods.$scope[k].length = keys.length
        distMethods.$scope.length = ++len
        distMethods.$scope.type = 'object'
      }

      return acceptPlan[acceptPlan.length-1]['dist methods'](distMethods.$scope)
    }
  }
}


defaults.wrap.prototype.callHandlePlanGroup = function ( project, noticyFullPartment ){
  var report = []

  if(project instanceof Object) report = [project]

  report = project

  this.managePlanPartment = report

  this.managePlanPartment.progress = noticyFullPartment ? noticyFullPartment : defaults.wrap.mess

  defaults.wrap.managePlanPartment = this.managePlanPartment
}


defaults.wrap.prototype.callHandlePlanGroup.member = function ( project ){
  var getPlanContent = defaults.wrap.common[0].callHandlePlanGroup.managePlanPartment_lend.submitPlan

  return {
    information : function  () {
      return getPlanContent
    },

    // send the message to organization methods
    message : function  ( mess, _is ) {
      defaults.wrap.mess = [{
        message: mess,
        isTruth: _is ? true : false
      }]
    }
  }
}


defaults.wrap.prototype.callHandlePlanGroup.managePlanPartment_lend = function  ( select ) {
  var keys = Object.keys(defaults.wrap.managePlanPartment)
  var _number = keys.length

  var Ogroup = {}


  while(_number > 0){
    var eachKeys = keys.pop()
    Ogroup[eachKeys] = defaults.wrap.managePlanPartment[eachKeys]

    _number--
  }

  var out = Ogroup[select]

  defaults.wrap.common[0].callHandlePlanGroup.managePlanPartment_lend.recievPlan = out
  
  return [{
    num: _number,
    task: {
      out
    }
  }]
}


defaults.wrap.prototype.callHandlePlanGroup.Team_1 = function  () {
  var part = defaults.wrap.common[0].callHandlePlanGroup.managePlanPartment_lend

  var anyp = 'analysisProps'

  part(anyp)


  function plan_combo ( options ) {

    var knowTask = options[0]

    var state = 'state'

    this.props = new knowTask()

    if(typeof this.props === 'object'){

      if(state in this){

        this.state = this.props.state
      }
      else{
        this.$scope = this.props
      }
    }

    if( this.state !== undefined ) this.$scope.state = this.state


    return this
  }


  var getPlan_combo = plan_combo.call( this, part.recievPlan )
  delete this.state
  delete this.props

  part.submitPlan = getPlan_combo

  return {
    get $scope () {
      return getPlan_combo
    },
    set $scope (options) {
      return getPlan_combo
    }
  }
}


defaults.wrap.prototype.callHandlePlanGroup.Team_2 = function  () {
  var part = defaults.wrap.common[0].callHandlePlanGroup.managePlanPartment_lend

  var anym = 'analysisMethods'

  part(anym)

  function plan_combo ( options ) {

    var knowTask = options[0]

    this.methods = new knowTask()

    this.$methods = this.methods
    delete this.methods

    return this
  }

  var getPlan_combo = plan_combo.call( this, part.recievPlan )

  part.submitPlan = getPlan_combo

  function plan_entre (getClass) {
    var gac = getClass.toString()
    var e = /(this.el)(\()(\[)?((([a-zA-Z])*?((\.)([a-zA-Z])*)*)+?(\,)?)*(\])?(\))(\.)([a-zA-Z]|(\_)|($)|\d)*(\()((\s)*(([a-zA-Z]?(\d)*)|(\_)|(\$))+(\s)*?((\,)+(\s)*?([a-zA-Z]|(\_)|(\$)))*)*(\))/g
    var r_m = gac.match(e)
    var arr = []
    r_m.forEach(function(opt){
      var _opt = opt.replace(/(this.el)(\()(\[)?((([a-zA-Z])*?((\.)([a-zA-Z])*)*)+?(\,)?)*(\])?(\))./g,function(w){
        
        return w = '',w
      })
      var INDEX = _opt.indexOf('(')
          INDEX = _opt.substr(0,INDEX)

      return arr.push(INDEX)
    })
    return arr
  }

  return {
    get $methods () {
      return getPlan_combo.$methods
    },
    set $methods (options) {
      var _self = this.$methods
      getPlan_combo.$methods.$scope = options
      getPlan_combo.$methods.el = function ( node ) {


        var callPublic = defaults.wrap.common[0].public
        var cpc_len = callPublic.length
        var getWithPublicCurrentKeys = defaults.wrap.common[0].public[cpc_len-1]

        if(typeof node === 'string'){
          defaults.wrap.storageNodeElement[0].push(node)
          defaults.wrap.storageNodeElement[1][getWithPublicCurrentKeys][0].element.push(node)
        }
        else if(node instanceof Array){
          node.map(function (n){
            defaults.wrap.storageNodeElement[0].push(n)
            defaults.wrap.storageNodeElement[1][getWithPublicCurrentKeys][0].element.push(n)
          })
        }

        var getClass = _self[getWithPublicCurrentKeys]

        var subClass = plan_entre(getClass)


        var invoked = {}
        invoked[subClass[0]] = function (isInvokeData) {

          var initConstru = function (options){

            if(node instanceof Array) return defaults.wrap.common[0].static[0][getWithPublicCurrentKeys](defaults.wrap.target,options)
            else if(typeof node === 'string') return defaults.wrap.common[0].static[0][getWithPublicCurrentKeys](node,options)
          }

          if(isInvokeData !== undefined) return initConstru(isInvokeData)
          else return initConstru

        }

        defaults.wrap.storageNodeElement[1][getWithPublicCurrentKeys][0].use[subClass[0]] = invoked[subClass[0]]
        part.submitPlan = invoked

        return invoked
      }
    }
  }
}


Object.defineProperties(defaults.wrap.prototype.callHandlePlanGroup.managePlanPartment_lend,{
  recievPlan: {
    get : function  () {
      return this.val
    },
    set : function  (options) {
      this.val = [options]
    }
  },
  submitPlan: {
    get : function  () {
      return this.data
    },
    set : function  (options) {
      this.data = [options]
    }
  }
})


defaults.wrap.prototype.broadcastInterface = function ( _invokeMethods, _prop ){
  var _invoke_subClass = new _invokeMethods()
  var _scope = _prop.$scope

  var _self = this

  this.$scope = {
    $props: function (data){
      _self.$scope.$props.$data = {}
      _self.$scope.$props.$dataTarget = {}

      if(data){
        for(var ks in data){
          // json data
          var isDataAndArgs = data[ks]
          if(_self.$scope.$props.$data[ks] === undefined) _self.$scope.$props.$data[ks] = {}

          if(typeof isDataAndArgs === 'string'){
            _self.$scope.$props.$data[ks] = data[ks]
          }
          else if( isDataAndArgs instanceof Array ){
            isDataAndArgs.forEach(function (ea){
              for(var argsKeys in ea){

                if(typeof _self.$scope.$props.$data[ks][argsKeys] !== 'string') _self.$scope.$props.$data[ks][argsKeys] = argsKeys

                if(!(_self.$scope.$props.$dataTarget[argsKeys] instanceof Array)) _self.$scope.$props.$dataTarget[argsKeys] = []
                
                _self.$scope.$props.$dataTarget[argsKeys].push(ea[argsKeys])
              }
            })
          }

        }
      }


      return {
          $el (node) {
            var useMethod = {}
            if(defaults.wrap.storageNodeElement[0].indexOf(node) >= 0){
              for(var ix in defaults.wrap.storageNodeElement[1]){
                if(defaults.wrap.storageNodeElement[1][ix][0].element.indexOf(node) >= 0){
                  Object.assign(useMethod, defaults.wrap.storageNodeElement[1][ix][0].use)
                }
              }
            }
            defaults.wrap.target = node
            return useMethod
        }
      }

    }
  }
  this.$scope.$props['$scope'] = _scope.$scope
}


defaults.wrap.prototype.eachWithPublicMethods = function ( $definetionPublicMethods, $methods$scope ){
  var defineWithPublicMethods = $definetionPublicMethods

  for ( var k in defineWithPublicMethods ){
    if(k in this.static[0]){
      this.public.push(k)

      if(!(k in defaults.wrap.storageNodeElement[1])) {
        defaults.wrap.storageNodeElement[1][k] = [[]]
        defaults.wrap.storageNodeElement[1][k][0]['element'] = []
        defaults.wrap.storageNodeElement[1][k][0]['use'] = {}
      }
      else console.log( defaults.wrap.storageNodeElement[1][k] )

      defineWithPublicMethods[k]( $methods$scope )
    }
    else return void function (k){ return k}
  }
}



defaults.wrap.prototype.appPool = function (){
  var Args = arguments[0]

  this.staticMethods()

  // used insert the Array of position
  var distState = this.organization( Args, [] )

  var getResults = distState.result
  var noticyFullPartment = defaults.wrap.mess

  var AOP = new this.analysisPlan( getResults )

  this.callHandlePlanGroup( AOP, noticyFullPartment )

  var COT1 = this.common[0].callHandlePlanGroup.Team_1

  var definetionProps = new COT1()

  var COM = this.common[0].callHandlePlanGroup.member(true)

  var getInfo = COM.information

  COM.message('get a props data',true)

  getResults.$promise = getInfo

  var COT2 = this.common[0].callHandlePlanGroup.Team_2

  var definetionMethods = new COT2()

  definetionMethods.$methods = definetionProps.$scope

  var subMethods = definetionMethods.$methods

  this.eachWithPublicMethods( definetionMethods.$methods, definetionMethods.$methods.$scope.$scope )

  var COM = this.common[0].callHandlePlanGroup.member(true)

  // boss will be take with content and data, form Team 2 group
  var giveBossOfDataPipe = COM.information

  COM.message('get a methods data',true)

  getResults.$promise = giveBossOfDataPipe

  // save output data to application pool
  this.broadcastInterface(giveBossOfDataPipe, subMethods)

  return true
}


// return procssing ajax
defaults.wrap.fn = function bindObjectGroup(opt,fallback){
  var bindCall = new defaults.wrap(true)
  var empty = []

  // on the first, insert array to save
  bindCall.common.push(bindCall)

  if(typeof opt === 'string'){

    if(opt === 'ajax'){
      empty.length = 0
      defaults.wrap.chain 
      defaults.wrap.module = opt
    }
    else return false
  }


  if(typeof fallback === 'function'){

    if(empty.length) empty.length = 0
    empty.push(fallback)

    defaults.wrap.chain = function (options){
      return [(new (empty.shift()))]
    }

  }


  var resolveComplexFallback = bindCall.resolveComplexFallback(defaults.wrap.chain())
  var _customMethod = resolveComplexFallback.custom();



  if(typeof _customMethod === 'object'){
    // return boolean true
    var isTruth = bindCall.validateKeyForLowerCase();

    bindCall.setType('type')
    bindCall.setUrl('url')
    bindCall.setData('data')
    bindCall.getType('type')
    bindCall.getUrl('url')
    bindCall.getData('data')
    bindCall.setSuccess('success')
    bindCall.setError('error')
    bindCall.setRegister('register')
    bindCall.setProps('props')
    bindCall.setMethods('methods')
  }

  var getSuccess = bindCall.getSuccess('success')
  var getError =  bindCall.getError('error')
  var getRegister =  bindCall.getRegister('register')
  var getProps =  bindCall.getProps('props')
  var getMethods =  bindCall.getMethods('methods')

  defaults.wrap.common = bindCall.common

  // all resource be invoked on the pool
  bindCall.appPool({
    getRegister,
    getProps,
    getMethods
  })

  // dist property bound to this pointer
  var print = bindCall.nativeAjax(getSuccess.pop(), getError.pop())

  return print ? 'request json data success' : false
}


global.wrap['service'] = defaults.wrap.fn

})(this)