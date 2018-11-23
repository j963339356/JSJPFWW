define(['/Modules/Config/conwin.main.js'], function () {
        require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'filelist', 'metronic', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity, filelist, Metronic) {

        var initPage = function () {

        var tabFlag = false;

        common.AutoFormScrollHeight('#Form1');
        common.AutoFormScrollHeight('#Form2');
        formcontrol.initial();
        initData();

        //保存
        $('#saveBtn').on('click', function (e) {
        e.preventDefault();
        var flags = formcontrol.buttonValid();
        if (flags) {
        save();
        }
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

        //tab2
        $('#tab2').click(function (e) {
        if ($('#tab2').parent('li').hasClass('active')) {
        e.preventDefault();
        } else {
        if (!tabFlag) {
        tipdialog.alertMsg('请先点击暂存/保存按钮!', function () {
        $('#tab2').parent('li').removeClass('active');
        $('#tab1').parent('li').addClass('active');
        $('#ZiBiaoXinXi').removeClass('active in');
        $('#JiChuXinXi').addClass('active in');
        });
        if ($('.bootbox-body').html() == '请先点击暂存/保存按钮!') {
        $('.bootbox-close-button').click(function () {
        $('#tab2').parent('li').removeClass('active');
        $('#tab1').parent('li').addClass('active');
        $('#ZiBiaoXinXi').removeClass('active in');
        $('#JiChuXinXi').addClass('active in');
        });
        }
        } else {
        $('#ZiBiaoXinXi').addClass('active in');
        $('#JiChuXinXi').removeClass('active in');
        }
        }
        });

        //tab3
        $('#tab3').click(function (e) {
        if ($('#tab3').parent('li').hasClass('active')) {
        e.preventDefault();
        } else {
        if (!tabFlag) {
        tipdialog.alertMsg('请先点击暂存/保存按钮!', function () {
        $('#tab3').parent('li').removeClass('active');
        $('#tab1').parent('li').addClass('active');
        $('#FuJian').removeClass('active in');
        $('#JiChuXinXi').addClass('active in');
        });
        if ($('.bootbox-body').html() == '请先点击暂存/保存按钮!') {
        $('.bootbox-close-button').click(function () {
        $('#tab3').parent('li').removeClass('active');
        $('#tab1').parent('li').addClass('active');
        $('#FuJian').removeClass('active in');
        $('#JiChuXinXi').addClass('active in');
        });
        }
        } else {
        $('#FuJian').addClass('active in');
        $('#JiChuXinXi').removeClass('active in');
        }
        }
        });

        //个性化代码块
        //region
		selectCity();

        $('.datetimepicker').datetimepicker({
        language: 'zh-CN',
        startView: 1,
        maxView: 0,
        format: 'hh:ii',
        autoclose: true//选中之后自动隐藏日期选择框
        });
        //endregion
        };

        //初始化表单数据
        function initData() {
        $('#Id').val(helper.NewGuid());
        };

        //保存
        function save() {
        //TODO: 校验数据
        var jsonData1 = $('#Form1').serializeObject();
        //调用新增接口
        helper.Ajax("00090000101", jsonData1, function (data) {
        if (data.body) {
        toast.success("档案保存成功");
        window.parent.document.getElementById('hdIDS').value = jsonData1.Id;
        setTimeout(function () { window.location.href = "Edit.html"; }, 800);
        }
        else {
        tipdialog.alertMsg("档案保存失败");
        }
        }, false);
        };

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
        //endregion

        initPage();
        });
        });
