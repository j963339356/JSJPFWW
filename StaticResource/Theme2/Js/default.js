
//重新定度各模块宽度及其他定位方法
function autoResize(){
	var rWidth=$(".window").width();                   //右边iframe模块的宽度	
	var bdWidth=$(window).width();                     //屏幕总宽度
	var width=bdWidth-14;                              //减去边距后,content的宽度
	var tabWidth=rWidth-78;	                           //窗口减去左右箭头后的宽度
	var bdHeight=$(window).height();	               //屏幕总高度
	var topHeight=$(".topCon").height()-1;               //顶部模块高度，即除开ifrmae及左栏
	var Height=bdHeight-topHeight;                     //左右模块高度
	var navHeight=Height-44-8;	                       //左模块中，菜单模块的高度
	var framHeight=Height-44-8;                        //右模块中，菜单模块的高度	
	
	//$(".leftCon .nav").css("height",navHeight)
	$(".rightCon").css("height",Height)
	$(".window .tab").css("width",tabWidth)
	$(".rightCon .frameBox").css("height",framHeight)
	$(".leftCon .nav").height(navHeight);
	
	//对于左栏收缩按钮收缩前后进行位置重定位
	var n=parseInt($(".fl-arrow").css("left"));	
	var per=$(".leftCon").width()+7;	
	if(n>0){
		$(".fl-arrow").css("left",per)
	}
}

$(function(){
	$(window).width("100%")
})
//resize重新定义宽高
$(window).resize(function(){
	autoResize();	
	btnSize()  //按钮超长后收缩
})

