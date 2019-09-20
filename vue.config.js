module.exports = {
    assetsDir: 'assets',  //静态资源目录
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
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
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 37.5,
                        mediaQuery: false,
                        minPixelValue: 3
                    })
                ]
            }
        }
    }
};
