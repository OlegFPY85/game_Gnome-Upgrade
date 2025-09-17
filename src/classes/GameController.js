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
    this.hammerElement = document.getElementById('hammerCursor');
    this.gameBoardContainer = document.querySelector('.game-board-container');
 
    this.hammerElement.style.backgroundImage = `url(${hammerImage})`;
    
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
    
    this.gameBoardContainer.addEventListener('mousemove', (e) => {
      const rect = this.gameBoardContainer.getBoundingClientRect();
      
      if (
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom
      ) {
        this.hammerElement.style.display = 'block';
        this.hammerElement.style.left = `${e.clientX - rect.left}px`;
        this.hammerElement.style.top = `${e.clientY - rect.top}px`;
      } else {
        this.hammerElement.style.display = 'none';
      }
    });
    
    this.gameBoardContainer.addEventListener('mouseleave', () => {
      this.hammerElement.style.display = 'none';
    });
  
    this.gameBoardContainer.addEventListener('mousedown', () => {
      this.hammerElement.classList.add('clicking');
    });
    
    this.gameBoardContainer.addEventListener('mouseup', () => {
      this.hammerElement.classList.remove('clicking');
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
   
    do {
      nextCell = this.board.getRandomCell();
    } while (currentCell === nextCell);
    
    this.goblin.showInCell(nextCell);
    
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
      if (this.goblin.catchGoblin()) {
        this.score += 1;
        this.updateStats();
 
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