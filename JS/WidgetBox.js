/*
#!name=WidgetBox Premium ✨
#!desc=Unlock all Premium features for WidgetBox
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!system=ios
#!icon=https://raw.githubusercontent.com/deezertidal/private/main/icons/xzjhz.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
# ดักจับ API ที่ใช้ตรวจสอบสถานะ Premium
^https?:\/\/widgetbox\.top\/api\/(user|subscription)\/.* url script-response-body https://raw.githubusercontent.com/KawOat9/Script-Rewrite/main/JS/WidgetBox.js

// ^https:\/\/api\.widgetbox\.top\/v1\/users\/me
// ^https:\/\/widget-box-api\.codefuture\.top\/v1\/users\/me
// hostname = widget-box-api.codefuture.top
// hostname = api.widgetbox.top

[mitm]
hostname = widgetbox.top


/* WidgetBox Premium Unlock */
let obj = JSON.parse($response.body);

// ตรวจสอบข้อมูลผู้ใช้/สมาชิก
if (obj.data) {
  obj.data.is_premium = true;
  obj.data.premium_type = "lifetime";
  obj.data.is_premium_user = true; 
  obj.data.expire_time = 4092599349000; // 2099/09/09
} 
// สำหรับ API ที่ส่งข้อมูลมาตรงๆ (ไม่มี key 'data')
else if (obj.is_premium !== undefined) {
  obj.is_premium = true;
  obj.premium_type = "lifetime";
  obj.expire_time = 4092599349000;
}

$done({ body: JSON.stringify(obj) });
