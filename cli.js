var inquirer = require("inquirer");
var utils = require("./utils.js");

var questions = [
  {
    type: 'input',
    name: 'sentence',
    message: 'Type the sentence you wish to encrypt or decrypt',
    validate: function(value) {
      const pass = value.match(/^[a-z]+$/i);
      if (pass) return true;
      else return 'Please enter a valid sentence (numbers and special characters are not allowed)';
    }
  },
  {
    type: 'input',
    name: 'key',
    message: 'Type the key you wish to use for encryption or decryption',
    validate: function(value) {
      const pass = value.match(/^[a-z]+$/i);
      if (pass) return true;
      else return 'Please enter a valid key (numbers and special characters are not allowed)';
    }
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
