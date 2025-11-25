/*************************************

#!name = Owlfiles2
#!desc = Owlfiles+Unlock VIP
#!author = @KawOatツ
#!openUrl = https://t.cn/A6Kotbjs
#!icon = https://raw.githubusercontent.com/deezertidal/private/main/icons/mtywj.png

**************************************

[rewrite_local]
^https:\/\/www\.skyjos\.com:58080\/ws\/loadaccountinfo url script-response-body https://raw.githubusercontent.com/KawOat9/Script-Rewrite/main/JS/Owlfiles2.js

[mitm]
hostname = www.skyjos.com:58080

*************************************/


var objc = JSON.parse($response.body);
objc = {
    'accountRegistTime': 0,
    'connectedWeixin': true,
    'externalUid': '',
    'uid': 2345,
    'expireAt': 4099995295000,
    'memberLevel': 3,
    'connectedGoogle': false,
    'dispName': 'KawOatDev',
    'errorMessage': '',
    'connectedApple': false,
    'errorCode': 0,
    'withoutPasswd': true,
    'email': 'o1Ow468gukJcgpBU3VQbGeqMk3GU@wx',
    'succ': true,
    'lastPasswordModifiedTime': 1670081334642
};
$done({
    'body': JSON.stringify(objc)
});.toString()