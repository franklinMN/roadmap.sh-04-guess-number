import chalk from "chalk";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MODE = {
  1: "Easy",
  2: "Medium",
  3: "Difficult",
};

const CHANCE = {
  Easy: 10,
  Medium: 5,
  Difficult: 3,
};

function randomNumberInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function askQuery(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function guessGame() {
  console.log("Welcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.");
  console.log("You have 5 chances to guess the correct number.");
  console.log("\nPlease select the difficulty level:");
  console.log(
    "1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\n"
  );

  const ch = await askQuery("Enter your Choice: ");

  if (!(ch in MODE)) {
    console.log(chalk.red("Error: Invalid choice."));
    rl.close();
    return;
  }

  console.log(`\nGreat! You have selected the ${MODE[ch]} difficulty level.`);
  console.log("Let's start the game!");

  const COMPUTER = randomNumberInt(1, 100);
  const chances = CHANCE[MODE[ch]];

  for (let i = 0; i < chances; i++) {
    const guessStr = await askQuery(
      `\nEnter your guess(${i + 1}/${chances}): `
    );
    const guess = parseInt(guessStr);

    if (isNaN(guess)) {
      console.log(chalk.red("Error: Invalid number."));
      i--;
      continue;
    }

    if (guess === COMPUTER) {
      console.log(
        chalk.green(
          `🎉 Congratulations! You guessed the correct number in ${
            i + 1
          } attempts.`
        )
      );
      rl.close();
      return;
    } else if (guess < COMPUTER) {
      console.log(
        chalk.yellow(`❌ Incorrect! The number is greater than ${guess}.`)
      );
    } else if (guess > COMPUTER) {
      console.log(
        chalk.yellow(`❌ Incorrect! The number is less than ${guess}.`)
      );
    }
  }

  console.log(
    chalk.redBright(`\n💀 ${chances} changes are over. Better luck next time!`)
  );
  rl.close();
}

guessGame();
