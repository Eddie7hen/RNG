/* 
* @Author: Marte
* @Date:   2017-11-03 19:42:45
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-03 21:05:04
*/

//格式化时间,以下形式输出
//YYYY-MM-DD ,YY-MM-DD , YY-M-D hh:mm:ss
if(!Date.prototype.formate){
    //扩展Date.prototype的内置方法
    Date.prototype.format = function(fmt){
        //预订字符对应的时间,使用对象的方式储存相应月,日,时,分,秒,季度,毫秒
        var t = {
            "M+":this.getMonth()+1,//月份从0-11,所以要加1
            "D+":this.getDate(), //日期1-31
            "h+":this.getHours(), //时:0-23
            "m+":this.getMinutes(),//分:0-59
            "s+":this.getSeconds(),//秒:0-59
            //0+3/3=>1,3+3/3=>
            "q+":Math.floor((this.getMonth()+3)/3), //季度,month从0-11,+3对3进行整除,向下取整
            "S+":this.getMilliseconds()//毫秒
        }

        //因为年份比较特殊都是以四个数字出现(2017),所以单独进行判断
        //()表示一组,Y+表示具有1个或者1个以上的英文单词Y
        if(/(Y+)/.test(fmt)){
            //YYYY => 2017, YY => 17
            //定义变量res接收Y的格式\
            //RegExp.$1,默认保存第一个分组的格式
            //将this.getFullYear(),通过.toString()变成字符串,并通过substr(start[,len]),截取
            var res = this.getFullYear().toString().substr(4 - RegExp.$1.length);

            //通过字符串的replace()将res跟正则第一组进行调换
            fmt = fmt.replace(RegExp.$1,res);
        }

        //通过遍历对象,获取相对应的属性
        for(var attr in t){
            //遍历attr的同时建立正则,attr=>((M+))
            var reg = new RegExp('(' + attr + ')');

            //通过正则进行判断
            if(reg.test(fmt)){
                //格式:mm(11月)=>11,(8月)=>08,m(8月)=>8
                //如果传入的时间格式是m的话,那就执行m
                console.log(RegExp.$1.length);
                var res = RegExp.$1.length > 1 ? ('00' + t[attr]).substr(RegExp.$1.length-1) : t[attr];

                //字符串replace(reg/被替代,new),支持正则
                fmt = fmt.replace(reg,res);
            }
        }
        //返回特定字符格式
        return fmt;
    }
}