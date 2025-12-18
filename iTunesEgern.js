/*
#!name=iTunesEgern ✨
#!desc=Unlock Collection 
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]

# iTunes Receipt
^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/iTunesEgern.js

[mitm]
hostname = buy.itunes.apple.com

*/
//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨iTunes Egern✨",M_OK="💖永久解锁成功，到期时间：2088-08-08",M_ERR="❌ 解锁失败",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ 成功",M_OK);mark()}else console.log(`[${A}] ⏳ 冷却中(${CD}min)`)}else{send("⚠️ 可能未命中","没有检测到 $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...
var objc = JSON.parse($response.body);
let obj = {
    "status" : 0,
    "receipt" : {
      "receipt_type" : "Production",
      "app_item_id" : 1247478067,
      "receipt_creation_date" : "2024-02-11 16:06:26 Etc/GMT",
      "bundle_id" : "com.floatcamellia.hfrslowmotion",
      "original_purchase_date" : "2024-02-11 16:00:00 Etc/GMT",
      "in_app" : [
        {
          "quantity" : "1",
          "purchase_date_ms" : "1694250549000",
          "expires_date" : "2099-09-09 13:37:37 Etc/GMT",
          "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
          "is_in_intro_offer_period" : "false",
          "transaction_id" : "490001314520000",
          "is_trial_period" : "false",
          "original_transaction_id" : "490001314520000",
          "purchase_date" : "2024-02-11 09:09:09 Etc/GMT",
          "product_id" : "com.floatcamellia.hfrslowmotion.yearly",
          "original_purchase_date_pst" : "2024-02-11 02:09:10 America/Los_Angeles",
          "in_app_ownership_type" : "PURCHASED",
          "original_purchase_date_ms" : "1694250550000",
          "web_order_line_item_id" : "490000123456789",
          "expires_date_ms" : "4092599349000",
          "purchase_date_pst" : "2024-02-11 02:09:09 America/Los_Angeles",
          "original_purchase_date" : "2024-02-11 09:09:10 Etc/GMT"
        }
      ],
      "adam_id" : 1247478067,
      "receipt_creation_date_pst" : "2024-02-11 06:06:26 America/Los_Angeles",
      "request_date" : "2024-02-11 16:06:27 Etc/GMT",
      "request_date_pst" : "2024-02-11 06:06:27 America/Los_Angeles",
      "version_external_identifier" : 863314980,
      "request_date_ms" : "1694273635000",
      "original_purchase_date_pst" : "2024-02-11 06:00:00 America/Los_Angeles",
      "application_version" : "275",
      "original_purchase_date_ms" : "1694273430000",
      "receipt_creation_date_ms" : "1694273634000",
      "original_application_version" : "275",
      "download_id" : 503226333846907953
    },
    "latest_receipt_info" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1694250549000",
        "expires_date" : "2099-09-09 13:37:37 Etc/GMT",
        "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
        "is_in_intro_offer_period" : "false",
        "transaction_id" : "440001731320417",
        "is_trial_period" : "false",
        "original_transaction_id" : "440001731320417",
        "purchase_date" : "2024-02-11 09:09:09 Etc/GMT",
        "product_id" : "com.floatcamellia.hfrslowmotion.yearly",
        "original_purchase_date_pst" : "2024-02-11 02:09:10 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1694250550000",
        "web_order_line_item_id" : "490000123456789",
        "expires_date_ms" : "4092599349000",
        "purchase_date_pst" : "2024-02-11 02:09:09 America/Los_Angeles",
        "original_purchase_date" : "2024-02-11 09:09:10 Etc/GMT"
      }
    ],
    "latest_receipt" : "t.me/crackhub_69",
    "environment" : "Production",
    "pending_renewal_info" : [
      {
        "product_id" : "com.floatcamellia.hfrslowmotion.yearly",
        "original_transaction_id" : "490001314520000",
        "auto_renew_product_id" : "com.floatcamellia.hfrslowmotion.yearly",
        "auto_renew_status" : "1"
      }
    ]
    
  };
  
  
  const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
  const list = {
  'TimeCut' : { bid: 'com.floatcamellia.hfrslowmotion', pid: 'com.floatcamellia.hfrslowmotion.yearly' },
  'oldroll' : { bid: 'com.zijayrate.analogcam', pid: 'com.zijayrate.analogcam.vipforever2' },
  'InstaShot' : { bid: 'com.camerasideas.InstaShot', pid: 'com.camerasideas.InstaShot.InShotPro_monthly' },
  'Mp3ConverterNew' : { bid: 'com.hemin.mp42mp3', pid: 'com.hemin.mp42mp3.upgradeYear1' },
  'MotionNinja' : { bid: 'com.floatcamellia.motionninja', pid: 'com.floatcamellia.motionninja.yearpro' },
  };
  
   for (const i in list) {
    if (new RegExp(`^${i}`, `i`).test(ua)) {
  
  obj.receipt.bundle_id = list[i].bid;
  obj.receipt.in_app[0].product_id = list[i].pid;
  obj.latest_receipt_info[0].product_id = list[i].pid;
  obj.pending_renewal_info[0].product_id = list[i].pid;
  obj.pending_renewal_info[0].auto_renew_product_id = list[i].pid;
  
     break;
    }
   }
  body = JSON.stringify(obj);
  $done({body});