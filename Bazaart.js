/*
#!name=Bazaart ✨
#!desc=Unlock Super
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Bazaart.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Bazaart.js

[mitm]
hostname = buy.itunes.apple.com

*/


var objc = JSON.parse($response.body);

// กำหนด Product ID ใหม่เป็น "Super"
const SUPER_PRODUCT_ID = "Bazaart_Ultra_Yearly"; 
const EXPIRATION_DATE = "2099-09-09 09:09:09 Etc/GMT";
const EXPIRATION_MS = "4092599349000";

// ข้อมูลที่ใช้ปลอมแปลง (Apple Receipt Format)
const SubscriptionInfo = {
    "quantity" : "1",
    "purchase_date_ms" : "1686065612000",
    "expires_date" : EXPIRATION_DATE,
    "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
    "is_in_intro_offer_period" : "false",
    "transaction_id" : "490001314520000",
    "is_trial_period" : "false",
    "original_transaction_id" : "490001314520000",
    "purchase_date" : "2023-06-06 16:06:06 Etc/GMT",
    "product_id" : SUPER_PRODUCT_ID, // <<< เปลี่ยนตรงนี้
    "original_purchase_date_pst" : "2023-06-06 06:06:07 America/Los_Angeles",
    "in_app_ownership_type" : "PURCHASED",
    "original_purchase_date_ms" : "1686065613000",
    "web_order_line_item_id" : "490000123456789",
    "expires_date_ms" : EXPIRATION_MS, // <<< เปลี่ยนตรงนี้
    "purchase_date_pst" : "2023-06-06 06:06:06 America/Los_Angeles",
    "original_purchase_date" : "2023-06-06 16:06:07 Etc/GMT"
};

objc = {   
    "status" : 0,   
    "receipt" : {     
        "receipt_type" : "Production",     
        "app_item_id" : 944665061,     
        "receipt_creation_date" : "2023-06-06 16:06:26 Etc/GMT",     
        "bundle_id" : SUPER_PRODUCT_ID, // <<< เปลี่ยนตรงนี้
        "in_app" : [SubscriptionInfo],     
        "original_purchase_date" : "2023-06-06 16:00:00 Etc/GMT",     
        "adam_id" : 944665061,     
        "receipt_creation_date_pst" : "2023-06-06 06:06:26 America/Los_Angeles",     
        "request_date" : "2023-06-06 16:06:27 Etc/GMT",     
        "request_date_pst" : "2023-06-06 06:06:27 America/Los_Angeles",     
        "version_external_identifier" : 888888888,     
        "request_date_ms" : "1686065635000",     
        "original_purchase_date_pst" : "2023-06-06 06:00:00 America/Los_Angeles",     
        "application_version" : "5",     
        "original_purchase_date_ms" : "1686065430000",     
        "receipt_creation_date_ms" : "1686065634000",     
        "original_application_version" : "7",     
        "download_id" : 666666666666666600   
    },   
    "Author" : "Crack",   
    "latest_receipt_info" : [SubscriptionInfo], // ใช้ข้อมูลเดียวกัน
    "latest_receipt" : "Crack",   
    "environment" : "Production",   
    "pending_renewal_info" : [     
        {       
            "product_id" : SUPER_PRODUCT_ID, // <<< เปลี่ยนตรงนี้
            "original_transaction_id" : "490001314520000",       
            "auto_renew_product_id" : SUPER_PRODUCT_ID, // <<< เปลี่ยนตรงนี้
            "auto_renew_status" : "1"     
        }   
    ],   
    "warning" : "仅供学习，禁止转载或售卖"
}; 

$done({body : JSON.stringify(objc)});
