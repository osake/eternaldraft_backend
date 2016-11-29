const DraftRound = require('./draft-round');
const Util = require('./util');

module.exports = class Draft {
  constructor(player) {
    this.player = player;
    this.rounds = [];
  }

  addRound(draftRound) {
    this.rounds.push(draftRound);
  }

  isStarted() {
    return this.currentRound;
  }

  start() {
    if (this.isStarted()) {
      throw new Error('Draft is already started');
    }

    if (!this.isInitialized()) {
      this.init();
    }

    this.currentRound = this.rounds[0];
  }

  //
  // Initialization
  //

  isInitialized() {
    return this.rounds.length;
  }

  init() {
    if (this.isInitialized()) {
      throw new Error('Draft is already initialized');
    }

    if (!this.isValid()) {
      throw new Error(this.validationMessage());
    }

    this.initPlayers();
    this.initPacks();
    this.initRounds();

    return true;
  }

  initPlayers() {
    if (this.options.shufflePlayers) {
      this.players = Util.shuffle(this.players);
    }
  }

  initPacks() {
    if (this.options.shufflePacks) {
      this.packs = Util.shuffle(this.packs);
    }
  }

  initRounds() {
    if (this.rounds && this.rounds.length) {
      throw new Error('Draft rounds already initialized');
    }

    const numPacksPerRound = this.numPacksRequired() / this.players.length;
    const evenRoundPlayerChain = this.players.slice();
    const oddRoundPlayerChain = this.players.slice().reverse();

    for (let i = 0; i < this.options.numRounds; i += 1) {
      const draftRound = new DraftRound();
      draftRound.chain = this.chains[i % this.options.numRounds];
      draftRound.players = i % 2 ? oddRoundPlayerChain : evenRoundPlayerChain;
      draftRound.packs = this.packs.slice(i * numPacksPerRound, numPacksPerRound);
      this.rounds.push(draftRound);
    }
  }

  //
  // Validation
  //

  isValid() {
    return this.hasCorrectNumberOfPlayers()
      && this.hasCorrectNumberOfPacks();
  }

  validationMessage() {
    if (!this.hasCorrectNumberOfPlayers()) {
      return `Draft does not have correct number of players. ( need: ${this.options.numPlayers}, have: ${this.players.length}`;
    } else if (!this.hasCorrectNumberOfPacks()) {
      return `Draft does not have correct number of packs. ( need: ${this.numPacksRequired()}, have: ${this.packs.length})`;
    } else if (!this.hasCorrectNumberOfChains()) {
      return `Draft does not have correct number of chains. ( need: ${this.options.numRounds}, have: ${this.chains.length})`;
    }
    return 'Draft is valid';
  }

  hasCorrectNumberOfPlayers() {
    if (!this.players || !this.players.length) {
      return false;
    }
    if (this.players.length !== this.options.numPlayers) {
      return false;
    }
    return true;
  }

  hasCorrectNumberOfPacks() {
    if (!this.packs || !this.packs.length) {
      return false;
    }
    return this.packs.length === this.numPacksRequired();
  }

  hasCorrectNumberOfChains() {
    if (!this.chains || !this.chains.length) {
      return false;
    }

    return this.chains.length === this.options.numRounds;
  }
};
