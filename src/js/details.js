require(['config'],function(){
    require(['jquery','common','edzoom'],function($,com){
        var cart = {};
        $('#header').load('../html/header.html',function(){
            require(['header'],function(){
                //获取头部内容的函数
                cart.left = $('.cart').offset().left;
                cart.top = $('.cart').offset().top;
                cart.height = $('.cart').height();
                // $ele = $('.num');
           });
        });
        $('#footer').load('../html/footer.html');
        // console.log($ele);

        //页面一刷新获取id
        //通过location.search获取参数
        var str = location.search;

        //通过slice()将数组变成新数组去除?
        str = str.slice(1);

        //变成数组
        str = str.split('=');

        //通过数组forEach将数组变成对象,定义一个空对象data
        var data = {};

        //将数组信息写入对象
        data[str[0]] = str[1];


        var $dtlcont = $('.dtl-content');
        // 发起ajax请求
        $.ajax({
            type:'get',
            url:'../api/goods.php',
            data:{id:+data.id},
            success:function(json){
                var res = JSON.parse(json);
                console.log(res);
                var html = $.map(res,function(item){
                    return `<div class="dtl-box">
                                <span class="img-box">
                                    <img src="../${item.imgurl}" />
                                </span>
                            </div>
                            <div class="dtl-info" data-id="${item.id}">
                                <h4 class="info-tit">
                                    ${item.details}
                                </h4>
                                <h5 class="info-produc">
                                    原厂地 : ${item.area}
                                </h5>
                                <dl class="info-price clearfix">
                                    <dt>价格 : </dt>
                                    <dd><b>${item.price}</b></dd>
                                </dl>
                                <dl class="info-std clearfix">
                                    <dt>规格:</dt>
                                    <dd><span href="#"class="std-active">1段</span><i style="display:block"></i></dd>
                                    <dd><span href="#">2段</span><i></i></dd>
                                    <dd><span href="#">3段</span><i></i></dd>
                                </dl>
                                <dl class="info-qty clearfix">
                                    <dt>数量 : </dt>
                                    <dd class="info-check">
                                        <div class="qty-check clearfix">
                                            <input type="text"  value="1" name="qty" class="qty"/>
                                            <div class="qty-change">
                                                <span class="qty-dd" style="margin-bottom:1px;"><i href="#">+</i></span>
                                                <span class="qty-dd"><i href="#">-</i></span>
                                            </div>
                                        </div>
                                    </dd>
                                    <dd class="qty-residue">
                                        <span>库存 : ${item.stock}</span>
                                    </dd>
                                </dl>
                                <ul class="info-buy clearfix">
                                    <li><a  class="info-b-a"><i></i>立即购买</a></li>
                                    <li><a  class="info-c-a"><i></i>加入购物车</a></li>
                                </ul>
                            </div>`
                }).join('');
                
                $dtlcont.html(html);

                var $imgbox = $('.img-box')

                //放大镜效果
                $imgbox.EdZoom({
                    width:400,
                    height:400,
                });

                //进入之前获取cookie
                var goodslist = com.Cookie.get('goodslist');
                
                //判断是否存在cookie
                if(!goodslist){
                    goodslist = [];
                }else{
                    goodslist = JSON.parse(goodslist);
                }
                console.log(goodslist);

                //建立数组,获取信息存入cookie
                var goods = {};


                //规格
                var $std = $('.info-std');
                $std.on('click','span',function(){
                    var $this = $(this);
                    $this.parent().parent().find('span').removeClass('std-active').next('i').hide();
                    $this.addClass('std-active').next('i').show();
                })

                //点击+/-改变qty数量
                var num = 1;
                var $qtychange = $('.qty-change');
                var $qty = $('.qty');
                $qtychange.on('click','i',function(){
                    var $this = $(this);
                    if($this.html() == '+'){
                        num++;
                        $qty.val(num);
                    }else if($this.html() == '-'){
                        num--;
                        if(num<=1){
                            num = 1;
                        }
                        $qty.val(num);
                    }
                })
                
                var $info = $('.dtl-info');
                var id = $info.attr('data-id');
                var currentIdx;
                console.log(id);
                //飞入购物车效果
                //获取加入购物车按钮
                var $addCart = $('.info-c-a');
                $addCart.on('click',function(){
                    //获取图片,复制图片,放在原来的图片的上面改变left和top值
                    var $img = $imgbox.children('img');
                    var $copy = $img.clone();
                    //写入到原来的地方
                    $imgbox.append($copy);
                    $copy.css({
                        left:0,
                        top:0,
                    })
                    
                    //获取需要飞到的目标值
                    $copy.animate({
                        left:cart.left,
                        top:-($imgbox.offset().top-cart.top-cart.height),
                        width:30,
                    },function(){
                        $copy.remove();
                    })


                    
                    var res = goodslist.some(function(item,idx){
                        currentIdx = idx;
                        console.log(item);
                        return item.id == id;
                    })

                    if(res){
                        goodslist[currentIdx].qty = $qty.val();
                        goodslist[currentIdx].std = $('.std-active').html();
                    }else{
                        var temp = {
                            qty:$qty.val(),
                            imgurl:$('.img-box').children('img').attr('src'),
                            details:$('.info-tit').html(),
                            area:$('.info-produc').html(),
                            id:$('.dtl-info').attr('data-id'),
                            price:$('.info-price').find('b').html(),
                            std:$('.std-active').html(),
                        }          
                        goodslist.push(temp)
                    }

                    console.log(goodslist);
                    //写入cookie
                    com.Cookie.set('goodslist',JSON.stringify(goodslist))

                })





                
            }

        })

        // var $imgbox = $('.img-box')

        // //放大镜效果
        // $imgbox.EdZoom({
        //     width:400,
        //     height:400,
        // });

        // //飞入购物车效果
        // //获取加入购物车按钮
        // var $addCart = $('.info-c-a');
        // $addCart.on('click',function(){
        // //获取图片,复制图片,放在原来的图片的上面改变left和top值
        // var $img = $imgbox.children('img');
        // var $copy = $img.clone();
        // //写入到原来的地方
        // $imgbox.append($copy);
        // $copy.css({
        //     left:0,
        //     top:0,
        // })
        // //获取需要飞到的目标值
        // $copy.animate({
        //     left:cart.left,
        //     top:-($imgbox.offset().top-cart.top-cart.height),
        //     width:30,
        // },function(){
        //     $copy.remove();
        //     })
        // })


        // //规格
        // var $std = $('.info-std');
        // $std.on('click','span',function(){
        //     var $this = $(this);
        //     $this.parent().parent().find('span').removeClass('std-active').next('i').hide();
        //     $this.addClass('std-active').next('i').show();
        // })

        // //点击+/-改变qty数量
        // var num = 1;
        // var $qtychange = $('.qty-change');
        // $qtychange.on('click','i',function(){
        //     var $this = $(this);
        //     var $qty = $('.qty');
        //     if($this.html() == '+'){
        //         num++;
        //         $qty.val(num);
        //     }else if($this.html() == '-'){
        //         num--;
        //         if(num<=1){
        //             num = 1;
        //         }
        //         $qty.val(num);
        //     }
        // })



        //获取

    });
});