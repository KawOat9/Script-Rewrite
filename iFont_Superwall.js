/*
 * iFont (Superwall) Unlock
 * ปลดล็อกสถานะ Pro (Superwall API)
 */

let obj = JSON.parse($response.body);

// ข้อมูล Pro ที่เราจะยัดเข้าไป
const proEntitlement = {
  "identifier": "pro",
  "type": "SERVICE_LEVEL",
  "isActive": true,
  "productIds": [
    "com.ifont.3.yearly"
  ],
  "isLifetime": true,
  "willRenew": true,
  "activeProductId": "com.ifont.3.yearly",
  "originalPurchaseDate": "2023-01-01T00:00:00Z",
  "purchaseDate": "2023-01-01T00:00:00Z",
  "expirationDate": "2099-12-31T23:59:59Z"
};

// ยัดข้อมูลใส่ customerInfo
if (obj.customerInfo) {
    obj.customerInfo.entitlements = [proEntitlement];
}

// ยัดข้อมูลใส่ entitlements ตัวบนสุด (เผื่อแอปเช็คตรงนี้ด้วย)
if (Array.isArray(obj.entitlements)) {
    obj.entitlements = [proEntitlement];
}

$done({ body: JSON.stringify(obj) });
