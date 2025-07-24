// weread_patch_safe.js
if ($response.body) {
  let body = JSON.parse($response.body);

  // 只改动已知与强制更新相关的字段
  body.upgrade = 0;
  body.notice_title = "";
  body.notice_msg = "";

  if (body.configsets) {
    if (typeof body.configsets.upgrade === "number") body.configsets.upgrade = 0;
    if (typeof body.configsets.notice_type === "number") body.configsets.notice_type = 0;
    if (typeof body.configsets.notice_msg === "string") body.configsets.notice_msg = "";
    if (typeof body.configsets.notice_title === "string") body.configsets.notice_title = "";
  }

  $done({ body: JSON.stringify(body) });
} else {
  $done({});
}