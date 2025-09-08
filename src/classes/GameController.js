export default class GameController {
  constructor(board, goblin, hammerImage) {
    this.board = board;
    this.goblin = goblin;
    this.score = 0;
    this.missed = 0;
    this.isPlaying = false;
    this.timer = null;
    
    this.scoreElement = document.getElementById('score');
    this.missedElement = document.getElementById('missed');
    this.startButton = document.getElementById('startButton');
    this.restartButton = document.getElementById('restartButton');
    this.gameOverElement = document.getElementById('gameOver');
    this.finalScoreElement = document.getElementById('finalScore');
    
    // Устанавливаем кастомный курсор-молоток
    document.body.style.cursor = `url(${hammerImage}), auto`;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.startButton.addEventListener('click', () => {
      this.startGame();
    });
    
    this.restartButton.addEventListener('click', () => {
      this.hideGameOver();
      this.startGame();
    });
    
    this.board.cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        if (this.isPlaying) {
          this.handleCellClick(cell);
        }
      });
    });
  }
  
  startGame() {
    this.score = 0;
    this.missed = 0;
    this.isPlaying = true;
    this.updateStats();
    this.board.reset();
    this.startButton.textContent = 'Перезапуск';
    
    this.showGoblin();
  }
  
  showGoblin() {
    if (!this.isPlaying) return;
    
    const currentCell = this.goblin.currentCell;
    let nextCell;
    
    // Выбираем следующую ячейку, отличную от текущей
    do {
      nextCell = this.board.getRandomCell();
    } while (currentCell === nextCell);
    
    this.goblin.showInCell(nextCell);
    
    // Устанавливаем таймер на скрытие гоблина
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    this.timer = setTimeout(() => {
      if (this.goblin.isVisible) {
        this.goblin.hide();
        this.missed += 1;
        this.updateStats();
        
        if (this.missed >= 5) {
          this.endGame();
        } else {
          this.showGoblin();
        }
      }
    }, 1000);
  }
  
  handleCellClick(cell) {
    if (this.goblin.currentCell === cell && this.goblin.isVisible) {
      // Проверяем, попал ли игрок по гоблину
      if (this.goblin.catchGoblin()) {
        this.score += 1;
        this.updateStats();
        
        // Показываем следующий гоблин
        setTimeout(() => {
          if (this.isPlaying) {
            this.showGoblin();
          }
        }, 300);
      }
    }
  }
  
  updateStats() {
    this.scoreElement.textContent = this.score;
    this.missedElement.textContent = this.missed;
  }
  
  endGame() {
    this.isPlaying = false;
    this.goblin.hide();
    clearTimeout(this.timer);
    
    this.finalScoreElement.textContent = this.score;
    this.showGameOver();
  }
  
  showGameOver() {
    this.gameOverElement.style.display = 'flex';
  }
  
  hideGameOver() {
    this.gameOverElement.style.display = 'none';
  }
}