//-----------------以下为框架核心JS
function iframe(){
//取得A连接将其导入主体内容位置
$(function(){	
	var len=$(".nav-list li a").length;  //取得导航当前A标签的总数	
	//给导航里的A都加上排序的CLASS
	for(i=0;i<len;i++){       
		var cl='qf'+(i+1);      
		$(".nav-list li a").eq(i).addClass(cl)   //给每个A标签加上排序的类
	}
	//左栏菜单点击事件
	$(".nav-list li .tit").click(function(){		
		$(this).toggleClass("open").parent().siblings(".menu").find(".tit").removeClass("open");
		$(this).next(".submenu").slideToggle("fast").parent().siblings(".menu").find(".submenu").slideUp("fast");
	})	
	$(".navMenu").click(function(){
		var angle = $(this).find(".angle");
		if(angle.hasClass("fa-angle-down")){
			$(this).parent().find(".submenu").slideDown("fast");
			angle.removeClass("fa-angle-down").addClass("fa-angle-up");
			$(this).parent().siblings(".menu").find(".angle").removeClass("fa-angle-up").addClass("fa-angle-down");
			$(this).parent().siblings(".menu").find(".submenu").slideUp("fast");
		}else{
			$(this).parent().find(".submenu").slideUp("fast");
			//angle.removeClass("fa-angle-up").addClass("fa-angle-down");
		}
	});
	$(".nav-list li a").click(function(){
		var n=$(this).attr("data-href");         //取得当前点击的链接地址	
		var menuId = $(this).attr("data-menu");
		var s=$(this).attr('class').split(/\s+/);
		var l=s.length-1;
		var index=s[0];	 //取得当前点击的A标签的标识class
		var nclass='.'+index;	//将当前类名拼成带点的CLASS
		var text=$(this).text();  //获取当前菜单名字
		if(n=="#"){      //判断是否有链接，有的话让链接失效，没有的话继续执行
			return true
		}else{
			var has=$(".rightCon .frameBox").hasClass(index);
			$(".nav-list li a").removeClass("active");
			$(this).parents(".menu").children("a").addClass("active");
			$(".nav-list a").removeClass("xz");
			$(this).addClass("xz");
			if(has){
				$(".rightCon").find(nclass).show().siblings(".frameBox").hide()   //如果页面已经被插入，就不再插入页面，而是让它显示并隐藏其他同类页面
				$(".window ul").find(nclass).addClass("current").siblings().removeClass("current")
				ani();	 //调用方法进行窗口滑动到可见位置			
			}else{
				$(".rightCon .bigCon").append('<div class="frameBox" id="Default"><iframe width="100%" height="100%" frameborder=0></iframe></div>')
				$(".window ul").append('<li><span></span><i>×</i></li>')    //插入一个窗口
				
				autoResize()  //重新适应屏幕宽高
				close()   //窗口关闭按钮效果
				//以上为插入新增链接
				var i=$(".rightCon .frameBox").length-1;	//取得当前page-content的总数-1	
				var sl=$(".window ul li").length-1;   //取得当前窗口数量并减1
				$(".window ul li").eq(sl).find("span").text(text);   //将点击菜单的名字附给窗口做为名字
				$(".window ul li").eq(sl).addClass(index)   //为该窗口添另一个对应排序的CLASS
				$(".window ul li").eq(sl).addClass("current").siblings().removeClass("current")   //为该窗口添一个当前显示的CLASS,其他窗口移除该类
				$(".rightCon").find(".frameBox").eq(i).addClass(index)  //给新增的page-content页面也加上相对应导航的排序CLASS			
				if(n!=null && n!=''){
					$(".rightCon").find(nclass).children("iframe").attr('src',n + '?menuPowerId=' + menuId);   //将取得的链接附给新增的iframe标签
				}
				$(nclass).siblings(".frameBox").hide()     //除了新增的导入页面 ，将其他页面隐藏
				setTimeout(ani,100)
				
			}

			//下面部分为窗口的点击切换
			$(".window li").click(function(){
				var cur=$(this).attr('class').split(/\s+/)				
				var dq=cur[0]
				var ss='.'+dq;				
				$(this).addClass("current").siblings().removeClass("current");
				$(".rightCon").find(ss).show().siblings(".frameBox").hide()
				$(".leftCon li a").removeClass("active")
				$(".leftCon").find(ss).parents(".menu").children("a").addClass("active");
				$(".nav a").removeClass("xz")
				$(".leftCon").find(ss).addClass("xz")
				ani()  //窗口滑动弹用方法
			})	
			//下面部分为窗口关闭按钮功能
			$(".window li i").click(function(){				
				var cur=$(this).parents("li").attr('class').split(/\s+/)				
				var dq=cur[0]
				var ss='.'+dq;
				var now=$(this).parents("li").index();
				var prev=now-1;
				var leng=$(".window li").length;	
				var cure=$(".window .current").index()						
				$(this).parents("li").remove();
				$(".rightCon").find(ss).remove()
				ani()  //窗口滑动弹用方法				
				if(now==leng-1 && cure==leng-1 || now==cure){
					if(prev<0){
						prev=0
					}
					$(".window li").eq(prev).trigger("click")									
				}else{
					
				}
				
			})	
			return false;      //退出当前让A标签链接失效
			
		}	
		
	})	
	$(".qf1").trigger("click")  //此为加载时默认选择一个菜单项	
	$(".tab div ul").eq(0).html("<li class='qf1 current'><span> 欢迎页 </span></li>");
	autoResize();
})

/*该方法使用时 A标签标题链接为#不能删除，判断中使用，并且导航跟窗口修改样式时请使用ID，不要使用类，以免类冲突导致该方法失效*/  

}
iframe()



/*该方法为判断当前选中窗口进行相应位置的滑动*/
function ani(){
	var lwidth=$(".window ul li").width()+4  //取LI宽度	
	var len=$(".window ul li").length;    //取LI总数
	var cwidth=$(".window .tab ul").width()+4;  //li的总宽度	
	var viewport=$(".window .tab").width(); //可视窗口容器的总宽度
	var left=lwidth*1;   //定位的位置
	var inx=$(".window .current").index()
	var leftwidth=-(inx-6)*112;   //将要移动的位置

	//判断总LI的长度是否超过可视化窗口的宽度，如果超过则让窗口的当前页滑动到相应的位置 
	if(cwidth>viewport){
		
		if(inx>5){  //只有在大于5个窗口位的时候才开始滑动	
				
			$(".window .tab div").stop().animate({left:leftwidth},300)
		}else{		
			$(".window .tab div").stop().animate({left:0},300)
		}
	}else{

		$(".window .tab div").stop().animate({left:0},300)
	}	
}

