// weread_patch.js

if ($response.body) {
  let body = JSON.parse($response.body);

  // 关闭强制更新弹窗
  body.upgrade = 0;
  body.notice_title = "";
  body.notice_msg = "";

  if (body.configsets) {
    body.configsets.upgrade = 0;
    body.configsets.notice_type = 0;
    body.configsets.notice_msg = "";
    body.configsets.notice_title = "";
  }

  $done({ body: JSON.stringify(body) });
} else {
  $done({});
}
