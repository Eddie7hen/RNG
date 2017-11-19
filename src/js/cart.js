require(['config'],function(){
    require(['jquery','common','header'],function($,com){
        $('#header').load('../html/header.html',function(){
            require(['header'],function(){});
        })
        $('#footer').load('../html/footer.html');


        console.log(com);
        //获取cookie
        var goodslist = com.Cookie.get('goodslist');
        goodslist = JSON.parse(goodslist);
        console.log(goodslist);

        //生成html结构
        var html = $.map(goodslist,function(item,idx){
            // var total = ${item.price}*${item.qty};
            return `<dd class="clear cart-items" data-id=${idx}>
                    <span class="col-md-1"><input type="checkbox" /></span>
                    <span  class="col-md-3">
                        <div class="g-pic">
                            <img src="../${item.imgurl}" / class="imgLeft">
                        </div>
                        <div class="g-info">
                        <p>
                        ${item.details}</p>
                        </div>
                    </span>
                    <span  class="col-md-1 tc">
                        <div class="g-attr">
                            <p><label for="">规格：</label><span>${item.std}</span></p>
                        </div>
                    </span>
                    <span  class="col-md-2 tc">
                        <p class="g-price">${item.price}</p>
                    </span>
                    <span  class="col-md-2 tc">
                        <p class="g-num">
                            <a class="De dis">-</a>
                            <span  class="ipt">${item.qty}</span>
                            <a class="In dis">+</a>
                        </p>
                    </span>
                    <span  class="col-md-2 tc">
                        <p class="g-total">${(item.price*item.qty).toFixed(2)}</p>
                    </span>
                    <span  class="col-md-1 tc">
                        <div class="g-btnclose">&times;</div>
                    </span>
               </dd>`
        }).join('');
        var $box = $('.box');
        $box.html(html);

        //获取全选的元素以及列表的名称
        var $checkAll = $('#checkAll');
        var $box = $('.box');

        var total_num = 0;
        var total_price = 0;

        //获取商品数量元素以及总价
        var $count = $('#cart-count');
        var $cse = $('.cse');

        $checkAll.on('click',function(){
            total_num = 0;
            total_price = 0;
            //当我点击checkAll,box下的所有的iuput的 check打钩
            $box.find('input').prop('checked',$(this).prop('checked'));
            if($(this).prop('checked')){
                for(var i=0;i<$box.find('input').length;i++){
                    total_price += +$($box.find('input')[i]).closest('.cart-items').find('.g-total').html();
                    total_num += +$($box.find('input')[i]).closest('.cart-items').find('.ipt').html()
                }     
            }

            $count.html(total_num);
            $cse.html('￥'+ total_price.toFixed(2));

        })

        //监听列表下所有的input,只要一个不勾选,则全选不勾
        $box.on('click','input',function(){
            var res = true;//假设都不勾选
            for(var i=0;i<$box.find('input').length;i++){
                 if($($box.find('input')[i]).prop('checked') === false){
                    res = false;
                    break;
                 }
            }
            $checkAll.prop('checked',res);

            //计算价格
            if($(this).prop('checked')){
                total_price += +$(this).closest('.cart-items').find('.g-total').html();
                total_num += +$(this).closest('.cart-items').find('.ipt').html()   
            }else{
                //减等于当前点击获取的html
                // console.log(+$(this).closest('.cart-items').find('.g-price').html(),$(this).closest('.cart-items').find('.ipt').html())
                total_price = Number($cse.html());
                total_num = Number($count.html());
                total_price -= (+$(this).closest('.cart-items').find('.g-price').html()*+$(this).closest('.cart-items').find('.ipt').html());
                total_num -=  +$(this).closest('.cart-items').find('.ipt').html();
            }

            
            $count.html(total_num);
            $cse.html('￥'+ total_price.toFixed(2));
        })


        //点击+/-改变数量和价格,并写入数组内,后更新入cookie
        //定义两个变量计算加减的次数
        var des = 0;
        var ins = 0; 
        var $gNum = $('.g-num');
        $gNum.on('click','a',function(){
            var $this = $(this);
            var $price = $this.parent().parent().prev().children('.g-price').html();
            var $gtotal = $this.parent().parent().next().children('.g-total');
            if($this.hasClass('De')){
                this.num = $this.next('.ipt').html();
                if(this.num <=1){
                    des = des;
                    this.num = 1;
                }else{
                    this.num--;
                    des++;
                    console.log(des);
                }
                $this.next('.ipt').html(this.num);
                $gtotal.html(($price*this.num).toFixed(2));

                //判断当前的input是否有勾选,有就加,没有就不执行
                if($this.closest('.cart-items').find('input').prop('checked')){
                    $count.html(total_num - des );
                    $cse.html((total_price - des*+$price ).toFixed(2));
                }
                
            }
            if($this.hasClass('In')){
                this.num = $this.prev('.ipt').html();
                this.num++;
                ins++;
                $this.prev('.ipt').html(this.num);
                $gtotal.html(($price*this.num).toFixed(2));

                //判断当前的input是否有勾选,有就加,没有就不执行
                if($this.closest('.cart-items').find('input').prop('checked')){
                    $count.html(total_num + ins );
                    $cse.html((total_price + ins*+$price ).toFixed(2));
                }
            }

            //获取对应所在的数组的idx
            var currentIdx = $this.closest('.cart-items').attr('data-id');
            goodslist[currentIdx].qty = this.num + '';//更新数量
            //写入 cookie
            com.Cookie.set('goodslist',JSON.stringify(goodslist))
        })

        //获取删除按钮元素
        var $close = $('.g-btnclose');
        $close.on('click',function(){
            var $this = $(this)
            //获取对应父级所在的id
            var currentIdx = $this.closest('.cart-items').attr('data-id');
            //删除idx对应所在的数组
            goodslist.splice(currentIdx,1);
            //移除该元素
            $this.closest('.cart-items').remove();
            //重新写入cookie
            com.Cookie.set('goodslist',JSON.stringify(goodslist));
        });
    })

})