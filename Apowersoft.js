/***********************************

#!name=Apowersoft ✨
#!desc=ApowersoftProCrack
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!openUrl=https://apps.apple.com/app/id1490054676
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Apowersoft.png
#!category=🔐APP
 
[rewrite_local]
^https?:\/\/.*aoscdn\.com\/base\/vip\/v\d\/vips url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Apowersoft.js

[mitm] 
hostname=*.aoscdn.com

***********************************/

//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨Apowersoft✨",M_OK="หมดอายุ: 2099-09-09",M_ERR="❌ ปลดล็อคล้มเหลว",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ ปลดล็อคสำเร็จ!功",M_OK);mark()}else console.log(`[${A}] ⏳ Cooldown(${CD}min)`)}else{send("⚠️ ตรวจไม่พบ $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...
var ddgksf2013={status:200,message:"success",data:{group_expired_at:0,is_tried:0,max_devices:1,period_type:"active",candy_expired_at:0,pending:0,remained_seconds:0,limit:0,expired_at:4092602949,candy:0,license_type:"premium",quota:0,status:1,coin:100}};$done({body:JSON.stringify(ddgksf2013)});