/*左右箭头点击滑动事件*/
$(function(){	
	$(".window .left").click(function(){
		var viewport=$(".window .tab").width(); //可视窗口容器的总宽度
		var lwidth=$(".window ul li").width()+4  //取LI宽度	
		var n=lwidth*3;
		var ps=$(".window .tab div").position().left;
		var	pos=ps+n;		
		if(ps<0){
			if(ps>-n){  //此处为减除偏移误差做的判断,不满一次位移量也当做一次位移量，此处为三个LI的宽度
				$(".window .tab div").stop().animate({left:0})

			}else{
				$(".window .tab div").stop().animate({left:pos})	
				pos=pos+n
			}
			
		}else{			
			$(".window .tab div").stop().animate({left:0})	
		}		
		
	})
	$(".window .right").click(function(){
		var viewport=$(".window .tab").width(); //可视窗口容器的总宽度
		var lwidth=$(".window ul li").width()+4  //取LI宽度	
		var n=lwidth*3;
		var len=$(".window ul li").length;    //取LI总数
		var cwidth=$(".window .tab ul").width()+4;
		var rpos=viewport-cwidth;   //右箭头点击时的最终位置		
		var ps=$(".window .tab div").position().left;
		var	pos=ps-n;			
		if(rpos<0){
			if(ps<rpos){  
				
			}else{
				$(".window .tab div").stop().animate({left:pos})	
				pos=pos-n
			}			
		}else{			
			$(".window .tab div").css({left:0})
		}
	})
})

//---------------------------以上为框架核心JS 

//窗口tab移入效果 
function close(){
	$(".window ul li i").mouseover(function(){
		$(this).addClass("rotate")
	}).mouseout(function(){	
		$(this).removeClass("rotate")
	})
}


//左栏菜单收缩子菜单效果
function slide(){
	$(".nav .menu").click(function(){
		
		$(this).find(".submenu").slideDown()
		$(this).siblings(".menu").find(".submenu").slideUp()
		$(this).find("b").addClass("slide")
		$(this).siblings(".menu").find("b").removeClass("slide")
		
		
			var n=$(".nav").height()-1;
			var s=n+1
			$(".nav").css("height",n)
			$(".nav").css("height",s)	

	})
}

//左菜单栏滚动条
function navScroll(){
	$(".leftCon .nav").niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax:1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "4px", //像素光标的宽度
        cursorborder: "0", // 	游标边框css定义
        cursorborderradius: "4px",//以像素为光标边界半径
        autohidemode:true //是否隐藏滚动条
    });
}

//弹出层content位置滚动条修改
//$(function(){
//	$(".container").niceScroll({
//        cursorcolor: "#ccc",//#CC0071 光标颜色
//        cursoropacitymax:1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
//        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
//        cursorwidth: "4px", //像素光标的宽度
//        cursorborder: "0", // 	游标边框css定义
//        cursorborderradius: "4px",//以像素为光标边界半径
//        autohidemode:false //是否隐藏滚动条
//    });
//
//   
//})

//表格插件flexigrid滚动条修改
function tabScroll(){
	//$(".bbit-grid .bDiv").niceScroll({
	$(".ui-jqgrid-bdiv").niceScroll({
        cursorcolor: "#bbb",//#CC0071 光标颜色
        cursoropacitymax:1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "4px", //像素光标的宽度
        cursorborder: "0", // 	游标边框css定义
        cursorborderradius: "4px",//以像素为光标边界半径
        autohidemode:false //是否隐藏滚动条
    });
    $("#status").niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax:1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "4px", //像素光标的宽度
        cursorborder: "0", // 	游标边框css定义
        cursorborderradius: "4px",//以像素为光标边界半径
        autohidemode:true //是否隐藏滚动条
    });
   
}

//左栏收缩功能
var per=$(".leftCon").width()+7;
$(".fl-arrow").css("left",per)	
$(".content .fl-arrow,.ss i").click(function(){	
	var n=$(".fl-arrow").hasClass("hide")
	if(n){
		$(".rightCon").css({width:"84%","border-radius":"0px 4px 0 0"},100)
		$(".leftCon").css({width:"16%"},100)			
		$(".fl-arrow").removeClass("hide")			
		autoResize() //重新适应屏幕宽高
	}else{
		$(".leftCon").css({width:"0","border-right":"none"})
		$(".rightCon").css({width:"100%","margin-left":"0","border-radius":"4px 4px 0 0"},100)
		$(".fl-arrow").fadeIn()		
		$(".fl-arrow").addClass("hide")		
		//setTimeout(Height,100)
	}	
})

