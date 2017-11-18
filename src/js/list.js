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

        //pageNo,默认显示的分页为1,
        var pageNo = 1;

        var $gdspage = $('.gds-page');
        //请求数据生成html结构
        $.ajax({
            type:'GET',
            url:'../api/list.php',
            success:function(json){
                var res = json;
                console.log(res);
                //获取列表的类
                $gdslist.html(getHTML(res.data));
                getPage(res);
            },
            dataType:'json',
            async:true
        })

        //利用事件委托显示分页切换
        $gdspage.on('click','a',function(){
            //获取页面内容,发起ajax请求
            var $this = $(this);
            //清除之前样式
            $this.parent().parent().find('a').removeClass('page-active');
            // console.log($this.parent().parent().find('a'));
            
            //点击时添加当前的按钮样式
            $this.addClass('page-active');
             $.ajax({
                type:'GET',
                url:'../api/list.php',
                data:{'pageNo':+$this.html()},
                success:function(json){
                    var res = json;
                    console.log(res);
                    //获取列表的类
                    $gdslist.html(' ');
                    $gdslist.html(getHTML(res.data));
                },
                dataType:'json',
                async:true
            })
            
        });

        //获取选择类型
        var $choose = $('.choose');
        $choose.on('click',function(e){
            var target = e.target;
            //定义对象保存类型,品牌以及地区
            var obj = {};
            //判断是否点击的类型,品牌以及地区,然后发起请求
            var $target = $(target);
            if(target.parentNode.parentNode.className == 'gds-sorts clearfix type'){
                // console.log(target.innerHTML)
                obj = Object.assign({},obj,{type:$target.html()})
                $target.parent().parent().find('.a-price').removeClass('gds-active');
                $target.addClass('gds-active');
            }
            if(target.parentNode.parentNode.className == 'gds-sorts clearfix brand'){
                obj = Object.assign({},obj,{brand:$target.html()});
                 $target.parent().parent().find('.a-price').removeClass('gds-active');
                $target.addClass('gds-active');
            }
            if(target.parentNode.parentNode.className == 'gds-sorts clearfix area'){
                obj = Object.assign({},obj,{area:$target.html()});
                 $target.parent().parent().find('.a-price').removeClass('gds-active');
                $target.addClass('gds-active');
            }
            console.log(obj)
            $.ajax({
                type:'GET',
                url:'../api/list.php',
                data:obj,
                success:function(json){
                    var res = json;
                    console.log(res);
                    //获取列表的类
                    $gdslist.html(getHTML(res.data));
                    getPage(res);
                },
                dataType:'json',
                async:true
            })
        })

        //点击特定的信息传入详情页获取特定商品
        $gdslist.on('click','.gds-li',function(){
            var id =this.dataset.id;
            location.href = `../html/details.html?id=${id}`;
        })
        
        //获取列表页函数
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

        //获取分页函数
        function getPage(res){
            $gdspage.html(' ');
            var $ul = $('<ul/>');
            $ul.addClass('clearfix');
            for(var i=0;i<Math.ceil(res.total/res.data.length);i++){
                var $li = $('<li/>');
                var $a = $('<a/>');
                $a.html(i+1);
                $a.appendTo($li);
                if(i+1==pageNo){
                    $a.addClass('page-active');
                };
                $li.appendTo($ul);
            }
            $ul.appendTo($gdspage);
        }

    });
});