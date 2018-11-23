$(function(){
	createMenu();
	$('#loginOut').click(function(){
		layer.confirm('您确定要退出系统？', {
			title : ['温馨提示' , true],
		    btn: ['确定','取消'] 
		}, function(){
			ajaxQuest(ctx+'/loginOut');
			window.location.href = ctx + '/login.html'; 	
		});
	});	
});
function createMenu(){
	//layer.msg('加载中', {icon: 16,offset: 0,time:0,shade: [0.3, '#000']});
	$('#leftMenu').empty();
	window.menuPowers = {};
	$.ajax({
		type: 'GET',
		url: ctx + '/menu/getMenuData',
		async: true,
		dataType: "json",
		success: function(data){
			var html = '';
			html += '<li style="display:none"> <a data-href="welcome.html" href="welcome.html"> <span>欢迎页</span> </a> </li>';	
			
			if (data.length>0){				
				for(var i=0; i<data.length; i++){  
					var children = data[i].children;				
					html += '<li class="menu"> <a data-href="#" href="javascript:void(0);" class="tit"><i class="fa '+data[i].funcImg+'"></i><span>'+data[i].funcName+'</span> </a>';
			
					
					html += '<ul class="submenu" style="display:none">';				
					for (var j=0;j<children.length; j++){
						
						html += '<li> <a data-menu="' + children[j].funcId + '" data-href="'+children[j].funcHref+'" href="javascript:void(0);"> <i class="fa fa-angle-right"></i><span>'+children[j].funcName+'</span> </a> </li>';
						var btns = children[j].btns;
						if(btns && btns.length > 0){
							window.menuPowers['p' + children[j].funcId] = btns;
						}
					}
					html += '</ul>';
					html += '</li>';
				}
			}else{
				html += '<li class="menu"> <a data-href="#" href="javascript:void(0);" class="tit"><i class="fa"></i><span></span> </a>';
				html += '<ul class="submenu" style="display:none">';
				html += '<li style="display:none"> <a data-href="welcome.html" href="welcome.html"> <span>欢迎页</span> </a> </li>';
				html += '</ul>';
				html += '</li>';
			}
			$('#leftMenu').html(html);
			navScroll();			
			iframe();			
		},
		failure:function (result) {  
            alert('加载菜单失败!');
		},
		error : function() {
			top.closeLayer(index);
			alert("非法请求或登录已超时","error",2000);
		},
		timeout : function() {
			top.closeLayer(index);
			alert("请求超时,请联系管理员","error",2000);
		}		
	});	
}

function loading(msg){
	return layer.msg(msg, {icon: 16,time:0,shade: [0.3, '#000']});
}

function closelayer(loading){
	layer.close(loading);
}
function openRbDialog(msg){
	layer.open({
		  type: 1,
		  title: '系统提示',
		  closeBtn: [1 , true], //不显示关闭按钮
		  shade: [0],
		  area: ['340px', '215px'],
		  offset: 'rb', //右下角弹出
		  time: 5000, //5秒后自动关闭
		  anim: 1,
		  content: msg,//['test/guodu.html', 'no'], //iframe的url，no代表不显示滚动条
		  end: function(){ //此处用于演示
		  }
	});
}

//正上方提示信息改为中间提示消息
function topMsg(msg){
	layer.msg(msg,{
		offset:18
	});
}
function centerMsg(msg){
	layer.msg(msg);
}
function tips(msg, obj){
	layer.tips(msg, obj, { tips: 3});
}
function confirm(msg, callback){
	layer.confirm(msg, {
		btn: ['确认','取消'] //按钮
	}, function(index){			
		callback();
		layer.close(index); 
	}, function(){
	});
}
function openDialog(content){
	layer.open({
		type: 1,
		//skin: 'layui-layer-molv', //layui-layer-demo layui-layer-lan  layui-layer-molv
		title: '温馨提示',
		shadeClose: false,
		shade: [0.3, '#000'],
		btn: ['确定'],
		area: ['500px', '220px'],
		content: content,
		end: function(){ 
	  	},
	  	yes: function(index){ 
	        layer.close(index);      
	    }
	});	
}
function openBtnUrl(title, url, width, height){
	layer.open({
		type: 2,
		//skin: 'layui-layer-demo',
		title: title,
		shadeClose: false,
		shade: [0.3, '#000'],
		btn: ['确定', '取消'],
		area: [width, height],
		content: url,
		end: function(){ 
	  	},
	  	yes: function(index){ 
	  		layer.close(index); 	             
	    }
	});	
}
function openSelectBox(title, url, callback){
	layer.open({
	    type: 2,
	    title: title,
	    shadeClose: false,
	    shade: 0.2,
	    area: ['900px', '460px'],
	    btn: ['选择', '取消'],
	    content: url,
	    yes: function(index){
			if (callback){
				callback(index);
			}
	    }
	});
}
function openSelectBox(title, url, callback){
	layer.open({
	    type: 2,
	    title: title,
	    shadeClose: false,
	    shade: 0.2,
	    area: ['900px', '460px'],
	    btn: ['选择', '取消'],
	    content: url,
	    yes: function(index){
			if (callback){
				callback(index);
			}
	    }
	});
}
function openSelectBoxEx(title, url, w, h, callback){
	layer.open({
	    type: 2,
	    title: title,
	    shadeClose: false,
	    shade: 0.2,
	    area: [w, h],
	    btn: ['选择', '取消'],
	    content: url,
	    yes: function(index){
			if (callback){
				callback(index);
			}
	    }
	});
}
function openUrl(title, url, width, height){
	layer.open({
		type: 2,
		//skin: 'layui-layer-demo',
		title: title,
		shadeClose: false,
		shade: [0.3, '#000'],
		area: [width, height],		
		content: url,
		end: function(){ 
	  	},
	  	yes: function(index){ 
	        layer.close(index);      
	      }
	});	
}
function openUrlEvent(title, url, width, height, callback){
	layer.open({
		type: 2,
		//skin: 'layui-layer-demo',
		title: title,
		shadeClose: false,
		shade: [0.3, '#000'],
		area: [width, height],
		content: url,
		end: function(){ 
			callback();
	  	},
	  	yes: function(index){ 
	        layer.close(index);  
	    }
	});	
}
function ajaxQuest(url, data) {
	var ret;
	if (data == null){
		data = {};
	}
	try {
		$.ajax({
			url : url,
			data : data,
			type : "post",
			timeout:6000,
			dataType : 'json',
			async : false,
			success : function(e) {
				ret = e;
			},
			error : function() {
				alert("非法请求或登录已超时","error",2000);
			},
			timeout : function() {
				alert("请求超时,请联系管理员","error",2000);
			}
		});
	} catch (f) {
		alert("非法请求","error",2000);
	}
	return ret;
}

function ajaxEvent(url, data, callback) {
	try {
		$.ajax({
			url : url,
			data : data,
			type : "post",
			timeout: 600000,
			dataType : 'json',
			async : true,
			success : function(e) {
				callback(e);
			},
			error : function() {
				alert("非法请求或登录已超时","error",2000);
			},
			timeout : function() {
				alert("请求超时,请联系管理员","error",2000);
			}
		});
	} catch (f) {
		alert("非法请求","error",2000);
	} 	
}