define(['/Modules/Config/conwin.main.js'], function () {
        require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'filelist', 'metronic', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity, filelist, Metronic) {
        //模块初始化
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

        $('.datetimepicker').datetimepicker({
        language: 'zh-CN',
        startView: 1,
        maxView: 0,
        format: 'hh:ii',
        autoclose: true//选中之后自动隐藏日期选择框
        });

        //关闭
        $('#btnclose').click(function () {
        tipdialog.confirm("确定关闭？", function (r) {
        if (r) {
        parent.window.$("#btnSearch").click();
        popdialog.closeIframe();
        }
        });
        });

        //上一条
        $('#prevBtn').click(function (e) {
        e.preventDefault();
        prevNextpage.prev();
        updateData();
        });

        //下一条
        $('#nextBtn').click(function (e) {
        e.preventDefault();
        prevNextpage.next();
        updateData();
        });

        //tab2
        $('#tab2').click(function (e) {
        e.preventDefault();
        $('#tb_ZiBiaoXinXi').CustomTable('reload');
        });

        //tab3
        $('#tab3').click(function (e) {
        e.preventDefault();
        $('#FuJian').filelist({
        'type': 'edit',
        'businessType': '000001',
        'timeOut': 20000,
        'businessId': $('#Id').val()
        });
        });

        updateData();

        //保存
        $('#saveBtn').on('click', function (e) {
        e.preventDefault();
        var flags = formcontrol.buttonValid();
        if (flags) {
        save();
        }
        });

        //子表-新增信息
        $('#btnAddZiBiao').on('click', function (e) {
        e.preventDefault();
        popdialog.showModal({
        'url': 'ZiBiaoAdd.html',
        'width': '900px',
        'showSuccess': initAddZiBiao
        });
        });

        //子表-编辑信息
        $('#btnEditZiBiao').on('click', function (e) {
        e.preventDefault();
        var rows = $("#tb_ZiBiaoXinXi").CustomTable('getSelection'), ids = [];
        if (rows == undefined) {
        tipdialog.errorDialog('请选择需要查看的行');
        return false;
        }

        //TODO:编写逻辑



        $(rows).each(function (i, item) {
        ids.push(item.data.Id);
        });
        $('#SelectData').val(ids.join(','));
        popdialog.showModal({
        'url': 'ZiBiaoEdit.html',
        'width': '900px',
        'showSuccess': initEditZiBiao
        });
        });

        //子表-删除信息
        $('#btnDelZiBiao').on('click', function (e) {
        e.preventDefault();
        var rows = $("#tb_ZiBiaoXinXi").CustomTable('getSelection'), ids = [];
        if (rows == undefined) {
        tipdialog.errorDialog('请选择需要操作的行');
        return false;
        }
        $(rows).each(function (i, item) {
        ids.push(item.data.Id);
        });
        tipdialog.confirm("确定要删除选中的记录？", function (r) {
        if (r) {
        helper.Ajax("00050000027", ids, function (data) {
        if (data.body) {
        toast.success("删除成功");
        $('#tb_ZiBiaoXinXi').CustomTable('reload');
        }
        else {
        tipdialog.alertMsg("删除失败");
        }
        }, false);
        }
        });
        });

        //子表-查看信息
        $('#btnViewZiBiao').on('click', function (e) {
        e.preventDefault();
        var rows = $("#tb_ZiBiaoXinXi").CustomTable('getSelection'), ids = [];
        if (rows == undefined) {
        tipdialog.errorDialog('请选择需要查看的行');
        return false;
        }

        //TODO:编写逻辑

        $(rows).each(function (i, item) {
        ids.push(item.data.Id);
        });
        $('#SelectData').val(ids.join(','));
        popdialog.showModal({
        'url': 'ZiBiaoView.html',
        'width': '900px',
        'showSuccess': initViewZiBiao
        });
        });

        //个性化代码块
        //region
        selectCity(); 
        //endregion
        };

        //主表-刷新数据
        function updateData() {
        var id = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
        getXianLuXinXi(id, function (serviceData) {
        if (serviceData.publicresponse.statuscode == 0) {
        updateTag();
        fillFormData(serviceData.body);
        } else {
        tipdialog.errorDialog("请求数据失败");
        }
        });
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

        //主表-获取主表数据
        function getXianLuXinXi(id, callback) {
        helper.Ajax("00090000104", id, function (resultdata) {
        if (typeof callback == 'function') {
        callback(resultdata);
        }
        }, false);
        };

        //主表-绑定主表数据
        function fillFormData(resource) {
        $('#Form1').find('input[name],select[name],textarea[name]').each(function (i, item) {
        var tempValue = resource[$(item).attr('name')];
        if (tempValue != undefined) {
        if ($(item).hasClass('datetimepicker')) {
        tempValue = tempValue.substr(11, 5);
        }
        //TODO: 赋值

        $(item).val(tempValue.toString() == '' ? '' : tempValue);
        } else {
        $(item).val('');
        }
        });
		xiaQuXinXi(resource);
        };

        //主表-保存
        function save() {
        //TODO:数据校验

        var jsonData1 = $('#Form1').serializeObject();
        //调用修改接口
        helper.Ajax("00090000102", jsonData1, function (data) {
        if (data.body) {
        toast.success("档案保存成功");
        setTimeout(function () { window.location.reload(false); }, 800);
        }
        else {
        tipdialog.alertMsg("档案保存失败");
        }
        }, false);
        };


        //子表-列表初始化
        function initZiBiao() {
        $('#tb_ZiBiaoXinXi').CustomTable({
        ajax: helper.AjaxData("00090000205",
        function (data) {
        var pageInfo = { Page: data.start / data.length + 1, Rows: data.length };
        for (var i in data) {
        delete data[i];
        }
        var xianluId = $('#Id').val();
        var para = { 'XianLuID': xianluId };
        pageInfo.data = para;
        $.extend(data, pageInfo);
        }, null),
        single: false,
        filter: false,
        ordering: false, /////是否支持排序
        "dom": 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
        columns: [
        {
        render: function (data, type, row) {
        return '<input type=checkbox class=checkboxes value=' + row.Id + ' />';
        }
        },
        { data: 'ZhanDianMingCheng' },
        { data: 'JianZhiCunMingCheng' },
        { data: 'PiaoJia' },
        { data: 'BeiZhu' }

        ],
        pageLength: 10
        });
        };

        //子表-初始化新增页
        function initAddZiBiao() {
        $('#AddZiBiaoSure').on('click', function (e) {
        e.preventDefault();
        var xianluId = $('#Id').val();
        var jsonData1 = $('#SelectForm').serializeObject();
        jsonData1.XianLuId = xianluId;
        addZiBiaoGuanXi(jsonData1, function () {
        popdialog.closeModal();
        });
        });
        };

        function initEditZiBiao() {
        //翻页控件
        tabPageInfo.initPageInfo($('#SelectData').val().split(','));
        tabPageInfo.bindPageClass();
        viewZiBiaoGuanXi();
        //上一条
        $('#prevTabBtn').click(function (e) {
        e.preventDefault();
        tabPageInfo.prev();
        viewZiBiaoGuanXi();
        });

        //下一条
        $('#nextTabBtn').click(function (e) {
        e.preventDefault();
        tabPageInfo.next();
        viewZiBiaoGuanXi();
        });

        $('#AddZiBiaoSure').on('click', function (e) {
        e.preventDefault();
        var jsonData1 = $('#SelectForm').serializeObject();
        jsonData1.Id = tabPageInfo.PageInfo.IDS[tabPageInfo.PageInfo.Index];
        jsonData1.XianLuId = $('#Id').val();
        jsonData1.ZiBiaoGuanXiLeiXing = 3;
        jsonData1.ZhuangTai = 0;
        editZiBiaoGuanXi(jsonData1, function () {
        viewZiBiaoGuanXi();
        });
        });
        };

        function initViewZiBiao() {
        //翻页控件
        tabPageInfo.initPageInfo($('#SelectData').val().split(','));
        tabPageInfo.bindPageClass();
        viewZiBiaoGuanXi();
        //上一条
        $('#prevTabBtn').click(function (e) {
        e.preventDefault();
        tabPageInfo.prev();
        viewZiBiaoGuanXi();
        });

        //下一条
        $('#nextTabBtn').click(function (e) {
        e.preventDefault();
        tabPageInfo.next();
        viewZiBiaoGuanXi();
        });
        };

        //子表-新增方法
        function addZiBiaoGuanXi(array, callback) {
        //TODO: 添加逻辑
        helper.Ajax("00090000201", array, function (data) {
        if (data.body) {
        toast.success("新增成功");
        if (typeof callback == 'function') {
        callback();
        }
        setTimeout(function () { $('#tb_ZiBiaoXinXi').CustomTable('reload'); }, 1000);
        }
        else {
        tipdialog.alertMsg("新增失败");
        }
        }, false);
        };

        //子表-保存方法
        function editZiBiaoGuanXi(arry, callback) {
        //TODO: 添加逻辑
        helper.Ajax("00090000202", arry, function (data) {
        if (data.body) {
        toast.success("保存成功");
        if (typeof callback == 'function') {
        callback();
        }
        setTimeout(function () { $('#tb_ZiBiaoXinXi').CustomTable('reload'); }, 1000);
        }
        else {
        tipdialog.alertMsg("保存失败");
        }
        }, false);
        };

        //子表-绑定数据方法
        function viewZiBiaoGuanXi() {
        //TODO: 添加逻辑
        var pageId = tabPageInfo.PageInfo.IDS[tabPageInfo.PageInfo.Index];
        helper.Ajax("00090000204", pageId, function (resultdata) {
        if (resultdata.publicresponse.statuscode == 0) {
        var resource = resultdata.body;
        $('#QueryAddZiBiao').find('.form-control-static').each(function (i, item) {
        var index = $(item).attr('for');
        var tempValue = resource[index];
        if (tempValue != undefined) {
        //TODO: 赋值
        $(item).html(tempValue == '' ? '' : tempValue);
        } else {
        $(item).html('');
        }
        });
        $('#QueryAddZiBiao').find('input[name],select[name],textarea[name]').each(function (i, item) {
        var tempValue = resource[$(item).attr('name')];
        if (tempValue != undefined) {
        //TODO: 赋值
        $(item).val(tempValue.toString() == '' ? '' : tempValue);
        } else {
        $(item).val('');
        }
        });
        } else {
        tipdialog.errorDialog("请求数据失败");
        }
        }, false);
        };

        //子表-初始化分页信息
        var tabPageInfo = tabPage();

        //子表-分页
        function tabPage() {
        var tabPageInfo = {};
        tabPageInfo.bindPageClass = function () {
        var currentPageInfo = tabPageInfo.PageInfo;
        if (currentPageInfo.HasNext) {
        $('#nextTabBtn').removeClass('disabled');
        $('#nextTabBtn').removeClass('c-gray-btn');
        $('#nextTabBtn').removeAttr('disabled');
        $('#nextTabBtn').addClass('c-green');
        $('#nextTabBtn').children(':first').removeClass('m-icon-gray');
        $('#nextTabBtn').children(':first').addClass('m-icon-white');
        } else {
        $('#nextTabBtn').addClass('disabled');
        $('#nextTabBtn').addClass('c-gray-btn');
        $('#nextTabBtn').attr("disabled", "disabled");
        $('#nextTabBtn').removeClass('c-green');
        $('#nextTabBtn').children(':first').addClass('m-icon-gray');
        $('#nextTabBtn').children(':first').removeClass('m-icon-white');
        }
        if (currentPageInfo.HasPrev) {
        $('#prevTabBtn').removeClass('disabled');
        $('#prevTabBtn').removeClass('c-gray-btn');
        $('#prevTabBtn').removeAttr('disabled');
        $('#prevTabBtn').addClass('c-green');
        $('#prevTabBtn').children(':first').removeClass('m-icon-gray');
        $('#prevTabBtn').children(':first').addClass('m-icon-white');
        } else {
        $('#prevTabBtn').addClass('disabled');
        $('#prevTabBtn').addClass('c-gray-btn');
        $('#prevTabBtn').attr("disabled", "disabled");
        $('#prevTabBtn').removeClass('c-green');
        $('#prevTabBtn').children(':first').addClass('m-icon-gray');
        $('#prevTabBtn').children(':first').removeClass('m-icon-white');
        }
        };
        //分页信息
        tabPageInfo.PageInfo = {
        IDS: [],
        Index: 0,
        PageSize: 0,
        HasPrev: false,
        HasNext: false
        };
        //初始化子页面记录数据
        tabPageInfo.initPageInfo = function (ids) {
        tabPageInfo.PageInfo.IDS = ids;
        tabPageInfo.PageInfo.Index = 0;
        tabPageInfo.PageInfo.PageSize = ids.length;
        tabPageInfo.PageInfo.HasNext = ids.length > 1;
        tabPageInfo.PageInfo.HasPrev = false;
        };
        //计算分页信息
        tabPageInfo.calculatePage = function (tag) {
        if (tag == undefined)
        return tabPageInfo.PageInfo;
        //标识
        if (tag > 0) {
        tabPageInfo.PageInfo.Index++;
        }
        else {
        tabPageInfo.PageInfo.Index--;
        }
        tabPageInfo.PageInfo.HasNext = tabPageInfo.PageInfo.PageSize > (tabPageInfo.PageInfo.Index + 1);
        tabPageInfo.PageInfo.HasPrev = tabPageInfo.PageInfo.Index > 0;
        return tabPageInfo.PageInfo;
        };

        tabPageInfo.next = function () {
        tabPageInfo.calculatePage(1);
        tabPageInfo.bindPageClass();
        };
        tabPageInfo.prev = function () {
        tabPageInfo.calculatePage(-1);
        tabPageInfo.bindPageClass();
        };

        return tabPageInfo;
        }


        //个性化代码块
        //region
        function selectCity() {
            var defaultOption = '<option value="" selected="selected">请选择</option>';
            $('#XiaQuShi, #XiaQuXian').empty().append(defaultOption);
            selectcity.setXiaQu('00000020005', { "Province": "广东" }, '#XiaQuShi', 'GetCityList', 'CityName');
            $('#XiaQuShi').change(function () {
                $('#XiaQuXian,#XiaQuZhen').empty().append(defaultOption);
                var data = { "City": $(this).val() };
                if ($(this).val() != '') {
                    ///调用接口初始化区县下拉框
                    selectcity.setXiaQu('00000020006', data, '#XiaQuXian', 'GetDistrictList', 'DistrictName');

                }
            });

            $('#XiaQuXian').change(function () {
                $('#XiaQuZhen').empty().append(defaultOption);
                var data = { "District": $(this).val() };
                if ($(this).val() != '') {
                    ///调用接口初始化区镇下拉框
                    selectcity.setXiaQu('00000020007', data, '#XiaQuZhen', 'GetTownList', 'TownName');

                }
            });
        };

        function xiaQuXinXi(resource) {
            selectcity.setXiaQu('00000020005', { "Province": "广东" }, '#XiaQuShi', 'GetCityList', 'Key', 'Key', resource.XiaQuShi);
            selectcity.setXiaQu('00000020006', { 'City': resource.XiaQuShi }, '#XiaQuXian', 'GetDistrictList', 'Key', 'Key', resource.XiaQuXian);
            if (resource.XiaQuXian) {
                selectcity.setXiaQu('00000020007', { 'District': resource.XiaQuXian }, '#XiaQuZhen', 'GetTownList', 'Key', 'Key', resource.XiaQuZhen);
            }
        };
        //endregion

        initPage();
        });
        });