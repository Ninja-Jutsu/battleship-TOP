const aShip = require('./app');

test('Ship making', () => {
    expect(aShip)
        .toEqual({ name: 'WAR', length: 5, position: 5, hit: 0, sunk: false })
})
test('Change properties', () => {
    expect(aShip.changeName('Ismail'))
        .toBe('Ismail')
    expect(aShip.changeLength(10))
        .toBe(15)
    expect(aShip.changeLength())
        .toBe(15)
    expect(aShip.changePosition(10))
        .toBe(10)
})
test('Ship been hit', () => {
    expect(aShip.isHit()).toBe(1)
    expect(aShip.isHit()).toBe(2)
    expect(aShip.isSunk()).toBe(false)

    expect(aShip.isHit()).toBe(3)
    expect(aShip.isHit()).toBe(4)
    expect(aShip.isHit()).toBe(5)
    expect(aShip.isHit()).toBe(5)
    expect(aShip.isSunk()).toBe(true)

})