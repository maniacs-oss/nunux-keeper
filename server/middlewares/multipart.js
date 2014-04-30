var multiparty = require('multiparty');

/**
 * Middleware to handle multipart/form-data requests.
 * @module multipart
 */
module.exports = function() {
  return function(req, res, next) {
    var ct = req.header('Content-Type');
    if (req.method === 'POST' && /^multipart\/form-data/.test(ct)) {
      var form = new multiparty.Form();

      req.files = [];
      req.fields = {};

      form.on('error', next);
      form.on('file', function(name, file) {
        req.files.push(file);
      });
      form.on('field', function(name, value) {
        req.fields[name] = value;
      });
      form.on('close', function() {
        next();
      });

      form.parse(req);
    } else {
      next();
    }
  };
};
