const Pack = require('./pack');
const Util = require('./util');

module.exports = class PackFactory {
  constructor(cards) {
    this.pool = new Pack(cards);
  }

  get cards() { return this.pool.cards; }
  get rares() { return this.pool.rares; }
  get uncommons() { return this.pool.uncommons; }
  get commons() { return this.pool.commons; }

  standardPack() {
    return this.pack(1, 3, 8);
  }

  pack(numRares, numUncommons, numCommons) {
    if (numRares > this.pool.rares.length) {
      throw new Error(`Not enough rares in the pool (${numRares} requested, ${this.pool.rares.length} available)`);
    }

    if (numUncommons > this.pool.uncommons.length) {
      throw new Error(`Not enough uncommons in the pool (${numUncommons} requested, ${this.pool.uncommons.length} available)`);
    }

    if (numCommons > this.pool.commons.length) {
      throw new Error(`Not enough commons in the pool (${numCommons} requested, ${this.pool.commons.length} available)`);
    }

    const cards = [
      ...Util.shuffle(this.pool.rares).slice(0, numRares),
      ...Util.shuffle(this.pool.uncommons).slice(0, numUncommons),
      ...Util.shuffle(this.pool.commons).slice(0, numCommons),
    ];

    return new Pack(cards);
  }
};
