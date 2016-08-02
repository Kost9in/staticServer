const http = require('http');

class App {
    constructor() {
        this.callbacks = [];
    }
    use(middleware) {
        this.callbacks.push(middleware);
    }
    server() {
        const self = this;
        return http.createServer((req, res) => {
            self.req = req;
            self.res = res;
            let position = 0;
            const next = () => {
                if(self.callbacks.length > position) {
                    self.callbacks[position++].apply(null, [req, res, next]);
                }
            }
            next();
        });
    }
    route(method, url) {
        const result = { GET: {} };
        const request = this.req.url.substr(1).split('?');
        const searchUrl = (request[0].length && request[0][request[0].length - 1] === '/') ? request[0].substr(0, request[0].length - 1) : request[0];
        result.result = this.req.method.toLowerCase() === method.toLowerCase() && searchUrl.toLowerCase() === url.toLowerCase();
        if (request[1]) {
            request[1].split('&').forEach(value => {
                const param = value.split('=');
                result.GET[param[0]] = (param[1]) ? param[1] : '';
            });
        }
        return result;
    }
}

module.exports = new App();
