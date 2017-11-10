/**
 * [实现传入任意数字n时的阶乘]
 * @param  {数字} n [传入的数值]
 * @return {数字}   [传入数值的阶乘]
 */
function factorial(n){
    if(n<=1){
        return 1;
    }
    return n * factorial(--n);
}

/**
 * [实现传入任意月份n时，兔子的数量]
 * @param {数字} n [月份]
 * @return {数字}   [传入月份时的兔子数量]
 */
function fibonacci(n){
    if(n<3){
        return 1;
    }
    return n = Fibonacci(n-1) + Fibonacci(n-2);
}

/**
 * [生成验证码的函数]
 * @return {四个数字} code [验证码]
 */
function securityCode(){
    //获取验证码
    var code = parseInt(Math.random()*10000);

    //进行补0操作
    if(code<10){
        code += '000'
    }else if(code<100){
        code += '00';
    }else if(code<1000){
        code += '0';
    }

    //输出验证码,封装的时候根据return返回获得的值
    return code;
}

/** 
 * [验证验证码正确]
 * @param  {数字} _vcode [输入的验证码]
 * @return {[type]}        [description]
 */
//验证验证码,正确跳转进入lemon照片,失败弹窗输出
function check(_vcode,fc,show){
    //vcode是输入框获取的值赋予的
    //fc是将需要执行的函数传递进去
    //show是将需要出现的ID传进去
    if(_vcode!==show.innerHTML){
        alert('请输入正确的验证码,茂利');
        //验证码生成的函数放在这里表示:点击失败的同时刷新验证码
        show.innerHTML = fc();
    }else{
        alert('进入系统');
    }
}


/**
 * [输入n,判断n的奇偶,分别输出奇偶n分之1的和]
 * @param  {数字} _num [传入的数值n]
 * @return {数字} sum [求和]
 */
function sum(_num){
    var _num = num.value;
    var sum = 0 ;
    var res = 0;
    if(_num%2==0){
        if(_num==2){
            sum = 1/2;
        }else{
            for(var i=_num-2;i<=_num;i+=2){
                res = 1/i;
                sum += res;
            }
        }  
    }else{
        if(_num==1){
            sum =1;
        }else{
            for(var i=_num-2;i<=_num;i+=2){
                res = 1/i;
                sum += res;
            }
        }
    }
    //封装返回的值都是使用return;
    return sum;
}

//封装一个0-9和A-Z的随机验证码
/**
 * [随机生成0-9和A-Z的验证码]
 * @return {String,Number} sum [字母和数字组合的验证码]
 */
function NumberAndAlphabet(){
    let first = randomNumber(0,9);
    let third = randomNumber(0,9)
    let second = String.fromCharCode(randomNumber(0,25)+65);
    let fourth = String.fromCharCode(randomNumber(0,25)+65);
    return first + second + third + fourth;
}

/**
 * [随机生成一个范围内的整数]
 * @param  {数字} min [范围内的最小值]
 * @param  {数字} max [范围内的最大值]
 * @return {数字}     [返回范围的值]
 */
function randomNumber(min,max){
    /*
        核心代码:Math.random(),随机产生一个0~1的数字,但不包括1;
                *Math.random()+min,获取范围内的最小值,因为获得数字可能为min.n;通过取整parseInt();就能获取到min了
                *(max-min+1);因为Math.random()的值不可能获取到1,所以max*Math.random不能获取max的值,max+1也是同理,因为后面加了min,所以需要通过减去min去保持随机数在范围内
     */
    return  parseInt(Math.random()*(max-min+1)+min);
}

/**
 * 随机点名函数
 * @param  {数组} arr [人名数组]
 * @param  {数字} num [数组包含的人数]
 * @return {数字}     [0~num范围内的索引值]
 */
function roll(arr,num){
    //Math.random()提供数组的随机索引值,因为Math.random()获取的值是0~1,所以乘以num+1获取到num，通过取整获取最大只能是num;
    return arr[parseInt(Math.random()*(num+1))];
}


/**
 * 绑定事件函数，兼容IE8-
 * 解决addEventListener和 attachEvent 兼容
 * @param  {Node} ele     [绑定元素节点]
 * @param  {String} type    [绑定事件类型]
 * @param  {function} handler [绑定事件处理函数]
 * @param  {Boolean} capture [是否捕获]
 * @return {[type]}         [description]
 */
function bind(ele,type,handler,capture){
    //如果该浏览器存在这个，就将ele.addEventListener传进去
    if(ele.addEventListener){
        ele.addEventListener(type,handler,capture);
    //IE8-
    }else if(ele.attachEvent){
        ele.attachEvent('on'+ type,handler);
    //不满足上面两个的话直接使用DOM节点绑定方式
    }else{
        //若使用点语法即表示type为变量并不是属性
        ele['on'+ type] = handler;
    }
}



