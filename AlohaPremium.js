/*
#!name=Aloha Premium ✨
#!desc=Aloha Browser(VPN) Unlock
#!category=🔐APP
#!system=ios
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Aloha.png
#!openUrl=https://apps.apple.com/app/id1105317682
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https?:\/\/api\.alohaprofile\.com\/v1\/profile_info url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/AlohaPremium.js

[MITM]
hostname = api.alohaprofile.com

*/

//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="ᯓ★ Aloha Premium ×̷̷͜×̷",M_OK="🔓ปลดล็อคสำเร็จ，สิ้นสุด：2088-08-08",M_ERR="❌ ปลดล็อคล้มเหลว",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ สำเร็จ",M_OK);mark()}else console.log(`[${A}] ⏳ CoolDown(${CD}min)`)}else{send("⚠️ อาจจะพลาดไป","ตรวจไม่พบ $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...

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
    obj.profile.end_of_premium = 4092602949;
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