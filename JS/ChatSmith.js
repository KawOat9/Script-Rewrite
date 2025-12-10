let obj = JSON.parse($response.body);

if (obj.data) {
  // แก้ไขสถานะสมาชิก
  obj.data.is_premium = true;
  obj.data.subscription_status = "active";
  obj.data.expiry_date = 4092599349; // ปี 2099
  
  // แก้ไขข้อจำกัดในการใช้งาน
  obj.data.is_limited = false;
  obj.data.current_chat_count = 99999;
  obj.data.max_chat_count = 99999;
  obj.data.max_image_count = 99999;
  obj.data.max_ai_count = 99999;
}

$done({ body: JSON.stringify(obj) });
