export default class GameBoard {
  constructor(boardElement, size = 4) {
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
      this.boardElement.append(cell);
      this.cells.push(cell);
    }
  }

  getRandomCell() {
    const randomIndex = Math.floor(Math.random() * this.cells.length);
    return this.cells[randomIndex];
  }

  clearBoard() {
    this.cells.forEach((cell) => {
      const goblin = cell.querySelector('.goblin');
      if (goblin) {
        goblin.remove();
      }
    });
  }
}