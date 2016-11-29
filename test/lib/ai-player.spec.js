'use strict';

const assert = require('assert'),
      AiPlayer = require('../../lib/ai-player'),
      PackFactory = require('../../lib/pack-factory'),
      DraftPack = require('../../lib/draft-pack'),
      cards = require('../../data/cards.json');

describe('AI player', () => {
  describe('When picking a card', () => {
    const player = new AiPlayer();
    const packFactory = new PackFactory(cards.filter(card => card.draftable));
    let pack = null;

    beforeEach(() => {
      pack = packFactory.standardPack();
    });

    it('adds the card to its pool', () => {
      player.pick(pack.cards);
      assert.equal(1, player.pool.length);
      player.pick(pack.cards);
      assert.equal(2, player.pool.length);
    });

    describe('With no strategy', () => {
      it('picks the highest ranked card', () => {
        const highestRanked = pack.highestRanked();
        const card = player.pick(pack.cards);
        assert.equal(highestRanked.rank, card.rank);
      });
    });
  });
});
