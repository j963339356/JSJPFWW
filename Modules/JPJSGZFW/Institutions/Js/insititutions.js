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
	});
});

//重置
function clear_driver() {
	$("#CityName").val('');
	$("#CountyName").val('');
	$("#corp").val('');
	$("#hidCityName").val('');
	$("#hidCountyName").val('');
	$("#queryCorp").click();
	$("#CountyName").html("<option value=''>请选择县区</option>");
}
var corpList = null;
//页面数据初始化
$(function() {
	doAjax("1","","","");

});
//加载驾校机构列表
function loadCorpList(data) {
	var ulhtml = "";
	$(data.items).each(function() {
		ulhtml += "<li><input type='hidden' name='ins_code' value='" + this.ins_code +
			"' ><a href='Detail.html?ins_code=" + this.ins_code + "'>" +
			"<div class='tp'><img id=\"photofile\" style=\"height: 140px;width: 130px;\" src=\"../../../StaticResource/Theme2/Img/zl.jpg\"></div>" +
			"<div class='ziliao'><p>" + this.name + "</p><p>区域：" + this.address +
			"</p><p>联系人：" + this.contact + "</p>" + "<p>联系人：" + this.phone + "</div></a></li>";
	});
	$("#corpList").html(ulhtml);
}

function doAjax(page,city,district,name){
	var parm = {
		"rows":"9",
		"page":page,
		"data":{
			"city":city,
			"district":district,
			"name":name
		}
	};
	CwHelper.Ajax("004300100036",parm,function(data){
		$("#pageIndex0").html(page);
		$("#pageNo").html(page);
		$("#totalPages").html(Math.ceil(data.body.totalcount / 9).toString());
		$("#pageIndex").val(data.body.totalcount.toString());
		$("#pageIndex").val(page);
		$("#pageCount").val(Math.ceil(data.body.totalcount / 9).toString());
		loadCorpList(data.body);
	},false);
}
$(document).ready(function() {
	$("#queryCorp").click(function() {
		var corpName = $("#corp").val();
		var city = $('#hidCityName').val();
		var county = $('#hidCountyName').val();
		doAjax("1",city,county,corpName);
	});
});

//分页
$("#first_page").click(function firstPage() { // 首页
	var curPage = $("#pageIndex").val();
	if (curPage == 1) {
		layer.msg("已经是第一页了", {
			time: 1000,
		});
		return;
	}
	displayPage(1);
});
$("#last_page").click(function lastPage() { // 尾页
	var curPage = $("#pageIndex").val();
	var pageCount = $("#pageCount").val();
	if (parseInt(curPage) == pageCount) {
		layer.msg("已经是最后一页了", {
			time: 1000
		});
		return;
	}
	displayPage($("#pageCount").val());
});
$("#backforward").click(function frontPage() { // 上一页
	var curPage = $("#pageIndex").val();
	if ((curPage - 1) < 1) {
		layer.msg("已经是第一页了", {
			time: 1000
		});
		return;
	}
	displayPage(curPage - 1);
});
$("#forward").click(function nextPage() { // 下一页
	var curPage = $("#pageIndex").val();
	var pageCount = $("#pageCount").val();
	if (parseInt(curPage) + 1 > pageCount) {
		layer.msg("已经是最后一页了");
		return;
	}
	displayPage(parseInt(curPage) + 1);
});
//跳转页面
$("#change_page").click(function() {
	var page_num = $("#page_num").val();
	if (page_num > parseInt($("#pageCount").val())) {
		layer.msg("没有这么多数据");
		return;
	}
	if (page_num < 1) {
		layer.msg("页数输入有误");
		return;
	}
	displayPage(page_num);
});

function displayPage(curPage) {
	var corpName = $("#corp").val();
	var city = $('#hidCityName').val();
	var county = $('#hidCountyName').val();
	doAjax(curPage,city,county,corpName);
}
