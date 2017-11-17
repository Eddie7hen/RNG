require(['config'],function(){
    require(['jquery','carousel'],function($){
        $('#header').load('../html/header.html',function(){
            require(['header'],function(){});
        });
        $('#footer').load('../html/footer.html');
        
        // console.log(car)
        // //banner轮播图 
        $('.carousel').EdCarousel({
            img:['img/lbt1.jpg','img/lbt2.jpg','img/lbt3.jpg','img/lbt4.jpg'],
            width:1263,
            height:450
        });

        //绑定content,利用事件委托移上li时,显示a标签下的字体改变top值
        var $ulItem = $('.ul-item');
        $ulItem.on('mouseenter','li',function(){
            //this指向li
            $(this).find('.info-detail').stop().animate({top:-15},200);
        }).on('mouseleave','li',function(){
            $(this).find('.info-detail').stop().animate({top:10},200);
        });

        //绑定global,利用事件委托移上dt时,dt向上移动
        var $global = $('.global');
        $global.on('mouseenter','.g-dt',function(){
            //this指向dt
            $(this).find('.g-a').stop().animate({top:-30},300);
        }).on('mouseleave','.g-dt',function(){
            $(this).find('.g-a').stop().animate({top:0},300);
        })

        //popular轮播图
        var $popular = $('.p-tab-c');
        $popular.EdCarousel({
            img:['img/pop1.jpg','img/pop2.jpg','img/pop3.jpg','img/pop4.jpg','img/pop5.jpg'],
            width:719,
            height:350,
            type:'horizontal'
        })

        //侧边轮播p-tab-r-ul
        var $ptabrul = $('.p-tab-r-ul');
        var $ptabli = $ptabrul.children('.p-li');
        var $pdoc =  $ptabrul.next('.p-doc');
        //定义定时器标识(轮播图,动画)
        var timer;
        var idx = 0 //默认显示

        //页面刷新执行
        timer = setInterval(autoplay,2000);
        
        //利用事件委托实现点击页码切换
        $('.p-tab-r').on('mouseenter',function(){
            clearInterval(timer);
        }).on('mouseleave',function(){
            timer = setInterval(autoplay,2000);
        }).on('click','.p-doc span',function(){
            idx = $(this).index();
            show();
        });

        //自动播放
        function autoplay(){
            idx++;
            show();
        }

        //动画
        function show(){
            if(idx>=$ptabli.length-3){
                idx=0;
            }else if(idx<0){
                idx = $ptabli.length-1;
            }

            var target = -idx * $ptabli.width();

            $pdoc.children('span').removeClass('doc-active');
            $pdoc.children('span').eq(idx).addClass('doc-active');
            $pdoc.children('span').eq(idx+3).addClass('doc-active');
            $ptabrul.animate({left:target});
        }



        //绑定content,利用事件委托移上li时,显示a标签下的字体改变top值
        var $pItem = $('.p-item');
        $pItem.on('mouseenter','li',function(){
            //this指向li
            $(this).find('.p-info-detail').stop().animate({top:-15},200);
        }).on('mouseleave','li',function(){
            $(this).find('.p-info-detail').stop().animate({top:10},200);
        });

        //获取数据
        $.ajax({
            type:'GET',
            url:'../api/type.php',
            success:function(json){
                var res = json;
                console.log(res);
                //新品板块
                var $ulItem = $('.ul-item');
                var html = $.map(res,function(item){
                    if(item.new){
                        return `<li>
                            <a href="#" class="details-a" data-id="${item.id}">
                                <div class="img-box">
                                    <img src="${item.imgurl}"  />
                                </div>
                                <div class="info-detail">
                                    <h3 title="${item.details}" class="info"> ${item.details}</h3>
                                    <p class="price">${item.price}</p>
                                    <p class="gps">
                                        中国
                                        <img src="img/cn.jpg" />
                                    </p>
                                </div>
                            </a>
                        </li>`
                        
                    }
                })
                $ulItem.html(html);

                //热门板块
                var $pItem = $('.p-item');
                var html1 = $.map(res,function(item){
                    if(item.hot){
                        return `<li>
                            <a href="#" class="p-details-a" data-id="${item.id}">
                                <div class="p-img-box">
                                    <img src="${item.imgurl}" />
                                </div>
                                <div class="p-info-detail">
                                    <h3 title="${item.details}" class="p-info">${item.details}</h3>
                                    <p class="p-price">${item.price}</p>
                                    <p class="p-gps">
                                        中国
                                        <img src="img/cn.jpg" />
                                    </p>
                                </div>
                            </a>
                        </li>`
                    }
                })
                $pItem.html(html1);
            },
            dataType:'json',
            async:true
        })

        
    })
})
