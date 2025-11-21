/*************************************

#!name = Owlfiles1
#!desc = Owlfiles+Unlock VIP
#!author = @KawOatツ
#!openUrl = https://t.cn/A6Kotbjs
#!icon = https://raw.githubusercontent.com/deezertidal/private/main/icons/mtywj.png

**************************************

[rewrite_local]
^https:\/\/www\.skyjos\.com url script-response-body https://raw.githubusercontent.com/KawOat9/Script-Rewrite/main/JS/Owlfiles1.js

[mitm]
hostname = www.skyjos.com

*************************************/


body = $response.body.replace(/\"memberLevel":(.*?)/g, '\"memberLevel":3').replace(/\"succ":"(.*?)"/g, '\"succ":"true"').replace(/\"dispName":"(.*?)"/g, '\"dispName":"KawOat Dev"').replace(/\"expireAt":"(.*?)"/g, '\"expireAt":"4099995295000"')

$done({body});