//cookie操作(使用对象封装函数)
/*
    var obj = {
        属性:value(属性)
        属性:function(方法)
    }
 */
//增，删，查，改
var Cookie = {
    /**
     * [增加/修改cookie的方法]
     * @param {String} name    [cookie名]
     * @param {String} val     [cookie值]
     * @param {[Date]} expires [cookie有效期]
     * @param {[String]} path    [cookie路径]
     */
    set:function(name,val,expires,path){
        //因为传进来的参数是值,不是之前填写的字符串,所以需要拼接'='
        /*
            document.cookie = name + '=' + val,因为一开始cookie名和cookie值是需要存进来的,只是有效期和路径不知道是否要存储,所以定义一个变量接收cookie名和值
         */
        var str = name + '=' + val;

        /*
            若传进的参数存在expires那么就将其写入,因此做个判断if(expires)的expires值存在时即执行if内的语句,将expires的值写入str内
                *注:其实expires是日期,需要将其转化为toUTCString();保证传进去的是字符串
         */
        if(expires){
            str += ';expires=' + expires.toUTCString();
        }

        //同理将path写入
        if(path){
            str += ';path=' + path;
        }
        //最后将str的值输入到cookie内即写入cookie
        document.cookie = str;
    },

    /**
     * [删除cookie方法]
     * @param  {String} name [cookie名]
     * @param  {[String]} path [cookie路径]
     * @return {[type]}      [description]
     * 删除cookie的思路:将有效期设置成已过期
     *     *需通过cookie名寻找,所以cookie名必须存在
     *     *this的使用:因为是通过Cookie这个对象访问该方法,所以就该this就是Cookie;
     */
    remove:function(name,path){
        //获取有效期:即创建当前日期即可
        var date = new Date();

        //获取日期,减去有效期(有效期的天数一般为1或者7),然后将其减少后的日期添加到传进去的值
        date.setDate(date.getDate() - 7);

        //将其减少后的日期添加到传进去的值,写入cookie的有效期,通过调用对象内的方法将其写入
        this.set(name,null,date,path);     
    },

    /**
     * [获取cookie名内的cookie值]
     * @param  {String} name [cookie名]
     * @return {String}      [cookie名的值]
     * 获取cookie实际就是获取cookie名的cookie值,即传进去的也是name
     */
    get:function(name){
        //定义空的字符串接收cookie名内的值
        var res = '';

        // 接收目录下的能访问的所有cookie
        var cookies = document.cookie;

        //获取cookie属于字符串,通过split()方法将其变成数组,而获取的字符串以('; ')分号+空格隔开
        cookies = cookies.split('; ');

        //遍历数组,找到name下对应的cookie值,不用forEach的原因是因为兼容原因ES5
        for(var i=0;i<cookies.length;i++){
            //定义变量获取cookie内的名和值
            var attr = cookies[i].split('=');

            //对获取的名进行判断
            if(attr[0]=== name){
                res = attr[1];
                //获取到值后就没必要继续寻找了即跳出
                break;
            }
        }
        return res;
    }
}

// Cookie.set('name','eddie',now,'/');
// Cookie.remove('name',path)
// Cookie.get('name')


/**
 * [获取元素样式]
 * @param  {Element} ele  [需要获取样式的元素]
 * @param  {String} attr [css样式]
 * @return {String}      [返回css属性值]
 */
function getStyle(ele,attr){
    var res = '';

    // 标准浏览器
    if(window.getComputedStyle){
        res = getComputedStyle(ele)[attr];
    }

    // ie8-
    else if(ele.currentStyle){
        res =  ele.currentStyle[attr];
    }

    // 直接返回内联样式
    else{
        res = ele.style[attr];
    }


    return res;
}

// getStyle(box,'font-size');


/**
 * [随机颜色rgb]
 * @return {String} [返回rgb格式颜色]
 */
