var SystemConfig = {
    SysId: 'D8B243FF-8194-4C45-8653-8777596231B0',
    AppId: '60E6CD47-1D26-4BC0-8B08-D85A8BDEFBE4',
    SysName: '系统名称',
    AppName: '',
    IsTest: true,
    AdaptLogin: false,
    DefaultUrl: '/Modules/BigDataGovernance/DataObject/List.html',
    LoginUrl: '/Modules/BigDataGovernance/DataObject/Index.html',
    LogoutUrl: '/Modules/BigDataGovernance/DataObject/Index.html',
    Exponent: '010001',
    Modulus: 'A85A7F6667773D8FB7013C482CDB5EFCC06A84E218454204B86CAF42313431116FBBDE0020B62EE91E970E6991340B34ED2A8C51B00B768B934BEF6E584528A7097DAD560C41F164A2A7AD8706E41C7346B5DFDD1D0E204A373A352F255BDFDD8DA4917551F3835FCEC56C72FDC8B38A783FEA8937E2C0A5B2D80750F3B7D3A9',
    ServerAgent: "http://10.0.64.249:7007/api/ServiceGateway/DataService",
    ServiceCodeTable: [
        {code: "00000030011", ver: '1.0', url: "http://10.0.64.249:7005/ValidCode"},
        {code: "00000030012", ver: '1.0', url: "#"}
    ]
};
var CwHelper = {}, overTimes = 1000 * 60 * 120;

CwHelper.AjaxData = function (request, body, ajax) {

    var token = "";

    if (!request && $.trim(request.servicecode) == "") {
        throw CwHelper.ErrorMessage.ERROR0003;
    }

    if ($.type(request) == "string") {
        request = {servicecode: request};
    }

    if ($.type(ajax) == "function") {
        var callback = ajax;
        ajax = {
            success: function (d) {
                if ($.type(d) == "string") {
                    d = CwHelper.StrToJson(d);
                }
                callback(d);
            }
        };
    }

    var publicrequest = $.extend({
        "sysid": SystemConfig.SysId,
        "reqid": CwHelper.NewGuid(),
        "protover": "1.0",
        "servicever": "1.0",
        "requesttime": CwHelper.DateFormat(new Date(), "yyyyMMddHHmmssfff"),
        "signdata": "",
        "reserve": ""
    }, request);

    var data = {publicrequest: publicrequest, body: body};

    var ajaxObj = $.extend({
        crossDomain: true,
        url: CwHelper.Route(publicrequest.servicecode, publicrequest.servicever, SystemConfig.ServerAgent),
        type: 'post',
        cache: false,
        contentType: "application/x-www-form-urlencoded",
        dataType: 'json',
        headers: {
            // "token": CwHelper.GetToken(),
            "token": "9d8cf236-94ae-469a-b9f3-b726a031651e",
            "Source-Type": "76d5f6283a57b2db",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        },
        error: function (request, status, error) {
            var errorObj = {XMLHttpRequest: request, textStatus: status, errorThrown: error};
            var bv = GetBrowserVersion();
            if (request.readyState == 0 && request.statusText.indexOf("拒绝访问") >= 0 && bv.browser == "IE" && (bv.version == 8 || bv.version == 8)) {
                alert(CwHelper.ErrorMessage.ERROR0004);
                return;
            }
            if (request.readyState == 0 && request.statusText == "error") return;
            alert(CwHelper.ErrorMessage.ERROR0002);
        },
        beforeSend: function () {
            // Metronic.blockUI({animate: true});
        },
        complete: function () {
            var token = CwHelper.GetToken();
            if (token != "" && !CwHelper.IsTokenTimeOut()) {
                var date = new Date();
                date.setTime(date.getTime() + overTimes);
                $.cookie('lastOperateTime', date, {
                    path: "/"
                });
            }
            // Metronic.unblockUI();
        }
    }, ajax, {data: data});

    return ajaxObj;
}

CwHelper.Ajax = function (request, body, ajax, login) {

    var token = "";
    if (login !== false) {
        // token = CwHelper.GetToken();
        token = "9d8cf236-94ae-469a-b9f3-b726a031651e";
        if (token == "" || CwHelper.IsTokenTimeOut()) {
            //CwHelper.Login();
            return;
        }
    }
    $.support.cors = true;
    var ajaxObj = CwHelper.AjaxData(request, body, ajax);
    ajaxObj.data = {'': CwHelper.Encode(CwHelper.JsonToStr(ajaxObj.data))};
    $.ajax(ajaxObj);
}

