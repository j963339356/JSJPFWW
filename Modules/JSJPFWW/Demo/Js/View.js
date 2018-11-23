define(['/Modules/Config/conwin.main.js'], function () {
        require(['jquery', 'tipdialog', 'helper', 'prevNextpage', 'common', 'popdialog', 'formcontrol', 'filelist', 'customtable'],
        function ($, tipdialog, helper, prevNextpage, common, popdialog, formcontrol, filelist) {

        var initPage = function () {
        //初始化页面样式
        common.AutoFormScrollHeight('#Form1');
        common.AutoFormScrollHeight('#Form2');
        formcontrol.initial();

        //翻页控件
        var ids = window.parent.document.getElementById('hdIDS').value;
        prevNextpage.initPageInfo(ids.split(','));
        prevNextpage.bindPageClass();

        //初始化子表
        initZiBiao();

        //关闭
        $('#btnclose').click(function () {
        popdialog.closeIframe();
        });

        //上一条
        $('#prevBtn').click(function (e) {
        e.preventDefault();
        prevNextpage.prev();
        updateData();
        updateTag();
        });

        //下一条
        $('#nextBtn').click(function (e) {
        e.preventDefault();
        prevNextpage.next();
        updateData();
        updateTag();
        });

        //子表
        $('#tab2').click(function (e) {
        e.preventDefault();
        $('#tb_ZiBiaoXinXi').CustomTable('reload');
        });

        //附件列表
        $('#tab3').click(function (e) {
        e.preventDefault();
        $('#FuJian').filelist({
        'type': 'view',
        'businessType': '000001',
        'businessId': $('#Id').val()
        });
        });

        updateData();

        //个性化代码块
        //region

        //endregion
        };

        //主表-刷新数据
        function updateData() {
        var id = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
        getXianLuXinXi(id, function (serviceData) {
        if (serviceData.publicresponse.statuscode == 0) {
        fillFormData(serviceData.body);
        } else {
        tipdialog.errorDialog("请求数据失败");
        }
        });
        };

        //主表-获取主表数据
        function getXianLuXinXi(id, callback) {
        //调用获取单条信息接口
        helper.Ajax("00090000104", id, function (resultdata) {
        if (typeof callback == 'function') {
        callback(resultdata);
        }
        }, false);
        };

        //主表-绑定主表数据
        function fillFormData(resource) {
        $('#Form1').find('.form-control-static').each(function (i, item) {
        var index = $(item).attr('for');
        var tempValue = resource[index];
        if (tempValue != undefined) {
        //TODO: 赋值
        if ($(item).hasClass('datepicker')) {
        tempValue = tempValue.substr(11, 5);
        }
        $(item).html(tempValue == '' ? '' : tempValue);
        } else {
        $(item).html('');
        }
        });
        $('#Id').val(resource.Id);
        };

        //主表-更新tab状态
        function updateTag() {
        $('#tab1').parent('li').addClass('active');
        $('#tab2').parent('li').removeClass('active');
        $('#tab3').parent('li').removeClass('active');

        $('#JiChuXinXi').addClass('active in');
        $('#ZiBiaoXinXi').removeClass('active in');
        $('#FuJian').removeClass('active in');
        };

        //子表-初始化
        function initZiBiao() {
        $('#tb_ZiBiaoXinXi').CustomTable({
        ajax: helper.AjaxData("00090000205",
        function (data) {
        var pageInfo = { Page: data.start / data.length + 1, Rows: data.length };
        for (var i in data) {
        delete data[i];
        }
        var para = { 'XianLuID': $('#Id').val() };
        pageInfo.data = para;
        $.extend(data, pageInfo);
        }, null),
        single: false,
        filter: false,
        ordering: false, /////是否支持排序
        "dom": 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
        columns: [
        { data: 'ZhanDianMingCheng' },
        { data: 'JianZhiCunMingCheng' },
        { data: 'PiaoJia' },
        { data: 'BeiZhu' }
        ],
        pageLength: 10
        });
        };

        //个性化代码块
        //region

        //endregion

        initPage();
        });
        });