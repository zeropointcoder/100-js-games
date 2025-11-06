const readline = require('readline')

class NumberGuessingGame {
    constructor(min=1, max=100, maxAttempts=10) {
        this.min = min
        this.max = max
        this.maxAttempts = maxAttempts
        this.resetGame()
    }

    // Generate a random number between min and max
    generateRandomNumber() {
        return Math.floor(Math.random()*(this.max - this.min + 1)) + this.min
    }

    // Handle a guess from the user
    makeGuess(guess) {
        if(this.isGameOver) {
            return `Game over! The number was ${this.secretNumber}. Please reset to play again.`
        }

        this.attempts++

        if(guess < this.secretNumber) {
            return this.checkGameOver() || `Too low! Attempts left: ${this.maxAttempts - this.attempts}`
        } else if(guess > this.secretNumber) {
            return this.checkGameOver() || `Too high! Attempts left: ${this.maxAttempts - this.attempts}`
        } else {
            this.isGameOver = true
            return `Correct! You have guessed the ${this.secretNumber} in ${this.attempts} attempts.`
        }
    }

    // Check if player has run out of attempts
    checkGameOver() {
        if(this.attempts >= this.maxAttempts && !this.isGameOver) {
            this.isGameOver = true
            return `You have used all attempts. The number was ${this.secretNumber}.`
        }
        return null
    }

    // Reset the game to start again
    resetGame() {
        this.secretNumber = this.generateRandomNumber()
        this.attempts = 0
        this.isGameOver = false
    }    
}

// Usage
const game = new NumberGuessingGame(1, 50, 5)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log('Guess a number between 1 and 50!')

function askGuess() {
    if(game.isGameOver) {
        rl.question('Play again? (y / n): ', (answer) => {
            if(answer === 'y') {
                game.resetGame()
                console.log('\n New game started! Guess a number between 1 and 50!')
                askGuess()
            } else {
                console.log('Thanks for playing!')
                rl.close()
            }
        })
        return
    }

    rl.question('Enter your guess: ', (input) => {
        const guess = parseInt(input)
        console.log(game.makeGuess(guess))

        if(!game.isGameOver) {
            askGuess()
        } else {
            rl.close()
        }
    })
}


askGuess()