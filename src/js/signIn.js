require(['config'],function(){
    require(['jquery'],function(){
        $('#header').load('../html/header.html',function(){
            require(['header'],function(){});
        });
        $('#footer').load('../html/footer.html');
        /*
        获取输入框的数据,通过ajax发过去后端,验证,返回结果,输出到页面
        */
       var username = document.querySelector('#account');
       var password = document.querySelector('#password');
       var comfirm = document.querySelector('#agpassword');
       var show = document.querySelector('.show');
       $('.ph-sign').on('blur','#account',function(){
            var user = username.value;

            //正确发起异步请求,输错格式提示格式不适合
            if(/^1[3,8,5]\d{9}$/.test(user)){
                console.log(user);
                var $res = $.ajax({
                    type:'get',
                    url:'../api/reg.php',
                    data:{'username':user},
                    dataType:'text',
                    //回调函数获取值
                    success:function(json){
                        var res = json;
                        console.log(res);
                        if(res == 'fail'){
                            show.innerHTML = '<strong style="color:red;">该用户名已存在!</strong>';
                        }
                        // else if(res == 'ok'){
                        //     show.innerHTML = '<strong style="color:green;">注册成功!</strong>';
                        // }
                        else if(res == 'yes' ){
                            show.innerHTML = '<strong style="color:green;">用户名可以注册!</strong>';
                        }
                    },
                    async:true,
                });
                console.log($res);
            }else{
                show.innerHTML = '<strong style="color:red;">你输入的格式有误!</strong>';
            }
       });

        
        var $btnIpt = $('.btnIpt');
        $btnIpt.on('click',function(){
            var user = username.value;
            var pswd = password.value;

            var $signLbel = $('.signLbel')
            console.log($signLbel.children('input').prop('checked'));  
            if(!$signLbel.children('input').prop('checked')){
                show.innerHTML = '<strong style="color:red;">请勾选TPS用户注册协议</strong>';
                return;
            }

            var $res = $.ajax({
                type:'get',
                url:'../api/reg.php',
                data:{'username':user,'password':pswd},
                dataType:'text',
                //回调函数获取值
                success:function(json){
                    var res = json;
                    console.log(res);
                    if(res == 'yesok'){
                        show.innerHTML = '<strong style="color:green;">注册成功!</strong>';
                        username.value = '';
                        password.value = '';
                        comfirm.value = '';
                    }
                },
                async:true,
                });
        });



    })
})