/*
 * Baidu Netdisk Unlock SVIP 10 + Custom Notification
 * ปลดล็อกสถานะสูงสุด พร้อมข้อความแจ้งเตือนที่หน้าโปรไฟล์
 */

if ($response.body) {
    let obj = JSON.parse($response.body);
    obj = {
        "product_infos": [{
            "product_name": "svip2_nd",
            "product_description": "超级会员",
            "function_num": 0,
            "start_time": 1672502399,
            "buy_description": "",
            "buy_time": 0,
            "product_id": "1",
            "auto_upgrade_to_svip": 0,
            "end_time": 4092599349, // ปี 2099
            "cluster": "vip",
            "detail_cluster": "svip",
            "status": 0
        }],
        "svip_level": 10,
        "v_level": 10,
        "level": 10,
        "is_vip": 1,
        "is_svip": 1,
        "currenttime": Math.floor(Date.now() / 1000),
        "reminder": {
            "reminderWithContent": [
                {
                    "content": "ยินดีต้อนรับท่านสมาชิก SVIP 10 ระดับสูงสุด ✨",
                    "url": "https://pan.baidu.com",
                    "buttonName": "ตรวจสอบสิทธิ์"
                }
            ],
            "advertiseContent": [
                {
                    "content": "สถานะสมาชิกถาวรโดย Shadowrocket (ปี 2099)",
                    "url": "https://pan.baidu.com"
                }
            ]
        },
        "request_id": "7501873289383874371"
    };
    $done({ body: JSON.stringify(obj) });
} else {
    $done({});
}
