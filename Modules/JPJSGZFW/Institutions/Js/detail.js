$(function() {
	var currentUrl = window.location.href; //获取当前链接
	var arr = currentUrl.split("?"); //分割域名和参数界限
	arr = arr[1].split("=");
	var insCode = arr[1];
	var parm = {
		"ins_code": insCode
	};
	//驾校详情
	CwHelper.Ajax("004300100035", parm, function(data) {
		console.log(JSON.stringify(data));
		corpDetails = data.body;
		//等级转换为中文等级
		if (corpDetails.level == "1") {
			corpDetails.level = "一级";
		} else if (corpDetails.level == "2") {
			corpDetails.level = "二级";
		} else {
			corpDetails.level = "三级";
		}
		//驾校简介
		if (corpDetails.corp_info == null) {
			corpDetails.corp_info = "暂无该驾校的相关介绍";
		}
		//经营状态
		if (corpDetails.busistatus == 1) {
			corpDetails.busistatus = "营业";
		} else if (corpDetails.busistatus == 2) {
			corpDetails.busistatus = "停业";
		} else if (corpDetails.busistatus == 3) {
			corpDetails.busistatus = "整改";
		} else if (corpDetails.busistatus == 4) {
			corpDetails.busistatus = "停业整顿";
		} else if (corpDetails.busistatus == 5) {
			corpDetails.busistatus = "歇业";
		} else if (corpDetails.busistatus == 6) {
			corpDetails.busistatus = "注销";
		} else {
			corpDetails.busistatus = "其他";
		}


		//添加评价星级
		if (corpDetails.overall == null) {
			corpDetails.overall = "0";
		}
		$("#corpFullName").html(corpDetails.name + "&nbsp;&nbsp;");
		$("#ins_code").html(corpDetails.ins_code);
		$("#busistatus_cn").html(corpDetails.busistatus);
		$("#busiscope").html(corpDetails.busiscope);
		$("#level_cn").html(corpDetails.level);
		$("#employee_num").html(corpDetails.coach_number + "&nbsp;人");
		$("#vehicle_num").html(corpDetails.tracar_num + "&nbsp;辆");
		$("#contact").html(corpDetails.contact);
		$("#address").html(corpDetails.address);
		$("#jianjie").html(corpDetails.corp_info);
		//服务评价星级
		var perAppr = Math.floor(parseInt(corpDetails.overall));
		for (perAppr; 5 >= perAppr; perAppr++) {
			$(".jianjie_b .xingxing li:nth-of-type(" + perAppr + ")").css({
				background: "url(../../../StaticResource/Theme2/Img/star.png) no-repeat"
			});
		}
		//加载地图
		loadMap(corpDetails.longitude, corpDetails.latitude);
	}, false);
	//分支机构
	CwHelper.Ajax("004300100033", parm, function(result) {
		corpSubs = result.body.items;
		var ulhtml =
			"<tr><th>序&nbsp;&nbsp;&nbsp;&nbsp;号</th><th>分支机构类型</th><th>分支机构名称</th><th>联系人</th><th>联系电话</th></tr>";
		if (result.body.items.length == 0) {
			ulhtml += '<font color="red"><p style="text-align: center;font-size:15px;height:30px">没有找到数据！</p></font>';
		} else {
			$(corpSubs).each(function() {
				ulhtml += "<tr><td>" + this.id + "</td><td>" + this.sub_type + "</td><td>" + this.sub_name + "</td><td>" +
					this.sub_contact + "</td><td>" + this.sub_phone + "</td></tr>";
			});
		}
		$("#subList").html(ulhtml);
	}, false);
	//收费标准
	CwHelper.Ajax("004300100034", parm, function(result) {
		corpSubs = result.body.items;
		var ulhtml =
			"<tr><th>序&nbsp;&nbsp;&nbsp;&nbsp;号</th><th>培训车型</th><th>培训模式</th><th>收费模式</th><th>付费模式</th><th>班型名称</th><th>金额</th></tr>";
		if (result.body.items.length == 0) {
			ulhtml += '<font color="red"><p style="text-align: center;font-size:15px;height:30px">没有找到数据！</p></font>';
		} else {
			$(corpSubs).each(function() {
				ulhtml += "<tr><td>" + "" + "</td><td>" + this.vehicle_type + "</td><td>" + this.trainning_mode_cn +
					"</td><td>" + this.charge_mode_cn + "</td><td>" + this.pay_mode_cn + "</td><td>" + this.classcurr +
					"</td><td>" + "无金额" + "</td></tr>";
			});
		}
		$("#payList").html(ulhtml);
	}, false);
});

function loadMap(longitude, latitude) {
	var map, marker, point;
	if (longitude == null) {
		longitude = 103.287771;
	}
	if (latitude == null) {
		latitude = 53.123456;
	}
	//百度地图API功能
	map = new BMap.Map("corp_map"); // 创建Map实例
	point = new BMap.Point(longitude, latitude);
	map.centerAndZoom(point, 17); // 初始化地图，设置中心点坐标和地图级别
	map.enableScrollWheelZoom();
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.ScaleControl());
	map.addControl(new BMap.OverviewMapControl());
	marker = new BMap.Marker(point);
	map.addOverlay(marker);
}
