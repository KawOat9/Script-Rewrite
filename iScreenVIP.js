/*
#!name=iScreen VIP ✨
#!desc=VIP Unlock & AdBlock
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!category=🔐APP
#!openUrl=
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/baiducloud.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local]
^https?:\/\/.*\.kuso\.xyz\/(api\/v1\/config|api\/v1\/user|api\/v1\/launch|tool\/account) url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/iScreenVIP.js

[mitm]
hostname = *.kuso.xyz

*/

const url = $request.url;
let obj = JSON.parse($response.body);

// 1. ส่วนจัดการ User VIP (Profile)
if (url.indexOf("/user/") !== -1 || url.indexOf("/account/") !== -1) {
    if (obj.data) {
        // สร้างข้อมูล VIP ปลอม
        obj.data.vip = {
            "type": 2, // 2 = Yearly/Lifetime
            "expireTime": 4092599349, // ปี 2099
            "isVip": 1,
            "remainDays": 99999
        };
        // สถานะทั่วไป
        obj.data.isVip = 1;
        obj.data.vipType = 2;
        obj.data.vipExpireTime = 4092599349;
    }
}

// 2. ส่วนจัดการ Config (ข้อมูลที่คุณส่งมา)
if (url.indexOf("/config/") !== -1 || url.indexOf("/launch/") !== -1 || url.indexOf("settings") !== -1) {
    if (obj.data) {
        // --- ปิดโฆษณา ---
        obj.data.noAds = 1; // 1 = ไม่มีโฆษณา
        obj.data.launchAd = 0;
        obj.data.BannerAd = 0;
        obj.data.FeedAd = 0;
        obj.data.interstitial_ad_limit = 0;
        obj.data.rewardAd = 0;
        
        // --- ปิด Popup กวนใจ ---
        obj.data.iapVipPopupEnable = 0;
        obj.data.showVipClaimViewInterval = 999999;
        obj.data.iapRetainPopupInterval = 999999;
        
        // --- ปลดล็อกฟีเจอร์ ---
        obj.data.lockscreen_noVip = ""; // ลบข้อจำกัดหน้าจอล็อก
        obj.data.ai_painting = 1; // เปิด AI วาดภาพ
        obj.data.ai_painting_wp = 1;
        
        // --- เพิ่ม Limit การใช้งาน AI ---
        if (obj.data.AI_diywp_limit) {
            obj.data.AI_diywp_limit.ad_limit = 999;
            obj.data.AI_diywp_limit.vip_limit = 999;
        }
    }
}

$done({ body: JSON.stringify(obj) });
