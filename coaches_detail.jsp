<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>教练员详细页</title>
<script type="text/javascript" src="${ctx}/js/jquery-1.8.2.min.js"></script>
<link rel="stylesheet" href="css/style.css" type="text/css">
</head>
<body>
<!--头部-->
<input id="overall" value="${perAppr }" type="hidden">
<header>
	<jsp:include page="header.jsp">
		<jsp:param value="3" name="currentNode"/>
	</jsp:include>
</header>
<!--头部-->
<div class="driver-details">
	<div class="driver_in">
    	<div class="driver_t">
        	<p><a href="${ctx}/index.html">首页</a>><a href="${ctx}/coaches.html">教练员查询</a>><a href="">教练员详情</a></p>
        </div>
    </div>
	<div class="problem_l">
        <div class="jianjie">
            <div class="jianjie_b">
            	<div class="img">
                    <img id="photofile" style="height: 220px;width: 180px;" src="${ctx}/ftpphotohpr/getFtpPhoto?pid=${record.photo}">
                </div>
                <ul>
                	<li><span>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</span>${record.coach_name }</li>
                	<li><span>性&nbsp;&nbsp;&nbsp;&nbsp;别：</span>${record.sex_name }</li>
                	<li><span>所属驾校：</span>${record.corp_name }</li>
                	<li><span>教&nbsp;&nbsp;&nbsp;&nbsp;龄：</span>${record.coach_age }</li>
                	<li><span>准教车型：</span>${record.dripermitted }</li>
                	<li><span>职业资格证号：</span>${record.occupation_no }</li>
                	<li><span>职业资格等级：</span>${record.level_name }</li>
                	<li>
                		<div class="xingxing">
                			<span>服务评价：</span>
		                    <ul>
		                    	<li></li>
		                    	<li></li>
		                    	<li></li>
		                    	<li></li>
		                    	<li></li>
		                    </ul>
                		</div>
                	</li>
                </ul>
            </div>
        </div>
        <div class="details-in">
	    	<div class="tab">
	        	<span class="tab-currtent">从业经历</span>
	        	<span>学员评价</span>
	        </div>
	        <ul>
	        	<li>
	            	<!-- <p class="p1">分校简介</p> -->
	                <div class="fenxiao cyjl">
	                	<table>
	                        <tbody>
	                        	<tr>
	                                <th>序号</th>
	                                <th>任职驾培机构名称</th>
	                                <th>省份</th>
	                                <th>市级</th>
	                                <th>区县</th>
	                                <th>供职状态</th>
	                                <th>入职日期</th>
	                                <th>离职日期</th>
	                                <th>任职时长</th>
	                            </tr>
	                            <c:forEach items="${workList }" var="work" varStatus="status">
		                            <tr>
		                                <td>${status.count }</td>
		                                <td>${work.corp_name }</td>
		                                <td>${work.province }</td>
		                                <td>${work.area }</td>
		                                <td>${work.city }</td>
		                                <td>${work.status_cn }</td>
		                                <td>${work.hire_date}</td>
		                                <td>${work.leave_date}</td>
		                                <td>${work.coach_age }</td>
		                            </tr>
	                            </c:forEach>
	                        </tbody>
	                    </table>
	                </div>
	            </li>
	            <li style="display:none">
	            	<div class="fenxiao cyjl">
            			<table>
	                        <tbody>
	                        	<tr>
	                                <th>序号</th>
	                                <th>学员姓名</th>
	                                <th>任职驾培机构名称</th>
	                                <th>培训部分</th>
	                                <th>评价用语</th>
	                                <th>满意度</th>
	                                <th>评价时间</th>   
	                            </tr>
	                            <c:forEach items="${apprList }" var="appr" varStatus="status">
		                            <tr>
		                                <td>${status.count }</td>
		                                <td>${appr.student_name }</td>
		                                <td>${appr.corp_name }</td>
		                                <td>${appr.part_cn }</td>
		                                <td>${appr.teach_level }</td>
		                                <td>${appr.overall_cn }</td>
		                                <td>${appr.evaluate_time }</td>
		                            </tr>
	                            </c:forEach>
	                        </tbody>
	                    </table>
        			</div>
	            </li>
	        </ul>
   		</div>
        
    </div>
</div>
<script src="js/ma.js"></script>
<script>
$(function(){	
	
	$('.tab span').click(function(e) {
		var index=$(this).index();
        $(this).addClass('tab-currtent').siblings().removeClass('tab-currtent');
		$('.details-in ul li').eq(index).show().siblings().hide();
    });
	//服务评价星级
	var perAppr=$("#overall").val();
	for(perAppr;5>=perAppr;perAppr++){
		$(".jianjie_b .xingxing li:nth-of-type("+perAppr+")").css({background:"url(${ctx}/images/star.png) no-repeat"});
	}
});
</script>
<!--底部-->
<footer>
	<%@ include file="footer.jsp" %>
</footer>
<!--底部-->
</body>
</html>