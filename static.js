const fs = require('fs');
const config = require('./config.js');
const app = require('./app.js');

app.use((req, res, next) => {
  const staticPath = `/${config.STATIC_FOLDER}`;
  if (req.url.indexOf(staticPath) === 0) {
    const file = (req.url !== staticPath) ? req.url.substr(staticPath.length) : config.INDEX_FILE;
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
  } else {
    next();
  }
});
