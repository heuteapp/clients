// client/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // frontend axios baseURL /api olacak
    createProxyMiddleware({
      target: 'https://api.heuteapp.net', // gerçek production API
      changeOrigin: true,                 // host header’i API’ye göre değiştir
      secure: true,                       // HTTPS kontrolü
      cookieDomainRewrite: 'localhost',   // cookie domain’i localhost olarak değişir
      pathRewrite: {
        '^/api': '', // /api prefix’i backend’e gitmez
      },
    })
  );
};