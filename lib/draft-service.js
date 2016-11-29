const Draft = require('./draft');
const DraftRound = require('./draft-round');
const AiPlayer = require('./ai-player');
const Util = require('./util');

module.exports = class DraftService {
  constructor(logger) {
    this.logger = logger;
    this.packFactory = null;
  }

  createDraft() {
    const draft = new Draft(Util.generateId(10));

    this.log(`Creating new draft: ${draft.seed}`);

    draft.packFactory = this.packFactory;

    return draft;
  }

  generateDraftRounds(draft) {
    const draftRounds = [];
    for (let i = 0; i < 4; i += 1) {
      draftRounds.push(this.generateDraftRound(draft));
    }
    return draftRounds;
  }

  generateAiPlayers(num) {
    const players = [];
    for (let i = 0; i < num; i += 1) {
      players.push(new AiPlayer(this.logger));
    }
    return players;
  }

  generateDraftRound(draft) {
    const draftRound = new DraftRound(Util.generateId(10));
    draftRound.player = draft.player;
    draftRound.player = draft.player;
    draftRound.opponents = this.generateAiPlayers(11);
    this.log(`Creating draft round: ${draftRound.id}`);

    for (let i = 0; i < 12; i += 1) {
      draftRound.packs.push(this.packFactory.standardPack());
    }

    return draftRound;
  }

  log(msg, level) {
    /* istanbul ignore if */
    if (this.logger) {
      this.logger.log(level || 'debug', `${this.name}: ${msg}`);
    }
  }
};
