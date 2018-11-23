(function (root, config) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return config;
        });
    }
    else {
        root.SystemConfig = config;
    }
})(this, 
{
    SysId: '54381B83-26A9-42B1-9851-D65108DB9BA8',
    AppId: '673DFF92-140C-4CEF-90DD-FFBE0A0C12BF',
    SysName: '广东省农村客运通达情况动态监管平台',
    AppName: '',
    IsTest: true,
    AdaptLogin: false,
    DefaultUrl: '/Modules/Template/Default.html',
    LoginUrl: '/Modules/Template/Index.html',
    LogoutUrl: '/Modules/Template/Logout.html',
    Exponent: '010001',         //加密需要，Exponent参数
    Modulus: 'A85A7F6667773D8FB7013C482CDB5EFCC06A84E218454204B86CAF42313431116FBBDE0020B62EE91E970E6991340B34ED2A8C51B00B768B934BEF6E584528A7097DAD560C41F164A2A7AD8706E41C7346B5DFDD1D0E204A373A352F255BDFDD8DA4917551F3835FCEC56C72FDC8B38A783FEA8937E2C0A5B2D80750F3B7D3A9',        //加密需要，Modulus参数
    ServerAgent: "http://10.0.64.249:7007/api/ServiceGateway/DataService",
    ServiceCodeTable: [
        { code: "00090000101", ver: '1.0', url: "http://localhost:12545/api/CGDemo/RenYuan/Create" },
        { code: "00090000102", ver: '1.0', url: "http://localhost:12545/api/CGDemo/RenYuan/Update" },
        { code: "00090000103", ver: '1.0', url: "http://localhost:12545/api/CGDemo/RenYuan/Delete" },
        { code: "00090000104", ver: '1.0', url: "http://localhost:12545/api/CGDemo/RenYuan/Get" },
        { code: "00090000105", ver: '1.0', url: "http://localhost:12545/api/CGDemo/RenYuan/Query" }

        //{ code: "00090000201", ver: '1.0', url: "http://localhost:12545/api/CGDemo/XianLuZhanTingGuanXi/Create" },
        //{ code: "00090000202", ver: '1.0', url: "http://localhost:12545/api/CGDemo/XianLuZhanTingGuanXi/Update" },
        //{ code: "00090000203", ver: '1.0', url: "http://localhost:12545/api/CGDemo/XianLuZhanTingGuanXi/Delete" },
        //{ code: "00090000204", ver: '1.0', url: "http://localhost:12545/api/CGDemo/XianLuZhanTingGuanXi/Get" },
        //{ code: "00090000205", ver: '1.0', url: "http://localhost:12545/api/CGDemo/XianLuZhanTingGuanXi/Query" }
    ]
});