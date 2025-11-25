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
    'accountRegistTime': 0x0,
    'connectedWeixin': true,
    'externalUid': '',
    'uid': 0x929,
    'expireAt': 0x3ba9ac35d18,
    'memberLevel': 0x3,
    'connectedGoogle': false,
    'dispName': '彭于晏破解',
    'errorMessage': '',
    'connectedApple': false,
    'errorCode': 0x0,
    'withoutPasswd': true,
    'email': 'o1Ow468gukJcgpBU3VQbGeqMk3GU@wx',
    'succ': true,
    'lastPasswordModifiedTime': 0x184d89acd72
};
$done({
    'body': JSON.stringify(objc)
});.toString()