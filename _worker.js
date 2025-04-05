// 将目标服务器地址替换为你的 IP:3000（例如：http://1.1.1.1:3000）
const TARGET_SERVER = 'http://43.139.128.248:19999/';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // 拼接目标 URL（保留原始路径和查询参数）
  const url = new URL(request.url);
  const targetUrl = new URL(TARGET_SERVER + url.pathname + url.search);

  // 转发请求到目标服务器
  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  });

  // 若需要处理 CORS（例如跨域访问），添加以下响应头
  const modifiedHeaders = new Headers(response.headers);
  modifiedHeaders.set('Access-Control-Allow-Origin', '*');
  modifiedHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  modifiedHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: modifiedHeaders
  });
}
