module.exports = { //配置反向代理跨域
    devServer : {
        proxy : {
            '/api' : {
                target : 'http://39.97.33.178',
                changeOrigin :true
            }
        }
    }
}