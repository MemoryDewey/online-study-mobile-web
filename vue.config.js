module.exports = {
    assetsDir: 'assets',  //静态资源目录
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        open: true,
        proxy: {
            //配置跨域
            [process.env.VUE_APP_BASE_API]: {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {[`^${process.env.VUE_APP_BASE_API}`]: '/api'}
            },
            '/images': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true
            }
        }
    }
};
