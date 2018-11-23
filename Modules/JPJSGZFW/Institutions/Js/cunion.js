var Cunion = {}

/*根据省获取市县*/
Cunion.getCity = function (id) {
    var citybody = { "Province": "广东" };
    CwHelper.Ajax("00000020005", citybody, function (result) {
        for (var i = 0; i < result.body.length; i++) {
            var data = result.body[i];
            $(id).append("<option value='" + data.Value + "'>" + data.Key + "市</option>");
        }
    }, false);
}

/*根据市选择县区*/
Cunion.getCounty = function (cityid, countyid) {
    var city = $(cityid).find("option:selected").text();
    /* 去掉市字 */
    var length = city.length - 1;
    city = city.substr(0, length);
    if (city != "") {
        var obj = $(countyid);
        var countybody = {
            "City": city
        };
        obj.html("<option value=''>请选择县区</option>");
        CwHelper.Ajax("00000020006", countybody, function (result) {
            for (var i = 0; i < result.body.length; i++) {
                var data = result.body[i];
                obj.append("<option value='" + data.Value + "'>" + data.Key + "区</option>");
            }
        }, false);
    }
}

/*选择驾培机构*/
Cunion.getCarcop = function (cityid, countyid, carCopid) {
    var city = $(cityid).find("option:selected").text();
    var county = $(countyid).find("option:selected").text();
    if (county != "") {
        var obj = $(carCopid);
        var countybody = {
            "rows": "10",
            "page": "1",
            "data": {
                "city": city,
                "district": county
            }
        }
        obj.html("<option value=''>请选择驾培机构</option>");
        CwHelper.Ajax("004300100036", countybody, function (result) {
            for (var i = 0; i < result.body.items.length; i++) {
                var data = result.body.items[i];
                obj.append("<option value='" + data.ins_code + "'>" + data.name + "</option>");
            }
        }, false);
    }
}

/* 分页 */
Cunion.Paging = function () {
    /*首页*/
    $("#page_first").click(function firstPage() {
        var curPage = $("#page_index").val();
        if (curPage == 1) {
            layer.msg("已经是第一页了", { time: 1000 });
            return;
        }
        displayPage(1);
    });
    /*上一页*/
    $("#backforward").click(function backForward() {
        var curPage = $("#page_index").val();
        if ((curPage - 1) < 1) {
            layer.msg("已经是第一页了", { time: 1000 });
            return;
        }
        displayPage(curPage - 1);
    });
    /*下一页*/
    $("#forward").click(function forWard() {
        var pageCount = $("#pageCount").val();
        var curPage = parseInt($("#page_index").val());
        if (parseInt(curPage) + 1 > pageCount) {
            layer.msg("已经是最后一页了", { time: 1000 });
            return;
        }
        displayPage(curPage + 1);
    });
    /*尾页*/
    $("#page_last").click(function lastPage() {
        var curPage = $("#page_index").val();
        var pageCount = $("#pageCount").val();
        if (parseInt(curPage) == pageCount) {
            layer.msg("已经是最后一页了", { time: 1000 });
            return;
        }
        displayPage(parseInt($("#pageCount").val()));
    });
    /*跳转*/
    $("#go_page").click(function goPage() {
        var page_num = $("#page_num").val();
        if (page_num > parseInt($("#pageCount").val())) {
            layer.msg("没有这么多数据");
            return;
        }
        if (page_num < 1) {
            layer.msg("页数输入有误");
            return;
        }
        displayPage(page_num);
    });
}

/* 接收url参数 */
Cunion.getUrlParam = function () {
    url = document.location.toString();
    var params = -1;
    var arrparam = [];
    if (url.indexOf("?") != -1) {
        params = url.split("?")[1];
        if (params.indexOf("&") != -1) {
            params = params.split("&");
            for (var i = 0; i < params.length; i++) {
                /* decodeURI解码解决传递中文问题 */
                arrparam[i] = decodeURI(params[i].split("=")[1]);
            }
        }
        else{
            arrparam[0] = decodeURI(params.split("=")[1]);
        }
        return arrparam;
    }
    else
        return -1;
}