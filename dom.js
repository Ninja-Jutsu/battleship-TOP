export default function createBoxes(board){
    let selectedBoard = document.getElementById(board)
    
    for (let i = 1 ; i < 101; i++){
        const box = document.createElement('div');
        box.classList.add('box')
        box.id = i;
        selectedBoard.appendChild(box)
    }
}