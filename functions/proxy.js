// 从环境变量读取目标地址（避免硬编码）
const TARGET_SERVER = process.env.TARGET_SERVER;

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // 构造目标地址（保留路径和参数）
  const targetUrl = `${TARGET_SERVER}${url.pathname}${url.search}`;

  // 转发请求
  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  });

  // 修改响应头（解决 CORS 问题）
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  return new Response(response.body, {
    status: response.status,
    headers
  });
}
