const Server = require('bittorrent-tracker').Server;
const restify = require('restify');

const app = restify.createServer();

function torrentTracker() {
  const server = new Server({
    http: false, // we do our own
    udp: false, // not interested
    ws: false, // not interested
  });

  const onHttpRequest = server.onHttpRequest.bind(server);
  app.get('/announce', onHttpRequest);
  app.get('/scrape', onHttpRequest);

  console.log('Tracker running on port 8080');
  app.listen(8080);
}

module.exports = torrentTracker;
