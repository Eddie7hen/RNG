/* 
* @Author: Marte
* @Date:   2017-11-02 20:05:26
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-02 21:23:45
*/
function ajax(options){
    //编写对象,实现默认参数
    var defaults = {
        //请求类型默认为get
        type:'get',

        // 是否异步
        async:true,

        //jsonp请求默认参数名
        jsonpName:'callback'

    }

    // var opt = Object.assign({},defaults,options);
    //通过遍历,将option的数值添加到default,扩展参数
    //存在则将重写,不存在则添加
    for(var attr in options){
        defaults[attr] = options[attr];
    }
    //定义opt指向default
    var opt = defaults;

    // type参数忽略大小写
    opt.type = opt.type.toLowerCase();

    //处理参数,创建空的字符串接收数据
    var params = '';
    // opt.data={}
    //对传入的数据进行判断
    if(opt.data){
        //遍历传入数据的data对象,获取参数
        for(var attr in opt.data){
            //以id=1&name=eddie的形式
            params += attr + '=' + opt.data[attr] + '&';
        }

        //通过字符串slice(),截取多余的&
        parmas = parmas.slice(0,-1);
    }

    //若是传入的类型是jsonp
    if(opt.type === 'jsonp'){
        /*
            1)预定义全局函数
            2)创建script标签,根据src属性插入url,插入body内
            3)返回数据时,删掉标签,将其传送回传进的函数
         */
        //随机函数名,防止返回是被覆盖
        var callbackName = 'getData' + Math.floor(Math.random()*10000);
        // var callbackName = 'getData' + Date.now();

        //定义全局函数
        window[callbackName] = function(res){
            try{
                res = JSON.parse(res);
            }catch(err){

            }

            // 数据传递到回调函数success
            if(typeof opt.success === 'function'){
                opt.success(res);
            }

            //用完删除script标签
            script.parentNode.removeChild(script);
        }

        //创建script标签,为jsonp做准备
        var script = document.createElement('script');

        //判断传送过来的地址,存在问号,直接在后面添加&,不存在则添加问号
        opt.url += opt.url.indexOf(?) > 0 ? & : ?;

        //拼接script的src属性
        script.src = opt.url + parmas + '&' +opt.jsonpName + '=' + callbackName;

        //将标签插入页面
        document.body.appendChild(script);

        //因为是jsonp函数,所以后面的代码不需要执行,则填写return
        return;
    }

    // 创建异步请求对象
    var xhr = null;
    try{
        // 标准浏览器
        xhr = new XMLHttpRequest();
    }catch(error){
        // IE浏览
        try{
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(err){
            try{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(e){
                alert('你的浏览器太low了，赶紧换吧');
                return;
            }   
        }
    }

    //定义变量status数组,保存状态码,用来判断该数组是否存在这个状态码
    var status = [200,304];
    //处理返回的数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && status.indexOf(xhr.status) > 0){
            var res = xhr.responseText;//string,json=>string,object,array
            try{
                // 标准浏览器
                res = JSON.parse(res);
            }catch(err){
                try{
                    // 如果浏览器不支持JSON.parse
                    // (eval方法添加括号时需要拼接)
                    res = eval('('+ res + ')'); 
                }catch(e){
                    res = xhr.responseText;
                }
            }

            // 数据传递到回调函数success
            if(typeof opt.success === 'function'){
                opt.success(res);
            }

        }
    }

    //对请求类型的判断,如果是get直接
    if(opt.type === 'get'){
        //对于url进行判断存不存在(?)opt.url.indexof('?')
        opt.url += opt.url.indexOf('?') > 0 ?  & : ?;

        //拼接url跟parmas
        opt.url += parmas;

        //将parmas变成null,避免通过send()方法时将数据传送时传递过去
        parmas = null;
    }

    // 调用open()方法, 建立与服务器连接
    xhr.open(opt.type,opt.url,opt.async);

    // 判断类型是否为post,如果是的话就要加入请求头
    if(opt.type === 'post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    }
    
    //发送数据,之前已经parmas变成了null;
    xhr.send(parmas);
}
ajax.jsonp = function(options){
    options.type = 'jsonp';
    this(options);
}
ajax.post = function(options){
    options.type = 'post';
    this(options);
}
ajax.get = function(options){
    options.type = 'get';
    this(options);
}
// options{
//     type:get/post,
//     url:http:....
//     data:
//     async:
// }