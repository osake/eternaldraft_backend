const randomstring = require('randomstring');

module.exports = class Util {
  static generateId(len) {
    return randomstring.generate(len || 10);
  }

  static shuffle(array) {
    const temp = array.slice();
    for (let i = temp.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = temp[i];
      temp[i] = temp[j];
      temp[j] = t;
    }
    return temp;
  }
};
