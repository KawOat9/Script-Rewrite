/*
#!name=deleteHeader ✨
#!desc=Remove RevenueCat ETag with Notification
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
*/

const version = 'V1.0.3';
const targetHeader = "X-RevenueCat-ETag";
const notiTitle = "🛡️ Delete Header";

// ---------------------------------------
// 🔔 ส่วนจัดการแจ้งเตือน (Anti-Spam Logic)
// ---------------------------------------
const COOLDOWN = 10; // นาที (แจ้งเตือนแค่ 1 ครั้งใน 10 นาที)
const KEY = "last_notify_time_deleteheader";

function notify(msg) {
    const now = Date.now();
    let last = 0;
    
    // อ่านค่าเวลาล่าสุดจาก Storage
    if (typeof $prefs !== "undefined") last = $prefs.valueForKey(KEY) || 0; // Shadowrocket
    else if (typeof $persistentStore !== "undefined") last = $persistentStore.read(KEY) || 0; // Surge/QuanX
    
    // ตรวจสอบเวลา (Cooldown)
    if (now - last > COOLDOWN * 60 * 1000) {
        // ส่งแจ้งเตือน
        if (typeof $notification !== "undefined") {
            $notification.post(notiTitle, "", msg);
        } else if (typeof $notify !== "undefined") {
            $notify(notiTitle, "", msg);
        }
        console.log(`[${notiTitle}] ${msg}`);

        // บันทึกเวลาล่าสุด
        if (typeof $prefs !== "undefined") $prefs.setValueForKey(String(now), KEY);
        else if (typeof $persistentStore !== "undefined") $persistentStore.write(String(now), KEY);
    } else {
        console.log(`[${notiTitle}] Skipped notification (Cooldown)`);
    }
}

// ---------------------------------------
// ⚙️ ส่วนการทำงานหลัก (Main Logic)
// ---------------------------------------
var modifiedHeaders = $request.headers;
var found = false;

// วนลูปหา Header (Case-Insensitive) เพื่อลบค่า
for (var key in modifiedHeaders) {
    if (key.toLowerCase() === targetHeader.toLowerCase()) {
        modifiedHeaders[key] = ""; // หรือใช้ delete modifiedHeaders[key]; ก็ได้
        found = true;
    }
}

// ถ้าเจอและลบสำเร็จ ให้ส่งแจ้งเตือน
if (found) {
    notify(`Cleaned: ${targetHeader} 🧹`);
}

$done({headers: modifiedHeaders});