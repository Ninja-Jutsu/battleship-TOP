const Fleet = require('./makeFleet');
const Ship = require('./makeShip');

test('Create a fleet of ships', () => {
    const aFleet = new Fleet('MOROCCO')
    expect(aFleet).toEqual({
        fleetName: 'MOROCCO',
        fleetShips: [],
        maxShips: 5,
        numOfShips: 0,
        destroyed: false
    })
})

test('Add more ships up to 5', () => {
    const aFleet = new Fleet('MOROCCO')
    const ship = new Ship('Destroyer', 3, 4)
    aFleet.addShip(ship)
    aFleet.addShip(ship)
    aFleet.addShip(ship)
    aFleet.addShip(ship)
    aFleet.addShip(ship)
    expect(aFleet.numOfShips).toBe(5)
    aFleet.addShip(ship) // add a 6th ship
    expect(aFleet.addShip(ship)).toBe("You can't have more than 5 ships")
    expect(aFleet.numOfShips).toBe(5)
})

test('Check if sunk ships are removed from the fleet when destroyed', () => {
    const aFleet = new Fleet('Singapore')
    const ship = new Ship('Destroyer', 3, 4)
    const aSecondShip = new Ship('Boiler', 2, 4)
    // let's add the ships
    aFleet.addShip(ship)
    aFleet.addShip(aSecondShip)
    // let's sink the first ship
    ship.isHit()
    ship.isHit()
    ship.isHit()
    // let's remove sunk ships from fleet
    aFleet.removeSunkShips()
    expect(aFleet.numOfShips).toBe(1)

    // let's sink the second ship
    aSecondShip.isHit()
    aSecondShip.isHit()
    // let's remove sunk ships from fleet
    aFleet.removeSunkShips()
    expect(aFleet.numOfShips).toBe(0)
})

test('Fleet is destroyed (All ships sunk)', () => {
    const aFleet = new Fleet('Morocco')
    const ship = new Ship('Destroyer', 1, 4)
    aFleet.addShip(ship)
    expect(aFleet.destroyed).toBe(false) // check if there are ships
    ship.isHit() // destroy the one ship
    expect(ship.hit === ship.length).toBe(true) // check that the ship lost all its parts
    aFleet.removeSunkShips()
    expect(aFleet.numOfShips).toBe(0) // check that there are no ships left 
    aFleet.isDestroyed()
    expect(aFleet.destroyed).toBe(true) // check if fleet is destroyed
})