//窗口箭头鼠标移过效果
$(".window img").bind({
	//mouseover:function(){
		//$(this).attr("src","images/arrow-blue.png")
	//},
    //mouseout:function(){	
		//$(this).attr("src","images/arrow-white.png")
	//},
	mousedown:function(){
		$(this).parent().css({			
			"margin-top":"1px"
		})
	},
	mouseup:function(){
		$(this).parent().css({			
			"margin-top":"0"
		})
	}
})

//窗口箭头鼠标移过效果
$(".btnGro>li").not(".showmore").bind({	
	mousedown:function(){		
		$(this).find("div").css({			
			"padding":"4px 7px 2px 9px"
		})
	},
	mouseup:function(){
		$(this).find("div").css({			
			"padding":"4px 8px 2px"
		})
	}
})

//表格页顶部按钮子菜单显示
function sh(){
	$(".btnGro li").mouseover(function(){
		var dis=$(this).find(".subList").hasClass("subList")			
		if(dis){
			$(this).children("div").addClass("active")		
			$(this).addClass("shadow")		
		}		
		$(this).find(".subList").show();
	}).mouseout(function(){
		var dis=$(this).find(".subList").hasClass("subList")
		$(this).find(".subList").hide();		
		if(dis){
			$(this).children("div").removeClass("active")
			$(this).removeClass("shadow")	
		}
		
	})
	$(".showmore .title").click(function(){
		$(this).parent().siblings("div").find(".list").slideUp()
		$(this).parent().siblings("div").find("b").removeClass("rotate")
		$(this).siblings(".list").slideDown()
		$(this).find("b").addClass("rotate")
	})
}
sh()


/*//表格搜索列表下拉菜单效果
$(".select").click(function(){
	$(this).parent().siblings(".input").find(".option").hide()
	$(this).parents(".inputGro").siblings().find(".input").find(".option").hide()
	$(this).children(".option").toggle()
})
$(".option li").click(function(){
	var text=$(this).text()
	$(".option").fadeOut(200)
	$(this).parent("ul").siblings("span").text(text)
	$(this).parent("ul").siblings("input").val(text)
	
})*/

//按钮生成
$.fn.btnGro = function(p){
	var len = p.colModel.length;  //按钮个数
	var outHtml = "<li><div><span class='icon'></span></div></li>"             //外层按钮组的的HTML
	var showmoreHtml = "<li class='showmore'><div><span></span><span>···</span></div><ul class='subList' style='display:none'></ul></li>"                           //showmore的外层样式
	var innerHtml = "<div><div class='title'><span></span><b></b></div></div>"   //showmore一级按钮样式
	
	for(var i=0;i<len;i++){
		$(this).append(outHtml)    //插入外层按钮一级按钮
		//$(this).children("li").eq(i).find("span").eq(0).addClass(p.colModel[i].icon)
		$(this).children("li").eq(i).find("span").addClass(p.colModel[i].icon)
		//$(this).children("li").eq(i).find("span").eq(1).text(p.colModel[i].display)
		$(this).children("li").eq(i).find("span").text(p.colModel[i].display) 
		if(p.colModel[i].childName != ''){

			$(this).children("li").eq(i).append("<ul class='subList' style='display:none'></ul>")
			for(var j=0;j<p.colModel[i].childName.length;j++){
				$(this).children("li").eq(i).find(".subList").append("<li>" + p.colModel[i].childName[j] + "</li>")
			}

		}           
	}
	//插入折叠的按钮组
	$(this).append(showmoreHtml)
	for(var i=0;i<len;i++){
		$(".showmore .subList").append(innerHtml)
		$(".showmore .subList>div").eq(i).find(".title").addClass(p.colModel[i].icon)
		$(".showmore .subList>div").eq(i).find(".title span").text(p.colModel[i].display)
		
		if(p.colModel[i].childName != ''){         //判断按钮的子按钮是否有空
			$(".showmore .subList>div").eq(i).append("<div class='list' style='display:none'></div>")
			for(var j=0;j<p.colModel[i].childName.length;j++){
				$(".showmore .subList>div").eq(i).find(".list").append("<li>" + p.colModel[i].childName[j] + "</li>")
			}

		} 
	}        
	
}

 /*搜索表格相关操作*/                
