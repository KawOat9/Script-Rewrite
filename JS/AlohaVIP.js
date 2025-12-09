/*
#!name= Aloha ✨
#!desc=浏览器
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/Mikephie/icons/main/icon/aloha.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/api\.alohaprofile\.com\/v1\/profile_info url script-response-body https://raw.githubusercontent.com/KawOat9/Script-Rewrite/main/JS/AlohaVIP.js

[MITM]
hostname = api.alohaprofile.com

*/

// ===== 轻量通知 + 冷却 =====
const APP_NAME = "✨ Aloha ✨";   // ← 只改这个显示名
const ID = "aloha";              // ← 对应键名，保持纯字母数字（无 emoji）

const EN = "n:"+ID+":e";             // 开关
const TS = "n:"+ID+":t";             // 时间戳
const CD = 600000;                   // 冷却时长：10 分钟（毫秒）

// ---- 通知函数（兼容 QX / Surge / Loon）----
function notify(t,s,b){
  if (typeof $notify==="function") $notify(t,s,b);
  else if ($notification?.post) $notification.post(t,s,b);
  else console.log("[Notify]", t, s, b);
}

// ---- 判定逻辑 ----
let enabled = (($persistentStore.read(EN) || "1") === "1");
if (enabled) {
  let now  = Date.now();
  let last = parseInt($persistentStore.read(TS) || "0",10) || 0;
  if (last===0 || now-last>CD) {
    notify(APP_NAME,"✅ปลดล็อคสมาชิก 🕝พรีเมียมจนถึง 08-08-2088🌟");
    $persistentStore.write(String(now), TS);
  }
}

// 主脚本函数...
let body = $response.body;
if (!body) { $done({}); }

body = JSON.parse(body);
if (body?.profile) {
    Object.assign(body.profile, {
        is_premium: true,
        end_of_premium: 3742762088,
        email: "KawOat.DEV@gmail.com",
        _end_of_premium: "2088-08-08 08:08:08.000"
    });
}
$done({ body: JSON.stringify(body) });
// 主脚本函数...