'use strict';

const assert = require('assert');
const Card = require('../../lib/card');
const Pack = require('../../lib/pack');
const Fixtures = require('../fixtures');

const cards = [
  Card.load({id: 2, name: 'Test Rare 1', rarity: 'Rare'}), 
  Card.load({id: 4, name: 'Test Uncommon 1', rarity: 'Uncommon'}), 
  Card.load({id: 5, name: 'Test Uncommon 2', rarity: 'Uncommon'}), 
  Card.load({id: 6, name: 'Test Uncommon 3', rarity: 'Uncommon'}), 
  Card.load({id: 8, name: 'Test Common 1', rarity: 'Common'}),
  Card.load({id: 9, name: 'Test Common 2', rarity: 'Common'}),
  Card.load({id: 10, name: 'Test Common 3', rarity: 'Common'}),
  Card.load({id: 11, name: 'Test Common 4', rarity: 'Common'}),
  Card.load({id: 12, name: 'Test Common 5', rarity: 'Common'}),
  Card.load({id: 13, name: 'Test Common 6', rarity: 'Common'}),
  Card.load({id: 14, name: 'Test Common 7', rarity: 'Common'}),
  Card.load({id: 15, name: 'Test Common 8', rarity: 'Common'})
];

describe('Creating a pack', () => {
  it('correctly filters the cards into rarity groups', () => {
    const pack = new Pack(cards);
    assert.equal(12, pack.length);
    assert.equal(1, pack.rares.length);
    assert.equal(3, pack.uncommons.length);
    assert.equal(8, pack.commons.length);
  });
});

describe('Loading a pack from valid JSON', () => {
  it('correctly loads expected number of cards', () => {
    const pack = Pack.fromJSON(Fixtures.standardPackJSON());
    assert.equal(12, pack.cards.length);
  });
});

describe('Getting the highest ranked card', () => {
  it('throws if no cards exist', () => {
    const pack = new Pack();
    assert.throws(() => pack.highestRanked([]), /No cards/);
  });
  it('always ranks unranked cards last', () => {
    let pack = new Pack([
      Card.load({id: 1, name: 'Test Ranked', rarity: 'Common', rank: 999}),
      Card.load({id: 2, name: 'Test Unranked', rarity: 'Common', rank: -1}),
    ]);
    assert.equal(1, pack.highestRanked().id);

    pack = new Pack([
      Card.load({id: 1, name: 'Test Ranked', rarity: 'Common', rank: -1}),
      Card.load({id: 2, name: 'Test Unranked', rarity: 'Common', rank: 999}),
    ]);
    assert.equal(2, pack.highestRanked().id);
  });
});

describe('Iterating over a pack', () => {
  it('iterates over each card', () => {
    const pack = new Pack(cards);
    let i = 0;
    for (let card of pack) {
      i++;
    }
    assert.equal(cards.length, i);
  });
});
