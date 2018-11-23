$(document).ready(function () {
    /* 获取首页查询教练车的参数 city=河源市&county=东源区*/
    var params = Cunion.getUrlParam();
    if(params != -1){
        if(params[0]!="请选择市区"&&params[0]){
            Cunion.getCity("#city");
            $("#city").find("option[text=河源市]").attr("selected", true);
            $("#city").append("<option value='' selected>" + params[0] + "市</option>");
            Cunion.getCounty("#city","#county");
        }
        if(params[1]!="请选择县区"&&params[1]){         
            $("#county").append("<option value='' selected>" + params[1] + "区</option>");
            Cunion.getCarcop("#city","#county","#driving_school");
        }
        if(params[2]!=""&&params[2]){
            $("#driving_school").append("<option value='' selected>" + params[2] + "</option>");
        }
        if(params[3]!=""&&params[3]){
            $("#coach_name").val(params[3]);
        }
    }
    
    displayPage(1);
    /*根据省获取市县*/
    Cunion.getCity("#city");

    /*根据市选择县区*/
    $("#city").change(function () {
        Cunion.getCounty("#city","#county");
    });

    /*选择驾培机构*/
    $("#county").change(function () {
        Cunion.getCarcop("#city","#county","#driving_school");
    });

    /* 分页 */
    Cunion.Paging();
});

/*重置*/
function resetBtn() {
    $("#city").val('');
    $('#county').html("<option value=''>请选择县区</option>");
    $('#driving_school').html("<option value=''>请选择驾培机构</option>");
    $('#car_num').val('');
    displayPage(1);
}
/*查询*/
function queryBtn() {
    displayPage(1);
}

/*获取指定页面数据*/
function displayPage(curPage) {
    /* 把区换成县 */
    var district = $("#county").find("option:selected").text();
    var length = district.length-1;
    district = district.substr(0,length)+"县";
    /* 如果没有选择驾培机构则数据为空,不然放进body里会错 */
    var ins_name = $('#driving_school').find("option:selected").text()
    if(ins_name == "请选择驾培机构"){
        ins_name = "";
    }

    var body = {
        "rows": 9,
        "page": curPage,
        "data": {
            "city": $("#city").find("option:selected").text(),
            "district": district,
            "ins_name" : ins_name,
            "licnum": $("#car_num").val(),
        }
    }
    CwHelper.Ajax("004300100049", body, function (result) {
        var data = result.body.items;
        $("#pageCount").val(Math.ceil(result.body.totalcount / 9));
        $("#page_index").val(curPage);
        // $("#pageLabel").html("当前：第" + result.pageIndex + "页,共" + result.pageCount + "页");// 显示当前多少页
        var ulhtml = "";
        if (data == null || data.length==0) {
            ulhtml += '<font color="red"><p style="text-align: center;font-size:15px;height:30px">没有找到数据！</p></font>';
        } else {
            $(data).each(function () {
                ulhtml += '<li>' + '<a href="CoachCarDetail.html?id=' + this.id + '">'
                    + '<div class="tp">'
                    + '<img id="photofile" style="height: 140px; width: 130px;" src="../../../StaticResource/Theme2/Img/noimage.jpg"></div>'
                    + '<div class="cziliao">'
                    + '<p style="color:#28689a">' + this.licnum + '</p>'
                    + '<p>驾校：' + this.corp_name + '</p>'
                    + '<p>车辆品牌：' + this.manufacture + '</p>'
                    + '<p>培训车型：' + this.perdri_type + '</p></div></a></li>';
            });

        }
        $("#car_list").html(ulhtml);
        $("#page_index").text(curPage);
        $("#pageLabel").html("当前：第" + $("#page_index").val() + "页,共" + $("#pageCount").val() + "页");// 显示当前多少页
    }, false);
}



