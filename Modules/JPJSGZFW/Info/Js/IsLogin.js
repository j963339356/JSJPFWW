	//确认是否已登录
	function checkLogin(){
		if (!$.trim($.cookie('name'))&&!$.trim($.cookie('token'))){// 
			addLoginButton();
			$('.login_in').css("display","block");
			$('.login_already').css("display","none");
		}else{
			$('.login_in').css("display","none");
			$('.login_already').css("display","block");
		}
	}
	//是否注销
	function inValidate(){
		layer.confirm('确认要重启吗？', {
	        btn : [ '确定', '取消' ]//按钮
	    }, function(index) {
	        layer.close(index);//index为此弹出框
	        //此处请求后台程序，下方是成功后的前台处理……
	        $.cookie('name', '');
			$.cookie('token', '');
			checkLogin();
			addLoginButton();
	        }); 
	}
	//将登录模块插入html页面
	function addLoginButton(){
		var uhtml = '<div class="The-login"><a href="Modules/JPJSGZFW/Student/StudentLogin.html">学员服务</a></div>'+
					'<div class="The-login"><a href="#">驾校服务</a></div>'+
					'<div class="The-login"><a href="#">管理部门登录</a></div>';
		$('.login_in').html(uhtml);
	}
