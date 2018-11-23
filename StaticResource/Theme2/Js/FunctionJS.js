var Loading = function(x){

};
$(function(){
	var btns = top.window.menuPowers['p' + menuPowerId];
	if(!btns){
		btns = [];
	}
	if(window.otherbtns && window.otherbtns.length > 0){
		for(var i=0;i<window.otherbtns.length;i++){
			var otherBtn = window.otherbtns[i];
			otherBtn.is_show = 1;
			if(isHaveBtn(btns,otherBtn.name)){
				continue;
			}
			if(otherBtn.index && otherBtn.index < btns.length){
				btns.splice(otherBtn.index,0,otherBtn);
			}else{
				if(otherBtn.index <= 0){
					btns.unshift(otherBtn);
				}else{
					btns.push(otherBtn);
				}
			}
		}
	}
    $('.btnGro').initMenuBtns(btns);
	$(".left_in").click(function(e) {
		
		var obj = $(".fix.b");
		if(obj.length==0){
					$(".fix").addClass("b");
					$(".fix").animate({right:-336},500);
					$(".left_in").addClass("bianse");
			}else{
				
				$(".fix").removeClass("b");
					 $(".fix").animate({right:0},500);
					$(".left_in").removeClass("bianse");
				}
       
    });
});
(function($) {
    $.fn.flexiMenu = function(p) {
//    	this.empty();
//    	for (var i = 0; i < p.buttons.length; i++) {
//        	var html = '';
//            var btn = p.buttons[i]; 
//            var children = btn.children;
//            
//            if (btn.cls == 'separator'){
//            	this.append('<em class="separator"></em>'); 
//            }else{
//            	var btnLi = document.createElement('li');
//            	if (children) { 
//            		btnLi.innerHTML= '<div class="dropList"><span class="'+btn.cls+'">'+btn.name+'<b><img src="../images/dropdown-icon.png"></b></span></div>';
//                	
//	                var chdul = document.createElement('ul');
//	                chdul.className = 'subList';
//	                chdul.style.display = 'none';
//	                for (var j = 0; j < children.length; j++){
//	                    var chdbtn = children[j];                    
//	                    var chdli = document.createElement('li');
//	 
//	                    chdli.innerHTML = chdbtn.name; 
//	                    chdli.id = chdbtn.id;
//	                    
//	                    $(chdul).append(chdli);	 
//	                    $(btnLi).append(chdul);
//	                }            		
//            	}else{
//            		btnLi.innerHTML= '<div><span class="'+btn.cls+'">'+btn.name+'</span></div>';	                
//            	}
//	            btnLi.id = btn.id;
//	            this.append(btnLi);
//            }             
//        }
//    	sh();
    };
    
    $.fn.initMenuBtns = function(btns) {
    	this.empty();
    	if(!btns || btns.length < 1){
//    		$(this).hide();
    		return;
    	}
    	var lastShowBtn = 0;
    	for(var i =0;i<btns.length;i++){
    		if(btns[i].is_show == 1){
    			lastShowBtn = (i+1); 
    		}
    	}
//    	if(lastShowBtn == 0){
//    		$(this).hide();
//    	}
    	for (var i = 0; i < btns.length; i++) {
        	var btnStr = '';
            var btn = btns[i]; 
            var jsonstr = btn.nodes;
            var nodes = [];
            if(jsonstr && jsonstr != ''){
            	nodes = eval(jsonstr);
            }
            var separator = btn.separator;
            if(btn.is_show == 1){
            	if(nodes && nodes.length > 0){
            		btnStr += '<li data-action="' + btn.onpress + '" data-name="' + btn.name + '">' +
            				  	'<div class="dropList"><span class="'+btn.cls+'">'+btn.name+'<b><img src="../images/dropdown-icon.png"></b></span></div>' +
            				  	'<ul class="subList" style="display:none;">';
            		for(var j=0;j<nodes.length;j++){
            			var node = nodes[j];
            			btnStr += '<li data-action="' + node.onpress + '" data-name="' + node.name + '">' + node.name + '</li>';
            		}
            		btnStr += '</ul></li>';
            	}else{
            		btnStr += '<li data-action="' + btn.onpress + '" data-name="' + btn.name + '"><div><span class="'+btn.cls+'">'+btn.name+'</span></div></li>';
            	}
            	this.append(btnStr);
            }
            if(separator && separator == 1 && i < (lastShowBtn-1)){
            	var chis = $(".btnGro").children();
            	var last = chis.get(chis.length-1);
            	if(last && last.tagName != 'EM'){
            		this.append('<em class="separator"></em>'); 
            	}
            }
    	}
    	$(".btnGro").on('click','>li',function(){
			var name = $(this).attr('data-name');
			var action = $(this).attr('data-action');
			var func = window[action];
			if(typeof func === 'function') {
				func.apply(null,[this,name,action]);
			}
		});
		$(".btnGro").on('click','>li>ul>li',function(event){
			event.stopPropagation();
			var name = $(this).attr('data-name');
			var action = $(this).attr('data-action');
			var func = window[action];
			if(typeof func === 'function') {
				func.apply(null,[this,name,action]);
			}
		});
    	sh();
    };
    
    
    
    $.fn.GetWebControls = function (keyValue) {
        var reVal = "";
        $(this).find('input,select,textarea,.ui-select').each(function (r) {
            var id = $(this).attr('id');
            var type = $(this).attr('type');            
            switch (type) {
                case "checkbox":
                    if ($("#" + id).is(":checked")) {
                        reVal += '"' + id + '"' + ':' + '"1",'
                    } else {
                        reVal += '"' + id + '"' + ':' + '"0",'
                    }
                    break;
                /*
                case "select":
                	var value = $("#" + id).attr("relvalue");
                    if (value == "") {
                        value = "&nbsp;";
                    }
                    reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",';                    
                    break; */
                case "button":
                	break;
                default:                	
                	var isSelectBox = $(this).hasClass('selectbox');
                	
                	if (!isSelectBox){   
                		var value = $("#" + id).val();                		
	                    if (value == "") {
	                        value = "&nbsp;";
	                    }
	                    reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",';
                	}
                    break;
            }
        });
        reVal = reVal.substr(0, reVal.length - 1);
        if (!keyValue) {
            reVal = reVal.replace(/&nbsp;/g, '');
        }
        reVal = reVal.replace(/\\/g, '\\\\');
        reVal = reVal.replace(/\n/g, '\\n');
        var postdata = jQuery.parseJSON('{' + reVal + '}');
        //阻止伪造请求
        //if ($('[name=__RequestVerificationToken]').length > 0) {
        //    postdata["__RequestVerificationToken"] = $('[name=__RequestVerificationToken]').val();
        //}
        return postdata;
    };
    
    $.fn.SetWebControls = function (data) {
        var $id = $(this)
        for (var key in data) {        	
            var id = $id.find('#' + key);              
            if (id.attr('id')) { 
            	var type = id.attr('type');
                if (id.hasClass("input-datepicker")) {
                    type = "datepicker";
                }
                var value = $.trim(data[key]).replace(/&nbsp;/g, '');
                switch (type) {
                    case "checkbox":
                        if (value == 1) {
                            id.attr("checked", 'checked');
                        } else {
                            id.removeAttr("checked");
                        }
                        break;
                    case "select":
                    	$(id).setValue(value);
                        break;
                    case "selectTree":
                        //id.ComboBoxTreeSetValue(value);
                        break;
                    case "datepicker":
                        //id.val(formatDate(value, 'yyyy-MM-dd'));
                        break;
                    case "button":
                    	break;
                    default:
                        id.val(value);
                        break;
                }
            }
        }
    }
})(jQuery);

function isHaveBtn(btns,name){
	var tag = false;
	for(var i=0;i<btns.length;i++){
		var btn = btns[i];
		if(btn.name == name){
			tag = true;
			break;
		}
	}
	return tag;
}
