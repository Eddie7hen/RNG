/* 
* @Author: Eddie
* @Date:   2017-11-04 10:21:03
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-06 11:23:01
*/

(function(){  
    function Get(selector){
        //在构造函数内通过调用this.init(),直接初始化获取页面元素
        this.init(selector);
    }

    /*
        绑定的时候是给所有的元素进行绑定,获取只是给第一个元素
     */
    Get.prototype = {
        //初始化,获取页面元素元素
        init(selector){
            //尽量使用try{}...catch(){}方法
            try{
                //使用All表示有可能是多个
                this.ele = document.querySelectorAll(selector);
            }catch(error){
                //设置变量获取selector后面的名字eg:#box,.box
                var sName = selector.slice(1);
                //考虑兼容问题,通过正则将它们一一区分
                //传入时是以#开头,则表示是
                if(/^#+/.test(selector)){
                    //通过getElementById获取
                    //因为绑定事件时通过遍历,将它们每个都进行事件的绑定,所以给this.ele加个[]
                    this.ele = [document.getElementById(sName)];
                }else if(/^\.+/.test(selector)){
                    //以.开头则表示为类名,即使用类名获取
                    try{
                        this.ele = document.getElementsByClassName(sName);
                    }catch(err){
                        //否则就先用*获取所有的TagName,然后遍历找出跟类名相同的元素
                        //创建this.ele = [],保存元素的类名
                        this.ele = [];
                        var res = document.getElementsByTagName('*');
                        //遍历,寻找以类名相同的元素
                        for(var i=0;i<res.length;i++){
                            //通过split将传入的类名变成数组
                            //class的类型是 class='xxx sss ddd',所以需要空格隔开
                            var classList = res[i].className.split(' ');
                            if(classList.indexOf(sName)>=0){
                                //将res[i],插入this.ele
                                this.ele.push(res[i]);
                            }
                        }
                    }  
                //以字母开头
                }else if(/^[a-z]+/.test(selector)){
                    this.ele = document.getElementsByTagName(sName);
                }

            }
            //获取元素的长度
            this.len = this.ele.length;
        },
        //绑定事件
        /**
         * [绑定事件]
         * @param  {String} type    [事件类型]
         * @param  {Function} hanlder [事件处理函数]
         */
        on(type,handler){
            //遍历所有,给每个元素绑定事件
            for(var i=0;i<this.len;i++){
                this.ele[i]['on' + type ] = handler
            }
        },
        //显示
        show(){
            //遍历将所有隐藏
            for(var i=0;i<this.len;i++){
                this.ele[i].style.display = 'block';
            }
        },
        //隐藏
        hide(){
            for(var i=0;i<this.ele;i++){
                this.ele[i].style.display = 'none';
            }
        },
        //动画效果=>animat(this.ele,{})
        /**
         * [动画]
         * @param  {Object}   opt   [目标值]
         * @param  {Function} callback [回调函数]
         */
        animate(opt,callback){
            //定义变量记录每次动画的次数
            var timerQty = 0;
            //将this赋给self
            var self = this;

            //for循环给每个this.ele绑定动画
            for(var i=0;i<this.len;i++){
                (function(i){
                    var ele = self.ele[i]

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
                        var timerName = attr + 'timer'
                        //进来前先清除之前的定时器
                        clearInterval(ele[timerName]);
                        ele[timerName] = setInterval(function(){
                            //获取想要改变的属性
                            var current = getComputedStyle(ele)[attr];

                            //提取单位px,deg等等,正则表达式以数字开头,[a-z]*字母a-z,*表示0个或0个以上,match返回一个数组,包含\d([a-z]*)和([a-z]*)两个
                            var unit = current.match(/\d([a-z]*)$/);
                            //需要就是index为1的元素,获取单位
                            unit = unit ? unit[1] : '';
                            //提取数字parseFloat()/parseInt()
                            current = parseFloat(current);
                            //定义速度,目标值-当前值(当前值随时随地在变化,从而形成动画效果)
                            var speed = (opt[attr] - current)/10;

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
                        },30);
                    }
                })(i);
            }  
        },
        //获取/设置CSS样式
        css(attr,val){
            var ele = this.ele[0];
            //attr,想要获取的属性,val想要设置的值
            //如果只传递一个参数时,表示获取
            if(val === undefined){
                //判断window存不存在getComputed方法
                var res = '';
                if(window.getComputedStyle){
                    res = getComputedStyle(ele)[attr];
                }else if(ele.currentStyle){
                    res = ele.currentStyle[attr];
                }else{
                    res = ele.style[attr];
                }
                return res;
            }
            //第二个参数存在时表示设置,截取单位,然后拼接
            var current = this.css(attr);

            //截取单位
            var unit = current.match(/\d([a-z]+)$/);
            unit = unit ? unit[1] : '';

            //绑定时给每个ele进行绑定
            for(var i=0;i<this.len;i++){
                this.ele[i].style[attr] = val + unit;   
            }
        },
        //添加类名
        addClass(className){
            try{
                for(var i=0;i<this.len;i++){
                    this.ele[i].classList.add(className);      
                }
            }catch(error){
                //遍历获取当前的this.ele的类名通过split()变成数组(/\s+/),根据空格变成数组
                for(var i=0;i<this.len;i++){
                    var current = this.ele[i].className.split(/\s+/);
                    //判断存不存在该类名,不存在就添加进数组
                    if(current.indexOf(className) === -1){
                        current.push(className);
                        //通过join(' ')方法将字符串拼接成数组
                        this.ele[i].className = current.join(' ');
                    }
                }
            }
        },
        //删除类名
        removeClass(className){
            try{
                for(var i=0;i<this.len;i++){
                    this.ele[i].classList.remove(className);
                }
            }catch(error){
                //遍历获取当前的this.ele的类名通过split()变成数组(/\s+/),根据空格变成数组
                for(var i=0;i<this.len;i++){
                    var current = this.ele[i].className.split(/\s+/);
                    //判断存不存在该类名,不存在就添加进数组
                    if(current.indexOf(className) >=0 ){
                        //定义变量获取对应的idx
                        var idx = current.indexOf(className);
                        current.splice(idx,1);
                        //通过join(' ')方法将字符串拼接成数组
                        this.ele[i].className = current.join(' ');
                    }
                }
                // //定义变量res获取className的长度,变成数组判断其长度
                // var res = this.ele.className.split(' ')
                // //找到与之对应的类名,然后删除
                // var idx = res.indexOf(className);
                // res.splice(idx,1);
                // res = res.join(' ');
                // ele.className = res;
            }
        },
        //筛选
        eq(index){
            // 如何获取index对应的元素并返回截取后的数组
            this.ele = Array.prototype.slice.call(this.ele,index,index+1);
            // this.ele = [this.ele[index]];
            return this;
        },

        //获取/设置html的属性值
        attr(attrName,value){
            //获取:只获取第一个元素的属性值
            if(value === undefined){
                return this.ele[0].getAttribute(attrName);
            }

            //设置给所有元素进行设置
            for(var i=0;i<this.len;i++){
                //setAttribute(属性名,值)
                this.ele[i].setAttribute(attrName,value);
            }
        },

        //获取/设置html内容
        html(value){
            //获取:只获取第一个元素的HTML内容
            if(value === undefined){
                return this.ele[0].innerHTML;
            }

            //设置:给所有元素进行设置
            for(var i=0;i<this.len;i++){
                this.ele[i].innerHTML = value;
            }
        }
    }

    //识别构造函数
    Object.defineProperty(Get.prototype,'constructor',{
        value:Get,
    });

    //以这种形式
    // get('.box'),函数的调用
    // $('.box');
    // 就是建立一个函数传入selector,通过return返回一个Get实例
    // function get(selector){
    //     return new Get(selector);
    // }

    // get('.box');

    // function $(selector){
    //     return new Get(selector);
    // }

    // $('.box');

    //通过window.$/get = function(selector){}将它们变成全局函数,
    //这样的函数叫做暴露函数
    
    window.$ = function(selector){
        return new Get(selector);
    }

    // new Get('.box');
    // new Get('#box')
    // new Get('h1')
    // new Get('.box').on('click',function(){})
    // 获取样式的方法getComputyStyle(ele)[attr],ele.currentStyle[attr],style[attr]

})();

