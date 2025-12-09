{
  "profile": {
    "id": 4512886,
    "has_2fa": false,
    "has_active_paid_subscription": false,
    "is_referral_program_available": true,
    "end_of_premium": 3742762088,
    "can_mint": false,
    "is_premium": true,
    "email_verified": true,
    "_end_of_premium": "2088-08-08 08:08:08.000",
    "end_of_premium_types": [],
    "has_oauth": true,
    "active_premium_sources": {
      "promocode": false,
      "manual": false,
      "purchase": false,
      "churn": false,
      "other": false,
      "boost": false,
      "referral": false,
      "nft": false
    },
    "properties": {},
    "token": "93137847d4f3ef6a2c1d25e364e45582",
    "email": "KawOat.DEV@gmail.com",
    "free_premium_expires_soon": false
  },
  "error": null
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

var body = $response.body;
var obj = JSON.parse(body);

obj.profile.is_premium = true,
obj.profile.end_of_premium = 1883639265,
obj.profile._end_of_premium = "2029-09-09 17:07:45"


body = JSON.stringify(obj);
$done({body});