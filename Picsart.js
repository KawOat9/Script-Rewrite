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

// 🔔 ส่วนที่ 1: ระบบแจ้งเตือน (Notification)
(function(){
    const APP_NAME = "✨ Picsart Gold ✨";
    const MSG_SUCCESS = "✅ ปลดล็อคสำเร็จ! หมดอายุ: 2099-08-08";
    const MSG_FAIL = "❌ ปลดล็อคล้มเหลว";
    const ENABLE_NOTIFY = true;
    const COOLDOWN = 10; // แจ้งเตือนทุก 10 นาที
    const KEY = "n_" + APP_NAME.replace(/[^\w]/g,"").toLowerCase() + "_t";
    const P = typeof $prefs !== "undefined";
    const S = typeof $persistentStore !== "undefined";

    function read(k) { try { if(P) return $prefs.valueForKey(k); if(S) return $persistentStore.read(k); } catch(e){} return null; }
    function write(k, v) { try { if(P) return $prefs.setValueForKey(String(v), k); if(S) return $persistentStore.write(String(v), k); } catch(e){} }
    function canNotify() { let t = parseInt(read(KEY)||"0", 10)||0; return COOLDOWN===0 || Date.now()-t > COOLDOWN*60000; }
    function markTime() { write(KEY, Date.now()); }
    function send(title, msg) {
        console.log(`[${title}] ${msg}`);
        if(!ENABLE_NOTIFY) return;
        try {
            if(typeof $notify === "function") $notify(title, "", msg);
            else if(typeof $notification !== "undefined" && $notification.post) $notification.post(title, "", msg);
        } catch(e) { console.log("[NotifyErr]", e); }
    }

    try {
        if ($response && $response.body) {
            if (canNotify()) {
                send(APP_NAME, MSG_SUCCESS);
                markTime();
            } else {
                console.log(`[${APP_NAME}] ⏳ Cooldown (${COOLDOWN}min)`);
            }
        } else {
            send(APP_NAME, "⚠️ ตรวจไม่พบ Response Body");
        }
    } catch (err) {
        send(APP_NAME, MSG_FAIL + " " + err);
    }
})();

// 🔔 ส่วนที่ 2: สคริปต์ปลดล็อก (Unlock Script)
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