import { addShipToBoard } from './gameBoard.js'
import {makeShip} from './makeShip.js'
const allShips = Array.from(document.querySelectorAll('#option-container div'))
const playerBoardBlocks = Array.from(document.querySelectorAll(`#player-board div`))
let ships = makeShip()
ships.forEach(ship => addShipToBoard('computer-board', ship)) // Add ships to computer's board
allShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart)) // drag players ships

let draggedShipName
let draggedShipNode
let notDropped

function dragStart(e) {
    notDropped = false
    draggedShipNode = e.target
    draggedShipName = e.target.classList[1]
}

playerBoardBlocks.forEach(block => {
    block.addEventListener('dragover', dragOver)
    block.addEventListener('drop', dropShip)
})

function dragOver(e) {
    e.preventDefault() // by default dragOver will prevent dropping
}

export default function dropShip(e) {
    let shipNames = ships.map(ship => ship.name)
    const ship = shipNames.indexOf(draggedShipName)
    addShipToBoard('player-board', ships[ship], e.target.id)
    if (!notDropped) draggedShipNode.remove()
}