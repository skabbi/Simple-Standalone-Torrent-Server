const WebTorrent = require('webtorrent');
const client = new WebTorrent();

const downloadPath = `${__dirname}/../download`;

const magnet = 'magnet:?xt=urn:btih:b4cb4ac96aa8633b2baf55fb6220f734542801a6&dn=moby_dick&tr=http%3A%2F%2Flocalhost%3A8080%2Fannounce';

client.add(magnet, { path: downloadPath }, (torrent) => {
  torrent.on('done', () => {
    console.log('torrent: torrent finished downloading');
  });

  client.on('error', (err) => {
    console.log('torrent: error event', err);
  });
});

client.on('torrent', (/* torrent */) => {
  console.log('client: torrent loaded');
});

client.on('error', (err) => {
  console.log('client: error event', err);
});
