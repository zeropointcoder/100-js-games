class ColourGuessingGame {
    constructor() {
        this.correctColour = this.generateRandomColour()
        this.guesses = 0
        this.maxGuesses = 5
    }

    generateRandomColour() {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        console.log(`rgb(${r}, ${g}, ${b})`)
        
        return `rgb(${r}, ${g}, ${b})`
    }

    // Check if the user guess matches the colour
    checkGuess(userGuess) {
        this.guesses += 1

        if(userGuess.toLowerCase() === this.correctColour.toLowerCase()) {
            return {
                result: 'correct',
                message: 'Congratulations, you have guessed the colour!'
            }
        } else if(this.guesses >= this.maxGuesses ) {
            return {
                result: 'gameover',
                message: `Game over! The correct colour was ${this.correctColour}.`
            }
        } else {
            return {
                result: 'incorrect',
                message: 'Wrong guess, try again!'
            }
        }
    }

    restartGame() {
        this.correctColour = this.generateRandomColour()
        this.guesses = 0
    }

    guessesRemaining() {
        return this.maxGuesses - this.guesses
    }
}

// UI interaction
document.addEventListener('DOMContentLoaded', () => {
    const game = new ColourGuessingGame()
    const guessColourInput = document.getElementById('guess-colour-input')
    const guessSubmitBtn = document.getElementById('guess-submit-btn')
    const guessesLeft = document.getElementById('guesses-left')
    const resultMessage = document.getElementById('result-message')
    const restartBtn = document.getElementById('restart-btn')

    guessesLeft.textContent = `Guesses left: ${game.maxGuesses}`
    resultMessage.textContent = `Start colour guessing game!`

    // Handle user guess
    guessSubmitBtn.addEventListener('click', () => {
        const userGuess = guessColourInput.value.trim()
        if(userGuess) {
            const result = game.checkGuess(userGuess)
            resultMessage.textContent = result.message
            guessesLeft.textContent = `${game.guessesRemaining()} out of ${game.maxGuesses} remaining guesses!`

            if(result.result === 'gameover' || result.result === 'correct') {
                guessColourInput.disabled = true
                guessSubmitBtn.disabled = true
            }
        }
    })

    restartBtn.addEventListener('click', () => {
        game.restartGame()
        guessColourInput.disabled = false
        guessSubmitBtn.disabled = false
        resultMessage.textContent = ''
        guessColourInput.value = ''
        guessesLeft.textContent = `Guesses left: ${game.maxGuesses}`
    })

})