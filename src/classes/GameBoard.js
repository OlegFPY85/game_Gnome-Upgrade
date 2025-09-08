export default class GameBoard {
  constructor(boardElement, size) {
    this.boardElement = boardElement;
    this.size = size;
    this.cells = [];
    this.createBoard();
  }
  
  createBoard() {
    this.boardElement.innerHTML = '';
    this.cells = [];
    
    for (let i = 0; i < this.size * this.size; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.boardElement.appendChild(cell);
      this.cells.push(cell);
    }
  }
  
  getRandomCell() {
    const randomIndex = Math.floor(Math.random() * this.cells.length);
    return this.cells[randomIndex];
  }
  
  reset() {
    this.cells.forEach((cell) => {
      cell.innerHTML = '';
    });
  }
}