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


var body = $response.body.replace(/\"memberLevel":(.*?)/g, '\"memberLevel":3')
                         .replace(/\"succ":"(.*?)"/g, '\"succ":"true"')
                         .replace(/\"dispName":"(.*?)"/g, '\"dispName":"KawOatDev"')
                         .replace(/\"expireAt":"(.*?)"/g, '\"expireAt":"4092599349000"');
$done({body});