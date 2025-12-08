/*
#!name=Windy.com ✨
#!desc=解锁本地VIP
#!category=🔐APP
#!author=KawOat
#!icon=https://raw.githubusercontent.com/KawOat9/Script-Rewrite/main/App-Icon/Windy.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https?:\/\/account\.windy\.com\/api\/info url script-response-body https://raw.githubusercontent.com/KawOat9/Script-Rewrite/main/JS/Windy.com.js

[mitm]
hostname = account.windy.com

*/
let response = JSON.parse($response.body);

response.subscriptionInfo = {
  status: 'active',
  isTrial: false,
  platform: 'apple',
  tier: 'premium',
  expiresAt: 4094370121000,
  state: 'ok',
  isSubscription: true
};

response.subscription = 'premium';
response.auth = true;
response.message = 'ok';
response.token = '';

$done({ body: JSON.stringify(response) });