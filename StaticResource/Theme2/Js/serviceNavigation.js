$(function(){
	initializeMap();
})
//百度地图对象 
var map = $('#corp_map'); 
var label;//信息标签  
var bdHeight=$(window).height();
$("#corp_map").height(bdHeight);
var bounds ="";
var sw ="";
var ne = "";
var lngSpan = "";
var latSpan = "";
var points=[],markers=[],currMarkers={};
function initializeMap() {
	// 百度地图API功能
	map = new BMap.Map("corp_map",{minZoom : 12, maxZoom : 18 });
	var point = new BMap.Point(113.2759952545166,23.117055306224895);
	map.centerAndZoom(point, 12);
	map.enableScrollWheelZoom(true);

	map.addEventListener("moveend", queryInRect);  
	map.addEventListener("zoomend", queryInRect);  
//	bounds = map.getBounds();
//	sw = bounds.getSouthWest();
//	ne = bounds.getNorthEast();
//	lngSpan = Math.abs(sw.lng - ne.lng);
//	latSpan = Math.abs(ne.lat - sw.lat);
	// 随机向地图添加26000个标注
	
//	for (var i = 0; i < 26000; i ++) {
//	    var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7+0.02), ne.lat - latSpan * (Math.random() * 0.7)-0.02);
//	    points.push(point);
//	    markers.push(new BMap.Marker(point));
//	    if(i<200){//初始显示200个点（可自定义自己能容忍卡顿时间的极限点数）
//	        map.addOverlay(markers[i]);//绘制到地图上
//	        currMarkers['markers'+i]=markers[i];//添加到已显示的点内
//	    }
//	} 

	
	
}
function queryInRect (event) {  
    var cp = map.getBounds(); // 返回map可视区域，以地理坐标表示  
    var sw = cp.getSouthWest(); // 返回矩形区域的西南角  
    var ne = cp.getNorthEast(); // 返回矩形区域的东北角  
    var zoom = map.getZoom(); //当前缩放级别 
  
    var swlng=sw.lng,  
        swlat=sw.lat,  
        nelng=ne.lng,  
        nelat=ne.lat,
        currShowCount=0;//本次拖动或缩放已显示的点数
    for(var i=0;i<points.length;i++){
        if(points[i].lng>swlng && points[i].lng>swlng && points[i].lat<nelng && points[i].lat<nelat){
            if(currMarkers['markers'+i]==undefined){//判断当前点是否已显示在地图上，显示则无需重新绘制
                if(zoom==18 || currShowCount<50){//放大到最大层数后，则显示当前可视区内所有点，鉴于层级较大显示的摄像头较少，因此不会出现卡顿情况
                    map.addOverlay(markers[i]);
                    currMarkers['markers'+i]=markers[i];//记录已显示的点
                    currShowCount++;//本次已显示数加1
                }else{
                    return;
                }
            }
        }
    }  
}

//设置驾培机构位置点
function setCorpPoint(params){
	$.ajax({
        type: "post",
        url: ctx+'/navigation/getCorpPointsByInscode',
        data: params,
        dataType: "json",
        success: function(data){
        	map.clearOverlays();
        	points=[],markers=[],currMarkers={};
        	if(data.length>0){
	        	setCorpOnMap(data,"corp");
        	}else{
        		layer.msg("未找到驾培机构信息！");
        	}
        }
    });
}
// 创建地址解析器实例
var myGeo = new BMap.Geocoder();
function setCorpOnMap(obj,pic){
	var centerPoint={lng:113.2759952545166,lat:23.117055306224895};
	$(obj).each(function(index){
		var corp = this;
		if (corp.longitude == 0 && corp.latitude == 0) {
    		var city = corp.city;//驾校所在城市
    		var address = corp.address;//驾校所在地址
    		// 将地址解析结果显示在地图上,并调整地图视野
    		myGeo.getPoint(address, function(corpPoint){
    			if (corpPoint) {
    				addMarker(corpPoint, corp.short_name, pic, corp.ins_code, 0)
    				
    			}else{
    				console.log("您选择地址没有解析到结果!");
    				var randomPoint = centerPoint = new BMap.Point(parseFloat(centerPoint.lng) + getRandom(), parseFloat(centerPoint.lat) + getRandom());
    		
    				addMarker(randomPoint, corp.short_name, pic, corp.ins_code, 0);
    			}
    			
    		}, city);
    	}else{
    		centerPoint = new BMap.Point(corp.longitude, corp.latitude);
    		addMarker(centerPoint, corp.short_name, pic, corp.ins_code, 0);
    	}
	});
	
}

