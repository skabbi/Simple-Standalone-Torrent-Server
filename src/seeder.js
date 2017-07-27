const WebTorrent = require('webtorrent');
const fs = require('fs');

const contentPath = `${__dirname}/../uploads/content`;
const torrentPath = `${__dirname}/../uploads/torrents/moby-dick.torrent`;

const rawTorrent = fs.readFileSync(torrentPath);

function torrentSeeder() {
  const client = new WebTorrent();
  client.add(rawTorrent, { path: contentPath }, (torrent) => {
    torrent.on('done', () => {
      console.log('torrent: torrent ready for seeding');
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
}

module.exports = torrentSeeder;
