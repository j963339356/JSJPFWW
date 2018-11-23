	var ONE_PAGE_COUNT = 9;// 页面大小
	var currPage = 1;// 初始化页数
	var seviceCode = "00000020005";//服务编码
	var currentNode=1;
//给导航栏的第一个li节点添加current的class
	$(function(){
		//向页面添加cookie
		$.cookie('name', 'a');
		$.cookie('token', 'a');
		//根据cookie判断用户是否已经登录
		checkLogin();
		$("#nav_content>li").each(function(index){
			if((index+1)==currentNode){//$(this)转化为Jquery对象
				$(this).addClass("current");
			}else{ 
				$(this).removeClass("current");
			}  
		});
	});
	//下拉框
	$(function(){
		$('#nav_content>li').hover(function(e) {
			$(this).children('ul').stop().slideToggle();
		});
	});
	
	$(function(){//; 
		//根据广东省获取市
		var param = {
	    	 "Province": "广东" 
	   };
	    CwHelper.Ajax(seviceCode,param,function(data){
	    	var data2 = data.body;
	    	//console.log(data2);
	    	for (var i=0;i<data2.length;i++) {
	    		$("#city").append("<option value='"+data2[i].Value+"'>"+data2[i].Key+"</option>");
	    		$("#coachCity").append("<option value='"+data2[i].Value+"'>"+data2[i].Key+"</option>");
	        	$("#carCity").append("<option value='"+data2[i].Value+"'>"+data2[i].Key+"</option>");
	    	}
	        
	    },false);

		//获取 通知公告/政策法规/业务指南 列表数据	
		loadData();
	});	
		function loadData(){
			var fenLeiId = "762E3E8F-CB06-409E-B3D4-4A5AEB2930E9";
			var ulhtml = "";
			var param = {
		    	"page": currPage,
		        "rows": ONE_PAGE_COUNT,
		        "data": {
		            "FenLeiID": fenLeiId,
		            "GuanJianZi": ""
		        }
		   };
		   //通知公告
		    CwHelper.Ajax("00000110003",param,function(result){
		    		//console.log(result);
		    		ulhtml = "";
	            	$(result.body.items).each(function (){    
	            		  var fbsj = this.FaBuShiJian.split("T")[0];
	            		  ulhtml += '<li><a href="Modules/JPJSGZFW/Info/Detail.html?FenLeiID='+this.FenLeiID+'&Id='+this.Id+'&node='+4+'">'+(this.BiaoTi.length>20?(this.BiaoTi.substring(0,20)+"..."):this.BiaoTi)+'</a><span>'+fbsj+'</span></li>';
	            		  
	            	});	
	            	$("#rule").html(ulhtml);
		    },false);
		    //政策法规
		    fenLeiId = "45BE948F-6D4A-4F7D-B4E0-92C7EF966DF6";
		    var param = {
		    	"page": currPage,
		        "rows": ONE_PAGE_COUNT,
		        "data": {
		            "FenLeiID": fenLeiId,
		            "GuanJianZi": ""
		        }
		   };
		    CwHelper.Ajax("00000110003",param,function(result){
		    		//console.log(result);	    
		    		var flag = false;
		    		var gateWay = CwHelper.Route("00000080004","1.0",CwHelper.SystemConfig.ServerAgent);
	            	$(result.body.items).each(function (){    
	            		var imgUrl = gateWay+"?id="+this.ZhuTiZhaoPian+"&guid="+CwHelper.NewGuid();
	        			//console.log(imgUrl);
	        			if(!flag){
	        				$('.header_l img').attr("src",imgUrl);
	        				$('.header_l a').attr("href",this.PageURL);
	        				flag = true;
	        			}
	            		  var fbsj = this.FaBuShiJian.split("T")[0];
	            		  $("#zcfg").append('<li><a href="Modules/JPJSGZFW/Info/Detail.html?FenLeiID='+this.FenLeiID+'&Id='+this.Id+'&node='+2+'">'+(this.BiaoTi.length>30?(this.BiaoTi.substring(0,30)+"..."):this.BiaoTi)+'</a><span>'+fbsj+'</span></li>');
	            	});

		    },false);
		    //业务指南
		    fenLeiId = "F6E61E66-20BF-419D-AE91-48C7E04195CE";
		    var param = {
		    	"page": currPage,
		        "rows": ONE_PAGE_COUNT,
		        "data": {
		            "FenLeiID": fenLeiId,
		            "GuanJianZi": ""
		        }
		   };
		    CwHelper.Ajax("00000110003",param,function(result){
	            	$(result.body.items).each(function (){    
	            		  var fbsj = this.FaBuShiJian.split("T")[0];
	            		  $("#read").append('<li><a href="Modules/JPJSGZFW/Info/Detail.html?FenLeiID='+this.FenLeiID+'&Id='+this.Id+'&node='+5+'">'+(this.BiaoTi.length>30?(this.BiaoTi.substring(0,30)+"..."):this.BiaoTi)+'</a><span>'+fbsj+'</span></li>');
	            	});
		        
		    },false);
		};
		//根据市区选择县区
		$('.xzsq').change(function(){
			//var value = $(this).find("select").val();  //获取选中的option的文本值
			var value = $(this).find("option:selected").text();
			//alert(value);
			if(value!=""){
				var selectObj = $(this).next().find("select");
				//console.log(selectObj);
				selectObj.html("<option value=''>请选择县区</option>");
				//根据市获取区
				var param = {
			    	  "City": value
			    };
			    CwHelper.Ajax("00000020006",param,function(result){
			    	//console.log(result);
			    	for(var i=0 ;i< result.body.length;i++){
			        		var data = result.body[i];
			        		selectObj.append("<option value='"+data.Value+"'>"+data.Key+"</option>");
			        }
			    },false);        
			}
		});
		//查询驾校信息
		$("#queryCorp").click(function(){
			var city=$("#city").find("option:selected").text();
			var county=$("#county").find("option:selected").text();
			var corp=$("#corp").val();
			//var data = '{"name":"'+carCorp+'"}';
			console.log(city+" "+county+" "+corp);
			if(city=="请选择市区" && county=="请选择县区" && corp==""){
				layer.msg("请至少选择或输入一个查询条件！");
				return;
			}
			location.href=encodeURI("Modules/JPJSGZFW/Institutions/Institutions.html?city="+city+"&county="+county+"&corp="+corp);
		});
		//查询教练员信息
		$("#queryCoach").click(function(){
			var city=$("#coachCity").find("option:selected").text();
			var county=$("#coachCounty").find("option:selected").text();
			var coachCorp=$("#coachCorp").val();
			var coach=$("#coach").val();
			//console.log(city+" "+county+" "+coachCorp+" "+coach);
			//var data = '{"name":"'+carCorp+'"}';
			if(city=="请选择市区" && county=="请选择县区" && coachCorp=="" && coach==""){
				layer.msg("请至少选择或输入一个查询条件！");
				return;
			}
			location.href=encodeURI("Modules/JPJSGZFW/Institutions/Coaches.html?city="+city+"&county="+county+"&coachCorp="+coachCorp+"&coach="+coach);
			//$("#queryCoachForm").submit();
		});
		//查询教练车信息
		$("#queryCoachCar").click(function(){
			var city=$("#carCity").find("option:selected").text();
			var county=$("#carCounty").find("option:selected").text();
			var carCorp=$("#carCorp").val();
			var licnum=$("#coachCar").val();
			//console.log(city+" "+county+" "+carCorp+" "+licnum);
			//var data = '{"ChePaiHaoid":"'+licnum+'"}';
			if(city=="" && county=="" && carCorp=="" && licnum==""){
				layer.msg("请至少选择或输入一个查询条件！");
				return;
			}
			location.href=encodeURI("Modules/JPJSGZFW/Institutions/CoachCar.html?city="+city+"&county="+county+"&carCorp="+carCorp+"&licnum="+licnum);
			//$("#queryCoachCarForm").submit();
		});
		
		$('.fenglei span').click(function(e) {
		    var index=$(this).index();
			$(this).addClass('span_in').siblings().removeClass('span_in');
			$('.xuanzhe ul li').eq(index).show().siblings().hide();
			
		});

