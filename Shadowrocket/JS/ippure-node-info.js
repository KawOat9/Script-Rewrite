const url = "https://my.ippure.com/v1/info";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
};

$httpClient.get({ url, headers }, function (error, response, data) {
  if (error) {
    $notification.post("🔎 IPPure", "查询失败", "网络错误或超时");
    $done();
    return;
  }

  try {
    const d = JSON.parse(data);

    const flag = getFlagEmoji(d.countryCode);
    const type = d.isResidential ? "住宅网络 🏠" : "数据中心 🏢";
    const score = d.fraudScore ?? 0;
    const risk = getRiskLevel(score);

    const msg =
      `IP: ${d.ip}\n` +
      `ISP: ${d.asOrganization || "N/A"}\n` +
      `ASN: ${d.asn ? "AS" + d.asn : "N/A"}\n` +
      `位置: ${flag} ${d.countryCode || ""} ${d.region || ""} ${d.city || ""}\n` +
      `类型: ${type}\n` +
      `欺诈值: ${score}\n` +
      `风险: ${risk}`;

    $notification.post("🔎 IPPure 节点详情", "", msg);
  } catch (e) {
    $notification.post("🔎 IPPure", "解析失败", "");
  }

  $done();
});

function getRiskLevel(score) {
  if (score <= 25) return "低风险 ✅";
  if (score <= 50) return "中风险 🟡";
  if (score <= 75) return "高风险 ⚠️";
  return "极高风险 ‼️";
}

function getFlagEmoji(code) {
  if (!code) return "🌍";
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map(c => 127397 + c.charCodeAt())
  );
}