var code ; //在全局定义验证码  
       
	   function createCode(){ 
		  code = "";  
		  var codeLength = 4;//验证码的长度  
		  var checkCode = document.getElementById("code");  
		  var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
		  'S','T','U','V','W','X','Y','Z');//随机数  
		  for(var i = 0; i < codeLength; i++) {//循环操作  
		   var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）  
		   code += random[index];//根据索引取得随机数加到code上  
		 }  
		 checkCode.value = code;//把code值赋给验证码  
	   } 
	   
	   $(function(){
	   //注册事件
	   $("#register").click(function(){
		   if(checkInput()){
			
			  body ={
				   user_name: $("#userName").val(),
				   id_card: $("#idCard").val(),
				   password : $("#password").val(),
				   email : $("#email").val(),
				   phone : $("#phone").val(),
				   user_type:"1"
			   }; 
	   
			   CwHelper.Ajax("004300100043",body,function(data){
				   console.log(data);
				   if(data.body==true){
					   alert("注册成功");
					   window.location.href ="./StudentLogin.html";
				   }else{
					   if(data.publicresponse.message=="已经存在该帐号信息;"){
						toMessage("已经存在该帐号信息!","error",3000);
						return;
					   }if(data.publicresponse.message=="不存在该学员员!"){
						toMessage("不存在该学员!","error",3000);
						return;
					   }  
					   else{
						toMessage("邮箱或者手机号码或已存在","error",3000);
					   }
					
				   }
			   },false)
			 
		   }
	   });
	   });
	   
	   
	   //校验输入的注册信息是否为空
	   function checkInput(){
	   if($("#userName").val() == null || $("#userName").val() == ""){
		   toMessage("姓名不能为空！","error",3000);
		   $("#userName").focus();
		   return false;
	   }
	   if($("#idCard").val() == null || $("#idCard").val() == ""){
		   toMessage("证件号不能为空！","error",3000);
		   $("#idCard").focus();
		   return false;
	   }
	   if($("#password").val() == null || $("#password").val() == ""){
		   toMessage("密码不能为空！","error",3000);
		   $("#password").focus();
		   return false;
	   }
	   if($("#againPass").val() == null || $("#againPass").val() == ""){
		   toMessage("确认密码不能为空！","error",3000);
		   $("#againPass").focus();
		   return false;
	   }else{
		   if($("#password").val() != $("#againPass").val()){
			   toMessage("两次输入的密码不一致！","error",3000);
			   $("#againPass").focus();
			   return false;
		   }
	   }
	   if($("#email").val() == null || $("#email").val() == ""){
		   toMessage("邮箱不能为空！","error",3000);
		   $("#email").focus();
		   return false;
	   }else{
		   if(!(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test($("#email").val()))){ 
			   toMessage("邮箱格式不正确！","error",3000);
			   $("#email").focus();
			   return false;
		   }
	   }
	   if($("#phone").val() == null || $("#phone").val() == ""){
		   toMessage("手机号码不能为空！","error",3000);
		   $("#phone").focus();
		   return false;
	   }else{
		   if(!(/^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/.test($("#phone").val()))){ 
			   toMessage("不是完整的11位手机号！","error",3000);
			   $("#phone").focus();
			   return false;
		   }
	   }
	   if($("#sendCode").val() == null || $("#sendCode").val() == ""){
		   toMessage("验证码不能为空！","error",3000);
		   $("#sendCode").focus();
		   return false;
	   }else{
			   
			 var inputCode = document.getElementById("sendCode").value.toUpperCase();
				if(inputCode != code ) {
				createCode();  //刷新验证码
				toMessage("验证码输入错误！","error",3000);  
				   return false;
		 }  
				
	   }
	   return true;
	   }
	
	   