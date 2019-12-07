// console.log(process.argv);

// const prompt = require('prompt');
const inquirer = require('inquirer');
// const gi = require(`gitignore`);
const Word = require("./Word");

const westernTeams = [
"nuggets", "jazz", "timberwolves", "thunder", "trailblazers", 
"lakers", "clippers", "suns", "kings", "warriors", 
"mavericks", "rockets", "spurs", "grizzles", "pelicans",
"raptors", "celtics", "76ers", "nets", "knicks",
"bucks", "pacers", "pistons", "bulls", "cavaliers",
"heat", "magic", "hornets", "wizards", "hawks"
];

// console.log(westernTeams);

let guess;
let chosenWords;
let word;
let chosenLetter;

function runIt() {
    chosenWords = [];
    console.log("Welcome to the NBA guessing game where you guess the team!\n");
    playGame();
};

function playGame() {
    chosenLetter = "";
    guess = 12;
    if(chosenWords.length < westernTeams.length) {
        chosenLetter = getWord();
    } else {
        // console.log("You sure know your NBA teams!");
        continuePrompt();
    }
    if (chosenLetter) {
        word = new Word(chosenLetter);
        word.makeLetters();
        makeGuess();
    };
};

function getWord() {
    let random = Math.floor(Math.random() * westernTeams.length);
    let randomWord = westernTeams[random];
    if(chosenWords.indexOf(randomWord) === -1) {
        chosenWords.push(randomWord);
        return randomWord;
    } else {
        return getWord();
    }
};

function makeGuess() {
    let checker = [];
    inquirer.prompt([
        {
            name: "GuessedLetter",
            message: word.update() +
            "\nGuess a letter!" +
            "\nGuesses Left: " + guess
        } 
    ])
    .then(data => {
        word.letters.forEach(letter => {
            letter.checkLetter(data.GuessedLetter);
            checker.push(letter.getCharacter());
        });
        if(guess > 0 && checker.indexOf("_") !== -1) {
            guess--;
            if(guess === 0) {
                console.log("No more guesses left, game over!");
                continuePrompt();
            } else {
                makeGuess();
            }
        } else {
            console.log("Congratulations, you win!");
            console.log(word.update());
            continuePrompt();
        }
    });
};

function continuePrompt() {
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "Would you like to play again?",
            choices: ["Yes", "No"]
        }
    ])
    .then(data => {
        if (data.continue === "Yes") {
            runIt();
        } else {
            console.log("Thanks for playing!");
        }
    });
};

runIt();