//???COOKIE????OKEN
CwHelper.GetToken = function () {
    var token = $.trim($.cookie('token'));
    return token;
}

CwHelper.IsTokenTimeOut = function () {
    var tokenTime = new Date($.cookie('tokenTime'));
    var lastOperateTime = new Date($.cookie('lastOperateTime'));
    var now = new Date();

    return (now.getTime() - tokenTime.getTime() > 0) &&
        (now.getTime() - lastOperateTime.getTime() > 0);
}

CwHelper.Login = function () {
    require(['login'], function (t) {
        t.ShowLogin();
    });
}

CwHelper.AdaptLogin = function (token, fn) {
    if (SystemConfig.AdaptLogin === true) {
        $.ajax({
            url: '/DefaultAdapt/Login', type: 'post', data: {'token': token}, success: function (d) {
                if (d.success) {
                    fn();
                } else {
                    alert(CwHelper.ErrorMessage.ERROR0002);
                }
            }
        });
    } else {
        fn();
    }
}

CwHelper.AdaptLogout = function (fn) {
    if (SystemConfig.AdaptLogin === true) {
        $.ajax({
            url: '/DefaultAdapt/Logout', type: 'post', data: {'token': CwHelper.GetToken()}, success: function (d) {
                if (d.success) {
                    fn();
                } else {
                    alert(CwHelper.ErrorMessage.ERROR0002);
                }
            }
        });
    }
    else {
        fn();
    }
}

CwHelper.SetToken = function (token) {
    var time = new Date();
    time.setTime(time.getTime() + overTimes)
    $.cookie('tokenTime', time, {
        path: "/"
    });
    $.cookie('lastOperateTime', time, {
        path: "/"
    });
    var token = $.cookie('token', token, {
        path: "/"
    });
}

CwHelper.Logout = function () {
    CwHelper.AdaptLogout(function () {
        $.cookie('tokenTime', '', {
            path: "/"
        });
        $.cookie('lastOperateTime', '', {
            path: "/"
        });
        $.cookie('token', '', {
            path: "/"
        });

        //redirtDefault();
        sessionStorage.clear();
        var w = top || this;
        w.location.href = SystemConfig.LoginUrl;
    });
}

CwHelper.UserMenu = function () {
    require(['menu'], function (menu) {
        var key = CwHelper.GetToken() + "Menu";
        var data = CwHelper.Storage.get(key);
        if (data) {
            menu.SetMenu(CwHelper.StrToJson(data));
        }
        else {
            CwHelper.Ajax("00000030006", {
                SysId: SystemConfig.SysId,
                AppId: SystemConfig.AppId,
                Token: CwHelper.GetToken()
            }, function (d) {
                require(['menu'], function (menu) {
                    if (d.publicresponse.statuscode == 0) {
                        menu.SetMenu(d);
                        CwHelper.Storage.set(CwHelper.GetToken() + "Menu", CwHelper.JsonToStr(d));
                    }
                });
            });
        }
    });
}

CwHelper.Header = function () {
    require(['header'], function (header) {
        CwHelper.UserInfo(function (result) {
            header.SetHeaderInfo(result);
        });
    });
}

CwHelper.Storage = (function () {
    var t = sessionStorage;
    var storage = {
        get: function (key) {
            return t.getItem(key);
        },
        set: function (key, value) {
            t.setItem(key, value);
        },
        clear: function () {
            t.clear();
        }
    };
    return storage;
})();

CwHelper.GetServerTime = function () {
    return new Date();
}

CwHelper.UserInfo = function (fn) {
    var key = CwHelper.GetToken() + "UserInfo";
    var data = CwHelper.Storage.get(key);
    if (data) {
        fn(CwHelper.StrToJson(data));
    }
    else {
        CwHelper.Ajax("00000030002", CwHelper.GetToken(), function (d) {
            if (d.publicresponse.statuscode == 0) {
                CwHelper.Storage.set(key, CwHelper.JsonToStr(d));
                fn(d);
            }

        });
    }
}

CwHelper.GetUserInfo = function () {
    var key = CwHelper.GetToken() + "UserInfo";
    var userInfoResponseStr = CwHelper.Storage.get(key);
    var userInfo = {};
    if (!!userInfoResponseStr) {
        var userInfoResponse = CwHelper.StrToJson(userInfoResponseStr)
        userInfo = userInfoResponse.body;
    }
    return userInfo;
};

