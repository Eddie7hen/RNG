require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#header').load('../html/header.html',function(){
            require(['header'],function(){});
        });
        $('#footer').load('../html/footer.html');
        console.log(com);
        var $account = $('#account');
        var $password = $('#password');
        var $checkipt = $('.checkIpt');
        var $showCode = $('.showCode');
        var $btnipt = $('.btnIpt');
        var $output = $('.output');

        //页面刷新时出现验证码
        $showCode.html(NumberAndAlphabet());

        //点击按钮输出结果
        $btnipt.on('click',function(){
            //获取val
            var username = $account.val();
            var password = $password.val();
            if(/^1[3,5,8]\d{9}$/.test(username) && /^[^\s]{6,}$/ && $checkipt.val() === $showCode.text()){
                $.ajax({
                    type:'get',
                    url:'../api/login.php',
                    data:{'username':username,'password':password},
                    dataType:'text',
                    //回调函数获取值
                    success:function(json){
                        var res = json;
                        console.log(res);
                        if(res==='fail'){
                            $output.html(' ');
                            $account.val('').focus();
                            $password.val('');
                            $checkipt.val('');
                            $output.html('<strong style="color:red;">你输入的用户名或密码错误!</strong>')
                        }else if(res === 'ok'){
                            location.href ='http://www.baidu.com';
                        }
                    },
                    async:true,
                });
            }else{
                //清空页面
                $account.val('').focus();
                $password.val('');
                $checkipt.val('');
                //错误是刷新验证码
                $output.html(' ');
                $output.html('<strong style="color:red;">你输入的用户名或密码或验证码错误</strong>');
                $showCode.html(NumberAndAlphabet());
            }
        });

    })
})