const GameBoard = require('./gameBoard')
const Ship = require('./makeShip')

test('GameBoard functioning', () => {
    const newShip = new Ship('Ismail', 5)
    const gameBoard = new GameBoard()
    gameBoard.placeOnGameBoard(newShip)
    expect()
})