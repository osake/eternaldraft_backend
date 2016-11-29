const randomstring = require('randomstring');
const Player = require('./player');

module.exports = class AiPlayer extends Player {
  constructor(logger) {
    super(`AiPlayer(${randomstring.generate(6)})`);
    this.logger = logger;
    this.pool = [];
    this.strategy = null;
  }

  pick(cards) {
    let pickedCard = null;

    if (!this.strategy) {
      pickedCard = cards.reduce((x, y) => (x.rank < y.rank ? x : y));
    } else {
      // TODO: Implement this
    }

    this.log(`Picked ${pickedCard.name}`);
    this.pool.push(pickedCard);

    return pickedCard;
  }

  log(msg, level) {
    /* istanbul ignore if */
    if (this.logger) {
      this.logger.log(level || 'debug', `${this.name}: ${msg}`);
    }
  }
};
