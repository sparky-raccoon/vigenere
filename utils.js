let ALPHABET = [];
for (let i = 0; i<26; i++) { ALPHABET.push(String.fromCharCode(97+i)); }

let rotateAlphabet = [...ALPHABET];

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

const saveUpperCase = (sentence) => {
  let indexes = [];

  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === sentence[i].toUpperCase()) {
      indexes.push(i);
    }
  }

  return indexes;
}

const restoreUpperCase = (sentence, indexes) => {
  for (let i = 0; i < indexes.length; i++) {
    const upper = sentence[indexes[i]].toUpperCase();
    sentence = sentence.substring(0, indexes[i]) + upper + sentence.substring(indexes[i]+1);
  }

  return sentence;
}

var utils = module.exports;

utils.encrypt = function(sentence, key) {
  let indexes = saveUpperCase(sentence);
  let keyBase = getKeyBase(sentence, key);
  let res = '';

  sentence = sentence.toLowerCase();
  for (let i = 0; i < sentence.length; i++) {
    let cobj = TABLE[sentence[i]];
    res += cobj[keyBase[i]];
  }

  res = restoreUpperCase(res, indexes);
  return res;
}

utils.decrypt = function(sentence, key) {
  let indexes = saveUpperCase(sentence);
  let keyBase = getKeyBase(sentence, key);
  let res = '';

  sentence = sentence.toLowerCase();
  for (let i = 0; i < sentence.length; i++) {
    Object.keys(TABLE).map(celt => {
      Object.keys(TABLE[celt]).map(kelt => {
        if (TABLE[celt][kelt] === sentence[i] && kelt === keyBase[i]) {
          res += celt;
        }
      })
    })
  }

  res = restoreUpperCase(res, indexes);
  return res;
}
