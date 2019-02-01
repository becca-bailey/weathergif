const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/forecast", {
      target: "https://api.darksky.net/",
      logLevel: "debug",
      changeOrigin: true
    })
  );
  app.use(
    proxy("/gifs", {
      target: "https://api.giphy.com/v1",
      logLevel: "debug",
      changeOrigin: true
    })
  );
};
