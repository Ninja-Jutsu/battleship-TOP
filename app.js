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
        if (this.hit < 5) {
            this.hit++
        }
        return this.hit
    }
    isSunk() {
        if (this.hit === 5) {
            this.sunk = true
        }
        return this.sunk
    }
}

// Ships creator:
// function createShips(shipName, shipLength, shipPosition){
//     return new Ship(shipName, shipLength, shipPosition, 0, false)
// }

const aShipOne = new Ship('ismail', 5, 6)
const two = new Ship('Vnae', 2, 3)
console.log(two.name)

console.log(aShipOne.name)

// module.exports = aShip
