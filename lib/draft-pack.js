module.exports = class DraftPack {
  constructor(pack) {
    this.pack = pack;
    this.players = [];
    this.picks = [];
  }

  get cards() {
    return this.pack.filter(card => !this.picks.find(pick => pick.card.id === card.id));
  }

  addPlayer(player) {
    if (this.pack && this.players.length >= this.pack.length) {
      throw new Error('Draft pack already has maximum number of players');
    }
    this.players.push(player);
    return this;
  }

  pick(player, card) {
    if (!player) {
      throw new Error('No player was specified');
    }
    if (player !== this.currentPlayer()) {
      throw new Error('Not this player\'s turn to pick');
    }
    if (!card) {
      throw new Error('No card was picked');
    }
    if (!this.pack.cards.find(packCard => packCard.id === card.id)) {
      throw new Error('Card does not exist in the pack');
    }
    if (this.picks.find(pick => pick.card.id === card.id)) {
      throw new Error('Card has already been picked');
    }
    this.picks.push({ player, card });
    return this;
  }

  hasPlayerPicked(player) {
    return !!this.getPlayerPick(player);
  }

  getPlayerPick(player) {
    return this.picks.find(pick => pick.player.id === player.id);
  }

  isComplete() {
    return this.players.length === this.picks.length;
  }

  currentPlayer() {
    if (this.isComplete()) {
      return false;
    }
    return this.players[this.picks.length];
  }

  //
  // Validation
  //

  isValid() {
    return this.hasPlayers()
      && this.hasPack();
  }

  validationMessage() {
    if (!this.hasPlayers()) {
      return 'No players are added';
    } else if (!this.hasPack()) {
      return 'No pack was added';
    }
    return 'Draft pack is valid';
  }

  hasPlayers() {
    return this.players && this.players.length;
  }

  hasPack() {
    return this.pack;
  }
};
