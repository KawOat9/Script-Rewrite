// IP-Pure Node Info for Shadowrocket
// Adapted from Quantumult X version

const url = "https://my.ippure.com/v1/info";
const headers = {
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
};

$httpClient.get({ url, headers }, (error, response, data) => {
  if (error) {
    $notification.post("🔎 IPPure", "❌ การสอบถามล้มเหลว", "⚠️ ข้อผิดพลาดเครือข่าย / ⏱️ หมดเวลา");
    return $done();
  }

  try {
    const d = JSON.parse(data);

    const flag = getFlagEmoji(d.countryCode);
    const type = d.isResidential ? "เครือข่ายที่อยู่อาศัย 🏠" : "ศูนย์ข้อมูล 🏢";
    const score = d.fraudScore ?? 0;
    const risk = getRiskLevel(score);

    const msg =
      `IP: ${d.ip}\n` +
      `ISP: ${d.asOrganization || "N/A"}\n` +
      `ASN: ${d.asn ? "AS" + d.asn : "N/A"}\n` +
      `Location: ${flag} ${d.countryCode || ""} ${d.region || ""} ${d.city || ""}\n` +
      `type: ${type}\n` +
      `Fraud Score: ${score}\n` +
      `Risk Level: ${risk}`;

    $notification.post("🔎 IPPure Info", "", msg);
  } catch (e) {
    $notification.post("🔎 IPPure", "Parsing failed", "");
  }

  $done();
});

function getRiskLevel(score) {
  if (score <= 25) return "ความเสี่ยงต่ำ ✅";
  if (score <= 50) return "ความเสี่ยงปานกลาง 🟡";
  if (score <= 75) return "Hความเสี่ยงสูง ⚠️";
  return "ความเสี่ยงสูงมาก ‼️";
}

function getFlagEmoji(code) {
  if (!code) return "🌍";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map(c => 127397 + c.charCodeAt())
  );
}