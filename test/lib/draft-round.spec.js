'use strict';

const assert = require('assert');
const DraftRound = require('../../lib/draft-round');
const DraftChain = require('../../lib/draft-chain');
const Player = require('../../lib/player');
const Helpers = require('../helpers');

describe('Draft round', () => {
  describe('Draft round validation', () => {
    describe('Draft round valid if', () => {
      const draftRound = Helpers.validDraftRound();

      it('all validations pass', () => {
        assert(draftRound.isValid());
        assert(draftRound.validationMessage().match(/is valid/));
      });
    });

    describe('draft round invalid if', () => {
      const draftRound = new DraftRound();

      it('does not have a player', () => {
        assert(!draftRound.hasPlayer());
      });
    });
  });

  describe('Draft round initialization', () => {
    describe('Initializing a valid draft round', () => {
      const draftRound = Helpers.validDraftRound();

      before(() => {
        draftRound.init();
      });

      it('successfully initializes the draft round', () => {
        assert(draftRound.isInitialized());
      });

      it('throws if initialized again', () => {
        assert.throws(() => draftRound.init());
      });
    });

    describe('Initializing an invalid draft round', () => {
      const draftRound = new DraftRound();

      it('throws if the draft round is not valid', () => {
        assert.throws(() => draftRound.init(), /No player/);
        draftRound.player = new Player(1);
        assert.throws(() => draftRound.init(), /No pack/);
        draftRound.pack = Helpers.validPack();
        assert.throws(() => draftRound.init(), /No seed/);
      });
    });
  });

  describe('Picking a card from a draft round', () => {
    let draftRound;

    beforeEach(() => {
      draftRound = Helpers.validDraftRound();
      draftRound.init();
    });

    describe('Making a valid pick', () => {
      it('returns the next pack if more are available', () => {
        const currentPack = draftRound.currentPack();
        const nextPack = draftRound.pick(currentPack.cards[0]);
        assert(nextPack);
      });
    });
    
    describe('Making an invalid pick', () => {
      it('throws if no card was provided', () => {
        assert.throws(() => draftRound.pick(), /No card/);
      });
      it('throws if player has no pack to pick from', () => {
        const draftRound = Helpers.completedDraftRound();
        assert.throws(() => draftRound.pick({}), /no pack/);
      });
    });
  });

  describe('Draft round state', () => {
    let draftRound;

    before(() => {
      draftRound = Helpers.validDraftRound();
    });

    describe('Getting the current pack from a draft round', () => {
      it('throws if draft round is not initalized', () => {
        const draftRound = new DraftRound();
        assert.throws(() => draftRound.currentPack(), /not initialized/);
      });
    });

    describe('Checking completion on a completed draft round', () => {
      it('returns success if draft round is completed', () => {
        draftRound.chain = Helpers.completedDraftChain();
        assert(draftRound.isComplete());
      });
      it('returns false if draft round is not initialized', () => {
        const draftRound = new DraftRound();
        assert(!draftRound.isComplete());
      });
      it('returns false if draft round is not completed', () => {
        draftRound.chain = Helpers.validDraftChain();
        assert(!draftRound.isComplete());
      });
    });
  });
});
