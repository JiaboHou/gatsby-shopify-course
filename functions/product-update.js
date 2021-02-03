//
// callback: call when finished
// context: used for auth
exports.handler = function(event, context, callback) {
  callback(null, { statusCode: 200, body: 'hello world' });
}
