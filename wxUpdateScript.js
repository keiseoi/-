// 微信读书屏蔽升级弹窗脚本
try {
  let obj = JSON.parse($response.body);

  // 安全地清空升级字段
  if (obj.upgrade !== undefined) obj.upgrade = 0;
  if (obj.notice_title !== undefined) obj.notice_title = "";
  if (obj.notice_msg !== undefined) obj.notice_msg = "";

  if (obj.configsets && typeof obj.configsets === 'object') {
    obj.configsets.upgrade = 0;
    obj.configsets.notice_type = 0;
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  // 如果不是 JSON，原样返回，避免闪退
  $done({});
}