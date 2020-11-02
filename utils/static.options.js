module.exports = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: ['index.html'],
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
