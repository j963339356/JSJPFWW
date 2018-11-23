
// 导航栏下拉列表
var ctx = '';
$(function(){
	var currentNode=1;
	$("#nav_content>li").each(function(index){
		if((index+1)==currentNode){
			$(this).addClass("current");
		}else{
			$(this).removeClass("current");
		}
	});
});
$(function(){	
	$('#nav_content>li').hover(function(e) {
        $(this).children('ul').stop().slideToggle();
    });
});


// 获取cookie值
var name = $.cookie('name');
var token = $.cookie('token');
// var name = "张三";
// var token = "666";

console.log((name!='undefined' && token !='undefined'));
if ((name!='undefined' && token !='undefined')&&(name!='' && token !='')){
    document.writeln("<!DOCTYPE html>");
    document.writeln("<html lang=\'en\'>");
    document.writeln("<head>");
    document.writeln("    <meta charset=\'UTF-8\'>");
    document.writeln("    <title>广东省驾驶培训公众服务网</title>");
    document.writeln("");
    document.writeln("</head>");
    document.writeln("<body>");
    document.writeln("    <div class=\'nav\'>");
    document.writeln("        <div class=\'nav_in\'>");
    document.writeln("            <h1><img src=\'../../../StaticResource/Theme2/Img/bg.png\' alt=\'\'></h1>");
    document.writeln("            <div class=\'mz\'>");
    document.writeln("                <p>广东省驾驶培训公众服务网</p>");
    document.writeln("                <p>Guangdong driving and training public service network</p>");
    document.writeln("            </div>");
    document.writeln("            <div class=\'nhhy\'>");
    document.writeln("                欢迎您：<span id=\'user_name\' style=\'color:#F00\'></span>");
    document.writeln("                <button id=\'exitBtn\'>退出登录</button>");
    document.writeln("            </div>");
    document.writeln("        </div>");
    document.writeln("    ");
    document.writeln("    <div class=\'nav_b\'>");
    document.writeln("    	<ul id=\'nav_content\'>");
    document.writeln("    		<li class=\'current\'><a href=\'/index.html\'>首页</a></li>");
    document.writeln("    		<li><a href=\'/Modules/JPJSGZFW/Info/Statute.html.html\'>政策法规</a></li>");
    document.writeln("    		<li><a href=\'\'>驾校信息公开</a>");
    document.writeln("    			<ul class=\'lst\'>  ");
    document.writeln("					<li><a href=\'/Modules/JPJSGZFW/Institutions/ServiceNavigation.html\'>服务导航</a></li>");
    document.writeln("					<li><a href=\'/Modules/JPJSGZFW/Institutions/Institutions.html\'>驾校查询</a></li>");
    document.writeln("					<li><a href=\'/Modules/JPJSGZFW/Institutions/Coaches.htmll\'>教练员查询</a></li>");
    document.writeln("					<li><a href=\'/Modules/JPJSGZFW/Institutions/CoachCar.html\'>教练车查询</a></li>");
    document.writeln("    			</ul>    			");
    document.writeln("    		</li>	");
    document.writeln("    		<li><a href=\'/Modules/JPJSGZFW/Info/News.html\'>通知公告</a></li>");
    document.writeln("    		<li><a href=\'/Modules/JPJSGZFW/Info/BusinessGuide.html\'>业务指南</a></li>");
    document.writeln("    	</ul>");
    document.writeln("    </div>");
    document.writeln("</div>");
    document.writeln("");
    document.writeln("</body>");
    document.writeln("</html>");
   
}else{
document.writeln("<!DOCTYPE html>");
document.writeln("<html lang=\'en\'>");
document.writeln("<head>");
document.writeln("    <meta charset=\'UTF-8\'>");
document.writeln("    <title>广东省驾驶培训公众服务网</title>");
document.writeln("");
document.writeln("</head>");
document.writeln("<body>");
document.writeln("<div class=\'nav\'>");
document.writeln("	<div class=\'nav_in\'>");
document.writeln("        <h1><img src=\'../../../StaticResource/Theme2/Img/bg.png\' alt=\'\'></h1>");
document.writeln("        <div class=\'mz\'>");
document.writeln("            <p>广东省驾驶培训公众服务网</p>");
document.writeln("            <p>Guangdong driving and training public service network</p>");
document.writeln("        </div>        ");
document.writeln("        <div class=\'login_in\'>");
document.writeln("            <div class=\'The-login\'><a href=\'./StudentLogin.html\'>学员服务</a></div>");
document.writeln("            <div class=\'The-login\'><a href=\'/corp.html\'>驾校服务</a></div>");
document.writeln("            <div class=\'The-login\'><a href=\'/gdjpmis\'>管理部门登录</a></div>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <div class=\'nav_b\'>");
document.writeln("    	<ul id=\'nav_content\'>");
document.writeln("    		<li class=\'current\'><a href=\'/index.html\'>首页</a></li>");
document.writeln("    		<li><a href=\'/Modules/JPJSGZFW/Info/Statute.html.html\'>政策法规</a></li>");
document.writeln("    		<li><a href=\'\'>驾校信息公开</a>");
document.writeln("    			<ul class=\'lst\'>  ");
document.writeln("					<li><a href=\'/Modules/JPJSGZFW/Institutions/ServiceNavigation.html\'>服务导航</a></li>");
document.writeln("					<li><a href=\'/Modules/JPJSGZFW/Institutions/Institutions.html\'>驾校查询</a></li>");
document.writeln("					<li><a href=\'/Modules/JPJSGZFW/Institutions/Coaches.htmll\'>教练员查询</a></li>");
document.writeln("					<li><a href=\'/Modules/JPJSGZFW/Institutions/CoachCar.html\'>教练车查询</a></li>");
document.writeln("    			</ul>    			");
document.writeln("    		</li>	");
document.writeln("    		<li><a href=\'/Modules/JPJSGZFW/Info/News.html\'>通知公告</a></li>");
document.writeln("    		<li><a href=\'/Modules/JPJSGZFW/Info/BusinessGuide.html\'>业务指南</a></li>");
document.writeln("    	</ul>");
document.writeln("    </div>");
document.writeln("</div>");
document.writeln("");
document.writeln("</body>");
document.writeln("</html>");

}

