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

// 🔔 ส่วนที่ 1: ระบบแจ้งเตือน (Notification)
(function(){
    const APP_NAME = "✨ Apowersoft ✨";
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

// 主脚本函数...
var ddgksf2013={status:200,message:"success",data:{group_expired_at:0,is_tried:0,max_devices:1,period_type:"active",candy_expired_at:0,pending:0,remained_seconds:0,limit:0,expired_at:4045798296,candy:0,license_type:"premium",quota:0,status:1,coin:100}};$done({body:JSON.stringify(ddgksf2013)});