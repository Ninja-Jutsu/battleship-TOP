//+ Make the option flip Horizon and Vert:
const flipBtn = document.getElementById('flip-button')

//+ Flip Option Ships:
import flipShips from './flipFunc.js'
flipShips()
flipBtn.addEventListener('click', function () { flipShips() })

//+ Make ships with Ship Class:
import Ship , {makeShip} from './makeShip.js'
const destroyer = new Ship('destroyer', 2)
const submarine = new Ship('submarine', 3)
const cruiser = new Ship('cruiser', 3)
const battleship = new Ship('battleship', 4)
const carrier = new Ship('carrier', 5)
const ships = makeShip()

//+ AddShipsToBoards: 
 import dropShip from './dragElements.js' // enough to just import anything to link files

// Game Logic:
let gameOver = false
let playerTurn

// Start Game:
const computerBoardBlocks = document.querySelectorAll('#computer-board div')
const battleInfo = document.getElementById('battle-info')
const turnInfo = document.getElementById('display-turn')
const startBtn = document.getElementById('start-button')

function startGame() {
    if (playerTurn == undefined) {
        const allShips = Array.from(document.querySelectorAll('#option-container div'))
        if (allShips.length != 0) {
            battleInfo.innerHTML = 'Place all your ships first!'
        } else {
            turnInfo.innerText = 'Your Go!'
            battleInfo.innerText = 'The Game has started'
            computerBoardBlocks.forEach(block => block.addEventListener('click', handleHittingClick))
            playerTurn = true
        }
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
            clickedBlock.style.backgroundColor = 'red'
            battleInfo.innerText = 'You Hit the computer ship'
            playerHits.push(e.target.classList[1])
            checkScore('player', playerHits, computerSunkShips)
            findWinner('player', computerSunkShips)
        } else {
            clickedBlock.classList.add('empty')
            clickedBlock.style.backgroundColor = 'grey'
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
                comHits.push(hitBlock.classList[1])
                // checkScore('player', comHits, computerSunkShips)
                checkScore('computer', comHits, playerSunkShips)
                findWinner('computer', playerSunkShips)
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


// player, playerHits, computerSunkShips
function checkScore(userBoard, userHits, enemySunkShips) {
    function checkShip(shipName, shipLength) {
        let sunkShipArray = userHits.filter(storedShip => storedShip === shipName)
        if (
            sunkShipArray.length === shipLength// this means the ship has sunk
        ) {
            battleInfo.innerText = `You sunk the ${userBoard}'s ${shipName}`
            if (userBoard === 'player') { // filter out the names of the sunk ships from the hits
                playerHits = userHits.filter(storedShipName => storedShipName !== shipName)
                battleInfo.innerText = `You sunk the computer's ${shipName}`
            }
            if (userBoard === 'computer') {
                comHits = userHits.filter(storedShipName => storedShipName !== shipName)
                battleInfo.innerText = `The computer sunk your ${shipName}`
            }
            enemySunkShips.push(shipName) // add the sunk ship to each player's sunk ships array
        }
    }
    // this should use the class Ship
    for (let ship in ships) {
        let shipName = ships[ship].name
        let shipLength = ships[ship].length
        checkShip(shipName, shipLength)
    }

    console.log('player', playerHits)
    console.log('playerSunkShips', playerSunkShips)

    console.log('COM', comHits)
    console.log('Com Sunk Ships', computerSunkShips)
}

function findWinner(user, enemySunkShips) {
    if (enemySunkShips.length === 5) {
        battleInfo.innerText = `${user} has sunk all enemy's ships!`
        setTimeout(() => {
            battleInfo.innerText = `${user} has won!`
        }, 500)
        gameOver = true
    }
    endGame(user)
}

function endGame(user) {
    if (gameOver) {
        computerBoardBlocks.forEach(block => block.removeEventListener('click', handleHittingClick))
        battleInfo.innerText = `${user} Has Won The Game!
        Game Over`
    }
}