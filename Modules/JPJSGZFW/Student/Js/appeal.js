function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
if (GetQueryString("isAppeal") == 0) {
	$("#buttons").html("<button id='sure' style='background:#1ad4c3'>去评价</button><button id='cancel'>返回</button>");
} else {
	$("#buttons").html("<button id='sure' style='background:#1ad4c3;display:none'>去评价</button><button id='cancel'>返回</button>");
}
var layer;
layui.use(['layer'], function() {
	layer = layui.layer;
});

$('#sure').click(function() {
	var coachNum = $("#coachNum").val();
	var id = $("#appealId").val();
	var trainPhase = $("#trainPhase").val();
	var stuNum = $("#stunum").val();
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
	window.open("CoachAppraise.html?coachNum=" + coachNum + "&id=" + id + "&trainPhase=" + trainPhase + "&stunum=" +
		stuNum);

});
$('#cancel').click(function() {
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
});
