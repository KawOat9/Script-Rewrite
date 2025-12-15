/*
#!name=StepsApp✨
#!desc=Unlock Pro
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Photoroom.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/StepsApp.js
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-request-header https://raw.githubusercontent.com/KawOat9/Scripts/main/StepsApp.js

[mitm] 
hostname = api.revenuecat.com
*/

/* StepsApp Premium Unlock (Updated with Real IDs) */
var obj = JSON.parse($response.body);

// ใช้ ID ที่ได้จาก JSON ของคุณ
const product_id = "app.steps.stepsapp.premium.yearTrial.tier1";
const entitlement_id = "stepsapp_pedometer_premium_1_year";

if (obj && obj.subscriber) {
  const data = {
    "expires_date": "2099-09-09T09:09:09Z",
    "original_purchase_date": "2024-08-19T12:15:43Z",
    "purchase_date": "2024-08-19T12:15:43Z",
    "product_identifier": product_id,
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };

  // 1. แก้ไข Entitlements (ส่วนสำคัญที่สุด)
  obj.subscriber.entitlements = {
    [entitlement_id]: {
        ...data,
        "grace_period_expires_date": null
    }
  };

  // 2. แก้ไข Subscriptions
  obj.subscriber.subscriptions = {
    [product_id]: {
      ...data,
      "period_type": "normal", // เปลี่ยนจาก trial เป็น normal เพื่อให้ดูเหมือนซื้อจริง
      "is_sandbox": false,
      "store_transaction_id": "710001752733822"
    }
  };
}

$done({ body: JSON.stringify(obj) });