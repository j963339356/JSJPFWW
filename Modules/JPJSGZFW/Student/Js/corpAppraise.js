$(function() {
	var perAppr = $("#overall").val();
	for (perAppr; perAppr <= 5; perAppr++) {
		$(".jianjie_b .xingxing li:nth-of-type(" + perAppr + ")").css({
			background: "url(../../../StaticResource/Theme2/Img/star.png) no-repeat"
		});
	}
	$("#comRest").click(function() {
		$("#objectName").val("");
		$("#objenum").val("");
		$("#content").val("");
	});
	$("#appraiseBtn").click(function() {
		if ($("#appraise_content").val() == "") {
			layer.msg('请填写评价内容');
			return;
		}
		var star = $("#star ul li[class=on]").length;
		if (star == 0) {
			layer.msg('请选择评价星级');
			return;
		}
		var params = {
			appraiseContent: $("#appraise_content").val(),
			star: star,
			stunum: $("#stunum").val(),
			apprType: 2,
			objectnum: $("#objectnum").val(),
			trainPart: $("#trainPhase").val(),
			trainTeachId: $("#trainTeachId").val()
		};
		$.ajax({
			type: "post",
			url: "/student/saveAppraise",
			data: params,
			dataType: "json",
			success: function(data) {
				if (data.retCode == 1) {
					layer.msg(data.retMsg);
					window.location.href = ctx + "/student_user.html?type=appr";
				} else {
					layer.alert(data.retMsg);
				}
			}
		});
	});
});

var ctx = '';
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
layui.use(['table', 'layer'], function() {
	var layer = layui.layer;
	var ctx = '';
	$("#exitBtn").click(function() {
		layer.confirm('你确定要退出登录？', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			$.ajax({
				url: ctx + '/logout',
				type: "post",
				dataType: "json",
				success: function(data) {
					window.location.href = ctx + '/index.html';
				}
			});
		}, function() {});
	});
});

$(function() {

	var oStar = document.getElementById("star");
	var aLi = oStar.getElementsByTagName("li");
	var oUl = oStar.getElementsByTagName("ul")[0];
	var oSpan = oStar.getElementsByTagName("span")[1];
	var oP = oStar.getElementsByTagName("p")[0];
	var i = iScore = iStar = 0;
	var aMsg = ["很不满意|很不满意", "不满意|不满意", "一般|一般", "满意|满意", "非常满意|非常满意"];

	for (i = 1; i <= aLi.length; i++) {
		aLi[i - 1].index = i;
		//鼠标移过显示分数
		aLi[i - 1].onmouseover = function() {
			fnPoint(this.index);
			//浮动层显示
			oP.style.display = "block";
			//计算浮动层位置
			oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
			//匹配浮动层文字内容
			//oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
		};
		//鼠标离开后恢复上次评分
		aLi[i - 1].onmouseout = function() {
			fnPoint();
			//关闭浮动层
			oP.style.display = "none";
		};
		//点击后进行评分处理
		aLi[i - 1].onclick = function() {
			iStar = this.index;
			oP.style.display = "none";
			oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")";
		};
	}
	//评分处理
	function fnPoint(iArg) {
		//分数赋值
		iScore = iArg || iStar;
		for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";
	}
});

$(function() {
	$('.xingxing .button').click(function(e) {
		//获取用户信息；
		var user = $('.zixun_in').val();
		user = $.trim(user);

		if (user == '') {
			alert('亲，内容都没有发啥呢！');
		} else {
			//创建节点；
			var tag = $('<li>' + user + '</li>');
			$('#jiedian').prepend(tag);
			$('#jiedian li:first').hide().slideDown();
			$('.zixun_in').val('');
		}
	});
	$('#basic').click(function(e) {
		//跳转到个人信息
		window.location.href = 'StudentInfo.html';
	});
	$('#train').click(function(e) {
		//跳转到我的培训
		window.location.href = 'BusinessTransact.html?type=train';
	});
	$('#complain').click(function(e) {
		//跳转到我要投诉
		window.location.href = 'BusinessTransact.html?type=comp';
	});
	$('#appraise').click(function(e) {
		//跳转到我要评价
		window.location.href = 'BusinessTransact.html?type=appr';
	});
});
