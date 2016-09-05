var fs = require('fs'),
  http = require('http'),
  url = require('url'),
  path = require('path');

http.createServer( function(req, res){
  console.log("=================");
  console.log('convertedVideos' + req.url);
  console.log("=================");
  console.log(path.resolve('convertedVideos' + req.url));
  var file = path.resolve('convertedVideos' + req.url);
  if(file){
    var range = req.headers.range;
    var positions = range.replace(/bytes=/, '').split('-');
    var start = parseInt(positions[0], 10);

    fs.stat(file, function(err, stats){
      console.log(stats);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunkSize = (end - start) + 1;

      res.writeHead(206, {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on('open', function(){
          stream.pipe(res);
        }).on('error', function(err){
          res.end(err);
        });

      res.on('close', function(){
        // close or destroy stream
        stream = null;
      });
    });
  }

}).listen(9000);
