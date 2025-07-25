// wechat-reader-patch.js
const targetHost = 'i.weread.qq.com';
const targetPath = '/mobileSync';

function modifyRequestHeaders(headers) {
    // 修改版本相关头部
    headers['basever'] = '9.3.5.48';
    headers['v'] = '9.3.5.48';
    headers['User-Agent'] = 'WeRead/9.3.5 (iPhone; iOS 18.5; Scale/2.00)';
    
    // 添加新版特有头部
    headers['baggage'] = 'sentry-environment=production,sentry-public_key=c016c3b3e111466b9a76a0cfd42a7235,sentry-release=com.tencent.weread%409.3.5%2B48,sentry-trace_id=51c1ae6750b64a07ae894ff2f5194e0f';
    headers['sentry-trace'] = '51c1ae6750b64a07ae894ff2f5194e0f-037a3f97bf514aa8-0';
    
    // 更新skey (注意：可能需要定期更换)
    headers['skey'] = 'YmVCtlc0';
    
    return headers;
}

function modifyRequestBody(body) {
    try {
        const jsonData = JSON.parse(body);
        
        // 添加新版特有字段
        jsonData['localBrowseTab'] = "";
        jsonData['localCommunityTab'] = "";
        jsonData['friendReviewSynckey'] = jsonData['reviewTimeline'] || 0;
        jsonData['preferTab'] = 1;
        jsonData['chatRemovedSynckey'] = 0;
        jsonData['wehearSyncKey'] = 0;
        jsonData['discoverColumnSynckey'] = jsonData['searchSynckey'] || 0;
        
        // 移除旧版特有字段
        delete jsonData['storyfeed'];
        delete jsonData['shelfLecture'];
        delete jsonData['reviewRecommend'];
        delete jsonData['gameSynckey'];
        delete jsonData['hearPromoteSynckey'];
        delete jsonData['browse'];
        delete jsonData['discover'];
        delete jsonData['marketSyncver'];
        
        // 调整某些字段的值
        if (jsonData['rateSynckey'] > 0) {
            jsonData['rateSynckey'] -= 1000; // 模拟新版值变化模式
        }
        
        return JSON.stringify(jsonData);
    } catch (e) {
        console.log(`JSON解析错误: ${e}`);
        return body;
    }
}

function isTargetRequest(request) {
    return request.url.includes(targetHost) && 
           request.url.includes(targetPath) && 
           request.method === 'POST';
}

function handleRequest(request) {
    if (isTargetRequest(request)) {
        console.log(`处理请求: ${request.url}`);
        request.headers = modifyRequestHeaders(request.headers);
        
        if (request.body) {
            request.body = modifyRequestBody(request.body);
        }
    }
    return request;
}

$done(handleRequest($request));
