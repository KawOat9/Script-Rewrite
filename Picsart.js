/******************************

#!name=Picsart ✨
#!desc=Unlock Picsart Gold
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!openUrl=https://apps.apple.com/app/id587366035
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Picsart.png
#!category=🔐APP

*******************************

[rewrite_local]

https://api.picsart.com/gw-v2/shop/subscription/apple/purchases url script-required-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Picsart.js


[mitm] 
hostname = api.picsart.com

*******************************/

//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨Picsart Gold✨",M_OK="หมดอายุ: 2099-09-09",M_ERR="❌ ปลดล็อคล้มเหลว",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ ปลดล็อคสำเร็จ!",M_OK);mark()}else console.log(`[${A}] ⏳ Cooldown(${CD}min)`)}else{send("⚠️ ตรวจไม่พบ $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...
let objc = {
  "status" : "success",
  "response" : [
    {
      "is_eligible_for_grant" : true,
      "limitation" : {
        "max_count" : 10,
        "limits_exceeded" : false
      },
      "expire_date" : 4093902846000,
      "order_id" : "160001326559771",
      "purchase_date" : 1663982350000,
      "original_order_id" : "160001326559771",
      "reason" : "ok",
      "is_eligible_for_introductory" : false,
      "subscription_id" : "com.picsart.studio.subscription_plus_yearly",
      "is_trial" : false,
      "status" : "SUBSCRIPTION_PURCHASED",
      "plan_meta" : {
        "product_id" : "subscription_plus_yearly",
        "frequency" : "yearly",
        "scope_id" : "full",
        "id" : "com.picsart.studio.subscription_plus_yearly",
        "storage_limit_in_mb" : 5120,
        "level" : 1500,
        "type" : "renewable",
        "description" : "plus",
        "tier_id" : "gold_old",
        "permissions" : [
          "premium_tools_standard",
          "premium_tools_ai"
        ]
      }
    }
  ]
}
$done({ response: {body: JSON.stringify(objc),status: 200} });