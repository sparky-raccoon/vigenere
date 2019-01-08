let ALPHABET = [];
let rotateAlphabet = [];
for (let i = 0; i<26; i++) { ALPHABET.push(String.fromCharCode(97+i)); }

rotateAlphabet = JSON.parse(JSON.stringify(ALPHABET));

let TABLE = {};
for (let i = 0; i<26; i++) {
  let SUBTABLE = {};
  for (let j = 0; j<26; j++) {
    SUBTABLE[ALPHABET[j]] = rotateAlphabet[j];
  }
  TABLE[ALPHABET[i]] = SUBTABLE;
  rotateAlphabet = [...rotateAlphabet.slice(1, rotateAlphabet.length), rotateAlphabet[0]];
}

const getKeyBase = (sentence, key) => {
  let keyBase = key;
  let i = 0;

  while (sentence.length > keyBase.length) {
    keyBase += key[i];
    if (i === key.length) i = 0;
    else i++;
  }

  return keyBase;
}

var utils = module.exports;

utils.encrypt = function(sentence, key) {
  let keyBase = getKeyBase(sentence, key);
  let res = '';

  for (let i = 0; i < sentence.length; i++) {
    let cobj = TABLE[sentence[i]];
    res += cobj[keyBase[i]];
  }

  return res;
}

utils.decrypt = function(sentence, key) {
  let keyBase = getKeyBase(sentence, key);
  let res = '';

  for (let i = 0; i < sentence.length; i++) {
    Object.keys(TABLE).map(celt => {
      Object.keys(TABLE[celt]).map(kelt => {
        if (TABLE[celt][kelt] === sentence[i] && kelt === keyBase[i]) {
          res += celt;
        }
      })
    })
  }

  return res;
}
