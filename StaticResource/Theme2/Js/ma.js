// JavaScript Document
window.load=function(){	
	$('#nav_content>li').hover(function(e) {
        $(this).children('ul').stop().slideToggle();
    });
};

$(function(){
	$('.tab span').click(function(e) {
		var index=$(this).index();
        $(this).addClass('tab-currtent').siblings().removeClass('tab-currtent');
		$('.details-in ul li').eq(index).show().siblings().hide();
    });

    ;(function(){
        $('#complaints-ta span').click(function(e) {
            var index=$(this).index();
            $(this).addClass('cutton').siblings().removeClass('cutton');
            $('#complaints-l li').eq(index).show().siblings().hide();
        });
    })();

    ;(function(){
        $('#appraise-tab span').click(function(e) {
            var index=$(this).index();
            $(this).addClass('cutton').siblings().removeClass('cutton');
            $('#appraise-lb li').eq(index).show().siblings().hide();
        });
    })();


    ;(function(){
        $('.my-basic .complaints-tab span').click(function(e) {
            var index=$(this).index();
            $(this).addClass('cutton').siblings().removeClass('cutton');
            $('.qyxx-lb li').eq(index).show().siblings().hide();
        });
    })();


    $('.grjb').click(function(e) {
        $('.my-basic').show().siblings().hide();
    });

    $('.wypx').click(function(e) {
        $('.my-training').show().siblings().hide();
    });

    $('.wypj').click(function(e) {
        $('.my-complaints').show().siblings().hide();
    });

    $('.wyts').click(function(e) {
        $('.my-appraise').show().siblings().hide();
    });
    
    $('.xxss').click(function(e) {
        $('.my-complaint').show().siblings().hide();
    });
    
    $('.tsxq').click(function(e) {
        $('.complaint-details').show().siblings().hide();
    });


});


































