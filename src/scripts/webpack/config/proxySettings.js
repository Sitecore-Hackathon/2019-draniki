module.exports = (envUrl) => ({
  '/sitecore': {
    target: envUrl,
    changeOrigin: true,
    secure: false,
  },
  '/-/{media,jssmedia}': {
    target: envUrl,
    changeOrigin: true,
    secure: false,
  },
  '/api': {
    target: envUrl,
    changeOrigin: true,
    secure: false,
  },
});