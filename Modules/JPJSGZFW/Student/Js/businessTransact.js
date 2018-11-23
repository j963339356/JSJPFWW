//添加cookie
$.cookie('testcookie', 'hasakesitan', { expires: 7 });

//测试一下判断是否登录
$(function(){
	$(".login_in").css('display','block');
	$(".login_in").css('display','none');
	$(".nhhy").css('display','block');
});


function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
//评价页返回默认显示
var showTab = GetQueryString("type");
if (showTab == 'train') {
	$('.my-training').show().siblings().hide();
} else if (showTab == 'comp') {
	$('.my-complaints').show().siblings().hide();
} else if (showTab == 'appr') {
	$('.my-appraise').show().siblings().hide();
	if ($("#coachType").val() == "myAppraise") {
		$('#appraise-tab span').eq(1).addClass('cutton').siblings().removeClass('cutton');
	}
}

//重置查询条件
$("#trainRest").on('click', function() {
	$("#corp").val("");
	$("#coach").val("");
	$("#trainPhase").val("");
	$("#evaluate").val("");
	var data = [{
		"corp_name": "驾校名字3",
		"coach_name": "教练名",
		"train_phase_cn": "第二部分",
		"start_time": "2018-11-22 12:00:00",
		"end_time": "2018-11-22 12:00:00",
		"duration": "3小时52分",
		"last_valid_min": "3小时52分",
		"evaluate_flag": 1
	}, {
		"corp_name": "驾校名字4",
		"coach_name": "教练名2",
		"train_phase_cn": "第2部分",
		"start_time": "2018-11-23 12:00:00",
		"end_time": "2018-11-23 12:00:00",
		"duration": "5小时52分",
		"last_valid_min": "5小时52分",
		"evaluate_flag": 0
	}];
	loadMyTrainingTable(data);
});
$(function(){
	var data = [{
		"corp_name": "驾校名字",
		"coach_name": "教练名",
		"train_phase_cn": "第二部分",
		"start_time": "2018-11-22 12:00:00",
		"end_time": "2018-11-22 12:00:00",
		"duration": "3小时52分",
		"last_valid_min": "3小时52分",
		"evaluate_flag": 1
	}, {
		"corp_name": "驾校名字2",
		"coach_name": "教练名2",
		"train_phase_cn": "第2部分",
		"start_time": "2018-11-23 12:00:00",
		"end_time": "2018-11-23 12:00:00",
		"duration": "5小时52分",
		"last_valid_min": "5小时52分",
		"evaluate_flag": 0
	}];
	loadMyTrainingTable(data);
});
//查询我的培训信息
$("#trainQuery").on('click', function() {
	var data = [{
		"corp_name": "驾校名字",
		"coach_name": "教练名",
		"train_phase_cn": "第二部分",
		"start_time": "2018-11-22 12:00:00",
		"end_time": "2018-11-22 12:00:00",
		"duration": "3小时52分",
		"last_valid_min": "3小时52分",
		"evaluate_flag": 1
	}, {
		"corp_name": "驾校名字2",
		"coach_name": "教练名2",
		"train_phase_cn": "第2部分",
		"start_time": "2018-11-23 12:00:00",
		"end_time": "2018-11-23 12:00:00",
		"duration": "5小时52分",
		"last_valid_min": "5小时52分",
		"evaluate_flag": 0
	}];
	loadMyTrainingTable(data);
});
/*
	function trainQuery() {
		var params = {
			corp: $("#corp").val(),
			coach: $("#coach").val(),
			trainPhase: $("#trainPhase").val(),
			evaluate: $("#evaluate").val()
		};
		reloadTable(JSON.stringify(params));
	}
*/
function loadMyTrainingTable(data) {
	layui.use(['table'], function() {
		var table = layui.table;
		//展示已知数据
		table.render({
			elem: '#myTraining',
			cols: [
				[{
						field: 'corp_name',
						title: '驾培机构',
						align: 'center',
						width: 180,
						toolbar: '#corpTpl'
					},
					{
						field: 'coach_name',
						title: '教练员',
						align: 'center',
						width: 80,
						toolbar: '#coachTpl'
					},
					{
						field: 'train_phase_cn',
						title: '培训部分',
						align: 'center',
						width: 80
					},
					{
						field: 'start_time',
						title: '开始时间',
						align: 'center',
						width: 150,
						sort: true
					},
					{
						field: 'end_time',
						title: '结束时间',
						align: 'center',
						width: 150,
						sort: true
					},
					{
						field: 'duration',
						title: '培训学时',
						align: 'center',
						width: 100
					},
					{
						field: 'last_valid_min',
						title: '有效学时',
						align: 'center',
						width: 100
					},
					{
						fixed: 'right',
						title: '操作',
						align: 'center',
						width: 180,
						toolbar: '#barDemo'
					}
				]
			],
			data: data,
			height: '400',
			even: true,
			size: 'sm'
		});
		table.on('tool(trainTable)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
			var layEvent = obj.event; //获得 lay-event 对应的值 
			var data = obj.data; //获得当前行数据
			if (layEvent === 'appeal') { //查看
				var url = $(this).attr("url-data");
				layer.open({
					scrollbar: false,
					skin: 'layui-layer-rim',
					type: 2,
					title: "学时记录详情",
					shadeClose: true,
					shade: [0.3, '#000'],
					area: ['70%', '85%'],
					content: url,
					end: function() {

					},
					yes: function(index) {
						layer.close(index);
					}
				});
			}
			if (layEvent === 'appealJudge') { //判断是否需要先进行教练员评价
				var url = $(this).attr("url-data");
				layer.confirm('请在查看学时前确认是否对本次培训进行评价', {
					btn: ['是', '否'] //按钮
				}, function() {
					var coachNum = data.coach_num;
					var id = data.id;
					var trainPhase = data.train_phase;
					var stuNum = data.stunum;
					window.location.href = "CoachAppraise.html?coachNum=" + coachNum + "&id=" + id + "&trainPhase=" +
						trainPhase + "&stunum=" + stuNum;
				}, function() {
					layer.open({
						scrollbar: false,
						skin: 'layui-layer-rim',
						type: 2,
						title: "学时记录详情",
						shadeClose: true,
						shade: [0.3, '#000'],
						area: ['70%', '85%'],
						content: url,
						end: function() {

						},
						yes: function(index) {
							layer.close(index);
						}
					});
				});
			}
		});
	});
}
















