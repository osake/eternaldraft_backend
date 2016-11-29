module.exports = class DraftPick {
  constructor(player, card) {
    this.card = card;
    this.player = player;
  }

  isComplete() {
    return this.card && this.player;
  }
};
