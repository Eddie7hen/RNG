require(['config'],function(){
    require(['jquery'],function($){
        var $menu = $('.menu');
        var $menuSec = $('.menu-sec');

        //移入移出显示二级菜单
        $menu.on('mouseenter',function(){
            $menuSec.show();
        }).on('mouseleave',function(){
            $menuSec.hide();
        })

        //创建三级
        var $menuTrd = $('<div/>');
        $menuTrd.addClass('menu-trd');

        //移入二级显示三级
        $menuSec.on('mouseenter','.sec-a',function(){
            console.log(66);
            //进来前先清除样式
            $menuSec.children('.sec-item').children('.sec-a').removeClass('sec-active');
            $(this).addClass('sec-active');

            //生成三级标签
            $menuTrd.html(function(){
                return `<dl class="trd-item">
                            <dt class="trd-l">
                                <a href="#">婴儿奶粉</a>
                            </dt>
                            <dt class="trd-r">
                                <a href="#" class="trd-r-a">幼儿奶粉</a>
                                <a href="#" class="trd-r-a">成长奶粉</a>
                            </dt>
                        </dl>
                        <dl class="trd-item">
                            <dt class="trd-l">
                                <a href="#">品牌</a>
                            </dt>
                            <dt class="trd-r">
                                <a href="#" class="trd-r-a">新西兰原装</a>
                                <a href="#" class="trd-r-a">爱他美</a>
                                <a href="#" class="trd-r-a">牛栏</a>
                                <a href="#" class="trd-r-a">雅培小安素</a>
                                <a href="#" class="trd-r-a">惠氏</a>
                            </dt>
                        </dl>`
            })

            $(this).append($menuTrd);

            console.log($(this));
            if($(this).parent().index()>2){
                $menuTrd.css({
                    top:-($(this).parent().index()-3)*58,
                })
            }

        }).on('mouseleave','.sec-a',function(){
            $menuSec.children('.sec-item').children('.sec-a').removeClass('sec-active');
            $menuTrd.css({
                    top:0,
                })
            $menuTrd.remove();
        })

    });
});