//加载使用list.js文件前,加载config,js文件,config加载后加载jquery文件，
//省略js后缀名的意思是本身是js文件
require(['config'],function(){
    require(['jquery'],function($){
        $('#header').load('../html/header.html',function(){
            require(['header'],function(){});
        });
        $('#footer').load('../html/footer.html');
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


        //请求数据生成html结构
        $.ajax({
            type:'GET',
            url:'../api/list.php',
            success:function(json){
                var res = json;
                console.log(res);
                //获取列表的类
                $gdslist.html(getHTML(res.data));

                //生成分页
                var $gdspage = $('.gds-page');
                console.log($gdspage);
                var $ul = $('<ul/>');
                $ul.addClass('clearfix');
                console.log(res.total/res.data.length);
                for(var i=0;i<Math.ceil(res.total/res.data.length);i++){
                    var $li = $('<li/>');
                    var $a = $('<a/>');
                    $a.html(i+1);
                    $a.appendTo($li);
                    $li.appendTo($ul);
                }
                $ul.appendTo($gdspage);
            },
            dataType:'json',
            async:true
        })
        

        function getHTML(data){
            return $.map(data,function(item){
                return `<li class="gds-li" data-id="${item.id}">
                        <i class="top"></i>
                        <i class="bottom"></i>
                        <i class="left"></i>
                        <i class="right"></i>
                        <a href="#" class="gds-a">
                            <img src="../${item.imgurl}" />
                            <dl class="gds-info">
                                <dt>
                                    <p>${item.details}</p>
                                    <h5>${item.price}</h5>
                                </dt>
                            </dl>
                        </a>
                    </li>`
            }).join(''); 
        }




    });
});