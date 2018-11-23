	var count ;// li子节点集合大小，即总记录数
	var ONE_PAGE_COUNT = 8;// 页面大小
	var totalPage = parseInt(count / ONE_PAGE_COUNT) + ((count % ONE_PAGE_COUNT) == 0? 0 : 1);// 总页数
	var currPage = 1;// 初始化页数
	var serviceCode = "00000110003";//服务编号
	var fenLeiId = "762E3E8F-CB06-409E-B3D4-4A5AEB2930E9";//分类id
	var currentNode=4;
//给导航栏的第一个li节点添加current的class
	$(function(){
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
	//加载页面数据
	$(function(){
		loadData();
		// 注册点击函数     
	    $("#first_page").click(homePage);
	    $("#backforward").click(prevPage);
	    $("#forward").click(nexePage);
	    $("#last_page").click(lastPage);
	    $("#change_page").click(goToPage);  
	});
		function loadData(){
		var param = {
	    	"page": currPage,
	        "rows": ONE_PAGE_COUNT,
	        "data": {
	            "FenLeiID": fenLeiId,
	            "GuanJianZi": ""
	        }
	   };
	    CwHelper.Ajax(serviceCode,param,function(result){
	    		console.log(result);
	    		var dataArr = result.body.items;
            	var ulhtml = "";			    
            	$(dataArr).each(function (index, domEle){//索引和this
            		var fbsj = this.FaBuShiJian.split("T")[0];
            		ulhtml +='<li><a href="Detail.html?FenLeiID='+this.FenLeiID+'&Id='+this.Id+'&node='+currentNode+'">'+this.BiaoTi+'</a><span>'+fbsj+'</span></li>' ;
            	});
            	if(dataArr.length<17){
            		for (var k=ONE_PAGE_COUNT;k<=17;k++){//加多几个站位
            			ulhtml += '<li style="background: none;"><a href="#">&nbsp;<span>&nbsp;</span></a></li>';
               		}
            	}
            	//console.log(ulhtml);
            	$('#notice_ul').html(ulhtml);
            	count = result.body.totalcount;
			    totalPage = parseInt(count / ONE_PAGE_COUNT + ((count % ONE_PAGE_COUNT) == 0? 0 : 1)); //总页数
			    //alert(totalPage);
			    setUICount(count);//更新总记录数
			    setUIPages(totalPage);//更新总页数
			    setUICurrPage(currPage);//更新当前页
	        
	    },false);
	};

	// 设置总记录数 
	function setUICount(count) {
	    if (count == undefined)
	        count = 0;
	    //$("#cp-count").text(count); 无此页面元素
	}
	// 设置总页数
	function setUIPages(totalPage) {
	    totalPage = parseInt(Math.max(1, totalPage));//防止总页数为0
	    $("#totalPages").text(totalPage)
	}
	
	// 更新当前页数
	function setUICurrPage(currPage) {
	    currPage = Math.max(1, currPage);//最小页数为1
	    $("#pageIndex").text(currPage);//page
	    $("#page").text(currPage);
	}
	
	//首页
	function homePage() {
	    currPage = 1;
	    loadData(currPage);//显示当前页数数据
	    setUICurrPage(currPage);//更新当前页
	}
	//下一页
	function nexePage() {
	    var last = currPage;
	    if (last >= totalPage)
	    {
	    	layer.msg("已经是最后一页了",{time:1000});
	        return;
	    }
	    loadData(++currPage);//显示下一页数据
	    setUICurrPage(currPage);//更新当前页
	}
	//前一页
	function prevPage() {
	    var prev = currPage;
	    if (prev <= 1) 
    	{
    		layer.msg("已经是第一页了",{time:1000});
        	return;
    	}
	    loadData(--currPage);//显示上一页
	    setUICurrPage(currPage);//更新当前页
	}
	//尾页
	function lastPage() {
	    currPage = totalPage;
	    loadData(currPage);//显示尾页
	    setUICurrPage(currPage);//更新当前页
	}
	//跳转到某页
	function goToPage() {
	    var target = $("#page_num").val();//取得输入框的值
	   // alert(target);
	    if (isEmpty(target)|| target == currPage)
	    {
	    	layer.msg("请输入需要跳转的页数",{time:1000});
	    	target = currPage;
	    	return ;
	    }
	    target = Math.max(1, Math.min(totalPage, target));//取得合法页数
	    currPage = target;   
	    loadData(target);//显示当前页
	    setUICurrPage(currPage);//更新当前页
	    $("#page_num").val("");//将输入框设空
	}
//判断某个字符串是否存在
	function isEmpty(a){
		if($.trim(a) == "" || a == null || a == undefined){ // "",null,undefined
       		return true;
    	}
	}