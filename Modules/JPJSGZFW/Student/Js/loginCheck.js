$(function(){
	//登录事件
	$("#login").click(function(){
	    if(checkLogin()){
        //给json对象添加新的属性并赋值
          params= {
			id_card:$("#identity").val(),
        password:$("#passwordLogin").val(),
        user_type:"1"          
	};
	
	CwHelper.Ajax("004300100001",params,function(data){
		console.log(data);
		console.log(data.publicresponse.statuscode);
		
		if (data.publicresponse.statuscode=="0"){
			// 设置token
			CwHelper1.SetToken(data.body.token,data.body.id_card,data.body.name,$("#passwordLogin").val());	
		   window.location.href = "./StudentInfo.html";
		}else{
			if(data.publicresponse.message=="密码不正确"){
				toMessage("密码不正确！","error",3000);
				return;
			}else{
				toMessage("不存在该账号!","error",3000);
			}
		}
		
	},false)
 
	}
	});
	
});
function checkLogin(){
     	//登录事件
		if($("#identity").val() == null || $("#identity").val() == ""){
                         $("#identity").css('borderColor','red');
                   toMessage("证件号不能为空！","error",3000);
			$("#identity").focus();
			return false;
		}
		if($("#passwordLogin").val() == null || $("#passwordLogin").val() == ""){
                   toMessage("密码不能为空！","error",3000);
			$("#passwordLogin").focus();
			return false;
		}
         return true;

}