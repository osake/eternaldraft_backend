Running a development server

```
./node_modules/nodemon/bin/nodemon.js --legacy-watch bin/www
```

# How a draft works

Players will open 4 packs, 1 at a time. Players will then pick a single card from the pack and receive a new pack from another player.

Draft
    4 DraftRounds
    1 Player
    1 DraftPool

DraftRound
    12 Packs

Pack
    12 Cards:w

