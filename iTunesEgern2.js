/*
#!name=iTunesEgern ✨
#!desc=Unlock Collection 
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/iTunesStore.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]

# iTunes Receipt
^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/iTunesEgern2.js

[mitm]
hostname = buy.itunes.apple.com
*/

// 🔔 ส่วนจัดการแจ้งเตือน (Notification Module)
(function(){
    const APP_NAME = "✨ iTunes Egern Unlock ✨";
    const EXP_DATE = "2999-09-09"; // 🗓️ โชว์ในแจ้งเตือน
    const ENABLE_NOTIFY = true;
    const COOLDOWN = 10; // นาที
    const KEY = "n_itunes_egern_t";
    
    // Check Env
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
                send(APP_NAME, `✅ ปลดล็อคสำเร็จ! หมดอายุ: ${EXP_DATE}`);
                markTime();
            }
        }
    } catch (err) {
        // ignore errors
    }
})();

// 🔓 ส่วนปลดล็อกหลัก (Main Logic)
// -------------------------------------------------
// ⚙️ ตั้งค่าวันหมดอายุที่นี่ (Config)
const exp_str = "2999-09-09 09:09:09 Etc/GMT"; 
const exp_ms  = "32474944537000"; // Timestamp ของปี 2999
// -------------------------------------------------

let obj = {
  "status": 0,
  "receipt": {
    "receipt_type": "Production",
    "app_item_id": 1247478067,
    "receipt_creation_date": "2024-01-01 00:00:00 Etc/GMT",
    "bundle_id": "com.floatcamellia.hfrslowmotion",
    "original_purchase_date": "2024-01-01 00:00:00 Etc/GMT",
    "in_app": [
      {
        "quantity": "1",
        "purchase_date_ms": "1672531200000",
        "expires_date": exp_str,        // ✅ ใช้วันที่กำหนดข้างบน
        "expires_date_pst": "2999-09-09 02:09:09 America/Los_Angeles",
        "is_in_intro_offer_period": "false",
        "transaction_id": "490001314520000",
        "is_trial_period": "false",
        "original_transaction_id": "490001314520000",
        "purchase_date": "2023-01-01 09:09:09 Etc/GMT",
        "product_id": "com.floatcamellia.hfrslowmotion.yearly",
        "original_purchase_date_pst": "2023-01-01 02:09:10 America/Los_Angeles",
        "in_app_ownership_type": "PURCHASED",
        "original_purchase_date_ms": "1672531200000",
        "web_order_line_item_id": "490000123456789",
        "expires_date_ms": exp_ms,      // ✅ ใช้ Timestamp ปี 2999
        "purchase_date_pst": "2023-01-01 02:09:09 America/Los_Angeles",
        "original_purchase_date": "2023-01-01 09:09:10 Etc/GMT"
      }
    ],
    "adam_id": 1247478067,
    "receipt_creation_date_pst": "2024-01-01 00:00:00 America/Los_Angeles",
    "request_date": "2024-01-01 00:00:00 Etc/GMT",
    "request_date_pst": "2024-01-01 00:00:00 America/Los_Angeles",
    "version_external_identifier": 863314980,
    "request_date_ms": "1704067200000",
    "original_purchase_date_pst": "2023-01-01 00:00:00 America/Los_Angeles",
    "application_version": "999",
    "original_purchase_date_ms": "1672531200000",
    "receipt_creation_date_ms": "1704067200000",
    "original_application_version": "1.0",
    "download_id": 503226333846907953
  },
  "latest_receipt_info": [
    {
      "quantity": "1",
      "purchase_date_ms": "1672531200000",
      "expires_date": exp_str,          // ✅ ใช้วันที่กำหนดข้างบน
      "expires_date_pst": "2999-09-09 02:09:09 America/Los_Angeles",
      "is_in_intro_offer_period": "false",
      "transaction_id": "490001314520000",
      "is_trial_period": "false",
      "original_transaction_id": "490001314520000",
      "purchase_date": "2023-01-01 09:09:09 Etc/GMT",
      "product_id": "com.floatcamellia.hfrslowmotion.yearly",
      "original_purchase_date_pst": "2023-01-01 02:09:10 America/Los_Angeles",
      "in_app_ownership_type": "PURCHASED",
      "original_purchase_date_ms": "1672531200000",
      "web_order_line_item_id": "490000123456789",
      "expires_date_ms": exp_ms,        // ✅ ใช้ Timestamp ปี 2999
      "purchase_date_pst": "2023-01-01 02:09:09 America/Los_Angeles",
      "original_purchase_date": "2023-01-01 09:09:10 Etc/GMT"
    }
  ],
  "latest_receipt": "VGhpcyBpcyBhIGZha2UgcmVjZWlwdCBieSBLYXdPYXQ5",
  "environment": "Production",
  "pending_renewal_info": [
    {
      "product_id": "com.floatcamellia.hfrslowmotion.yearly",
      "original_transaction_id": "490001314520000",
      "auto_renew_product_id": "com.floatcamellia.hfrslowmotion.yearly",
      "auto_renew_status": "1"
    }
  ]
};

// Logic เปลี่ยน ID ตามแอปที่เปิด (Dynamic App Switcher)
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const list = {
  'TimeCut': { bid: 'com.floatcamellia.hfrslowmotion', pid: 'com.floatcamellia.hfrslowmotion.yearly' },
  'oldroll': { bid: 'com.zijayrate.analogcam', pid: 'com.zijayrate.analogcam.vipforever2' },
  'InstaShot': { bid: 'com.camerasideas.InstaShot', pid: 'com.camerasideas.InstaShot.InShotPro_monthly' },
  'Mp3ConverterNew': { bid: 'com.hemin.mp42mp3', pid: 'com.hemin.mp42mp3.upgradeYear1' },
  'MotionNinja': { bid: 'com.floatcamellia.motionninja', pid: 'com.floatcamellia.motionninja.yearpro' },
};

for (const i in list) {
  if (new RegExp(`^${i}`, `i`).test(ua)) {
    obj.receipt.bundle_id = list[i].bid;
    obj.receipt.in_app[0].product_id = list[i].pid;
    obj.latest_receipt_info[0].product_id = list[i].pid;
    obj.pending_renewal_info[0].product_id = list[i].pid;
    obj.pending_renewal_info[0].auto_renew_product_id = list[i].pid;
    break;
  }
}

$done({ body: JSON.stringify(obj) });