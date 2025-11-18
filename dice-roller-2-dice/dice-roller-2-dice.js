export class Die { // Die is singular, Dice is plural
    constructor(sides=6) {
        this.sides = sides
    }

    roll() {
        return Math.floor(Math.random() * this.sides) + 1
    }
} 

export class DiceRoller {
    constructor() {
        this.die1 = new Die()
        this.die2 = new Die()
    }

    rollBoth() {
        const first = this.die1.roll()
        const second = this.die2.roll()

        return {
            first,
            second,
            total: first + second
        }
    }
}