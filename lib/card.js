module.exports = class Card {
  constructor() {
    this.id = null;
    this.name = null;
    this.rarity = null;
    this.text = null;
    this.cost = null;
    this.influence = null;
    this.attack = null;
    this.health = null;
    this.type = null;
    this.colors = null;
    this.num = null;
    this.set = null;
    this.draftable = null;
    this.rank = null;
  }

  static load(data) {
    const card = new Card();
    Object.assign(card, data);
    return card;
  }
};
