/**
 * 获取图片真实URL
 * @param url 服务器返回URL
 */
export function getImageUrl(url) {
    let serverUrl = "";
    if (process.env.NODE_ENV === 'production') serverUrl = process.env.VUE_APP_PRODUCTION_URL;
    else if (process.env.NODE_ENV === 'beta') serverUrl = process.env.VUE_APP_BETA_URL;
    return serverUrl + url;
}

/**
 * 获取api请求baseUrl
 */
export function getRequestBaseUrl() {
    let env = process.env.NODE_ENV;
    if (env === 'production') return process.env.VUE_APP_PRODUCTION_API;
    else if (env === 'beta') return process.env.VUE_APP_BETA_API;
    else return process.env.VUE_APP_BASE_API;
}

/**
 * 获取websocket url
 */
export function getWebsocketUrl() {
    let env = process.env.NODE_ENV;
    if (env === 'production') return process.env.VUE_APP_PRODUCTION_WEBSOCKET_URL;
    else if (env === 'beta') return process.env.VUE_APP_BETA_WEBSOCKET_URL;
    else return location.host;
}

/**
 * 获取邀请URL
 */
export function getInviteUrl(url) {
    let env = process.env.NODE_ENV;
    if (env === 'production') return `${process.env.VUE_APP_PRODUCTION_URL}${url}`;
    else if (env === 'beta') return `${process.env.VUE_APP_BETA_URL}/m${url}`;
    else return `${location.host}${url}`;
}
