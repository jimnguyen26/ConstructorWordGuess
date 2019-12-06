console.log(process.argv);

const prompt = require('prompt');
const inquirer = require('inquirer');
const gi = require(`gitignore`);
const Word = require("./Word");

const westernTeams = [
"Nuggets", "Jazz", "Timberwolves", "Thunder", "Trailblazers", 
"Lakers", "Clippers", "Suns", "Kings", "Warriors", 
"Mavericks", "Rockets", "Spurs", "Grizzles", "Pelicans",
"Raptors", "Celtics", "76ers", "Nets", "Knicks",
"Bucks", "Pacers", "Pistons", "Bulls", "Cavaliers",
"Heat", "Magic", "Hornets", "Wizards", "Hawks"
];

console.log(westernTeams);

let guess;
let chosenWords;
let word;
let chosenLetter;

function runIt() {
    chosenWords = [];
    console.log("Welcome to the NBA guessing game where you guess the team!");
};

function playGame() {
    chosenLetter = "";
    guess = 12;
    if (chosenWords.length < westernTeams.length) {
        chosenLetter = getLetter();
    } else {
        console.log("You sure know your NBA teams!");
        continuePrompt();
    }
    if (chosenLetter) {
        word = new Word(chosenLetter);
        word.makeLetters();
        makeGuess();
    }
}

function continuePrompt() {
    inquirer.prompt([{
        name: "continue",
        tyoe: "list",
        message: "Would you like to play again?",
        choices: ["Yes", "No"]
    }])
    .then(data => {
        if (data.continue === "Yes") {
            runIt();
        } else {
            console.log("Thanks for playing!");
        }
    });
};

runIt();