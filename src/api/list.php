<?php

	include 'connect.php';
	/*
		接口：获取列表数据
	 */
	
	//默认显示第一页
	$pageNo = isset($GET_['pageNo']) ? $GET_['pageNo'] : 1;
	//一页生成20条信息
	$qty = isset($GET_['qty']) ? $GET_['qty'] : 20;


	$cate = isset($_GET['category']) ? $_GET['category'] : null;
	

	// 编写sql语句
	$sql = "select * from goods";

	if($cate){
		$sql .= " where category='$cate'";
	}

	// 执行sql语句
	// query()
	// 得到一个：查询结果集
	$result = $conn->query($sql);

	// 使用查询结果集
	// 返回数组
	$row = $result->fetch_all(MYSQLI_ASSOC);

	// 根据分页截取数据
	$res = array(
		'data'=>array_slice($row,($pageNo-1)*$qty,$qty),
		'total'=>count($row)
	);

	// 把数组转换成json字符串
	$res1 = json_encode($res,JSON_UNESCAPED_UNICODE);

	echo "$res1";
?>