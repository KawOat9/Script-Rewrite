/*
#!name=Aloha Premium ✨
#!desc=Unlock Premium features for Aloha Browser (VPN & Downloader)
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/Mikephie/icons/main/icon/aloha.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https?:\/\/api\.alohaprofile\.com\/v1\/profile_info url script-response-body https://raw.githubusercontent.com/KawOat9/Script-Rewrite/main/JS/AlohaPremium.js

[MITM]
hostname = api.alohaprofile.com

*/
let body = $response.body;
if (!body) {
  $done({});
}

try {
  let obj = JSON.parse(body);

  if (obj.profile) {
    // 1. แก้สถานะพรีเมียมหลัก
    obj.profile.is_premium = true;
    obj.profile.has_active_paid_subscription = true; // สำคัญ! ต้องแก้ตรงนี้ด้วย
    
    // 2. ตั้งเวลาหมดอายุไปไกลๆ (ปี 2099)
    obj.profile.end_of_premium = 4092599349;
    obj.profile._end_of_premium = "2099-09-09 09:09:09.000";
    
    // 3. ปรับแต่งข้อมูลส่วนตัว
    obj.profile.email = "KawOat.DEV@gmail.com";
    obj.profile.email_verified = true;

    // 4. (ส่วนเสริม) หลอกแอพว่าซื้อมาจากการจ่ายเงินจริงๆ
    if (obj.profile.active_premium_sources) {
      obj.profile.active_premium_sources.purchase = true;
      obj.profile.active_premium_sources.manual = true;
    }
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  // ถ้า JSON มีปัญหา ให้ส่งค่าเดิมกลับไปกันแอปเด้ง
  $done({});
}