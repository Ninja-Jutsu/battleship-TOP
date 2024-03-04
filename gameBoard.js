export default function createBlocks(userBoard) {
    let selectedBoard = document.getElementById(userBoard)
    for (let i = 0; i < 100; i++) {
        const box = document.createElement('div');
        box.classList.add('block')
        box.id = i;
        selectedBoard.appendChild(box)
    }
}