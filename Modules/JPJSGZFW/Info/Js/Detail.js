	var theRequestParam ;//url数据存储对象
	var serviceCode = "00000110001";//服务编号
	var currentNode;
	$(function(){
		//取得新闻分类编号和新闻编号
		checkLogin();
		var url = location.search; //获取url中"?"符后的字串  
		theRequestParam = new Object();  
		if (url.indexOf("?") != -1) {  
			var str = url.substr(1);//newsTypeId=zcfg2312&newsId=10034
			strs = str.split("&");  
			for(var i = 0; i < strs.length; i ++) {  
				theRequestParam[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
			}  
  		}   
  		//console.log(theRequestParam);
  		currentNode = theRequestParam.node;
  		
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
	
	$(function(){
  		//获取指定页面数据
		loadData();
	});	
	//加载页面指定数据
	function loadData(){
		var fenLeiID = theRequestParam.FenLeiID;
		var id = theRequestParam.Id;
		//console.log(theRequestParam);
		var param = {
	        "page": 1,
	        "rows": 10,
	        "data": {
	            "Id": id,
	            "GuanJianZi": ""
	        }
	    };
	    CwHelper.Ajax(serviceCode,param,function(result){
	    	//console.log(result);
	    	var dataArr = result.body.items;
	    	//console.log(dataArr);
	    	var neiRong = "";
        	//列表初始化  
			$(dataArr).each(function(){
				var fbsj = !this.FaBuShiJian?"无发布时间":this.FaBuShiJian.split("T")[0];
				//neiRong+="<h1>"+this.BiaoTi+"</h1><div class='biaozhu'><span >文章来源："+this.LaiYuan+"</span><span >发文日期："+fbsj+"</span></div><div class='zhengwen'><p>"+this.NeiRong+"</p></div>";
				$('.details-in').append( "<h1>"+this.BiaoTi+"</h1><div class='biaozhu'><span >文章来源："+(!this.LaiYuan?"无文章来源":this.LaiYuan)+"</span><span >发文日期："+fbsj+"</span></div><div class='zhengwen'><p>"+this.NeiRong+"</p></div>" );
			});
			//$('.details-in').html(neiRong);
		},false);
	    	
	}
	
