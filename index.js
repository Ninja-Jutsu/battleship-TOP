//+ Create Board Boxes:

function createBoxes(userBoard) {
    let selectedBoard = document.getElementById(userBoard)
    for (let i = 0; i < 100; i++) {
        const box = document.createElement('div');
        box.classList.add('block')
        box.id = i;
        selectedBoard.appendChild(box)
    }
}
createBoxes('player-board')
createBoxes('computer-board')

//+ Make the option flip Horizon and Vert:

// Target Elements:
const allShips = Array.from(document.querySelectorAll('#option-container div'))
const flipBtn = document.getElementById('flip-button')
//Set Vars:
let angle = 0

function flipShips() {
    allShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`)
    angle = angle === 0 ? 90 : 0
}
flipShips()

flipBtn.addEventListener('click', flipShips)
class Ship { // Ships creator class
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
    undoPosition() {
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

const destroyer = new Ship('destroyer', 2)
const submarine = new Ship('submarine', 3)
const cruiser = new Ship('cruiser', 3)
const battleship = new Ship('battleship', 4)
const carrier = new Ship('carrier', 5)
const ships = [destroyer, submarine, cruiser, battleship, carrier]
const shipsNames = ['destroyer', 'submarine', 'cruiser', 'battleship', 'carrier']

let notDropped


function addShipToBoard(user, ship, startId) {
    const boardBlock = Array.from(document.querySelectorAll(`#${user} div`))

    let randomStartIndex = Math.floor(Math.random() * 100)
    let startIndex = startId ? startId : randomStartIndex
    let randomBoolean = Math.random() > 0.5
    let isHorizontal = user === 'player-board' ? angle : randomBoolean
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

ships.forEach(ship => addShipToBoard('computer-board', ship))

// Drag player's ships:
let draggedShipName
let draggedShipNode
allShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart))
function dragStart(e) {
    notDropped = false
    draggedShipNode = e.target
    draggedShipName = e.target.classList[1]
}

const playerBoardBlocks = Array.from(document.querySelectorAll(`#player-board div`))
playerBoardBlocks.forEach(block => {
    block.addEventListener('dragover', dragOver)
    block.addEventListener('drop', dropShip)
})

function dragOver(e) {
    e.preventDefault()
}

function dropShip(e) {
    const startId = e.target.id
    const ship = shipsNames.indexOf(draggedShipName)
    addShipToBoard('player-board', ships[ship], startId)
    if (!notDropped) {
        draggedShipNode.remove()
    }
}

// Game Logic:
let gameOver = false
let playerTurn

// Start Game:
const computerBoardBlocks = document.querySelectorAll('#computer-board div')
const battleInfo = document.getElementById('battle-info')
const turnInfo = document.getElementById('display-turn')
const startBtn = document.getElementById('start-button')


function startGame() {
    const allShips = Array.from(document.querySelectorAll('#option-container div'))
    if (allShips.length != 0) {
        battleInfo.innerHTML = 'Place all your ships first!'
    } else {
        battleInfo.innerHTML = 'Go Go Go'
        computerBoardBlocks.forEach(block => block.addEventListener('click', handleHittingClick))
    }
}

startBtn.addEventListener('click', startGame)

/////////////////////////
let playerHits = []
let comHits = []
let playerSunkShips = []
let computerSunkShips = []



function handleHittingClick(e) {
    if (!gameOver) {
        const clickedBlock = e.target
        if (clickedBlock.classList.contains('taken')) {
            clickedBlock.classList.add('boom') // could also remove taken was boomed
            battleInfo.innerText = 'You Hit the computer ship'
            comHits.push(e.target.classList[1])
            console.log(comHits)
            // checkScore('player', playerHits, playerSunkShips)
            checkScore('player', comHits, computerSunkShips)

        } else {
            clickedBlock.classList.add('empty')
            battleInfo.innerHTML = 'Nothing hit'
        }
        playerTurn = false
        //remove all click event listener so the player cannot click so player cannot click
        computerBoardBlocks.forEach(block => block.removeEventListener('click', handleHittingClick))

        //Com turn:
        setTimeout(computerGo, 2000)
    }
}

function computerGo() {
    if (!gameOver) {
        turnInfo.innerText = "It's Computer's turn"
        battleInfo.innerHTML = 'The Computer is thinking...'
        setTimeout(() => { // Simulate the computer choosing
            let randomGo = Math.floor(Math.random() * 100)
            let hitBlock = document.getElementById(randomGo)
            if (hitBlock.classList.contains('taken') &&
                hitBlock.classList.contains('boom') ||
                hitBlock.classList.contains('empty')) // Must fix this logic
            {
                computerGo()
                return // let's check why should return here
            }
            else if (hitBlock.classList.contains('taken')) {
                hitBlock.classList.add('boom')
                battleInfo.innerHTML = 'Your Ship Got Hit!'
                playerHits.push(hitBlock.classList[1])
                // checkScore('computer', comHits, computerSunkShips)
                checkScore('player', comHits, computerSunkShips)

            }
            else if (!hitBlock.classList.contains('taken')) {
                hitBlock.classList.add('empty')
                battleInfo.innerHTML = 'Nothing was hit this time!'
            }
        }, 2000)

        // after the Com finishes his move, player turn
        setTimeout(() => {
            playerTurn = true
            turnInfo.innerText = 'Your Turn!'
            battleInfo.innerText = 'Take a shot!'
            computerBoardBlocks.forEach(block => block.addEventListener('click', handleHittingClick))
            // this is horrible code, must rewrite
        }, 4000)
    }
}


function checkScore(userBoard, userHits, userSunkShips) {
    function checkShip(shipName, shipLength) {
        if (
            userHits.filter(storedShip => storedShip === shipName).length === shipLength// this means the ship has sunk
        ) {
            console.log(userHits.filter(storedShip => storedShip === shipName).length === shipLength)
            battleInfo.innerText = `You sunk the ${userBoard}'s ${shipName}`
            if (userBoard === 'computer'){ // filter out the names of the sunk ships from the hits
                playerHits = userHits.filter(storedShipName => storedShipName !== shipName)
            }
            if(userBoard === 'player') {
                comHits = userHits.filter(storedShipName => storedShipName !== shipName)
            }
            userSunkShips.push(shipName) // add the sunk ship to each player's sunk ships array
        }
    }
    checkShip('destroyer', 2)
    checkShip('submarine', 3)
    checkShip('cruiser', 3)
    checkShip('battleship', 4)
    checkShip('carrier', 5)


    console.log('player', playerHits)
    console.log('playerSunkShips', playerSunkShips)

    console.log('COM', comHits)
    console.log('Com Sunk Ships', computerSunkShips)
}