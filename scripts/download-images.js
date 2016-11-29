const fs = require('fs');
const path = require('path');
const http = require('http');
const async = require('async');
const download = require('download');

const cardFile = __dirname + '/../data/cards.json';
const imageDir = __dirname + '/../public/images';
const cardUrlPrefix = 'http://www.numotgaming.com/cards/images/cards/';

console.log('Loading card data...');
const cards = require(cardFile);

console.log('Loaded ' + cards.length + ' cards');
console.log('Downloading images...');

function checkIfFile(file, cb) {
  fs.stat(file, function fsStat(err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        return cb(null, false);
      } else {
        return cb(err);
      }
    }
    return cb(null, stats.isFile());
  });
}

async.eachLimit(cards, 4, function (card, complete) {
  const imagePath = path.join(imageDir, card.name.toString() + '.png');
  checkIfFile(imagePath, function (err, isFile) {
    if (isFile) {
      console.log('Found ' + card.name + ', skipping');
      complete();
    } else {
      const cardUrl = cardUrlPrefix + card.name.replace(/\s/g, '%20') + '.png'; 
      console.log('Did not find ' + card.name + ', will attempt to download');
      download(cardUrl).then(data => {
        fs.writeFileSync(imagePath, data);
        complete();
      }).catch(err => {
        console.log(err);
        complete();
      });
    }
  });
});

    // download(cardUrl, imagePath, function (err, result) {
    //   if (err) {
    //     console.log(' :( :( :( ');
    //     return;
    //   }
    // });
