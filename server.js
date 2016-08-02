const http = require('http');
const fs = require('fs');
const config = require('./config.js');

return http.createServer((req, res) => {

  const file = (req.url !== '/') ? req.url : config.INDEX_FILE;
 
  fs.readFile(config.STATIC_FOLDER + file, 'utf8', function(error, content) {
    if (error) {
      fs.readFile(config.ERROR_404_FILE, 'utf8', function(error, content) {
        res.writeHead(404);
        (error) ? res.end('File not found!') : res.end(content);
      });
    } else {
      res.end(content);
    }
  });

}).listen(config.PORT, config.HOST);
