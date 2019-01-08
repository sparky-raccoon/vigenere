var inquirer = require("inquirer");
var utils = require("./utils.js");

var questions = [
  {
    type: 'input',
    name: 'sentence',
    message: 'Type the sentence you wish to encrypt or decrypt',
    validate: function(value) {
      return true;
    },
    sentence: String
  },
  {
    type: 'input',
    name: 'key',
    message: 'Type the key you wish to use for encryption or decryption',
    validate: function(value) {
      return true;
    },
    key: String
  },
  {
    type: 'list',
    name: 'mode',
    message: 'Pick a mode:',
    choices: ['encryption', 'decryption'],
  }
]

inquirer.prompt(questions).then(answers => {
  let result = '';
  switch(answers.mode) {
    case 'encryption':
      result = utils.encrypt(answers.sentence, answers.key);
      break;
    case 'decryption':
      result = utils.decrypt(answers.sentence, answers.key);
      break;
  }
  console.log(`Result: ${result}`);
});

/* const [,, ...args] = process.argv;
for (let i = 0; i < args.length; i++) {
  args[i] = args[i].toLowerCase();
}
const [firstFlag, firstValue, secondFlag, secondValue] = args;

// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------

const isPureString = (val) => {
  return ((typeof val === 'string') && (/^([a-z-]+)$/.test(val)));
}

const isAlphabetic = (val) => {
  return (/^([a-z]+)$/.test(val));
}

const getKeyBase = (key) => {
  let keyBase = key;
  let i = 0;

  while (word.length > keyBase.length) {
    keyBase += key[i];
    if (i === key.length) i = 0;
    else i++;
  }

  return keyBase;
}

const displayHelp = () => {
  console.log('');
  console.log('How to use this script:');
  console.log('npx vigenere (-k | --key) key ( -c | --crypt | -d | --decrypt) word')
  console.log('');
}

const main = (type, key, word) => {
  if (type === '-c' || type === '--crypt') {
    crypt(key, word);
  } else if (type === '-d' || type === '--decrypt') {
    decrypt(key, word);
  } else {
    console.error('An unallowed flag was provided, use -c, --crypt, -d or --decrypt');
    displayHelp();
  }
}

const crypt = (key, word) => {
  console.log(`Crypting ${word} ...`);
  console.log(`Key is ${key}`);
  console.log('');

  let keyBase = getKeyBase(key);

  let res = '';

  for (let i = 0; i < word.length; i++) {
    let cobj = TABLE[word[i]];
    res += cobj[keyBase[i]];
  }

  console.log(`Result: ${res}`);
};

const decrypt = (key, word) => {
  console.log(`Decrypting ${word} ...`);
  console.log(`Key is ${key}`);
  console.log('');

  let keyBase = getKeyBase(key);

  let res = '';

  for (let i = 0; i < word.length; i++) {
    Object.keys(TABLE).map(celt => {
      Object.keys(TABLE[celt]).map(kelt => {
        if (TABLE[celt][kelt] === word[i] && kelt === keyBase[i]) {
          res += celt;
        }
      })
    })
  }

  console.log(`Result: ${res}`);
};

// -----------------------------------------------------------------------------
let type = '';
let key = '';
let word = '';

if (args.length === 4) {
  if (args.every(isPureString)) {
    if (firstFlag === '-k' || firstFlag === '--key') {
      type = secondFlag;
      key = firstValue;
      word = secondValue;

      if (isAlphabetic(word)) {
        main(type, key, word);
      } else {
        console.error('Only alphabetic characters are allowed for the word you intend to crypt / decrypt');
        displayHelp();
      }
    } else if (secondFlag === '-k' || firstFlag === '--key') {
      type = firstFlag;
      key = secondValue;
      word = firstValue;

      if (isAlphabetic(word)) {
        main(type, key, word);
      } else {
        console.error('Only alphabetic characters are allowed for the word you intend to crypt / decrypt');
        displayHelp();
      }
    } else {
      console.error('Key flag is missing (--k or --key)');
      displayHelp();
    }
  } else {
    console.error('Nor numeric and special characters (except - as the beginning of a flag) are allowed in parameters');
    displayHelp();
  }
} else {
  console.error('There are missing arguments');
  displayHelp();
} */
