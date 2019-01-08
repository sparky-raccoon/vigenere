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
