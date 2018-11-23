var pathStaticResource = "http://10.0.64.247:11000/StaticResource/",
    pathStaticTheme1 = pathStaticResource + "Theme1/",
    pathStaticFramework = pathStaticResource + "Framework/",
    pathStaticAssets = pathStaticResource + "Framework/Assets/",
    pathStaticPlugins = pathStaticResource + "Framework/Assets/global/plugins/",
    pathComponent = "/Modules/Component/";

require.config({
    baseUrl: '',
    paths: {
        "system": "/Modules/Config/conwin.system",
        "menu": pathComponent + "conwin.menu",
        "header": pathComponent + "conwin.header",
        "userinfo": pathComponent + "conwin.userinfo",
        "changepwd": pathComponent + "conwin.changepwd",
        'selectunit': pathComponent + "conwin.selectunit",
        "common": pathStaticTheme1 + "Js/conwin.common",
        "helper": pathStaticTheme1 + "Js/conwin.helper",
        "metronic": pathStaticAssets + "global/scripts/metronic",
        "layout": pathStaticAssets + "admin/layout/scripts/layout",
        "profile": pathStaticAssets + "admin/pages/scripts/profile",
        "bootstrap": pathStaticPlugins + "bootstrap/js/bootstrap.min",
        "jquery": pathStaticPlugins + "jquery.min",
        "jquery-migrate": pathStaticPlugins + "jquery-migrate.min",
        "jquery-ui": pathStaticPlugins + "jquery-ui/jquery-ui.min",
        "cokie": pathStaticPlugins + "jquery.cokie.min",
        "datatables": pathStaticPlugins + "datatables/media/js/jquery.dataTables.min",
        "dataTables.bootstrap": pathStaticPlugins + "datatables/plugins/bootstrap/dataTables.bootstrap",
        "bootbox": pathStaticPlugins + "bootbox/bootbox.min",
        "bootstrap-modal": pathStaticPlugins + "bootstrap-modal/js/bootstrap-modal",
        "bootstrap-toastr": pathStaticPlugins + "bootstrap-toastr/toastr.min",
        "bootstrap-modalmanager": pathStaticPlugins + "bootstrap-modal/js/bootstrap-modalmanager",
        'bootstrap3-typeahead': pathStaticPlugins + 'bootstrap3-typeahead',
        "blockui": pathStaticPlugins + "jquery.blockui.min",
        "uniform": pathStaticPlugins + "uniform/jquery.uniform.min",
        "slimscroll": pathStaticPlugins + "jquery-slimscroll/jquery.slimscroll.min",
        "respond": pathStaticPlugins + "respond.min",
        "excanvas": pathStaticPlugins + "excanvas.min",
        "sparkline": pathStaticPlugins + "jquery.sparkline.min",
        "pin": pathStaticPlugins + "jquery.pin",
        'json2': pathStaticFramework + 'Plugins/json2',
        'md5': pathStaticFramework + 'Plugins/md5',

        "bootstrap-datepicker": pathStaticPlugins + "bootstrap-datepicker/js/bootstrap-datepicker",
        "bootstrap-datetimepicker": pathStaticPlugins + "bootstrap-datetimepicker/js/bootstrap-datetimepicker.min",
        'bootstrap-datepicker.zh-CN': pathStaticPlugins + 'bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN',
        'bootstrap-datetimepicker.zh-CN': pathStaticPlugins + 'bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN',

        'login': pathComponent + "conwin.login",
        'jstree': pathStaticPlugins + 'jstree/dist/jstree.min',
        'crypto': pathStaticFramework + 'plugins/crypto/crypto',

        'valid': pathStaticTheme1 + 'UIControls/conwin.valid',
        'warning': pathStaticTheme1 + 'UIControls/conwin.warning',
        "popdialog": pathStaticTheme1 + "UIControls/conwin.popdialog",
        "customtable": pathStaticTheme1 + "UIControls/conwin.customtable",
        "areas": pathStaticTheme1 + "UIControls/conwin.areas.select",
        "prevNextpage": pathStaticTheme1 + "UIControls/conwin.prenextpage",
        'toast': pathStaticTheme1 + 'UIControls/conwin.toast',
        "tipdialog": pathStaticTheme1 + "UIControls/conwin.tipdialog",
        'textbox': pathStaticTheme1 + 'UIControls/conwin.textbox',
        'textarea': pathStaticTheme1 + 'UIControls/conwin.textarea',
        'radio': pathStaticTheme1 + 'UIControls/conwin.radio',
        'checkbox': pathStaticTheme1 + 'UIControls/conwin.checkbox',
        'button': pathStaticTheme1 + 'UIControls/conwin.button',
        'dropdown': pathStaticTheme1 + 'UIControls/conwin.dropdown',
        "selectcity": pathStaticTheme1 + "UIControls/conwin.selectcity",
        "formcontrol": pathStaticTheme1 + 'UIControls/conwin.formcontrol',
        "tableheadfix": pathStaticTheme1 + "UIControls/conwin.tableheadfix",
        'permission': pathStaticTheme1 + "UIControls/conwin.permission",
        "amap": "http://webapi.amap.com/maps?v=1.3&key=345ddb6f152258898bd22913c4132a6c&&plugin=AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.MouseTool,AMap.Geocoder,AMap.DistrictSearch,AMap.Driving&callback=init",
        'map': pathStaticTheme1 + 'UIControls/conwin.gdmap',
        'CbersMap': pathComponent + 'CbersMap/javascript/conwin.components.gis',
        'Cbers': pathComponent + 'CbersMap/javascript/CbersMap',
        'vms': pathComponent + 'CbersMap/javascript/vms',
        'mapUI': 'http://webapi.amap.com/ui/1.0/main-async',
        'bootstrap-switch': pathStaticPlugins + 'bootstrap-switch/js/bootstrap-switch.min',
        'fileupload': pathStaticResource + "Theme1/UIControls/conwin.fileupload",
        "searchbox": pathStaticResource + "/Theme1/UIControls/conwin.searchbox",
        'filelist': pathStaticResource + "Theme1/UIControls/conwin.filelist"


    },
    shim: {
        'vms': {
            deps: ['jquery', 'Cbers']
        },
        'CbersMap': {
            deps: ['jquery', 'Cbers', 'vms']
        },
        "helper": {
            deps: ['system', 'cokie'],
        },
        "jquery-migrate": ['jquery'],
        "pin": ['jquery'],
        "jquery-ui": ['jquery', 'jquery-migrate'],
        "uniform": ['jquery', 'jquery-migrate'],
        "layout": {
            deps: ['jquery', 'jquery-migrate', 'metronic'],
            exports: "Layout"
        },
        "queueutility": ['jquery', 'jquery-migrate'],
        'dataTables.bootstrap': {
            deps: ['jquery', 'jquery-migrate', 'bootstrap', 'datatables']
        },
        "customtable": {
            deps: ['dataTables.bootstrap', 'helper', 'uniform']
        },
        "blockui": {
            deps: ['jquery', 'bootstrap-toastr'],
            exports: 'jquery.blockui'
        },
        "metronic": {
            deps: ['jquery', 'jquery-migrate', 'bootstrap', 'bootstrap-toastr', 'blockui', 'slimscroll'],
            exports: "Metronic"
        },
        "bootstrap": ['jquery', 'jquery-migrate'],
        "bootstrap-modal": {
            deps: ['jquery', 'jquery-migrate', 'bootstrap'],
            exports: "Modal"
        },
        "bootstrap-modalmanager": {
            deps: ['jquery', 'jquery-migrate', 'bootstrap'],
            exports: "ModalManager"
        },
        "bootbox": {
            deps: ['jquery', 'jquery-migrate', 'bootstrap'],
            exports: "bootbox"
        },
        "popdialog": {
            deps: ['jquery', 'jquery-migrate', 'bootstrap']
        },
        "tipdialog": {
            deps: ['jquery', 'jquery-migrate', 'bootstrap', "bootstrap-modal", "bootstrap-modalmanager"]
        },
        "slimscroll": {
            deps: ['jquery']
        },
        "bootstrap-datepicker": {
            deps: ['jquery']
        },
        "bootstrap-datetimepicker": {
            deps: ['jquery']
        },
        "bootstrap-datepicker.zh-CN": {
            deps: ['bootstrap-datepicker']
        },
        "bootstrap-datetimepicker.zh-CN": {
            deps: ['bootstrap-datetimepicker']
        }
    }
});

require(['jquery', 'helper'], function ($, t) {

    if (t.BrowserVersion.browser == "IE" && t.BrowserVersion.version == 8) {
        require(['respond', 'excanvas']);
    };

    //无需登录页面需加标记：<meta property="login" content="false" />
    if ($("meta[property=login]").attr('content') !== 'false') {
        t.PageLogin();
    };

    if ($('.page-sidebar-icon').length > 0 && $('.page-sidebar-menu').length == 0) {
        t.UserMenu();
    };

    if ($('.page-header-inner').length > 0 && $('.page-sidebar-menu .row').length == 0) {
        t.Header();
    };

});
