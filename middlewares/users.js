const app = require('../app.js');

app.use((req, res, next) => {
  const route = app.route('GET', 'users');
  if (route.result) {
    const html = `Users module - ${JSON.stringify(route.GET)}`;
    res.end(html);
  } else {
    next();
  }
});
