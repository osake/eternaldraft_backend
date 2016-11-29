const DraftPack = require('./draft-pack');

module.exports = class DraftChain {
  constructor(player) {
    this.player = player;
    this.draftPacks = [];
  }

  pick(card) {
    if (!card) {
      throw new Error('No card provided');
    }
    const currentPack = this.currentPack();
    if (!currentPack) {
      throw new Error('Player has no pack to pick from');
    }
    currentPack.pick(this.player, card);
    return this.currentPack();
  }

  currentPack() {
    return this.draftPacks.find(draftPack => draftPack.currentPlayer().id === this.player.id);
  }

  addDraftPack(pack) {
    this.draftPacks.push(pack);
    return this;
  }

  isComplete() {
    return !this.draftPacks.find(draftPack => !draftPack.hasPlayerPicked(this.player));
  }

  // Validation

  isValid() {
    return this.hasPlayer()
      && this.hasDraftPacks();
  }

  validationMessage() {
    if (!this.hasPlayer()) {
      return 'No player provided';
    } else if (!this.hasDraftPacks()) {
      return 'No draft packs provided';
    }
    return 'Draft chain is valid';
  }

  hasPlayer() {
    return !!this.player;
  }

  hasDraftPacks() {
    return this.draftPacks && this.draftPacks.length;
  }

  // Helpers

  static createFromSeed(seed, player, pack) {
    if (!seed) {
      throw new Error('No seed provided');
    }
    if (!seed.isComplete()) {
      throw new Error('Incomplete seed chain');
    }
    if (!player) {
      throw new Error('No player provided');
    }
    if (!pack) {
      throw new Error('No pack provided');
    }
    const draftChain = new DraftChain(player);
    const draftPack = new DraftPack(pack);
    draftPack.addPlayer(player);
    const seedPacks = seed.draftPacks.slice(0, -1).map(pack => pack.addPlayer(player));
    draftChain.draftPacks = [draftPack, ...seedPacks];
    return draftChain;
  }
};
