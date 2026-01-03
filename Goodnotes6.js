/*
 * GoodNotes 6 Premium Unlock
 * ปลดล็อกฟีเจอร์ GoodNotes 6 ครบทุก Entitlement
 */

/**************************************

[rewrite_local]
^https:\/\/isi\.csan\.goodnotes\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Goodnotes6.js
^https:\/\/isi\.csan\.goodnotes\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/KawOat9/Scripts/main/Goodnotes6.js

[mitm]
hostname = isi.csan.goodnotes.com

*************************************/




const obj = JSON.parse($response.body);

// กำหนดวันที่ให้เป็นปัจจุบันและอนาคต
const now = new Date();
const now_ms = now.getTime();
const now_iso = now.toISOString();
const exp_date = "2222-12-22T22:22:22Z"; // วันหมดอายุในอนาคต

// รายชื่อสิทธิ์ทั้งหมดที่ GoodNotes 6 ใช้ (รวมจาก JSON ของคุณ)
const entitlements_list = [
    "apple_access",
    "gnc_access",
    "premium",
    "ai_premium_202504",
    "pro_access",
    "crossplatform_access",
    "ai_t1_access",
    "gn5",
    "apple_access_pro" // เผื่อไว้
];

// รายชื่อ Product ID ที่ใช้
const product_id_map = {
    "apple_access": "com.goodnotes.gn6_one_time_unlock_3999",
    "gnc_access": "com.goodnotes.pro_7dt_1y_3599",
    "premium": "com.goodnotes.premium_7dt",
    "ai_premium_202504": "com.goodnotes.plus.ai.premium_7dt_1y_2999",
    "pro_access": "com.goodnotes.pro_7dt_1y_3599",
    "crossplatform_access": "com.goodnotes.premium_7dt",
    "ai_t1_access": "com.goodnotes.ai_pass_7dt_1mo_999_alt",
    "gn5": "com.goodnotes.one_time_unlock"
};

// เตรียม Object สำหรับ Entitlements และ Subscriptions
const entitlements = {};
const subscriptions = {};

entitlements_list.forEach(name => {
    const pid = product_id_map[name] || "com.goodnotes.premium_yearly";
    
    // สร้าง Entitlement
    entitlements[name] = {
        "ownership_type": "PURCHASED",
        "product_identifier": pid,
        "is_sandbox": false,
        "expires_date": exp_date,
        "original_purchase_date": "2023-01-01T00:00:00Z",
        "purchase_date": now_iso,
        "store": "app_store"
    };

    // สร้าง Subscription ที่สอดคล้องกัน
    subscriptions[pid] = {
        "store": "app_store",
        "purchase_date": now_iso,
        "ownership_type": "PURCHASED",
        "original_purchase_date": "2023-01-01T00:00:00Z",
        "is_sandbox": false,
        "expires_date": exp_date
    };
});

// ยัดข้อมูลใส่กลับเข้าไปใน Response
if (obj.subscriber) {
    obj.request_date = now_iso;
    obj.request_date_ms = now_ms;
    obj.subscriber.entitlements = entitlements;
    obj.subscriber.subscriptions = subscriptions;
    obj.subscriber.last_seen = now_iso;
}

$done({ body: JSON.stringify(obj) });
