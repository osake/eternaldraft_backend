'use strict';

const assert = require('assert');
const Card = require('../../lib/card');

describe('Loading a card', () => {
  it('sets card attributes', () => {
    const data = {
      id: 1,
      name: 'Test Card',
      rarity: 'Legendary',
      text: 'Test card text',
      cost: 2,
      influence: '{F}{J}',
      attack: '',
      health: '',
      type: 'Spell',
      colors: ['Fire', 'Justice'],
      num: 1,
      set: 'Set0',
      draftable: true,
      rank: 1
    };
    const card = Card.load(data);
    assert.equal(data.id, card.id);
    assert.equal(data.name, card.name);
    assert.equal(data.rarity, card.rarity);
    assert.equal(data.text, card.text);
    assert.equal(data.cost, card.cost);
    assert.equal(data.influence, card.influence);
    assert.equal(data.attack, card.attack);
    assert.equal(data.health, card.health);
    assert.equal(data.type, card.type);
    assert.equal(data.colors, card.colors);
    assert.equal(data.num, card.num);
    assert.equal(data.set, card.set);
    assert.equal(data.draftable, card.draftable);
    assert.equal(data.rank, card.rank);
  });
});