function getRandom() {
	return (Math.random() - 0.5) / 10;
}
function addMarker(point, text, img, markerId, type) {
	if (!map) {
		return;
	}
	points.push(point);
	// 创建标注
	var iconFile = ctx+"/images/"+img+".png";
	var myIcon = new BMap.Icon(iconFile, new BMap.Size(32, 32));
	var marker = new BMap.Marker(point, {
		title : text,
		icon : myIcon
	});
	
	var opts = {
		// 指定文本标注所在的地理位置
		position : point,
		//设置文本偏移量
		offset : new BMap.Size(28, 2)
	};
	// 创建文本标注对象
	var label = new BMap.Label(text, opts);
	label.setStyle( {
		color : "blue",
		fontSize : "12px",
		height : "10px",
		lineHeight : "10px",
		fontFamily : "微软雅黑"
	});
	//添加标注备注
	marker.setLabel(label);
	//点击标注弹出详细信息
	marker.addEventListener("click", function(){
		var obj = this;
		$.ajax({
	        type: "post",
	        url: ctx+'/navigation/getCorpInfoByInscode',
	        data: {inscode:markerId},
	        dataType: "json",
	        success: function(result){
	        	createInfo(obj,result.corpInfo);
	        }
	    });
	});
	//map.addOverlay(marker); // 将标注添加到地图中
	markers.push(marker);
	
	if(markers.length<100){
		map.addOverlay(marker);//绘制到地图上
		currMarkers['markers'+markers.length]=marker;//添加到已显示的点内
	}
	if(markers.length==1){
		map.centerAndZoom(points[0], 12); //初始化地图，设置中心点坐标和地图级别
	}
	
	return marker;
}
function createInfo(marker,corpInfo){
	var html = [];
	 opts = {  
                width : 420,     // 信息窗口宽度  
                height: 330,     // 信息窗口高度  
                //title : "驾校信息" , // 信息窗口标题  
                enableMessage:false//设置允许信息窗发送短息  
    }; 
	 html.push("<fieldset class='layui-elem-field layui-field-title' style='margin-top: 10px;'>");
	 html.push("<legend>"+corpInfo.name+"</legend>");
	 html.push("</fieldset>");
	 html.push("<div class='layui-form'>");
	 html.push("<table class='layui-table' lay-even lay-skin='nob'>");
	 html.push("<colgroup><col width='50'><col width='100'><col width='130'><col width='60'></colgroup>");
	 html.push("<tbody>");
	 html.push("<tr><td>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</td><td colspan=3>"+corpInfo.address+"</td></tr>");
	 html.push("<tr><td>经营许可证编号：</td>" +
	 			   "<td colspan=3>"+corpInfo.licnum+"</td></tr>");
	 html.push("<tr><td>分&nbsp;&nbsp;&nbsp;类&nbsp;&nbsp;&nbsp;&nbsp;等&nbsp;&nbsp;&nbsp;级：</td>" +
	 			   "<td colspan=3>"+corpInfo.level_cn+"</td></tr>");
	 html.push("<tr><td>联&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人：</td>" +
	 			   "<td colspan=3>"+corpInfo.legal+"</td></tr>");
	 html.push("<tr><td>联&nbsp;&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;电&nbsp;&nbsp;&nbsp;话：</td>" +
	 			   "<td colspan=3>"+corpInfo.phone+"</td></tr>");
	 html.push("<tr><td>备案教练员：</td><td style='text-align:left'><a href='"+ctx+"/coaches.html?ins_code="+corpInfo.ins_code+"&service=1'>"+corpInfo.employeecount+"</a></td>" +
	 			   "<td align='left'>备案教练车：</td><td style='text-align:left'><a href='"+ctx+"/coach_car.html?ins_code="+corpInfo.ins_code+"&service=1'>"+corpInfo.vehiclecount+"</a></td></tr>");
	 html.push("<tr><td>服务评价：</td><td align='left'>"+corpInfo.overall_cn+"</td>" +
	 			   "<td align='left'>评价人数：</td><td align='left'>"+corpInfo.appr_count+"</td></tr>");		 
  	 html.push("</tbody></table>");
	 html.push("</div>");
	
     infoWindow = new BMap.InfoWindow(html.join(""),opts);  // 创建信息窗口对象
	 marker.openInfoWindow(infoWindow);
}

