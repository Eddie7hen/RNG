<?php
/**
 * @Author: Marte
 * @Date:   2017-11-12 20:15:29
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-12 20:22:11
 */
     $account = isset($_GET['account']) ? $_GET['account'] : '' ;

     $pswd = isset($_GET['pswd']) ? $_GET['pswd'] : '' ;
    
    $account_data = array(13678902334,13456783456,15623142888,15625142968);

    $pswd_data = array('abc123','aabbcc','123456','123abc');

    if( in_array($account, $account_data) && in_array($pswd, $pswd_data) ){
        echo "yes";
    }else{
        echo "no";
    }


?>