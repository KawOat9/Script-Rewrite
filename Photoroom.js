// 🔔 ส่วนที่ 1: ระบบแจ้งเตือน (Notification)
(function(){
    const APP_NAME = "✨ 💎ᴠɪᴘ Photoroom ✨";
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
var ojbk = JSON.parse($response.body);
ojbk.subscriber.entitlements = {
    'business': {
        'expires_date': '2333-02-23T02:33:33Z',
        'product_identifier': 'com.background.business.yearly',
        'purchase_date': '2023-02-23T02:33:33Z'
    }
};
ojbk.subscriber.original_purchase_date = '2023-02-23T03:33:33Z';
ojbk.subscriber.subscriptions = {
    'com.background.business.yearly': {
        'expires_date': '6666-06-06T06:06:06Z',
        'original_purchase_date': '2023-02-23T02:33:33Z',
        'purchase_date': '6666-06-06T06:06:06Z',
        'ownership_type': 'PURCHASED',
        'store': 'app_store'
    }
};
$done({
    'body': JSON.stringify(ojbk)
});