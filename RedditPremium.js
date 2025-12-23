/*
 * Reddit Premium Unlock & AdBlock (Optimized for Shadowrocket)
 * ปลดล็อกฟีเจอร์ Premium, ลบโฆษณา, และเปิดเนื้อหา NSFW

[rewrite_local]
^https?:\/\/gql(-fed)?\.reddit\.com url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/RedditPremium.js

[MITM]
hostname = gql.reddit.com, gql-fed.reddit.com

 */

const APP_NAME = "✨ Reddit Premium ✨";
const ID = "reddit_vip";
const COOLDOWN = 10 * 60 * 1000; // 10 นาที

// --- ฟังก์ชันแจ้งเตือนแบบป้องกัน Spam ---
function showNotification() {
    let now = Date.now();
    let last = $persistentStore.read(ID + "_time") || 0;
    if (now - last > COOLDOWN) {
        $notification.post(APP_NAME, "💖 ปลดล็อกฟีเจอร์พรีเมียมเรียบร้อย", "เพลิดเพลินกับ Reddit แบบไร้โฆษณา");
        $persistentStore.write(now.toString(), ID + "_time");
    }
}

// --- ฟังก์ชันหลักในการแก้ไขข้อมูล (Recursive Patch) ---
function deepPatch(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    // ลบโฆษณาในรายการ (Array)
    if (Array.isArray(obj)) {
        return obj
            .filter(item => {
                if (!item) return true;
                // ลบโพสต์โฆษณา (AdPost) และโพสต์ที่แนะนำ (Promoted)
                const type = item.__typename || (item.node && item.node.__typename);
                if (type === 'AdPost' || type === 'PromotedPost') return false;
                if (item.node?.adPayload || item.adPayload) return false;
                return true;
            })
            .map(deepPatch);
    }

    for (const key in obj) {
        // กลุ่มค่าที่ต้องการให้เป็น true (Premium/Permissions)
        const toTrue = [
            'isPremiumMember', 'isSubscribed', 'isEmployee', 'isGold', 
            'hasGoldSubscription', 'hide_ads', 'user_is_subscriber',
            'isNsfwContentShown', 'has_subscribed_to_premium'
        ];
        
        // กลุ่มค่าที่ต้องการให้เป็น false (Locks/NSFW Blocks)
        const toFalse = ['locked', 'isNsfw', 'isNsfwMediaBlocked'];

        if (toTrue.includes(key)) obj[key] = true;
        if (toFalse.includes(key)) obj[key] = false;

        // ล้างอาเรย์โฆษณา
        if (key === 'commentsPageAds') obj[key] = [];

        // เติมข้อมูล Skus เพื่อให้หน้าจอแสดงว่ามีอายุการใช้งาน
        if (key === 'skus' && Array.isArray(obj[key]) && obj[key].length === 0) {
            obj[key] = [{
                kind: "Premium",
                subscriptionType: "Premium",
                duration: { amount: 1, unit: "YEAR" },
                externalProductId: "com.reddit.premium_annual"
            }];
        }

        // วนลูปชั้นถัดไป
        if (typeof obj[key] === 'object') {
            obj[key] = deepPatch(obj[key]);
        }
    }
    return obj;
}

// --- ส่วนทำงานหลัก ---
if (typeof $response !== "undefined" && $response.body) {
    try {
        let obj = JSON.parse($response.body);
        obj = deepPatch(obj);
        showNotification();
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.log("Reddit Patch Error: " + e);
        $done({});
    }
} else {
    $done({});
}
