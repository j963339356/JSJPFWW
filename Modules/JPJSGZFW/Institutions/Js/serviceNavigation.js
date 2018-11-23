$(function() {
	//市级赋值
	$.each(city, function(k, p) {
		var option = "<option value='" + p.ID + "'>" + p.NAME + "</option>";
		$("#CityName").append(option);
	});

	//市级选择
	$("#CityName").change(function() {
		var selValue = $(this).val();
		$("#hidCityName").val($(this).find("option:selected").text());
		$("#CountyName option:gt(0)").remove();

		$.each(county, function(k, p) {
			if (p.PARENT_ID == selValue) {
				var option = "<option value='" + p.ID + "'>" + p.NAME + "</option>";
				$("#CountyName").append(option);
			}
		});

	});

	//区县级选择
	$("#CountyName").change(function() {
		var selValue = $(this).val();
		$("#hidCountyName").val($(this).find("option:selected").text());
		$("#CorpName option:gt(0)").remove();

		var city = $('#hidCityName').val();
		var county = $('#hidCountyName').val();
		var parm = {
			"rows": "9999",
			"page": "1",
			"data": {
				"city": city,
				"district": county,
				"name": ""
			}
		};
		CwHelper.Ajax("004300100036", parm, function(data) {
			$(data.body.items).each(function() {
				var option = "<option value='" + this.ins_code + "'>" + this.name + "</option>";
				$("#CorpName").append(option);
			})
		}, false);
	});

	//驾校机构选择
	$("#CorpName").change(function() {
		var selValue = $(this).val();
		$("#hidCorpName").val($(this).find("option:selected").text());
		$("#hidCorpCode").val($(this).find("option:selected").val());
	});
});

//重置
$(document).ready(function() {
	$("#clear_coach").click(function() {
		$("#CityName").val('');
		$("#CountyName").val('');
		$("#CorpName").val('');
		$("#hidCityName").val('');
		$("#hidCountyName").val('');
		$("#hidCorpName").val('');
		$("#hidCorpCode").val('');
		$("#CountyName").html("<option value=''>请选择县区</option>");
		$("#CorpName").html("<option value=''>请选择驾培机构</option>");
	});
});

$(document).ready(function() {
	$("#query_coach").click(function() {
		var corpCode = $("#hidCorpCode").val();
		var city = $("#hidCityName").val();
		var county = $("#hidCountyName").val();
		var name = $("#hidCorpName").val();
		if (corpCode == "") {
			layer.msg("请选择驾培机构");
			return;
		}
		var parm = {
			"ins_code": corpCode
		};
		CwHelper.Ajax("004300100035", parm, function(data) {
			map.clearOverlays();
			points = [], markers = [], currMarkers = {};
			if (data.body == null) {
				layer.msg("未找到驾培机构信息！");
			} else {
				corpinfo = data.body;
				//等级转换为中文等级
				if (corpinfo.level == "1") {
					corpinfo.level = "一级";
				} else if (corpinfo.level == "2") {
					corpinfo.level = "二级";
				} else {
					corpinfo.level = "三级";
				}
				//添加评价
				CwHelper.Ajax("004300100045", parm, function(result) {
					corpinfo.appraise_sum = result.body.sum;
					if (result.body.sum == 0) {
						corpinfo.appraise = "暂无评价";
					} else {
						corpinfo.appraise = result.body.appraise;
					}

				}, false);

				if (corpinfo.photo == null) {
					setCorpOnMap(corpinfo, "../../../StaticResource/Theme2/Img/corp.png");
				} else {
					setCorpOnMap(corpinfo, corpinfo.photo);
				}
			}
		}, false);
	});
});

$(function() {
	initializeMap();
})
//百度地图对象 
var map = $('#corp_map');
var label; //信息标签  
var bdHeight = "600px";
$("#corp_map").height(bdHeight);
var bounds = "";
var sw = "";
var ne = "";
var lngSpan = "";
var latSpan = "";
var points = [],
	markers = [],
	currMarkers = {};

function initializeMap() {
	// 百度地图API功能
	map = new BMap.Map("corp_map", {
		minZoom: 12,
		maxZoom: 18
	});
	var point = new BMap.Point(113.2759952545166, 23.117055306224895);
	map.centerAndZoom(point, 12);
	map.enableScrollWheelZoom(true);

	map.addEventListener("moveend", queryInRect);
	map.addEventListener("zoomend", queryInRect);
}

function queryInRect(event) {
	var cp = map.getBounds(); // 返回map可视区域，以地理坐标表示  
	var sw = cp.getSouthWest(); // 返回矩形区域的西南角  
	var ne = cp.getNorthEast(); // 返回矩形区域的东北角  
	var zoom = map.getZoom(); //当前缩放级别 

	var swlng = sw.lng,
		swlat = sw.lat,
		nelng = ne.lng,
		nelat = ne.lat,
		currShowCount = 0; //本次拖动或缩放已显示的点数
	for (var i = 0; i < points.length; i++) {
		if (points[i].lng > swlng && points[i].lng > swlng && points[i].lat < nelng && points[i].lat < nelat) {
			if (currMarkers['markers' + i] == undefined) { //判断当前点是否已显示在地图上，显示则无需重新绘制
				if (zoom == 18 || currShowCount < 50) { //放大到最大层数后，则显示当前可视区内所有点，鉴于层级较大显示的摄像头较少，因此不会出现卡顿情况
					map.addOverlay(markers[i]);
					currMarkers['markers' + i] = markers[i]; //记录已显示的点
					currShowCount++; //本次已显示数加1
				} else {
					return;
				}
			}
		}
	}
}
var corpinfo = null;
// 创建地址解析器实例
var myGeo = new BMap.Geocoder();

