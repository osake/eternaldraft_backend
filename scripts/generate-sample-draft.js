'use strict';

const winston = require('winston');
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ]
});
logger.level = 'debug';

const DraftService = require('../lib/draft-service'),
      PackFactory = require('../lib/pack-factory'),
      Player = require('../lib/player');

const cardPool = require('../data/cards.json');

logger.info('Loaded ' + cardPool.length + ' cards');

const draftService = new DraftService();
draftService.logger = logger;

draftService.packFactory = new PackFactory(cardPool.filter(card => card.draftable));
const draft = draftService.createDraft(new Player('Test Player'));
draft.start();
