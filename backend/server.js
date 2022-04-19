const http = require('http');
const expressApp = require('./expressApp');
const server = http.createServer(expressApp);

const logExit = msg => {
    const bind = typeof server.address() === 'string' ? 'pipe ' + server.address() : 'port : '+ port ;
    console.error(`${bind} ${msg}`);
    process.exit(1);
}

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES' :
            logExit('requires elevated privileges.');
            break;
        case 'EADDRINUSE' :
            logExit('is already in use.');
            break;
        default:
            throw error;
    }
};

server.on('error', errorHandler);

const portNormalizer = (port, defaultPort) => undefined!== port && !isNaN(parseInt(port)) ? parseInt(port) : defaultPort;
const port = portNormalizer(process.env.PORT, 3100);
expressApp.set('port', port);
server.listen(port, () => console.log("server started, listening port: " +port));