const Ship = require('./app');

test('Ship making', () => {
    const ship1 = new Ship('WAR', 5, 5)
    expect(ship1)
        .toEqual({ name: 'WAR', length: 5, position: 5, hit: 0, sunk: false })
})
test('Change properties', () => {
    const ship1 = new Ship('WAR', 5, 5)
    ship1.changeName('Ismail')
    expect(ship1.name)
        .toBe('Ismail')
    ship1.changeLength(10)
    expect(ship1.length)
        .toBe(15)
    ship1.changePosition(10)
    expect(ship1.position)
        .toBe(10)
})
test('Ship can only be hit its length times', () => {
    const ship1 = new Ship('WAR', 5, 5)
    expect(ship1.isHit()).toBe(1)
    expect(ship1.isHit()).toBe(2)
    expect(ship1.isHit()).toBe(3)
    expect(ship1.isHit()).toBe(4)
    expect(ship1.isHit()).toBe(5)
    expect(ship1.isHit()).toBe(5)
})

