<?php

	include 'connect.php';
	/*
		接口：获取列表数据
	 */
	


	$type = isset($_GET['type']) ? $_GET['type'] : null;
	$brand = isset($_GET['brand']) ? $_GET['brand'] : null;
	$area = isset($_GET['area']) ? $_GET['area'] : null;
	
	//默认显示第一页
	$pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
	//一页生成20条信息
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 15;

	// 编写sql语句
	$sql = "select * from goods where ";

	if($type){
		$sql .= "type='$type' and";
	}
	if($brand){
		$sql .= "brand='$brand' and";
	}
	if($area){
		$sql .= "area='$area' and";
	}

	$sql .= " 1=1";

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

	echo $res1;
?>