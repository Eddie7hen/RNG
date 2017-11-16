//加载使用list.js文件前,加载config,js文件,config加载后加载jquery文件，
//省略js后缀名的意思是本身是js文件
require(['config'],function(){
    require(['jquery'],function($){
        //定义动画速度变量
        var speed = 350;
        //事件委托实现移上li显示边框
        var $gdslist = $('.gds-list');
        $gdslist.on('mouseenter','.gds-li',function(){
            var $this = $(this);
            $this.find('.top').stop().animate({
                width:$this.width(),
            },speed,function(){
                $this.find('.left').stop().animate({
                    height:$this.height(),
                },speed)
            })
            $this.find('.bottom').stop().animate({
                width:$this.width(),
            },speed,function(){
                $this.find('.right').stop().animate({
                    height:$this.height(),
                },speed)  
            })
        }).on('mouseleave','.gds-li',function(){
            $(this).find('.top').stop().animate({
                width:0,
            },speed)
            $(this).find('.bottom').stop().animate({
                width:0,
            },speed)
            $(this).find('.left').stop().animate({
                height:0,
            },speed)
            $(this).find('.right').stop().animate({
                height:0,
            },speed)
        });
        
        $('#header').load('../html/header.html');
        $('#footer').load('../html/footer.html');






    });
});