var CwHelper1 = {}, overTimes = 1000 * 60 * 120;
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
        {code: "00000030011", ver: '1.0', url: "http://10.0.64.249:7005/ValidCode"}
    ]
};

CwHelper1.SystemConfig = SystemConfig;

CwHelper1.SetToken = function (token,id_card,name,passwordLogin) {
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
    var id_card = $.cookie('id_card', id_card, {
        path: "/"
    });
    var name = $.cookie('name', name, {
        path: "/"
    });
    var passwordLogin = $.cookie('passwordLogin', passwordLogin, {
        path: "/"
    });
}

CwHelper1.Logout = function () {
    
        $.cookie('tokenTime', '', {
            path: "/"
        });
        $.cookie('lastOperateTime', '', {
            path: "/"
        });
        $.cookie('token', '', {
            path: "/"
        });
        $.cookie('id_card', '', {
            path: "/"
        });
        $.cookie('name', '', {
            path: "/"
        });
        $.cookie('passwordLogin', '', {
            path: "/"
        });
    };
