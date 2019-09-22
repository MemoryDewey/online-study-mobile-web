/**
 * 获取图片真实URL
 * @param url 服务器返回URL
 */
export function getImageUrl(url) {
    let serverUrl = "";
    if (process.env.NODE_ENV === 'production') serverUrl = process.env.VUE_APP_IMAGE_URL;
    return serverUrl + url;
}
