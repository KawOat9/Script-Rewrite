/*        
#!name=Alarmy 2 ✨
#!desc=UnlockVIP
#!category=🔐APP
#!system=ios
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ

𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local] 

^https?:\/\/ars\.alar\.my\/api\/v2\/user\/sync url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/alarmy-2.js

[MITM]
hostname = ars.alar.my


*/
//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨Alarmy 2✨",M_OK="หมดอายุ: 2099-09-09",M_ERR="❌ ปลดล็อคล้มเหลว",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ ปลดล็อคสำเร็จ!",M_OK);mark()}else console.log(`[${A}] ⏳ Cooldown(${CD}min)`)}else{send("⚠️ ตรวจไม่พบ $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...
;let obj=JSON.parse($response.body);obj.subscription=[{"originalTransactionID":"","productID":"droom.sleepIfUCanFree.premium.yearly01.4","willAutoRenew":true,"isActive":true,"expiresDateMs":4092610661000,"periodType":"TRIAL","latestPurchaseDateMs":1651590191000,"originalPurchaseDateMs":1651590191000}],$done({body:JSON.stringify(obj)});;