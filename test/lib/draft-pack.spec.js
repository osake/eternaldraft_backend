const assert = require('assert');
const DraftPack = require('../../lib/draft-pack');
const Pack = require('../../lib/pack');
const Player = require('../../lib/player');
const Helpers = require('../helpers');

describe('Draft Pack', () => {
  describe('Draft pack validation', () => {
    describe('Draft pack valid if', () => {
      const draftPack = Helpers.validDraftPack();
      it('all validations pass', () => {
        assert(draftPack.isValid());
        assert(draftPack.validationMessage().match(/is valid/));
      });
    });

    describe('Draft pack invalid if', () => {
      it('no players were provided', () => {
        const draftPack = new DraftPack();
        assert(!draftPack.hasPlayers());
        assert(draftPack.validationMessage().match(/No players/));
      });
      it('no pack was provided', () => {
        const draftPack = new DraftPack();
        draftPack.addPlayer(new Player());
        assert(!draftPack.hasPack());
        assert(draftPack.validationMessage().match(/No pack/));
      });
    });
  });

  describe('Making a valid pick', () => {
    const draftPack = Helpers.validDraftPack();

    before(() => {
      draftPack.pick(draftPack.players[0], draftPack.cards[0]);
    });

    it('removes the card from the pack', () => {
      assert.equal(11, draftPack.cards.length);
    });
    it('set current player to next player in pick chain', () => {
      assert.equal(draftPack.players[1], draftPack.currentPlayer());
    });
    it('is retrievable', () => {
      assert(draftPack.getPlayerPick(draftPack.players[0]));
    });
  });

  describe('Making an invalid pick', () => {
    let draftPack;

    before(() => {
      draftPack = Helpers.validDraftPack();
    });

    it('throws if no player was specified', () => {
      assert.throws(() => draftPack.pick(), /No player/);
    });
    it('throws if card was not specified', () => {
      assert.throws(() => draftPack.pick(draftPack.players[0]), /No card/);
    });
    it('throws if card is not in the pack', () => {
      assert.throws(() => draftPack.pick(draftPack.players[0], Helpers.makeCard({id: 999})), /Card does not exist/);
    });
    it('throws if a player submits a pick when it is not their turn', () => {
      assert.throws(() => draftPack.pick(draftPack.players[1], draftPack.cards[0]), /Not this player/);
    });
    it('throws if card has already been picked', () => {
      draftPack.pick(draftPack.players[0], draftPack.pack.cards[0]);
      assert.throws(() => draftPack.pick(draftPack.players[1], draftPack.pack.cards[0]), /already been picked/);
    });
  });

  describe('Making the last pick in a draft pack', () => {
    const draftPack = new DraftPack(Helpers.validPack());

    before(() => {
      draftPack.addPlayer(new Player(1));
      draftPack.addPlayer(new Player(2));
      draftPack.pick(draftPack.players[0], draftPack.cards[0]);
    });

    it('completes the draft pack', () => {
      assert(!draftPack.isComplete());
      draftPack.pick(draftPack.players[1], draftPack.cards[0]);
      assert(draftPack.isComplete());
    });
  });

  describe('Adding a player to a draft pack', () => {
    const draftPack = new DraftPack(Helpers.validPack());
    
    before(() => {
      for (let i = 0; i < draftPack.pack.length; i += 1) {
        draftPack.addPlayer(new Player(i));
      }
    });

    it('throws if draft pack already has maximum number of players', () => {
      assert.throws(() => draftPack.addPlayer(new Player()));
    });
  });

  describe('Adding a player to a complete draft pack with cards left to pick', () => {
    const draftPack = Helpers.validDraftPack(2);

    before(() => {
      draftPack.pick(draftPack.players[0], draftPack.cards[0]);
      draftPack.pick(draftPack.players[1], draftPack.cards[0]);
    });

    it('is no longer complete', () => {
      assert(draftPack.isComplete());
      draftPack.addPlayer(new Player());
      assert(!draftPack.isComplete());
    });
  });
});
