export default class Ship { // Ships class
    constructor(name, length) {
        this.name = name,
        this.length = length,
        this.coords = [],
        this.hit = 0,
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
    setPositions(coord1, coord2) {
        this.coords = [coord1, coord2]
    }
    undoPosition(){
        this.coords = []
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

export function makeShip(){
    const destroyer = new Ship('destroyer', 2)
    const submarine = new Ship('submarine', 3)
    const cruiser = new Ship('cruiser', 3)
    const battleship = new Ship('battleship', 4)
    const carrier = new Ship('carrier', 5)

    return [destroyer, submarine, cruiser, battleship, carrier]
}
