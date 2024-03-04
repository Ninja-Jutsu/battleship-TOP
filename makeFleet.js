class Fleet {
    constructor(fleetName) {
        this.fleetName = fleetName
        this.fleetShips = [],
            this.maxShips = 5,
            this.numOfShips = 0,
            this.destroyed = false
    }
    addShip(aShip) {
        if (this.numOfShips < 5) {
            this.fleetShips.push(aShip)
            this.numOfShips++
        } else {
            return "You can't have more than 5 ships"
        }
    }
    removeSunkShips() {
        const shipsToRemove = this.fleetShips
        for (let i = 0; i < shipsToRemove.length; i++) {
            if (shipsToRemove[i].hit === shipsToRemove[i].length) {
                this.fleetShips.shift(i)
                this.numOfShips--
            }
        }
    }
    isDestroyed() {
        if (this.numOfShips === 0) {
            this.destroyed = true
        }
    }
}

module.exports = Fleet