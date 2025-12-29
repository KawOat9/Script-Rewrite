/*
 * Imgur Emerald / Pro Unlock
 * ปลดล็อกฟีเจอร์พรีเมียมจากข้อมูลบัญชีผู้ใช้
 */

if ($response.body) {
    let obj = JSON.parse($response.body);

    if (obj.data) {
        // เปลี่ยนสถานะการสมัครสมาชิก
        obj.data.pro_expiration = 4092599349; // ปี 2099
        obj.data.is_subscribed = true;
        obj.data.is_emerald = true; // เปิดใช้งานระบบ Emerald
        obj.data.is_founders_club = true; // (ตัวเลือกเสริม) สถานะผู้ก่อตั้ง
        
        // ปรับปรุงชื่อเสียง (Optional)
        obj.data.reputation = 99999;
        obj.data.reputation_name = "Emerald Member";
        
        // ปลดล็อกการดูเนื้อหา Mature (Optional)
        obj.data.show_mature = true;
    }

    $done({ body: JSON.stringify(obj) });
} else {
    $done({});
}
