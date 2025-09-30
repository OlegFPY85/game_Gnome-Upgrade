export default class GameController {
  constructor(gameBoard, goblin) {
    this.gameBoard = gameBoard;
    this.goblin = goblin;
    this.score = 0;
    this.missed = 0;
    this.isPlaying = false;
    this.moveTimer = null;

    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    this.scoreElement = document.getElementById('score');
    this.missedElement = document.getElementById('missed');
    this.startButton = document.getElementById('startButton');
    this.restartButton = document.getElementById('restartButton');
    this.gameOverElement = document.getElementById('gameOver');
    this.finalScoreElement = document.getElementById('finalScore');
  }

  setupEventListeners() {
    this.startButton.addEventListener('click', () => this.startGame());
    this.restartButton.addEventListener('click', () => this.restartGame());

    this.gameBoard.cells.forEach((cell) => {
      cell.addEventListener('click', () => this.handleCellClick(cell));
    });
  }

  startGame() {
    this.score = 0;
    this.missed = 0;
    this.isPlaying = true;
    this.updateUI();
    this.gameBoard.clearBoard();
    this.startButton.textContent = 'Перезапуск';
    this.scheduleNextMove();
  }

  restartGame() {
    this.gameOverElement.classList.add('hidden');
    this.startGame();
  }

  scheduleNextMove() {
    if (!this.isPlaying) return;

    if (this.moveTimer) {
      clearTimeout(this.moveTimer);
    }

    this.moveTimer = setTimeout(() => {
      this.moveGoblin();
    }, 1000);
  }

  moveGoblin() {
    if (!this.isPlaying) return;

    const currentCell = this.goblin.currentCell;
    let nextCell;

    do {
      nextCell = this.gameBoard.getRandomCell();
    } while (currentCell === nextCell);

    this.goblin.showInCell(nextCell);

    this.moveTimer = setTimeout(() => {
      if (this.goblin.isVisible()) {
        this.goblin.hide();
        this.missed += 1;
        this.updateUI();

        if (this.missed >= 5) {
          this.endGame();
        } else {
          this.scheduleNextMove();
        }
      }
    }, 1000);
  }

  handleCellClick(cell) {
    if (!this.isPlaying) return;

    if (this.goblin.currentCell === cell && this.goblin.isVisible()) {
      this.goblin.catch();
      this.score += 1;
      this.updateUI();

      clearTimeout(this.moveTimer);
      this.scheduleNextMove();
    }
  }

  updateUI() {
    this.scoreElement.textContent = this.score;
    this.missedElement.textContent = this.missed;
  }

  endGame() {
    this.isPlaying = false;
    this.goblin.hide();
    clearTimeout(this.moveTimer);

    this.finalScoreElement.textContent = this.score;
    this.gameOverElement.classList.remove('hidden');
  }
}