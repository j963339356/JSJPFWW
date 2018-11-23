function ajaxEvent(c, d, a, b) {
	try {
		$.ajax({
			url : c ,
			data : d,
			type : "post",
			timeout:600000,
			dataType : "text",
			async : true,
			success : function(e) {
				e = eval("("+e+")");
				if (e.success) {
					if (b != null) {
						b(e);
					}
				} else {
					toMessage(e.retMsg,"error",3000);			
				}
			},
			error : function() {
				toMessage("非法请求或登录已超时","error",2000);
			},
			timeout : function() {
				toMessage("请求超时,请联系管理员","error",2000);
			}
		});
	} catch (f) {
		toMessage("非法请求","error",2000);
	}
}

function toMessage(content,icon,time){
	layer.msg(content, {
	  offset: 10,
	  anim: 6
	});
}
