/*
 * Imgur Emerald Unlock
 * ปลดล็อกพรีเมียม ลบโฆษณา
 
 [rewrite_local]
 # ปลดล็อก Imgur Emerald (Premium)
^https?:\/\/api\.imgur\.com\/account\/v1\/purchase\/apple\/verifyReceipt url script-response-body https://raw.githubusercontent.com/ddgksf2013/Scripts/refs/heads/master/reddit.js

[MITM]
hostname = api.imgur.com

*****************/
 
let obj = JSON.parse($response.body);

if ($request.url.indexOf('verifyReceipt') !== -1) {
    obj = {
      "data": {
        "is_emerald": true,
        "emerald_expiration": "2099-12-31 23:59:59",
        "is_in_free_trial": false,
        "purchase_type": "subscription"
      },
      "success": true,
      "status": 200
    };
}

$done({ body: JSON.stringify(obj) });