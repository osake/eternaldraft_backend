var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
  _id: Number,
  name: String,
  release: String, // synonym for set which is a reserved word in mongoose
  num: Number,
  text: String,
  influence: String,
  rarity: String,
  colors: [String],
  cost: Number,
  attack: Number,
  health: Number,
  subtypes: [String],
  type: String,
  draftable: Boolean,
  rank: Number,
  created_at: Date,
  updated_at: Date
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