function randomColor(){
    // 得到rgb随机颜色
    var r = parseInt(Math.random()*256);
    var g = parseInt(Math.random()*256);
    var b = parseInt(Math.random()*256);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


/*
    同时改变多个属性的动画函数
 */
/**
 * [改变属性的动画函数]
 * @param  {String} ele    [元素节点]
 * @param  {String} attr   [改变的属性值]
 * @param  {Number} target [需要达到的目标值]
 * @return {[type]}        [description]
 */
function animat(ele,attr,target){
    //将定时器标识作为DOM的属性,这样就实现了定时器标识的唯一性
    clearInterval(ele.timer)
    ele.timer = setInterval(function(){  
        //获取当前的样式(包含单位px,deg,auto)
        var current = getComputedStyle(ele)[attr];

        //获取样式的单位
        var unit = current.match(/\d([a-z]*)$/);
        unit = unit ? unit[1] : '';

        //提取数字
        current = parseFloat(current);

        //定义速度由目标值减去当前值
        var speed = (target - current)/10;

        //若刚好传进来的属性名是opacity,因为opacity的属性值是从0-1,所以其增加的幅度不能是1,所以要进行判断
        if(attr ==='opacity'){
            speed = speed > 0 ? 0.05 : -0.05;
        }else{
            //对speed进行取整,让其最小值只能达到1或者-1;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        }

        if(current === target){
            clearInterval(ele.timer);
            current = target - speed;
        }

        ele.style[attr] = current + speed + unit;
    },30)
}
// animat(ele,'height',240)
// animat(ele,'opacity',1)


/*
    * 支持多属性同时运动
    * 支持回调函数
        * 函数调用完在调用原函数
    * 改变属性的动画函数 
 */
function animate(ele,opt,callback){
    //定义变量记录每次动画的次数
    let timerQty = 0;
    //获取对象里面的属性(attr)
    for(var attr in opt){
        //将attr传入到cartoon函数内
        cartoon(attr);
        //执行一次动画,qty的数量就加一
        timerQty++;
    }
    //动画函数
    function cartoon(attr){
        //定义唯一节点定时器标识
        let timerName = attr + 'timer'
        //进来前先清除之前的定时器
        clearInterval(ele[timerName]);
        ele[timerName] = setInterval(function(){
            //获取想要改变的属性
            let current = getComputedStyle(ele)[attr];

            //提取单位px,deg等等,正则表达式以数字开头,[a-z]*字母a-z,*表示0个或0个以上,match返回一个数组,包含\d([a-z]*)和([a-z]*)两个
            let unit = current.match(/\d([a-z]*)$/);
            //需要就是index为1的元素,获取单位
            unit = unit ? unit[1] : '';
            //提取数字parseFloat()/parseInt()
            current = parseFloat(current);
            //定义速度,目标值-当前值(当前值随时随地在变化,从而形成动画效果)
            let speed = (opt[attr] - current)/10;

            //若刚好传进来的属性名是opacity,因为opacity的属性值是从0-1,所以其增加的幅度不能是1,所以要进行判断
            if(attr === 'opacity'){
                speed = speed >0 ? 0.05 : -0.05;
            }else{
                //对speed进行取整,让其最小值只能达到1或者-1;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            }

            //如果当前值全等于目标值
            if(current === opt[attr]){
                //清除定时器
                clearInterval(ele[timerName]);
                //因为下面改变的是当前值加上speed,所以需要减少speed
                current = opt[attr] - speed;
                //每次调用完函数时减少次数
                timerQty--;
                //判断传进来的callback是否为函数 是的话必须在动画效果完成后在执行传进来的函数
                if(typeof(callback) == 'function' && timerQty ===0){
                    callback();
                }
            }

            ele.style[attr] = current + speed + unit ;
        },30)
    }
}
//animate(ele.{width:200,height:500})


//工具包
var Tool = {
    /**
     * [检测传入数据的类型]
     * @param  {Anytype} data [传入的任意类型(数据)]
     * 类型:10,[19],{name:Eddie},str,/abc/,true,
     * @return {String}      [返回传入数据类型字符串]
     */
    typeof:function(data){
        /*
            强大的方法:Object.prototype.toString(data)
                *输入参数,可以返回data数据的类型,通过call方法借用Object.prototype.toString,从而达到获取字符串的效果
         */
        return Object.prototype.toString.call(data).slice(8,-1).toLowerCase(); //相当于data.toString();
    }
    
}
// Tool.typeof([10]);//array
// Tool.typeof(10);//number
// Tool.typeof('10');//string
// Tool.typeof(function(){});//function
// Tool.typeof(/abc/);//regexp


//封装class类:不支持getElementsByClassName()方法时
function getClass(className){
    //判断浏览器是否支持getElementsClassName()
    try{
        return getElementsByClassName(className);
    }catch(error){
        //建立空数组储存页面所有元素
        var res = [];
        //获取页面所有的标签
        var tagName = document.getElementsByTagName('*');
        //通过循环判断tagName是否包含有class
        for(var i=0;i<tagName.length;i++){
            if(tagName.getAttribute('class') !=null){
                
            }
        }
    }
}