//重置查询条件
$("#complaintRest").on('click', function() {
	$("#corp_name").val("");
	$("#coach_name").val("");
	$("#comStartDate").val("");
	$("#comEndDate").val("");
	$("#comType").val("");
});
$(function(){
	var data = [{
		"type_cn": "教练员",
		"name": "王里",
		"cdate": "2018-11-22",
		"content": "这个教练老是在车里抽烟，烟味太重了",
		"schopinion": "驾校处理意见",
		"depaopinion": "交管部门意见",
		"status_cn": "未受理"
	}, {
		"type_cn": "驾培机构",
		"name": "广州大通驾驶技术培训公司",
		"cdate": "2018-11-22",
		"content": "这个驾校纵容教练在车里抽烟",
		"schopinion": "驾校处理意见",
		"depaopinion": "交管部门意见",
		"status_cn": "未受理"
	}];
	loadMyComplaintTable(data);
});
//查询我的历史投诉
$("#complaintQuery").on('click', function() {
	var data = [{
		"type_cn": "教练员",
		"name": "王里",
		"cdate": "2018-11-22",
		"content": "这个教练老是在车里抽烟，烟味太重了",
		"schopinion": "驾校处理意见",
		"depaopinion": "交管部门意见",
		"status_cn": "未受理"
	}, {
		"type_cn": "驾培机构",
		"name": "广州大通驾驶技术培训公司",
		"cdate": "2018-11-22",
		"content": "这个驾校纵容教练在车里抽烟",
		"schopinion": "驾校处理意见",
		"depaopinion": "交管部门意见",
		"status_cn": "未受理"
	}];
	loadMyComplaintTable(data);
});
//加载我的投诉列表
function loadMyComplaintTable(data) {
	layui.use(['table'], function() {
		var table = layui.table;
		//展示已知数据
		table.render({
			elem: '#myComplaint',
			cols: [
				[{
						field: 'type_cn',
						title: '投诉对象类型',
						align: 'center',
						width: 90
					},
					{
						field: 'name',
						title: '对象名称',
						align: 'center',
						width: 158
					},
					{
						field: 'cdate',
						title: '投诉日期',
						align: 'center',
						width: 120,
						sort: true
					},
					{
						field: 'content',
						title: '投诉内容',
						align: 'center',
						width: 170
					},
					{
						field: 'schopinion',
						title: '驾校处理意见',
						align: 'center',
						width: 150
					},
					{
						field: 'depaopinion',
						title: '交管部门意见',
						align: 'center',
						width: 150
					},
					{
						field: 'status_cn',
						title: '状态',
						align: 'center',
						width: 90
					},
					{
						fixed: 'right',
						title: '操作',
						width: 90,
						align: 'center',
						toolbar: '#compDetail'
					}
				]
			],
			data: data,
			height: '400',
			even: true,
			size: 'sm'
		});
		//监听工具条
		table.on('tool(complaintTable)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
			var layEvent = obj.event; //获得 lay-event 对应的值

			if (layEvent === 'compDetail') { //查看
				//do somehing
				var url = $(this).attr("url-data");
				layer.open({
					scrollbar: false,
					type: 2,
					//skin: 'layui-layer-demo',
					title: "投诉详情",
					shadeClose: false,
					shade: [0.3, '#000'],
					area: ['50%', '85%'],
					content: url,
					end: function() {},
					yes: function(index) {
						layer.close(index);
					}
				});
			}
		});
	});
}








