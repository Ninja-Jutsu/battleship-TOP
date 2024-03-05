//+ Make the option flip Horizon and Vert:
const flipBtn = document.getElementById('flip-button')

//+ Flip Option Ships:
import flipShips from './flipFunc.js'
flipShips()
flipBtn.addEventListener('click', function () { flipShips() })

//+ Make ships with Ship Class:
import {makeShip} from './makeShip.js'

//+ AddShipsToBoards: 
 import dropShip from './dragElements.js' // enough to just import anything to link files

//+ Play Game:
import startGame from './gameLogic.js'