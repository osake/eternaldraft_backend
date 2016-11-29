const Card = require('./card');

module.exports = class Pack {
  constructor(cards) {
    this.cards = cards || [];
  }

  get rares() {
    return this.cards.filter(card => (card.rarity === 'Legendary' || card.rarity === 'Rare'));
  }

  get uncommons() {
    return this.cards.filter(card => card.rarity === 'Uncommon');
  }

  get commons() {
    return this.cards.filter(card => card.rarity === 'Common');
  }

  get length() {
    return this.cards.length;
  }

  filter(callback) {
    return this.cards.filter(callback);
  }

  highestRanked() {
    if (!this.cards || !this.cards.length) {
      throw new Error('No cards to rank');
    }
    return this.cards.reduce((x, y) => {
      if (x.rank === -1) {
        return y;
      } else if (y.rank === -1) {
        return x;
      }

      return (x.rank < y.rank) ? x : y;
    });
  }

  [Symbol.iterator]() {
    return this.cards[Symbol.iterator]();
  }

  static fromJSON(jsonData) {
    const data = JSON.parse(jsonData);
    return data.reduce((pack, cardData) => {
      pack.cards.push(Card.load(cardData));
      return pack;
    }, new Pack());
  }
};
