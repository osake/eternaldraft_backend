'use strict';

const fs = require('fs'),
      path = require('path'),
      cards = require('../data/cards.json'),
      tier = require('../data/draft-tier.json');

for (let card of cards) {
  let index = tier.findIndex(name => card.name === name)
  if (-1 == index) {
    card.draftable = false;
    card.rank = -1;
  } else {
    card.draftable = true;
    card.rank = index + 1;
  }
}

const filePath = path.join(__dirname, '/../data/cards.new.json');
fs.writeFile(filePath, JSON.stringify(cards, null, 2), function(err) {
  if(err) {
      return console.log(err);
  }

  console.log("The file was saved!");
}); 
