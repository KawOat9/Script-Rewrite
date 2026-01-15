function modifyURLParam(url, key, value) {
  const u = new URL(url);
  const v = u.searchParams.get(key);
  if (v && /^M3U8.*\d$/.test(v)) {
    u.searchParams.set(key, value);
  }
  return u.toString();
}

/* ================== REQUEST ================== */
if ($request && $request.url.includes("api/streaming")) {
  const newUrl = modifyURLParam($request.url, "type", "M3U8_AUTO_1080");
  return $done({ url: newUrl });
}

/* ================== RESPONSE ================== */
if (!$response || !$response.body) {
  $done({});
  return;
}

let obj = JSON.parse($response.body);

/* ---- getsyscfg 去广告 ---- */
if ($request.url.includes("api/getsyscfg")) {
  const keys = [
    "switch_config_area","advertise_","splash_","ad_","ai_",
    "my_person_service","home_card_area","push_active_area",
    "freeFlow_area","app_launch_area","active_sigin_text",
    "commerce_","magictrick","personal_activity_area",
    "bdpan_feed_home_config_area_v12"
  ];

  for (let k in obj) {
    if (keys.some(i => k.includes(i)) && obj[k]?.cfg_list) {
      obj[k].cfg_list = [];
    }
  }

  if (obj.bottom_area?.cfg_list) {
    obj.bottom_area.cfg_list =
      obj.bottom_area.cfg_list.filter(i => i.node_key !== "home_page");
  }

  if (obj.my_settings?.cfg_list) {
    obj.my_settings.cfg_list =
      obj.my_settings.cfg_list.filter(i =>
        i.cfg_category_key === "setting_service_area" ||
        i.cfg_category_key === "setting_function_area"
      );
  }

  $done({ body: JSON.stringify(obj) });
  return;
}

/* ---- afd 入口广告 ---- */
if ($request.url.includes("afd/entry")) {
  obj.res && (obj.res.ad = [], obj.res.splash = {});
  $done({ body: JSON.stringify(obj) });
  return;
}

/* ---- feed 精简 ---- */
if ($request.url.includes("feed/cardinfos")) {
  if (obj.data?.cards) {
    obj.data.cards =
      obj.data.cards.filter(i =>
        i.source === "product" || i.source === "recent");
  }
  $done({ body: JSON.stringify(obj) });
  return;
}

/* ---- 会员伪装 ---- */
if ($request.url.includes("membership/user")) {
  obj = {
    error_code: 0,
    user_type: "svip",
    status_data: "超级会员至：2099-12-31",

    vip: {
      status: 1
    },
    vipv2: {
      status: 1
    },
    svip: {
      status: 2,
      is_sign_user: true
    },

    level_info: {
      current_level: 10,
      history_level: 10,
      current_value: 99999,
      history_value: 99999,
      daily_value: 0,
      default_daily_value: 5,
      accumulated_day: 9999,
      accumulated_uncollected_points: 0,
      accumulated_lost_points: 0,
      current_max_points: 0,
      last_manual_collection_time: 0,
      v10_id: "svip_v10"
    },

    v10_guide: {
      get_next_value_gap: false,
      tips: "已达成 SVIP V10",
      ab_test: false,
      button: {
        text: "SVIP V10",
        action_url: ""
      }
    },

    guide_data: {
      title: "SVIP V10",
      content: "已解锁全部超级会员权益",
      action_url: "",
      button: {
        text: "SVIP V10",
        action_url: ""
      }
    }
  };

  $done({ body: JSON.stringify(obj) });
  return;
}

$done({});