function setCorpOnMap(obj, pic) {
	var centerPoint = {
		lng: 113.2759952545166,
		lat: 23.117055306224895
	};
	var corp = obj;
	if (corp.longitude == -1 && corp.latitude == -1) {
		var city = corp.city; //驾校所在城市
		var address = corp.address; //驾校所在地址
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(address, function(corpPoint) {
			if (corpPoint) {
				addMarker(corpPoint, corp.short_name, pic, corp.ins_code, 0, corp)

			} else {
				console.log("您选择地址没有解析到结果!");
				var randomPoint = centerPoint = new BMap.Point(parseFloat(centerPoint.lng) + getRandom(), parseFloat(
					centerPoint.lat) + getRandom());

				addMarker(randomPoint, corp.name, pic, 0, crop);
			}

		}, city);
	} else {
		centerPoint = new BMap.Point(corp.longitude, corp.latitude);
		addMarker(centerPoint, corp.name, pic, 0, corp);
	}

}

function getRandom() {
	return (Math.random() - 0.5) / 10;
}

function addMarker(point, text, img, type, corpInfo) {
	if (!map) {
		return;
	}
	points.push(point);
	// 创建标注
	var iconFile = img;
	var myIcon = new BMap.Icon(iconFile, new BMap.Size(32, 32));
	var marker = new BMap.Marker(point, {
		title: text,
		icon: myIcon
	});

	var opts = {
		// 指定文本标注所在的地理位置
		position: point,
		//设置文本偏移量
		offset: new BMap.Size(28, 2)
	};
	// 创建文本标注对象
	var label = new BMap.Label(corpInfo.short_name, opts);
	label.setStyle({
		color: "blue",
		fontSize: "12px",
		height: "10px",
		lineHeight: "10px",
		fontFamily: "微软雅黑"
	});
	//添加标注备注
	marker.setLabel(label);
	//点击标注弹出详细信息
	marker.addEventListener("click", function() {
		var obj = this;
		createInfo(obj, corpInfo);
	});
	//map.addOverlay(marker); // 将标注添加到地图中
	markers.push(marker);

	if (markers.length < 100) {
		map.addOverlay(marker); //绘制到地图上
		currMarkers['markers' + markers.length] = marker; //添加到已显示的点内
	}
	if (markers.length == 1) {
		map.centerAndZoom(points[0], 12); //初始化地图，设置中心点坐标和地图级别
	}

	return marker;
}

function createInfo(marker, corpInfo) {
	var html = [];
	opts = {
		width: 420, // 信息窗口宽度  
		height: 330, // 信息窗口高度  
		//title : "驾校信息" , // 信息窗口标题  
		enableMessage: false //设置允许信息窗发送短息  
	};
	html.push("<fieldset class='layui-elem-field layui-field-title' style='margin-top: 10px;'>");
	html.push("<legend>" + corpInfo.name + "</legend>");
	html.push("</fieldset>");
	html.push("<div class='layui-form'>");
	html.push("<table class='layui-table' lay-even lay-skin='nob'>");
	html.push("<colgroup><col width='50'><col width='100'><col width='130'><col width='60'></colgroup>");
	html.push("<tbody>");
	html.push(
		"<tr><td>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</td><td colspan=3>" +
		corpInfo.address + "</td></tr>");
	html.push("<tr><td>经营许可证编号：</td>" +
		"<td colspan=3>" + corpInfo.licnum + "</td></tr>");
	html.push("<tr><td>分&nbsp;&nbsp;&nbsp;类&nbsp;&nbsp;&nbsp;&nbsp;等&nbsp;&nbsp;&nbsp;级：</td>" +
		"<td colspan=3>" + corpInfo.level + "</td></tr>");
	html.push("<tr><td>联&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人：</td>" +
		"<td colspan=3>" + corpInfo.contact + "</td></tr>");
	html.push("<tr><td>联&nbsp;&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;电&nbsp;&nbsp;&nbsp;话：</td>" +
		"<td colspan=3>" + corpInfo.phone + "</td></tr>");
	html.push("<tr><td>备案教练员：</td><td style='text-align:left'><a href='Coaches.html?ins_code=" + corpInfo.ins_code +
		"&service=1'>" + corpInfo.coach_number + "</a></td>" +
		"<td align='left'>备案教练车：</td><td style='text-align:left'><a href='CoachCar.html?ins_code=" + corpInfo.ins_code +
		"&service=1'>" + corpInfo.tracar_num + "</a></td></tr>");
	html.push("<tr><td>服务评价：</td><td align='left'>" + corpInfo.appraise + "</td>" +
		"<td align='left'>评价人数：</td><td align='left'>" + corpInfo.appraise_sum + "</td></tr>");
	html.push("</tbody></table>");
	html.push("</div>");

	infoWindow = new BMap.InfoWindow(html.join(""), opts); // 创建信息窗口对象
	marker.openInfoWindow(infoWindow);
}
