/* 
* @Author: Marte
* @Date:   2017-11-09 10:53:19
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-10 17:40:58
*/
;(function($){
    $.fn.EdZoom = function(options){
        //this=>jquery实例
        
        //定义默认值
        var defaults = {
            width:300,
            height:300,

            //大图与小图的距离
            gap:15,

            //大图显示的位置小图的右边
            position:'right',
        }

        this.each(function(){
            //这里this指:节点,定义变量获取小图
            var $small = $(this);

            //处理参数
            var opt = $.extend({},defaults,options)
            
            //this添加特定的类
            $small.addClass('gds-zoom');
            
            var zoom = {

                //初始化,绑定事件,生成html结构
                _init:function(){
                    //获取小图
                    this.$smallImg = $small.children('img');

                    //改变盒子大小与图片等宽
                    $small.width(this.$smallImg.outerWidth());
                    
                    //生成容器/写入相应的类名
                    this.$big = $('<div/>').addClass('gds-big');
                    this.$big.css({
                        width:opt.width,
                        height:opt.height
                    })

                    //定位容器的位置(相对于小图是15,相对于屏幕小图宽度+15)
                    //top的值应该等于小图offset().top
                    this.$big.css({
                        left:this.$smallImg.width()+opt.gap,
                        top:this.$smallImg.offset().top,
                    })
                    console.log(this.$smallImg.width()+opt.gap)


                    //生成大图
                    this.$bigImg = $('<img/>');

                    //生成放大镜
                    this.$Zoom = $('<span/>').addClass('minzoom');

                    //绑定事件
                    $small.on('mouseenter',function(){
                        this._show();
                    }.bind(this)).on('mouseleave',function(){
                        this._remove();
                    }.bind(this)).on('mousemove',function(e){
                        this._move(e.clientX,e.clientY);
                    }.bind(this));

                },
                //显示就是当鼠标移上时,将页面生成结构插入
                _show:function(){
                    //导入图片地址
                    this.$bigImg.attr('src',this.$smallImg.attr('data-big'));
                    //将图片插入容器中
                    this.$bigImg.appendTo(this.$big);
                    //将$big插入body
                    this.$big.appendTo('body');
                    //将放大镜插入写入$small内
                   $small.append(this.$Zoom);

                   //等图片加载完时onload获取图片的宽度或者高度,计算比例
                   this.$bigImg[0].onload = function(){
                        this.ratio = this.$bigImg.outerWidth()/this.$smallImg.outerWidth();

                        //将放大镜尺寸与大图容器等比例缩小
                        this.$Zoom.css({
                            width:opt.width/this.ratio,
                            height:opt.height/this.ratio,
                        });
                   }.bind(this);
                },
                _remove:function(){
                    this.$big.remove();
                    this.$Zoom.remove();
                },
                _move:function(x,y){
                    //传入坐标就是要让放大镜跟随光标移动,改变left和top的值
                    //需要将光标移到放大镜中间
                    var left = x - $small.offset().left - this.$Zoom.outerWidth()/2 ; 
                    var top = y - $small.offset().top - this.$Zoom.outerHeight()/2 ; 

                    //限定放大镜的区域(只能在图片区域内)
                    if(left < 0){
                        left = 0;
                    //限定区域应该是小图的宽高
                    }else if(left > this.$smallImg.outerWidth()-this.$Zoom.outerWidth()){
                        left = this.$smallImg.outerWidth()-this.$Zoom.outerWidth();
                    }

                    if(top < 0){
                        top = 0;
                    }else if(top > this.$smallImg.outerHeight()-this.$Zoom.outerHeight()){
                        top = this.$smallImg.outerHeight()-this.$Zoom.outerHeight();
                    }

                    //改变放大镜的移动距离
                    this.$Zoom.css({
                        left:left,
                        top:top
                    });

                    //根据比例计算大图的移动的距离,与放大镜方向相反
                    this.$bigImg.css({
                        left:-left*this.ratio,
                        top:-top*this.ratio
                    })
                    
                },
            } 
            zoom._init();   
        
        });
    }
})(jQuery);