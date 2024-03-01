class Ship { // Ships class
    constructor(name, length, position) {
        this.name = name,
        this.length = length,
        this.position = position
        this.hit = 0
        this.sunk = false
    }
    changeName(newName) {
        this.name = newName
        return this.name
    }
    changeLength(num = 0) {
        this.length = this.length + num
        return this.length
    }
    changePosition(pos) {
        this.position = pos
        return this.position
    }
    isHit() {
        if (this.hit < this.length) {
            this.hit++
        }
        return this.hit
    }
    isSunk() {
        if (this.hit === this.length) {
            this.sunk = true
        }
        return this.sunk
    }
}

class Fleet {
    constructor(fleetName) {
        this.fleetName = fleetName
        this.fleetShips = [],
        this.maxShips = 5,
        this.numOfShips = 0,
        this.destroyed = false
    }
    addShip(aShip) {
        this.fleetShips.push(aShip)
        this.numOfShips++
    }
    removeSunkShips() {
        const shipsToRemove = this.fleetShips
            .map(aShip => aShip.hit)
        for (let i = 0; i < shipsToRemove.length; i++) {
            if (shipsToRemove[i] === 5) {
                this.fleetShips.shift(i)
                this.numOfShips--
            }
        }
    }
    isDestroyed(){
        if(this.fleetShips.length = 0){
            this.destroyed = true
            return `${this.fleetName} is destroyed`
        }
    }
}

module.exports = Ship
