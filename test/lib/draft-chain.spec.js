const assert = require('assert');
const DraftChain = require('../../lib/draft-chain');
const DraftPack = require('../../lib/draft-pack');
const Player = require('../../lib/player');
const Helpers = require('../helpers');

describe('Draft chain validation', () => {
  describe('Draft chain valid if', () => {
    const draftChain = Helpers.validDraftChain();

    it('all validations pass', () => {
      assert(draftChain.isValid());
      assert(draftChain.validationMessage().match(/is valid/));
    });
  });

  describe('Draft chain invalid if', () => {
    it('does not have a player', () => {
      const draftChain = new DraftChain();
      assert(!draftChain.hasPlayer());
      assert(draftChain.validationMessage().match(/No player/));
    });

    it('does not have draft packs', () => {
      const draftChain = new DraftChain();
      draftChain.player = new Player();
      assert(!draftChain.hasDraftPacks());
      assert(draftChain.validationMessage().match(/No draft packs/));
    });
  });
});

describe('Draft chain generation', () => {
  describe('Generating a valid draft chain', () => {
    const seed = Helpers.completedDraftChain(new Player(100));
    let draftChain;

    before(() => {
      draftChain = DraftChain.createFromSeed(seed, new Player(1), Helpers.validPack());
    });

    it('returns a valid draft chain', () => {
      assert(draftChain.isValid());
    });

    it('has correct player ordering', () => {
      assert.equal(draftChain.draftPacks[0].players[0], draftChain.player);
      assert.equal(draftChain.draftPacks[1].players[0], seed.player);
    });
  });

  describe('Generating an invalid draft chain', () => {
    it('throws if no seed provided', () => {
      assert.throws(() => DraftChain.createFromSeed(), /No seed/);
    });

    it('throws if seed chain is incomplete', () => {
      assert.throws(() => DraftChain.createFromSeed(Helpers.validDraftChain()), /Incomplete seed/);
    });

    it('throws if no player was provided', () => {
      assert.throws(() => DraftChain.createFromSeed(Helpers.completedDraftChain()), /No player/);
    });

    it('throws if no pack was provided', () => {
      assert.throws(
        () => DraftChain.createFromSeed(
          Helpers.completedDraftChain(),
          new Player()
        ), /No pack/);
    });
  });
});

describe('Draft chain state', () => {
  describe('Retrieving the next pack from a draft chain', () => {
    const draftChain = Helpers.validDraftChain();

    it('returns the correct next pack', () => {
      assert.equal(draftChain.currentPack(), draftChain.draftPacks[0]);
    });
  });

  describe('Making a valid pick from a draft chain', () => {
    let draftChain;

    before(() => {
      draftChain = Helpers.validDraftChain();
    });

    it('returns the correct next pack', () => {
      const currentPack = draftChain.pick(draftChain.draftPacks[0].cards[0]);
      assert(currentPack);
      assert.equal(currentPack, draftChain.draftPacks[1]);
    });
  });

  describe('Making an invalid pick from a draft chain', () => {
    const draftChain = Helpers.validDraftChain();

    it('throws if card was not provided', () => {
      assert.throws(() => draftChain.pick(), /No card/);
    });
    it('throws if player has no next pack', () => {
      const draftChain = Helpers.completedDraftChain();
      assert.throws(() => draftChain.pick({id: null}));
    });
  });
});
