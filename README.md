# JavaScript AJAX

使用管道(`props`)和公共方法(`methods`)作为指针进行调用!

## this.props 
 `state`内部 `'.size'和'.main'` 节点可通过管道流出，在`this.methods`内部使用`$scope`获得`this.props`返回的属性.
```js
this.props = function (){
    return {
        state: [{static:'.size', class:'.main'}]
    }
}
```

## this.methods
 返回对象为公用API方法, 然而`this.el`方法接收`props`管道的属性!

 如果是单个state属性直接保存, 如：`this.el($scope.state.static)`;

 如果是多个state属性使用[]数组保存, 如： `this.el([$scope.state.static,$scope.state.class])`;

 this.el().后面的`add()`方法为调用公用API方法addClass.
```js
this.methods = function  () {
    var $scope = this.$scope
    return {
        addClass: function ($scope){
            this.el([$scope.state.static, $scope.state.class]).add()
        }
    }
}
```

## 外部方法(如this.success)
然而外部的方法使用作用域`$scope`的方式调用`el`元素绑定的私有方法(如`add()`, `remove()`, `push()`)

添加解析数据类型：
调用json数据的格式, 通过`$props`方法传入一个args, 于是在后面的`push`方法调用到数组对内部的数据.

比如：
```js
var suc = [{name:'yes'},{num:'123'}]
var props = $scope.$props
$scope.$props( {suc} ).$el(props.$scope.state.static).push('<em>{{' +props.$data.suc.name+ '}}<em>-')
```

另一种props不传入json格式, 调用`push`方法直接推入字符串`.push('<div>123456</div>')`.

比如：
```js
var scope = $scope.$props.$scope
$scope.$props().$el(scope.state.static).push('<div>123456<div>-')
```
合并如下：
```js
function( $scope ) {
    var suc = [{name:'yes'},{num:'123'}]
    $scope.$props( ).$el($scope.$props.$scope.state.static).push('<div>123456<div>-')
    $scope.$props( {suc} ).$el($scope.$props.$scope.state.static).push('<em>{{' +$scope.$props.$data.suc.name+ '}}<em>-')
}
```

## 完整的示例
```html
<html><body><style>.color{color: #FF0000}.font{font-size: 38px}</style><div class='main size'>hello world!</div>
<script src="https://koringz.github.io/rewrap/rewarper%200.12V/lib/wrap.js"></script>
<script>
wrap.service('ajax', function ajax() {
    this.props = function (){
        return { state: [{static:'.size',class:'.main'}] }
    }
    this.methods = function () {
        var scope = this.$scope
        return {
            pushHtml: function (scope) {
                this.el(scope.state.static).push()
            },
            addClass: function (scope) {
                this.el([scope.state.static,scope.state.class]).add()
            }
        }
    }
    this.URL = "query.do"
    this.TYPE = "GET"
    this.SUCCESS = function ( $scope, data ) {
        console.log(data)
        var scope = $scope.$props.$scope
        var props = $scope.$props
        var suc = [{name:'百度',val:'0'},{name:'淘宝',val:'0'},{name:'腾讯',val:'0'}]
        $scope.$props( {suc} ).$el(scope.state.static).push('<em>{{' +props.$data.suc.name+ '}}<em>')
    }
    this.ERROR = function ( $scope, err ) {
        console.log(err)
        var scope = $scope.$props.$scope
        var props = $scope.$props
        $scope.$props().$el(scope.state.static).add('color')
        $scope.$props().$el(scope.state.class).add('font')
        $scope.$props().$el(scope.state.static).push('<em>调用出错<em>')
    }
})
</script>
</body></html>
```

## 演示DEMO : [REWRAP-AJAX TEST](https://koringz.github.io/rewrap/rewarper%200.12V/src/test.html)

## Blog简介 : [REWRAP-AJAX TEST](http://www.cnblogs.com/hao5599/p/7695902.html)

## API方法：

 - `'.props'`
 - `'.methods'`
 - `'.addClass'`
 - `'.hasClass'`
 - `'.pushHtml'`
 - `'.removeClass'`
 - `'.getEleId'`
 - `'.getSelector'`
 - `'.nextAll'`
 - `'.prevAll'`
 - `'.type'`
 - `'.url'`
 - `'.data'`
 - `'.success'`
 - `'.error'`

## [old version 0.10v](https://github.com/ZWLTZ/rewrap-ajax/tree/master/rewrap-ajax%200.10V/README.md)
## [old version 0.11v](https://github.com/ZWLTZ/rewrap-ajax/tree/master/rewrap-ajax%200.11V/README.md)
