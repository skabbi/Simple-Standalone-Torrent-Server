const createTorrent = require('create-torrent');
const fs = require('fs');
const magnet = require('magnet-uri');
const parseTorrent = require('parse-torrent');

const contentPath = `${__dirname}/../uploads/content/moby_dick`;
const torrentPath = `${__dirname}/../uploads/torrents/moby-dick.torrent`;
const torrentOptions = {
  private: true,
  announceList: [['http://localhost:8080/announce']],
};


createTorrent(contentPath, torrentOptions, (err, torrent) => {
  if (err) {
    console.log('create: error', err);
  } else {
    fs.writeFileSync(torrentPath, torrent);
    const ptorrent = parseTorrent(torrent);
    const magnetLink = magnet.encode(ptorrent);
    console.log(magnetLink);
  }
});