$(function() {
	var data = [{
		"corp_name": "广州中视达驾驶培训有限公司",
		"coach_name": "古方堂",
		"train_phase_cn": "第二部分",
		"start_time": "2018-11-02 12:00:00",
		"end_time": "2018-11-22 12:00:00"
	}, {
		"corp_name": "深圳中视达驾驶培训有限公式",
		"coach_name": "廖世仁",
		"train_phase_cn": "第二部分",
		"start_time": "2018-11-02 12:00:00",
		"end_time": "2018-11-22 12:00:00"
	}];
	loadMyNoApprCorpTable(data);
	loadNoApprCoachTable(data);
});
//加载我的未评价驾校
function loadMyNoApprCorpTable(data) {
	layui.use(['table'], function() {
		var table = layui.table;
		//展示已知数据
		table.render({
			elem: '#myNoApprCorpTable',
			cols: [
				[{
						field: 'corp_name',
						title: '驾培机构',
						align: 'center',
						width: 220
					},
					{
						field: 'coach_name',
						title: '教练员',
						align: 'center',
						width: 160
					},
					{
						field: 'train_phase_cn',
						title: '培训部分',
						align: 'center',
						width: 160
					},
					{
						field: 'start_time',
						title: '开始时间',
						align: 'center',
						width: 180,
						sort: true
					},
					{
						field: 'end_time',
						title: '结束时间',
						align: 'center',
						width: 180,
						sort: true
					},
					{
						fixed: 'right',
						title: '操作',
						width: 122,
						align: 'center',
						toolbar: '#doAppraiseCorp'
					}
				]
			],
			data: data,
			height: '400',
			even: true,
			size: 'sm'
		});
	});
}
//加载我的未评价教练员
function loadNoApprCoachTable(data) {
	layui.use(['table'], function() {
		var table = layui.table;
		//展示已知数据
		table.render({
			elem: '#myNoApprCoachTable',
			cols: [
				[{
						field: 'corp_name',
						title: '驾培机构',
						align: 'center',
						width: 220
					},
					{
						field: 'coach_name',
						title: '教练员',
						align: 'center',
						width: 160
					},
					{
						field: 'train_phase_cn',
						title: '培训部分',
						align: 'center',
						width: 160
					},
					{
						field: 'start_time',
						title: '开始时间',
						align: 'center',
						width: 180,
						sort: true
					},
					{
						field: 'end_time',
						title: '结束时间',
						align: 'center',
						width: 180,
						sort: true
					},
					{
						fixed: 'right',
						title: '操作',
						width: 122,
						align: 'center',
						toolbar: '#doAppraiseCoach'
					}
				]
			],
			data: data,
			height: '400',
			even: true,
			size: 'sm'
		});
	});
}