CwHelper.Encode = function (str) {
    return str;
}

CwHelper.Decode = function (str) {
    return str;
}

CwHelper.JsonToStr = function (json) {
    return JSON.stringify(json);
}

CwHelper.StrToJson = function (str) {
    return JSON.parse(str);
}

CwHelper.NewGuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (match) {
            var randomNibble = Math.random() * 16 | 0;
            var nibble = (match == 'y') ?
                (randomNibble & 0x3 | 0x8) :
                randomNibble;
            return nibble.toString(16).toUpperCase();
        });
}

CwHelper.Route = function (code, ver, url) {
    var table = SystemConfig.ServiceCodeTable;
    var result = url;
    for (var i = 0; i < table.length; i++) {
        var item = table[i];
        if (item.code == code && ver == (item.ver || '1.0')) {
            result = item.url;
        }
    }

    return result;
}

Date.prototype.Format = function (fmt) {
    return CwHelper.DateFormat(this, fmt);
}

CwHelper.DateFormat = function (date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
    };
    var milliseconds = date.getMilliseconds();
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    if (/(f+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? milliseconds + '' : (("000" + milliseconds).substr(("" + milliseconds).length)));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

CwHelper.PageLogin = function () {
    try {
        var token = CwHelper.GetToken();
        var tokenTime = new Date($.cookie('tokenTime'));
        var lastOperateTime = new Date($.cookie('lastOperateTime'));
        var now = new Date();

        if (token == "") {
            redirtDefault();
            return;
        }

        if ((now.getTime() - tokenTime.getTime() > 0) &&
            now.getTime() - lastOperateTime.getTime() < 0) {

            CwHelper.Ajax('00000030005', token, function (response) {
                if (response.publicresponse.statuscode === 0 && response.body === "true") {
                    CwHelper.SetToken(token);
                } else {
                    redirtDefault();
                }
            }, false);
        } else if ((now.getTime() - tokenTime.getTime() > 0) &&
            now.getTime() - lastOperateTime.getTime() > 0) {
            redirtDefault();
        }
    } catch (error) {
        redirtDefault();
    }
}

function redirtDefault() {
    sessionStorage.clear();
    var w = top || this;
    w.location.href = SystemConfig.LoginUrl + '?ReturnUrl=' + encodeURIComponent(GetUrlRelativePath(w.location.href));
}

function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");
    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);
    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

function GetBrowserVersion() {
    var userAgent = navigator.userAgent,
        rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
        rFirefox = /(firefox)\/([\w.]+)/,
        rOpera = /(opera).+version\/([\w.]+)/,
        rChrome = /(chrome)\/([\w.]+)/,
        rSafari = /version\/([\w.]+).*(safari)/;
    var browser;
    var version;

    var ua = userAgent.toLowerCase();
    var match = rMsie.exec(ua);

    if (match != null) {
        return {browser: "IE", version: match[2] || "0"};
    }
    var match = rFirefox.exec(ua);
    if (match != null) {
        return {browser: match[1] || "", version: match[2] || "0"};
    }
    var match = rOpera.exec(ua);
    if (match != null) {
        return {browser: match[1] || "", version: match[2] || "0"};
    }
    var match = rChrome.exec(ua);
    if (match != null) {
        return {browser: match[1] || "", version: match[2] || "0"};
    }
    var match = rSafari.exec(ua);
    if (match != null) {
        return {browser: match[2] || "", version: match[1] || "0"};
    }
    return {browser: "", version: "0"};
};

var BrowserVersion = GetBrowserVersion();
CwHelper.BrowserVersion = BrowserVersion;

CwHelper.Log = function (msg) {
    if (SystemConfig.IsTest) {
        if (console && console.info) {
            console.info(msg);
        }
    }
}

CwHelper.DelayedToken = function () {
    setInterval(function () {
        var token = CwHelper.GetToken();
        if (!!token) {
            CwHelper.Ajax("00000030002", token, function (d) {
            });
        }
    }, overTimes / 2);
};

CwHelper.ErrorMessage = {
    'ERROR0001': '请重新进行登录',
    'ERROR0002': '出现网络错误，请稍后再试',
    'ERROR0003': '必须填写服务代码',
    'ERROR0004': '初次使用系统，请点击IE浏览器的的“工具->Internet 选项->安全->自定义级别”将“其他”选项中的“通过域访问数据源”选中为“启用”'
};
