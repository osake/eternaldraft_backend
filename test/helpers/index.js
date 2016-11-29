const Card = require('../../lib/card');
const Pack = require('../../lib/pack');
const Player = require('../../lib/player');
const DraftPack = require('../../lib/draft-pack');
const DraftChain = require('../../lib/draft-chain');
const DraftRound = require('../../lib/draft-round');

module.exports = class Helpers {
  static makeCard(data) {
    return Card.load(data);
  }

  static validPack() {
    return new Pack([
      Helpers.makeCard({id: 1, name: 'Test Rare 1', rarity: 'Rare'}), 
      Helpers.makeCard({id: 2, name: 'Test Uncommon 1', rarity: 'Uncommon'}), 
      Helpers.makeCard({id: 3, name: 'Test Uncommon 2', rarity: 'Uncommon'}), 
      Helpers.makeCard({id: 4, name: 'Test Uncommon 3', rarity: 'Uncommon'}), 
      Helpers.makeCard({id: 5, name: 'Test Common 1', rarity: 'Common'}),
      Helpers.makeCard({id: 6, name: 'Test Common 2', rarity: 'Common'}),
      Helpers.makeCard({id: 7, name: 'Test Common 3', rarity: 'Common'}),
      Helpers.makeCard({id: 8, name: 'Test Common 4', rarity: 'Common'}),
      Helpers.makeCard({id: 9, name: 'Test Common 5', rarity: 'Common'}),
      Helpers.makeCard({id: 10, name: 'Test Common 6', rarity: 'Common'}),
      Helpers.makeCard({id: 11, name: 'Test Common 7', rarity: 'Common'}),
      Helpers.makeCard({id: 12, name: 'Test Common 8', rarity: 'Common'}),
    ]);
  }

  static validDraftPack(numPlayers = 12) {
    const draftPack = new DraftPack(Helpers.validPack());
    for (let i = 0; i < numPlayers; i += 1) {
      draftPack.players.push(new Player(i + 1, `Test Player ${i + 1}`));
    }
    return draftPack;
  }

  static playerDraftPack(player, playerPosition = 0, pickToPlayer = true) {
    const draftPack = new DraftPack(Helpers.validPack());
    let idIncr = 100;
    draftPack.players.push(player);

    for (let i = playerPosition - 1; i >= 0; i -= 1) {
      draftPack.players.unshift(new Player(player.id + idIncr, `Test Player ${i}`));
      idIncr += 1;
    }

    if (pickToPlayer) {
      for (let i = 0; i < playerPosition; i += 1) {
        if (draftPack.players[i].id === player.id) {
        }
        draftPack.pick(draftPack.players[i], draftPack.cards[0]);
      }
    }

    return draftPack;
  }

  static pickDraftRoundToPlayer(draftRound) {
    draftRound.chain.draftPacks.map(draftPack => {
      draftPack.players.find(player => {
        if (player.id == draftRound.player.id) {
          return true;
        }
        if (!draftPack.hasPlayerPicked(player)) {
          draftPack.pick(player, draftPack.cards[0]);
        }
        return false;
      });
    });
  }

  static validDraftChain(player = null) {
    const draftChain = new DraftChain();
    draftChain.player = player ? player : new Player(1);
    draftChain.addDraftPack(Helpers.playerDraftPack(draftChain.player));
    for (let i = 1; i < 12; i += 1) {
      const draftPack = Helpers.playerDraftPack(draftChain.player, i);
      draftChain.addDraftPack(draftPack);
    }
    return draftChain;
  }

  static completedDraftChain(player = null) {
    const draftChain = Helpers.validDraftChain(player);
    draftChain.draftPacks.map(draftPack => draftPack.pick(draftChain.player, draftPack.cards[0]));
    return draftChain;
  }

  static validDraftRound(player = null) {
    const draftRound = new DraftRound();
    draftRound.player = player ? player : new Player(1);
    draftRound.pack = Helpers.validPack();
    draftRound.seed = Helpers.completedDraftChain();
    return draftRound;
  }

  static initializedDraftRound(player = null) {
    const draftRound = Helpers.validDraftRound(player);
    draftRound.init();
    return draftRound;
  }

  static completedDraftRound(player = null) {
    const draftRound = Helpers.validDraftRound(player);
    draftRound.chain = Helpers.completedDraftChain(player);
    return draftRound;
  }
}
