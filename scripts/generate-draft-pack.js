'use strict';

const commandLineArgs = require('command-line-args'),
      PackFactory = require('../lib/pack-factory'),
      cards = require('../data/cards.json');

const optionDefinitions = [
  { name: 'count', alias: 'c', type: Number, defaultValue: 1, defaultOption: true }
];

const options = commandLineArgs(optionDefinitions);
const packFactory = new PackFactory(cards.filter((card => card.draftable)));
const packs = [];

for (let i = 0; i < options.count; i++) {
  packs.push(packFactory.standardPack());
}

console.log(JSON.stringify(packs));
