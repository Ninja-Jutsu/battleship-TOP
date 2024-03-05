import flipShips from "./flipFunc.js";

export default function createBlocks(userBoard) {
    let selectedBoard = document.getElementById(userBoard)
    for (let i = 0; i < 100; i++) {
        const box = document.createElement('div');
        box.classList.add('block')
        box.id = i;
        selectedBoard.appendChild(box)
    }
}
let notDropped

createBlocks('player-board')
createBlocks('computer-board')

export function addShipToBoard(user, ship, startId) {
    const boardBlock = Array.from(document.querySelectorAll(`#${user} div`))

    let randomStartIndex = Math.floor(Math.random() * 100)
    let startIndex = startId ? startId : randomStartIndex
    let randomBoolean = Math.random() > 0.5
    let isHorizontal = user === 'player-board' ? flipShips(1) : randomBoolean
    let validStart = isHorizontal ? startIndex <= 100 - ship.length ?
        startIndex : 100 - ship.length :
        // Handle Vertical
        startIndex <= 100 - 10 * ship.length ?
            startIndex : startIndex - ship.length * 10 + 10
    const shipBlocks = []

    for (let i = 0; i < ship.length; i++) {
        if (isHorizontal) {
            shipBlocks.push(boardBlock[Number(validStart) + i])
        }
        else {
            shipBlocks.push(boardBlock[Number(validStart) + (i * 10)])
        }
    }

    let valid

    if (isHorizontal) {
        valid = shipBlocks[0].id % 10 < 10 - ship.length + 1
    }
    else {
        shipBlocks.every((_shipBlock, index) => {
            valid = shipBlocks[0].id < 90 + (10 * index + 1)
        })
    }

    const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'))

    if (valid && notTaken) {
        shipBlocks.forEach(shipBlock => {
            shipBlock.classList.add(ship.name)
            shipBlock.classList.add('taken')
        })
    } else {
        if (user === 'computer-board') addShipToBoard(user, ship)
        if (user === 'player-board') notDropped = true
    }
}