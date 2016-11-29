const DraftPack = require('./draft-pack');
const DraftChain = require('./draft-chain');

module.exports = class DraftRound {
  constructor(player, pack) {
    this.player = player;
    this.pack = pack;
    this.seed;
    this.chain;
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
    if (!this.isInitialized()) {
      throw new Error('Draft round is not initialized');
    }
    return this.chain.currentPack();
  }

  isComplete() {
    if (!this.isInitialized()) {
      return false;
    }
    return this.chain.isComplete();
  }

  //
  // Initialization
  //

  isInitialized() {
    return !!this.chain;
  }

  init() {
    if (this.isInitialized()) {
      throw new Error('Draft round is already initialized');
    }

    if (!this.isValid()) {
      throw new Error(this.validationMessage());
    }

    this.chain = DraftChain.createFromSeed(this.seed, this.player, this.pack);
  }

  //
  // Validation
  //

  isValid() {
    return this.hasPlayer()
      && this.hasPack()
      && this.hasSeed();
  }

  validationMessage() {
    if (!this.hasPlayer()) {
      return 'No player provided';
    } else if (!this.hasPack()) {
      return 'No pack provided';
    } else if (!this.hasSeed()) {
      return 'No seed chain provided';
    }
    return 'Draft round is valid';
  }

  hasPlayer() {
    if (!this.player) {
      return false;
    }
    return true;
  }

  hasPack() {
    if (!this.pack) {
      return false;
    }
    return true;
  }

  hasSeed() {
    if (!this.seed) {
      return false;
    }
    return true;
  }
};
