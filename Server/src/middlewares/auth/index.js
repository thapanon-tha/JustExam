const logger = (_req,_res,next )=>{
  var ipaddress = (_req.headers['x-forwarded-for'] || 
_req.connection.remoteAddress || 
_req.socket.remoteAddress || 
_req.connection.socket.remoteAddress).split(",")[0];
console.log(_req.originalUrl)
  next();
}

module.exports = logger