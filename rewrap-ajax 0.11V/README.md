# JavaScript AJAX

## Update Usage(0.11 V)
As an ajax service;
```js

// wajax.js
wrap.service('ajax',
function ajax() {

    var getOption = {
        ajaxType: "GET",
        urlStr: "v2/html/broke/get_broke_ranked_info",
        data: null
    };

    var postOption = {
        ajaxType: "POST",
        urlStr: "v2/html/broke/get_broke_ranked_info",
        data: {
            "HTTP_USER_TOKEN": 'token',
            "HTTP_USER_UID": 12,
            "anchor_pfid": 1,
            "broke_pfid": 0,
            "date": {
                a: 1
            }
        }
    };

    // 支持大小写
    this.URL = getOption.urlStr;
    this.TYPE = getOption.ajaxType;
    this.SUCCESS = function(data) {
        var val = data;
        console.log(val)
    };
    this.ERROR = function(err) {
        console.log(err)
    };

});

```
