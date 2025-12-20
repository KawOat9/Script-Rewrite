/******************************

脚本功能：美图秀秀+解锁VIP
软件版本：v9.6.20
脚本作者：彭于晏
更新时间：2022-9-1
问题反馈：QQ+89996462
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️


*******************************

[rewrite_local]
^https?://(api|h5).xiuxiu.meitu.com/(?!(v1/feed/)) url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/mtxx.js
[mitm] 
hostname = api.xiuxiu.meitu.com

*******************************/
//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨🎟️Meitu✨",M_OK="หมดอายุ: 2099-09-09",M_ERR="❌ ปลดล็อคล้มเหลว",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ ปลดล็อคสำเร็จ!",M_OK);mark()}else console.log(`[${A}] ⏳ Cooldown(${CD}min)`)}else{send("⚠️ ตรวจไม่พบ $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...

/*
 *Progcessed By JSDec in 0.00s
 *JSDec - JSDec.js.org
 */
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const vip = '/vip';


if (url.indexOf(vip) != -1) {
    obj.data.vip_type = 1;
obj.data.sub_biz_type = 1;
obj.data.is_valid_user = 1;
obj.data.expire_days = 8888888888;
obj.data.exchange_vip = 1;
obj.data.is_new_vipsub = 1;
obj.data.home_prompt = "您的会员将于2099/01/01过期。";

	body = JSON.stringify(obj);
}


$done({body});