const path = require('path');
const svgFilePath = path.join(__dirname, './src/assets/icons/svg');
module.exports = {
    assetsDir: 'static',  //静态资源目录
    publicPath: process.env.NODE_ENV === 'test' ? '/m/' : './',
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
            },
            '/socket.io': {
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
                        minPixelValue: 3,
                        exclude: /(plyr)/
                    })
                ]
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('vue-svgicon')
            .test(/\.svg$/)
            .use('svgicon')
            .loader('@yzfe/vue-svgicon-loader')
            .options({
                idSeparator: '_',
                svgFilePath
            });
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.transformAssetUrls = options.transformAssetUrls || {};
                options.transformAssetUrls['svg-icon'] = ['data'];
                return options
            });
        config.module.rule('svg').exclude.add(svgFilePath);
        config.resolve.alias.set('@icon', svgFilePath);
        config.resolve.symlinks(false)
    }
};
