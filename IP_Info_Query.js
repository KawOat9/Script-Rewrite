/**
 * IP 信息查询 - Shadowrocket
 * API: ip-api.com
 */

const url = "http://ip-api.com/json";

$task.fetch({
  url: url,
  timeout: 5000
}).then(resp => {
  const json = JSON.parse(resp.body);

  const {
    country,
    countryCode,
    city,
    isp,
    query: ip
  } = json;

  const emoji = getFlagEmoji(countryCode);
  const location =
    country === city
      ? `${emoji} │ ${country}`
      : `${emoji} ${countryCode} │ ${city}`;

  const cleanedIsp = cleanIspInfo(isp);

  $done({
    title: "🌍 节点信息",
    content:
      `IP：${ip}\n` +
      `运营商：${cleanedIsp}\n` +
      `位置：${location}`,
    icon: "globe.asia.australia",
    "icon-color": "#3D90ED"
  });

}).catch(err => {
  $done({
    title: "❌ IP 查询失败",
    content: err.toString()
  });
});


// ===== 工具函数 =====

// 国旗 Emoji
function getFlagEmoji(code) {
  if (!code) return "🌍";
  if (code.toUpperCase() === "TW") code = "CN";

  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map(c => 127397 + c.charCodeAt())
  );
}

// 清理 ISP
function cleanIspInfo(isp) {
  if (!isp) return "N/A";

  return isp
    .replace(/\(.*?\)|[-,.]/g, "")
    .replace(
      /\b(Hong Kong|Mass internet|Communications?|Company|information|international|Technolog(y|ies)|ESolutions?|Services Limited|Magix Services)\b/gi,
      ""
    )
    .replace(/(munications?)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}