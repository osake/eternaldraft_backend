'use strict';

const PackFactory = require('../lib/pack-factory');
const cards = require('../data/cards.json');

const packFactory = new PackFactory(cards); 

console.log(JSON.stringify(packFactory.standardPack().cards));
