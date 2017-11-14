<?php
    //编写接口进行判断
    //通过超级全局变量获取表单传进来的值
    //isset():判断是否传参
    //$GLOBAL里面的方括号用单引号['']
    $account = isset($_GET['account']) ? $_GET['account'] : '' ;
    
    $account_data = array(13678902334,13456783456,15623142888,15625142968);

    if( in_array($account, $account_data) ){
        echo "no";
    }else{
        echo "yes";
    }

?>