//重置查询条件
$("#appraiseRest").on('click', function() {
	$("#apprCorp").val("");
	$("#apprCoach").val("");
	$("#apprStartDate").val("");
	$("#apprEndDate").val("");
	var data = null;
	data = [{
		"type_cn": "",
		"name": "",
		"part_cn": "",
		"evaluate_time": "",
		"overall_cn": ""
	}];
	loadMyAppraiseTable(data);
	$("#myAppraiseTable ~ div > .layui-table-body.layui-table-main").html("<div class='layui-none'>无数据</div>");
});
$(function(){
	var data = [{
		"type_cn": "教练员",
		"name": "古方堂",
		"part_cn": "第二部分",
		"evaluate_time": "2018-11-02",
		"overall_cn": "一星"
	}, {
		"type_cn": "驾培机构",
		"name": "深圳中视达驾驶培训有限公式",
		"part_cn": "第二部分",
		"evaluate_time": "2018-11-02",
		"overall_cn": "一星"
	}];
	loadMyAppraiseTable(data);
});
//查询我的历史评价
$("#appraiseQuery").on('click', function() {
	var data = [{
		"type_cn": "教练员",
		"name": "古方堂",
		"part_cn": "第二部分",
		"evaluate_time": "2018-11-02",
		"overall_cn": "一星"
	}, {
		"type_cn": "驾培机构",
		"name": "深圳中视达驾驶培训有限公式",
		"part_cn": "第二部分",
		"evaluate_time": "2018-11-02",
		"overall_cn": "一星"
	}];
	loadMyAppraiseTable(data);
});
//加载我的历史评价列表
function loadMyAppraiseTable(data) {
	layui.use(['table'], function() {
		var table = layui.table;
		//展示已知数据
		table.render({
			elem: '#myAppraiseTable',
			cols: [
				[{
						field: 'type_cn',
						title: '评价类型',
						align: 'center',
						width: 180
					},
					{
						field: 'name',
						title: '评价对象名称',
						align: 'center',
						width: 260
					},
					{
						field: 'part_cn',
						title: '培训部分',
						align: 'center',
						width: 160
					},
					{
						field: 'evaluate_time',
						title: '评价日期',
						align: 'center',
						width: 180,
						sort: true
					},
					{
						field: 'overall_cn',
						title: '总体评价',
						align: 'center',
						width: 120
					},
					{
						fixed: 'right',
						width: 122,
						title: '操作',
						align: 'center',
						toolbar: '#apprDetail'
					}
				]
			],
			data: data,
			height: '400',
			even: true,
			size: 'sm'
		});
		//监听工具条
		table.on('tool(appraiseTable)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
			var layEvent = obj.event; //获得 lay-event 对应的值
			if (layEvent === 'apprDetail') { //查看
				//do somehing
				var url = $(this).attr("url-data");
				layer.open({
					type: 2,
					//skin: 'layui-layer-demo',
					title: "评价详情",
					scrollbar: false,
					shadeClose: false,
					shade: [0.3, '#000'],
					area: ['50%', '75%'],
					content: url,
					end: function() {},
					yes: function(index) {
						layer.close(index);
					}
				});
			}
		});
	});
}



$(function() {
	$("#comSumbit").click(function() {
		if ($("#objectName").val() == "") {
			layer.msg('请选择投诉对象名称！');
			$("#objectName").focus();
			return false;
		}

		if ($("#content").val() == "") {
			layer.msg('投诉内容不能为空！');
			$("#content").focus();
			return false;
		}

		var params = {
			objectName: $("#objectName").val(),
			phone: $("#perPhone").val(),
			content: $("#content").val(),
			comType: $("#comType").val(),
			stunum: $("#stunum").val(),
			objenum: $("#objenum").val()
		};
		$.ajax({
			type: "post",
			url: "/student/saveComplain",
			data: params,
			dataType: "json",
			success: function(data) {
				if (data.retCode == 1) {
					layer.msg(data.retMsg);
					//清除数据
					$("#objectName").val("");
					$("#objenum").val("");
					$("#content").val("");
				}
			}
		});
	});
});

