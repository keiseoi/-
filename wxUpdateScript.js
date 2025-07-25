// 适配 Shadowrocket 的 QuantumultX 脚本
const url = $request?.url || '';
const method = $request?.method || '';
let body = $response?.body || '';

// 处理升级弹窗
if (method === 'POST' && url.includes('mobileSync') && body.includes('upgrade')) {
    try {
        const bodyJSON = JSON.parse(body);
        const { configsets = {} } = bodyJSON;

        // 屏蔽升级提示
        bodyJSON.gift = true;
        bodyJSON.giftCount = 6;

        // 关闭各类检测和广告
        configsets.upgrade = 0;          // 禁用升级
        configsets.allowScreenshotReport = 0;
        configsets.metrickit_diagnostic_upload_enabled = 0;
        configsets.reader_ads_enabled = 0;  // 禁用阅读页广告
        configsets.showTeenModeAlert = 0;   // 关闭青少年模式提示
        configsets.notice_title = '屏蔽更新 by Shadowrocket';

        // 返回修改后的响应体（小火箭必须返回对象！）
        $done({ body: JSON.stringify(bodyJSON) });
    } catch (e) {
        console.log(`[WeRead] 响应修改失败: ${e}`);
        $done({}); // 出错时原样返回
    }
} else {
    $done({}); // 非目标请求，不修改
}
