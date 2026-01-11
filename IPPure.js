/*
 * IPPure Node Details for Shadowrocket
 * * วิธีใช้:
 * 1. เพิ่ม Script ใน Shadowrocket
 * - Type: http-request
 * - Pattern: ^http:\/\/ip\.check
 * - Script Path: (เลือกไฟล์นี้)
 * 2. เปิด Browser เข้าเว็บ http://ip.check
 */

const url = "https://my.ippure.com/v1/info";
const myHeaders = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    "Accept": "application/json"
};

$httpClient.get({ url: url, headers: myHeaders }, (error, response, data) => {
    if (error) {
        $done({
            response: {
                status: 200,
                headers: { 'Content-Type': 'text/html;charset=utf-8' },
                body: generateErrorHtml("เชื่อมต่อล้มเหลว หรือ Timeout")
            }
        });
        return;
    }

    try {
        const jsonData = JSON.parse(data);
        const htmlBody = generateHtmlMessage(jsonData);
        
        $done({
            response: {
                status: 200,
                headers: { 'Content-Type': 'text/html;charset=utf-8' },
                body: htmlBody
            }
        });

    } catch (e) {
        $done({
            response: {
                status: 200,
                headers: { 'Content-Type': 'text/html;charset=utf-8' },
                body: generateErrorHtml("เกิดข้อผิดพลาดในการแปลงข้อมูล")
            }
        });
    }
});

function generateErrorHtml(msg) {
    return `
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>body{font-family:-apple-system;text-align:center;padding:50px;}</style>
    </head>
    <body>
        <h1>🛑 Error</h1>
        <p>${msg}</p>
    </body>
    </html>`;
}

function generateHtmlMessage(data) {
    const flag = getFlagEmoji(data.countryCode);
    const ip = data.ip || "N/A";
    const isp = data.asOrganization || "N/A";
    const asn = data.asn ? `AS${data.asn}` : "N/A";
    
    let location = `${flag} ${data.countryCode}`;
    if (data.region) location += ` - ${data.region}`;
    if (data.city) location += ` - ${data.city}`;

    const typeStr = data.isResidential ? "Residential (บ้าน) 🏠" : "Datacenter (ศูนย์ข้อมูล) 🏢";
    
    const score = data.fraudScore || 0;
    const riskInfo = getRiskLevel(score);

    const infos = [
        ["IP Address", ip],
        ["ISP", isp],
        ["ASN", asn],
        ["Location", location],
        ["Type", typeStr],
        ["Fraud Score", `${score} / 100`],
        ["Risk Level", riskInfo]
    ];

    let listItems = "";
    infos.forEach(item => {
        listItems += `
        <div class="item">
            <span class="label">${item[0]}</span>
            <span class="value">${item[1]}</span>
        </div>`;
    });

    // สร้างหน้าเว็บ HTML สวยๆ
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
        <title>IPPure Check</title>
        <style>
            body { background-color: #f2f2f7; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; color: #000; }
            .card { background: #fff; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
            .header h2 { margin: 0; color: #007aff; }
            .item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 14px; }
            .label { color: #8e8e93; font-weight: 600; }
            .value { color: #1c1c1e; font-weight: 500; text-align: right; max-width: 65%; word-break: break-word; }
            .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #aaa; }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="header">
                <h2>🔎 IPPure Info</h2>
            </div>
            ${listItems}
            <div class="footer">
                Powered by Shadowrocket & IPPure
            </div>
        </div>
    </body>
    </html>
    `;
}

function getRiskLevel(score) {
    if (score <= 25) return "<span style='color:#28a745; font-weight:bold;'>Low Risk ✅</span>"; 
    if (score <= 50) return "<span style='color:#ffc107; font-weight:bold;'>Medium Risk 🟡</span>"; 
    if (score <= 75) return "<span style='color:#ff8c00; font-weight:bold;'>High Risk ⚠️</span>"; 
    return "<span style='color:#dc3545; font-weight:bold;'>Very High Risk ‼️</span>"; 
}

function getFlagEmoji(countryCode) {
    if (!countryCode) return "🌍";
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
