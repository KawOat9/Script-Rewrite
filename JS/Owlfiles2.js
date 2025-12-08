/*************************************

#!name = Owlfiles2
#!desc = Owlfiles+Unlock VIP
#!author = @KawOatツ
#!openUrl = https://apps.apple.com/app/owlfiles-file-manager/id510282524
#!icon = https://raw.githubusercontent.com/deezertidal/private/main/icons/mtywj.png

**************************************

[rewrite_local]
^https:\/\/www\.skyjos\.com:58080\/ws\/loadaccountinfo url script-response-body https://raw.githubusercontent.com/KawOat9/Script-Rewrite/main/JS/Owlfiles2.js

[mitm]
hostname = www.skyjos.com:58080

*************************************/


try {
  let obj = JSON.parse($response.body);
	
  obj.memberLevel = 3;
  obj.expireAt = 4094370121000;
	
  $done({ body: JSON.stringify(obj) });
} catch (err) {
  console.log("Skyjos 解锁失败: " + err);
  $done({});
}