$(function() {
	var currentNode = "";
	$("#nav_content").find("li").each(function(index) {
		if ((index + 1) == currentNode) {
			$(this).addClass("current");
		} else {
			$(this).removeClass("current");
		}
	});
});
$("#comType").on('change', function() {
	$("#objectName").val("");
	$("#objecnum").val("");
});
$("#myCoach").on('click', function() {
	//投诉对象为教练
	var html = [];
	html.push('<select name="modules" id="select">');
	html.push('<option value="">选择教练员</option>');
	if ($("#comType").val() != "2") {
		html.push('</select>');
		layer.open({
			type: 1,
			skin: 'layui-layer-rim', //加上边框
			title: '选择',
			area: ['350px', '150px'], //宽高
			content: html.join(''),
			btn: ['选择', '取消'],
			yes: function() {
				layer.closeAll();
			},
			btn2: function() {
				layer.closeAll();
			}
		});
		return false;
	}
	$.ajax({
		type: "post",
		url: "/student/trainCoachList",
		data: {
			idCard: $("#idCard").val()
		},
		dataType: "json",
		async: false,
		success: function(data) {
			if (data.retCode == 1) {
				var list = data.data.coachList;
				for (var i = 0; i < list.length; i++) {
					if (list[i].coach_name != "") {
						html.push('<option value="' + list[i].coach_num + '">' + list[i].coach_name + '</option>');
					}
				}
				html.push('</select>');
				layer.open({
					type: 1,
					skin: 'layui-layer-rim', //加上边框
					title: '选择',
					area: ['350px', '150px'], //宽高
					content: html.join(''),
					btn: ['选择', '取消'],
					yes: function() {
						$("#objectName").val($("#select").find("option:selected").text());
						$("#objenum").val($("#select").val());
						if ($("#select").val() == "") {
							layer.msg("请选择教练员");
						} else {
							layer.closeAll();
						}
					},
					btn2: function() {
						layer.closeAll();
					}
				});
			} else {
				layer.msg(data.retMsg);
			}
		}
	});
});
$("#myCorp").on('click', function() {
	var html = [];
	html.push('<select name="modules" id="select">');
	html.push('<option value="">选择驾培机构</option>');
	//投诉对象为驾培机构
	if ($("#comType").val() != "1") {
		html.push('</select>');
		layer.open({
			type: 1,
			skin: 'layui-layer-rim', //加上边框
			title: '选择',
			area: ['350px', '150px'], //宽高
			content: html.join(''),
			btn: ['选择', '取消'],
			yes: function() {
				layer.closeAll();
			},
			btn2: function() {
				layer.closeAll();
			}
		});
		return false;
	}
	$.ajax({
		type: "post",
		url: "/student/trainCorpList",
		data: {
			idCard: $("#idCard").val()
		},
		dataType: "json",
		async: false,
		success: function(data) {
			if (data.retCode == 1) {
				var list = data.data.corpList;
				for (var i = 0; i < list.length; i++) {
					if (list[i].corp_name != "") {
						html.push('<option value="' + list[i].ins_code + '">' + list[i].corp_name + '</option>');
					};
				}
				html.push('</select>');
				layer.open({
					type: 1,
					skin: 'layui-layer-rim', //加上边框
					title: '选择',
					area: ['350px', '150px'], //宽高
					content: html.join(''),
					btn: ['选择', '取消'],
					yes: function() {
						$("#objectName").val($("#select").find("option:selected").text());
						$("#objenum").val($("#select").val());
						if ($("#select").val() == "") {
							layer.msg("请选择驾培机构");
						} else {

							layer.closeAll();
						}
					},
					btn2: function() {
						layer.closeAll();
					}
				});
			} else {
				layer.msg(data.retMsg);
			}
		}
	});
});

layui.use(['table', 'layer'], function() {
	var layer = layui.layer;
	var ctx = '';
	$("#exitBtn").click(function() {
		layer.confirm('你确定要退出登录？', {
			btn: ['确定', '取消']
			//按钮
		}, function() {
			$.cookie('testcookie',null);
			window.location.href = "../../../Index.html";
			/*
			$.ajax({
				url: ctx + '/logout',
				type: "post",
				dataType: "json",
				success: function(data) {
					window.location.href = ctx + '/index.html';
				}
			});
			*/
		}, function() {});
	});
});
