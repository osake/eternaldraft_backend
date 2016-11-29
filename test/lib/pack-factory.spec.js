'use strict';

const assert = require('assert'),
      Card = require('../../lib/card'),
      PackFactory = require('../../lib/pack-factory');

describe('Pack factory', () => {
  const cards = [
    Card.load({id: 1, name: 'Test Legendary 1', rarity: 'Legendary'}), 
    Card.load({id: 2, name: 'Test Rare 1', rarity: 'Rare'}), 
    Card.load({id: 3, name: 'Test Rare 2', rarity: 'Rare'}), 
    Card.load({id: 4, name: 'Test Uncommon 1', rarity: 'Uncommon'}), 
    Card.load({id: 5, name: 'Test Uncommon 2', rarity: 'Uncommon'}), 
    Card.load({id: 6, name: 'Test Uncommon 3', rarity: 'Uncommon'}), 
    Card.load({id: 7, name: 'Test Uncommon 4', rarity: 'Uncommon'}), 
    Card.load({id: 8, name: 'Test Common 1', rarity: 'Common'}),
    Card.load({id: 9, name: 'Test Common 2', rarity: 'Common'}),
    Card.load({id: 10, name: 'Test Common 3', rarity: 'Common'}),
    Card.load({id: 11, name: 'Test Common 4', rarity: 'Common'}),
    Card.load({id: 12, name: 'Test Common 5', rarity: 'Common'}),
    Card.load({id: 13, name: 'Test Common 6', rarity: 'Common'}),
    Card.load({id: 14, name: 'Test Common 7', rarity: 'Common'}),
    Card.load({id: 15, name: 'Test Common 8', rarity: 'Common'}),
  ];

  describe('Creating a pack factory', () => {
    it('filters the cards into rarity groups', () => {
      const packFactory = new PackFactory(cards);
      assert.equal(15, packFactory.cards.length);
      assert.equal(3, packFactory.rares.length);
      assert.equal(4, packFactory.uncommons.length);
      assert.equal(8, packFactory.commons.length);
    });
  });

  describe('Generating a pack with a pack factory', () => {
    const packFactory = new PackFactory(cards);

    it('returns a new pack with correct distribution of cards', () => {
      const pack = packFactory.pack(1, 2, 4);
      assert.equal(1, pack.rares.length); 
      assert.equal(2, pack.uncommons.length); 
      assert.equal(4, pack.commons.length); 
    });

    it('throws if it cannot meet rares quota', () => {
      assert.throws(() => packFactory.pack(4), /enough rares/);
    });

    it('throws if it cannot meet uncommons quota', () => {
      assert.throws(() => packFactory.pack(1, 5), /enough uncommons/);

    });

    it('throws if it cannot meet commons quota', () => {
      assert.throws(() => packFactory.pack(1, 2, 10), /enough commons/);
    });
  });
});