$(function(){
	var len=$(".select").length;
    var n=9999
    for(var i=0;i<len;i++){
        $(".select").eq(i).css("z-index",n)
        n--;
    }  //解决下拉重叠问题 

    //点击展开事件
    $("#insert .input, .select, .text, .tdTitle").click(function(){  
        $("#insert").css("position","absolute")
        
    })  
    //点击收起事件 
    $("#insert .slide,#insert .button").click(function(){
        $("#insert").css("position","relative")
        $(".option").hide()
        $(".select.searchCon .searchbox").hide()
       	
    })
   
})

//隐藏#insert
$(document).bind('click',function(e){ 
	var e = e || window.event; //浏览器兼容性 
	var elem = e.target || e.srcElement; 
	while (elem) { //循环判断至跟节点
		if (elem.id && elem.id=='insert') { 
			return; 
		} 
		elem = elem.parentNode; 
	} 	
	$('#insert').css('position','relative'); 
}); 

//ocach.html tab切换
function changeTab(){	
	$(".tag li").click(function(){
		var n=$(this).index();
		$(this).addClass("active").siblings().removeClass("active")
		$(".tabContainer").eq(n).addClass("current").siblings().removeClass("current")		
	})
}
changeTab()


//头像下拉选项卡及相关显示隐藏效果
$(function(){
	$(".personBox").click(function(){	
		var has = $(this).find(".name b").hasClass("slide")	
		if(has){
			$(this).find(".moreInfo").fadeOut()
			$(this).find(".name b").removeClass("slide")
		}else{
			$(this).find(".moreInfo").css("right","-300px").show().animate({right:"-3px"})
			$(this).find(".name b").addClass("slide")
		}		
	});	
	$(".personBox .moreInfo").hover(function(){
		$(this).show()
	},function(){
		$(this).fadeOut()
		$(this).siblings(".name").find("b").removeClass("slide")
	})
	
	$(".moreInfo a").click(function(e){
		e.preventDefault();     //阻止冒泡event对象方法
		$(".moreInfo").fadeOut()
	})
})

//窗口栏按钮超出DOM宽度时自动进行收缩
function btnSize(){
	var n=$(".btnGro").width()
	var len=$(".btnGro>li").length
	var count = 0            //按钮总宽度	
	$(".btnGro>li").show()   //进行一次全部显示，解决窗口变大调用时，已隐藏按钮无法显示
	for(var i = 0;i<len;i++){		
		var li = $(".btnGro>li").eq(i).width() + 4	
		count+=li	
		if(count>n){
			var ss=i;        //记录在第几个按钮超出长度,并跳出循环	
			break;	
		}				
	}
	//在记录超过长度的第个按钮，将后面的按钮全部隐藏
	if(count>n){
		$(".btnGro .showmore").show()
		$(".btnGro .showmore .subList>div").hide()
		for(var i=ss-1;i<len-1;i++){          //预留一个按钮的位置 ，避免出错
			$(".btnGro>li").eq(i).hide()			
			$(".btnGro .showmore .subList>div").eq(i).show()
		}
		
	}else{
		$(".showmore").hide()
	}
	
}
btnSize()

//下拉框带搜索脚本
$(".select.searchCon").click(function(event){
	event.stopPropagation()   //阻止冒泡 
	$(".select.searchCon .searchbox").show()

})

$(".select.searchCon ul li").click(function(){
	event.stopPropagation()  //阻止冒泡 
	var val=$(this).text()
	$(".select.searchCon>input").val(val)
	$(".select.searchCon .searchbox").hide()
	
})
$("body").click(function(event){	
	$(".select.searchCon .searchbox").hide()
})


//新增培训勾选
function chooseTime(){
	$(".cardGro li").click(function(){
		var checked= $(this).hasClass("checked")
		if(checked){
			$(this).removeClass("checked")
		}else{
			$(this).addClass("checked")
		}
		
	})
}
chooseTime()