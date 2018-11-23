$(function(){
var id_card = $.cookie('passwordLogin'); 
params= {
  id_card:$.cookie('id_card'),
    password:$.cookie('passwordLogin'),
    user_type:"1"          
};
console.log($.cookie('id_card'));
console.log($.cookie('name'));
CwHelper.Ajax("004300100001",params,function(params){
                   console.log(params);
// 基础信息
document.getElementById("id").innerHTML=params.body.stunum
document.getElementById("user_name").innerHTML=params.body.name
document.getElementById("user_name1").innerHTML=params.body.name
document.getElementById("phone").innerHTML=params.body.phone
document.getElementById("id_card").innerHTML=params.body.id_card
document.getElementById("user_city").innerHTML=params.body.home_address
document.getElementById("user_status").innerHTML=params.body.status
if(params.body.status=="0"){
document.getElementById("user_status").innerHTML="未结业";
}else{
document.getElementById("user_status").innerHTML="已结业";}

if(params.body.sex=="1"){
document.getElementById("user_sex").innerHTML="男";
}else{
document.getElementById("user_sex").innerHTML="女";}

// 报名信息
document.getElementById("apply_date").innerHTML=params.body.apply_date
document.getElementById("train_type").innerHTML=params.body.train_type
			   },false)
});

  $("#exitBtn").click(function() {
    layer.confirm('你确定要退出登录？', {
      btn : [ '确定', '取消' ]
    //按钮
    }, function() {
          CwHelper1.Logout();
          window.location.href = '/index.html';
       
    }, function() {
    });
  });

